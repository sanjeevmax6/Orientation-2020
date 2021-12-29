import {action, makeObservable, observable, computed} from 'mobx';

class GameData {
  state = {
    startGame: false,
  };

  setStartGame = val => {
    this.state.startGame = val;
  };

  get getStartGame() {
    return this.state.startGame;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setStartGame: action,
      getStartGame: computed,
    });
  }
}

export const GAME_Store = new GameData();
