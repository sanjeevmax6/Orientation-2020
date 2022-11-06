import React, {useCallback, useState} from 'react';
import {RefreshControl, StyleSheet} from 'react-native';
import {View} from 'react-native';
import {FlatList} from 'react-native';
import ContactCard from '../../components/other-contact-card';
import {observer} from 'mobx-react';
import {contactsStore} from '../../mobx/contactsStore';
import {Dimensions} from 'react-native';
import LoaderPage from '../LoadingScreen';
import {getContacts} from './API_CALLS';
import {verticalScale} from 'react-native-size-matters';
const windowHeight = Dimensions.get('window').height;
const footer = () => {
  return <View style={{height: verticalScale(10)}} />;
};
const Food = observer(({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    contactsStore.setError(false);
    contactsStore.setErrorText('');
    contactsStore.setIsFoodLoading(true);
    getContacts(navigation);
    setRefreshing(false);
  }, []);
  return (
    <>
      {contactsStore.state.isFoodLoading ? (
        <LoaderPage navigation={navigation} />
      ) : (
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListFooterComponent={footer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={contactsStore.state.foodData.slice()}
            renderItem={({item}) => <ContactCard item={item} />}
            numColumns={1}
          />
        </View>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
export default Food;
