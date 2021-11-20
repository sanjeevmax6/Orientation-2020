import {action, makeObservable, observable, computed} from 'mobx';

class SymposiumModal {
  state = {
    showModal: false,
    clubName: '',
    url: '',
    description: '',
    website: '',
    LinkedIn: '',
    Youtube: '',
    Instagram: '',
    Medium: '',
    Facebook: '',
  };

  openModal = () => {
    this.state.showModal = true;
  };
  closeModal = () => {
    this.state.showModal = false;
  };

  setClubName = name => {
    this.state.clubName = name;
  };
  setUrl = url => {
    this.state.url = url;
  };
  setDescription = description => {
    this.state.description = description;
  };
  setWebsite = website => {
    this.state.website = website;
  };
  setLinkedIn = LinkedIn => {
    this.state.LinkedIn = LinkedIn;
  };
  setYoutube = Youtube => {
    this.state.Youtube = Youtube;
  };
  setInstagram = Instagram => {
    this.state.Instagram = Instagram;
  };
  setMedium = Medium => {
    this.state.Medium = Medium;
  };
  setFacebook = Facebook => {
    this.state.Facebook = Facebook;
  };

  get ModalState() {
    return this.state.showModal;
  }

  get ClubName() {
    return this.state.clubName;
  }
  get Url() {
    return this.state.url;
  }
  get Description() {
    return this.state.description;
  }
  get Website() {
    return this.state.website;
  }
  get LinkedIn() {
    return this.state.LinkedIn;
  }
  get Youtube() {
    return this.state.Youtube;
  }
  get Instagram() {
    return this.state.Instagram;
  }
  get Medium() {
    return this.state.Medium;
  }
  get Facebook() {
    return this.state.Facebook;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      ModalState: computed,
      openModal: action,
      closeModal: action,
      setClubName: action,
      setDescription: action,
      setFacebook: action,
      setInstagram: action,
      setLinkedIn: action,
      setMedium: action,
      setUrl: action,
      setWebsite: action,
      setYoutube: action,

      ModalState: computed,
      ClubName: computed,
      Url: computed,
      Description: computed,
      Website: computed,
      LinkedIn: computed,
      Youtube: computed,
      Instagram: computed,
      Medium: computed,
      Facebook: computed,
    });
  }
}

export const Symp_Modal_Store = new SymposiumModal();
