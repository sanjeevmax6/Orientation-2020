import {action, makeObservable, observable, computed} from 'mobx';

class StudentData {
  state = {
    isLoggedIn: false,
    token: null,
  };

  logOut = () => {
    this.state.isLoggedIn = false;
    this.state.token = null;
    console.log('USER LOGGED OUT');
  };

  logIn = token => {
    this.state.isLoggedIn = true;
    this.state.token = token;
    console.log('USER LOGGED IN');
  };

  get token() {
    return this.state.token;
  }
  constructor() {
    makeObservable(this, {
      state: observable,
      logIn: action,
      logOut: action,
      token: computed,
    });
  }
}

export const Login_Store = new StudentData();
