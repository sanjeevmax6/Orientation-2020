import {action, makeObservable, observable, computed} from 'mobx';

class GameData {
  state = {
    startGame: true,
    onPressStartGame: false, //when user presses start game
<<<<<<< HEAD
    leader: false,
    leaderAPISuccess: false,
=======
    roundInfo: [],
>>>>>>> 2b4ac1e (Integrated: Get links API & Added: First two cards)
  };

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

<<<<<<< HEAD
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

=======
  setLinks = data => {
    this.state.roundInfo = data;
  };

>>>>>>> 2b4ac1e (Integrated: Get links API & Added: First two cards)
  constructor() {
    makeObservable(this, {
      state: observable,

      setStartGame: action,
      getStartGame: computed,
      setLinks: action,

      setOnPressStartGame: action,
      getOnPressStartGame: computed,

      setLeader: action,
      getLeader: computed,

      setLeaderAPISuccess: action,
      getLeaderAPISuccess: computed,
    });
  }
}

export const GAME_Store = new GameData();
