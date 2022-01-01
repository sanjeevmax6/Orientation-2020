import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Game from '../../screens/game';
import QuestionScreen from '../../screens/game/questionScreen';
import {GAME_Store} from '../../mobx/gameStore';
import {observer} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IS_GAME_START} from '../../utils/STORAGE_KEYS';
import LeaderboardScreen from '../../screens/game/leaderBoard';

const stack = createNativeStackNavigator();

AsyncStorage.getItem(IS_GAME_START).then(val => {
  if (val === 'true') GAME_Store.setOnPressStartGame(true);
  else GAME_Store.setOnPressStartGame(false);
});

const GameNavigator = observer(() => {
  return (
    <stack.Navigator>
      {GAME_Store.getOnPressStartGame && GAME_Store.getStartGame ? (
        <>
          <stack.Screen
            name="QuestionScreen"
            component={QuestionScreen}
            options={{
              animation: 'slide_from_right',
              headerShown: false,
              header: props => <Header props={props} title="Mystery Hunt" />,
            }}
          />
        </>
      ) : (
        <>
          <stack.Screen
            name="Game"
            component={Game}
            options={{
              animation: 'slide_from_right',
              headerShown: false,
              header: props => <Header props={props} title="Mystery Hunt" />,
            }}
          />
        </>
      )}
      <stack.Screen
        name="LeaderboardScreen"
        component={LeaderboardScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} title="Mystery Hunt" />,
        }}
      />
    </stack.Navigator>
  );
});

export default GameNavigator;
