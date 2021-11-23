import React, {useCallback, useState} from 'react';
import {RefreshControl, StyleSheet} from 'react-native';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ContactCard from '../../components/contact-card';
import {observer} from 'mobx-react';
import {contactsStore} from '../../mobx/contactsStore';
import {Dimensions} from 'react-native';
import {getContacts} from './API_CALLS';
const windowHeight = Dimensions.get('window').height;
const footer = () => {
  return <View style={{height: windowHeight / 4}} />;
};
const Orientation = observer(({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    contactsStore.setError(false);
    contactsStore.setErrorText('');
    contactsStore.setIsOrientationLoading(true);
    getContacts(navigation);
    setRefreshing(false);
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListFooterComponent={footer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={contactsStore.state.orientationData.slice()}
        renderItem={({item}) => <ContactCard item={item} />}
        numColumns={2}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
export default Orientation;
