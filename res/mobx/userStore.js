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
  };

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
  constructor() {
    makeObservable(this, {
      state: observable,
      setToken: action,
      setDepartment: action,
      setName: action,
      setRollNo: action,

      token: computed,
      userName: computed,
      userDepartment: computed,
      userRollNo: computed,
    });
  }
}

export const UserData = new User_Data();
