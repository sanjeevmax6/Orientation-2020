import {action, computed, makeObservable, observable} from 'mobx';
import Set from 'sorted-set';

class ContactsStore {
  state = {
    isOrientationLoading: true,
    isAdminLoading: true,
    isTransportationLoading: true,
    isFoodLoading: true,
    orientationData: [],
    adminData: [],
    transportationData: [],
    foodData: [],
    categories: [],
    categories2: [],
    categories3: [],
    categories4: [],
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

  setIsTransportationLoading = isLoading => {
    this.state.isTransportationLoading = isLoading;
  };

  setIsFoodLoading = isLoading => {
    this.state.isFoodLoading = isLoading;
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

  setTransportationData = data => {
    this.state.transportationData = data;
    const set2 = new Set();
    data.forEach(element => {
      set2.add(element);
    });
    this.state.categories2 = set2.slice();
  };

  setFoodData = data => {
    this.state.foodData = data;
    const set3 = new Set();
    data.forEach(element => {
      set3.add(element);
    });
    this.state.categories3 = set3.slice();
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
      setIsTransportationLoading: action,
      setIsFoodLoading: action,
      setOrientationData: action,
      setAdminData: action,
      setTransportationData: action,
      setFoodData: action,
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
