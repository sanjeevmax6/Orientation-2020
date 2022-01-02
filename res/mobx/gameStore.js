import {action, makeObservable, observable, computed} from 'mobx';

class GameData {
  state = {
    startGame: false,
    onPressStartGame: false, //when user presses start game
    leader: false,
    leaderAPISuccess: false,
    roundInfo: null,
    currentTime: null,
  };

  setLinks = data => {
    this.state.roundInfo = data;
  };

  get getLinks() {
    return this.state.roundInfo;
  }

  setStartGame = val => {
    this.state.startGame = val;
  };

  get getStartGame() {
    return this.state.startGame;
  }

  setOnPressStartGame = val => {
    this.state.onPressStartGame = val;
  };

  get getOnPressStartGame() {
    return this.state.onPressStartGame;
  }

  setLeader = val => {
    this.state.leader = val;
  };

  get getLeader() {
    return this.state.leader;
  }

  setLeaderAPISuccess = val => {
    this.state.leaderAPISuccess = val;
  };

  get getLeaderAPISuccess() {
    return this.state.leaderAPISuccess;
  }

  setCurrentTime = val => {
    this.state.currentTime = val;
  };

  get getCurrentTime() {
    return this.state.currentTime;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setStartGame: action,
      getStartGame: computed,

      setOnPressStartGame: action,
      getOnPressStartGame: computed,

      setLinks: action,
      setLeader: action,
      getLeader: computed,

      setLeaderAPISuccess: action,
      getLeaderAPISuccess: computed,

      setCurrentTime: action,
      getCurrentTime: computed,

      setLinks: action,
      getLinks: computed,
    });
  }
}

export const GAME_Store = new GameData();
