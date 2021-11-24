import {action, makeObservable, observable, computed} from 'mobx';

class SignUpStore {
  state = {
    doingApi: false,
    fail: false,
    errorMessage: '',
  };

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
  constructor() {
    makeObservable(this, {
      state: observable,

      setDoingApiCall: action,
      getDoingApiCall: computed,

      setFailState: action,
      getFailState: computed,

      setErrorText: action,
      getErrorText: computed,

      resetStore: action,
    });
  }
}

export const SIGN_UP_STORE = new SignUpStore();
