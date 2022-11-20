import {action, makeObservable, observable, computed} from 'mobx';

class API_CALL {
  state = {
    isError: false,
    errorText: '',
    success: false,
    isLoading: false,
    otp: '',
    rollNo: ''
  };
  
  reset = () => {
    console.log("Hiiii")
    this.state.isLoading = false;
    // this.setIsLoading(false);
    this.state.errorText = '';
    this.state.isError = false;
    // this.setError(false);
    this.state.success = false;
    // this.setSuccess(false);
    this.state.otp = '';
  };
  
  setRollNo = val => {
    this.state.rollNo = val;
  }

  setOtp = val => {
    this.state.otp = val;
  }

  setIsLoading = val => {
    this.state.isLoading = val;
  };

  setSuccess = val => {
    this.state.success = val;
  };

  setError = val => {
    this.state.isError = val;
  };

  // resetError = () => {
  //   this.state.isError = false;
  // };
  setErrorText = text => {
    this.state.errorText = text;
  };

  // reset = () => {
  //   this.state.isError = false;
  //   this.state.errorText = '';
  // };

  get errorText() {
    return this.state.errorText;
  }
  get errorStatus() {
    return this.state.isError;
  }

  get successStatus() {
    return this.state.success;
  }

  get getIsLoading() {
    return this.state.isLoading;
  }

  get getOtp() {
    return this.state.otp;
  }

  get getRollNo() {
    return this.state.rollNo;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      setError: action,
      setSuccess: action,
      setErrorText: action,
      setIsLoading: action,
      setOtp: action,
      setRollNo:action,

      errorStatus: computed,
      errorText: computed,
      successStatus: computed,
      getIsLoading: computed,
      getOtp:computed,
      getRollNo:computed
    });
  }
}

export const API_SCREEN_Store = new API_CALL();
