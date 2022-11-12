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
import {White} from '../../utils/colors';
const windowHeight = Dimensions.get('window').height;
const footer = () => {
  return <View style={{height: verticalScale(10)}} />;
};
const Transport = observer(({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    contactsStore.setError(false);
    contactsStore.setErrorText('');
    contactsStore.setIsTransportationLoading(true);
    getContacts(navigation);
    setRefreshing(false);
  }, []);
  return (
    <>
      {contactsStore.state.isTransportationLoading ? (
        <LoaderPage navigation={navigation} />
      ) : (
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListFooterComponent={footer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={contactsStore.state.transportationData.slice()}
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
});
export default Transport;
