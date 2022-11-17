import {action, makeObservable, observable, computed} from 'mobx';

class API_CALL {
  state = {
    isError: false,
    errorText: '',
    success: true,
  };

  setSuccess = val => {
    this.state.success = val;
  };

  setError = () => {
    this.state.isError = true;
  };

  resetError = () => {
    this.state.isError = false;
  };
  setErrorText = text => {
    this.state.errorText = text;
  };

  reset = () => {
    this.state.isError = false;
    this.state.errorText = '';
  };

  get errorText() {
    return this.state.errorText;
  }
  get errorStatus() {
    return this.state.isError;
  }

  get successStatus() {
    return this.state.success;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      setError: action,
      setSuccess: action,
      resetError: action,
      setErrorText: action,
      reset: action,

      errorStatus: computed,
      errorText: computed,
      successStatus: computed,
    });
  }
}

export const API_SCREEN_Store = new API_CALL();
