import {action, makeObservable, observable, computed} from 'mobx';

class StudentData {
  state = {
    showSplash: true,
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
  closeSplash = () => {
    this.state.showSplash = false;
    console.log('Splash Closed');
  };
  get token() {
    return this.state.token;
  }
  get isUserLoggedIn() {
    return this.state.isLoggedIn;
  }
  get showSplash() {
    return this.state.showSplash;
  }
  constructor() {
    makeObservable(this, {
      state: observable,
      logIn: action,
      logOut: action,
      token: computed,
      isUserLoggedIn: computed,
      showSplash: computed,
      closeSplash: action,
    });
  }
}

export const Login_Store = new StudentData();
