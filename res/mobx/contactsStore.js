import {action, makeObservable, observable} from 'mobx';
import Set from 'sorted-set';

class ContactsStore {
  state = {
    isOrientationLoading: true,
    isAdminLoading: true,
    orientationData: [],
    adminData: [],
    categories: [],
  };

  setIsOrientationLoading = isLoading => {
    this.state.isOrientationLoading = isLoading;
  };

  setIsAdminLoading = isLoading => {
    this.state.isAdminLoading = isLoading;
  };

  setOrientationData = data => {
    this.state.orientationData = data;
  };

  setAdminData = data => {
    this.state.adminData = data;
    const set = new Set();
    data.forEach(element => {
      set.add(element.category);
    });
    this.state.categories = set.slice();
  };

  constructor() {
    makeObservable(this, {
      state: observable,

      setIsOrientationLoading: action,
      setIsAdminLoading: action,
      setOrientationData: action,
      setAdminData: action,
    });
  }
}

export const contactsStore = new ContactsStore();
