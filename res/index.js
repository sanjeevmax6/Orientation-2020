
import React from 'react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {AppNavigator} from './navigation/navigation.';
import Login from './screens/LoginScreen';
import Navigator from './navigation';

const App = () => {
  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
     <Navigator/>
    </ApplicationProvider>  
    </>
  );
};

export default App;