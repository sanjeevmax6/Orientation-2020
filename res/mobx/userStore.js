import {action, makeObservable, observable, computed} from 'mobx';

// import { UserData } from '../..///';
// then call UserData.setDepartment("Banana") to set
// UserData.userDepartment // to get the Department

class User_Data {
  state = {
    token: '',
    rollNo: '',
    name: '',
    department: '',
    admin: '',
    firebaseToken: '',
    baseurl: '',
    fail: false,
    errorMessage: '',
  };

  setFireBaseToken = value => {
    this.state.firebaseToken = value;
  };

  get getFireBaseToken() {
    return this.state.firebaseToken;
  }

  setToken = userToken => {
    this.state.token = userToken;
  };

  setName = userName => {
    this.state.name = userName;
  };
  setDepartment = userDepartment => {
    this.state.department = userDepartment;
  };
  setRollNo = userRollNo => {
    this.state.rollNo = userRollNo;
  };

  setAdmin = bool => {
    this.state.admin = bool;
  };

  setBaseUrl = url => {
    this.state.baseurl = url;
  };

  setFailState = value => {
    this.state.fail = value;
  };

  setErrorText = value => {
    this.state.errorMessage = value;
  };

  get token() {
    return this.state.token;
  }
  get userName() {
    return this.state.name;
  }
  get userDepartment() {
    return this.state.department;
  }
  get userRollNo() {
    return this.state.rollNo;
  }
  get getIsAdmin() {
    return this.state.admin;
  }
  get getBaseUrl() {
    return this.state.baseurl;
  }

  get getFailState() {
    return this.state.fail;
  }

  get getErrorText() {
    return this.state.errorMessage;
  }

  resetStore = () => {
    this.state.fail = false;
    this.state.errorMessage = '';
  };

  constructor() {
    makeObservable(this, {
      state: observable,
      setToken: action,
      setDepartment: action,
      setName: action,
      setRollNo: action,
      setAdmin: action,
      setBaseUrl: action,
      setFailState: action,
      setErrorText: action,

      token: computed,
      userName: computed,
      userDepartment: computed,
      userRollNo: computed,
      getIsAdmin: computed,

      setFireBaseToken: action,
      getFireBaseToken: computed,

      getFailState: computed,
      getErrorText: computed,
    });
  }
}

export const UserData = new User_Data();
