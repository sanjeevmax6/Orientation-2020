import React from 'react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {FontAwesome5IconsPack} from './assets/icons/fontAwesome5-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import Navigator from './navigation';
import Status_Bar from './components/status_bar';
import {Observer, Provider} from 'mobx-react';
import {store} from './store';

const App = () => {
  return (
    <Observer>
      {() => (
        <>
          <Status_Bar />
          <IconRegistry icons={[EvaIconsPack, FontAwesome5IconsPack]} />
          <ApplicationProvider {...eva} theme={eva.light}>
            <Navigator />
          </ApplicationProvider>
        </>
      )}
    </Observer>
  );
};

export default App;
