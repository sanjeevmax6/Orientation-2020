import {action, makeObservable, observable, computed} from 'mobx';

class GameData {
  state = {
    startGame: true,
    onPressStartGame: false, //when user presses start game
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

  constructor() {
    makeObservable(this, {
      state: observable,

      setStartGame: action,
      getStartGame: computed,

      setOnPressStartGame: action,
      getOnPressStartGame: computed,
    });
  }
}

export const GAME_Store = new GameData();
