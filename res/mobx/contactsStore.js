import {action, computed, makeObservable, observable} from 'mobx';
import Set from 'sorted-set';

class ContactsStore {
  state = {
    isOrientationLoading: true,
    isAdminLoading: true,
    orientationData: [],
    adminData: [],
    categories: [],
    isLoading: true,
    hasErrorOccurred: false,
    errorText: '',
  };

  setLoading = value => {
    this.state.isLoading = value;
  };
  setErrorText = value => {
    this.state.errorText = value;
  };
  setError = value => {
    this.state.hasErrorOccurred = value;
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

  get isLoading() {
    return this.state.isLoading;
  }

  get ErrorStatus() {
    return this.state.hasErrorOccurred;
  }
  get getErrorText() {
    return this.state.errorText;
  }
  constructor() {
    makeObservable(this, {
      state: observable,

      setIsOrientationLoading: action,
      setIsAdminLoading: action,
      setOrientationData: action,
      setAdminData: action,
      setLoading: action,
      setError: action,
      setErrorText: action,

      isLoading: computed,
      ErrorStatus: computed,
      getErrorText: computed,
    });
  }
}

export const contactsStore = new ContactsStore();
