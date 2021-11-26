import {action, makeObservable, observable, computed} from 'mobx';

class SignUpStore {
  state = {
    doingApi: false,
    fail: false,
    errorMessage: '',
    department: 'Select your Department',
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    otp: '',
    token: '',
    success: false,
  };

  setToken = val => {
    this.state.token = val;
  };

  get getToken() {
    return this.state.token;
  }

  setOTP = val => {
    this.state.otp = val;
  };

  get getOTP() {
    return this.state.otp;
  }

  setName = value => {
    this.state.name = value;
  };

  get getName() {
    return this.state.name;
  }

  setEmail = value => {
    this.state.email = value;
  };

  get getEmail() {
    return this.state.email;
  }

  setPassword = value => {
    this.state.password = value;
  };

  get getPassword() {
    return this.state.password;
  }

  setConfirmPassword = value => {
    this.state.confirmPassword = value;
  };

  get getConfirmPassword() {
    return this.state.confirmPassword;
  }

  setDoingApiCall = value => {
    this.state.doingApi = value;
  };

  get getDoingApiCall() {
    return this.state.doingApi;
  }
  setFailState = value => {
    this.state.fail = value;
  };

  get getFailState() {
    return this.state.fail;
  }

  setSuccessState = value => {
    this.state.success = value;
  };

  get getSucessState() {
    return this.state.success;
  }

  setErrorText = value => {
    this.state.errorMessage = value;
  };

  get getErrorText() {
    return this.state.errorMessage;
  }

  resetStore = () => {
    this.state.doingApi = false;
    this.state.fail = false;
    this.state.errorMessage = '';
  };

  setDepartment = value => {
    this.state.department = value;
  };

  get getDepartment() {
    return this.state.department;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setDoingApiCall: action,
      getDoingApiCall: computed,

      setFailState: action,
      getFailState: computed,

      setSuccessState: action,
      getSucessState: computed,

      setErrorText: action,
      getErrorText: computed,

      resetStore: action,

      setDepartment: action,
      getDepartment: computed,

      setEmail: action,
      getEmail: computed,

      setPassword: action,
      getPassword: computed,

      setConfirmPassword: action,
      getConfirmPassword: computed,

      setName: action,
      getName: computed,

      setOTP: action,
      getOTP: computed,

      setToken: action,
      getToken: computed,
    });
  }
}

export const SIGN_UP_STORE = new SignUpStore();
