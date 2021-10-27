import React from 'react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import Navigator from './navigation';
import Status_Bar from './components/status_bar';
const App = () => {
  return (
    <>
      <Status_Bar />
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Navigator />
      </ApplicationProvider>
    </>
  );
};

export default App;
