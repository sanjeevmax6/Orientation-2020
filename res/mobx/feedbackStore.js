import {action, computed, makeObservable, observable} from 'mobx';


class FeedbackStore {
  state = {
    // isFeedbackLoading: true,
    name:'',
    rollNumber:'',
    department:'',
    message:'',
    success: false,
    error: false,
    isLoading: false,
    errorText: '',
  };

  reset = () => {
    this.state.name = '';
    this.state.rollNumber = '';
    this.state.department = '';
    this.state.message = '';
    this.state.isLoading = false;
    this.state.errorText = '';
    this.state.error = false;
    this.state.success = false;
  };


  setLoading = value => {
    this.state.isLoading = value;
  };
  setErrorText = value => {
    this.state.errorText = value;
  };
  setError = value => {
    this.state.error = value;
  };

  setSuccess = val => {
    this.state.success = val;
  };

  get getSuccess() {
    return this.state.success;
  }


  setName = val => {
    this.state.name = val;
  };

  get getName() {
    return this.state.name;
  };

  setRollNum = val => {
    this.state.rollNumber = val;
  };

  get getRollNum() {
    return this.state.rollNumber;
  };

  setDept = val => {
    this.state.department = val;
  };

  get getDept() {
    return this.state.department;
  };

  setMessage = val => {
    this.state.message = val;
  };

  get getMessage() {
    return this.state.message;
  }
//   setIsfeedBackLoading = isLoading => {
//     this.state.isTransportationLoading = isLoading;
//   };



  get isLoading() {
    return this.state.isLoading;
  }

  get getError() {
    return this.state.error;
  }
  get getErrorText() {
    return this.state.errorText;
  }
  constructor() {
    makeObservable(this, {
      state: observable,

    
    //   setIsFeedbackLoading: action,
      setLoading: action,
      setError: action,
      setErrorText: action,
      setName: action,
      getName: computed,
      setRollNum: action,
      getRollNum: computed,
      setDept: action,
      getDept: computed,
      setMessage: action,
      getMessage: computed,
      setSuccess: action,
      getSuccess: computed,

      isLoading: computed,
      getError: computed,
      getErrorText: computed,
    });
  }
}

export const FEEDBACK_STORE = new FeedbackStore();
