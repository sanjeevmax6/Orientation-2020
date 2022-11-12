import React, {useState} from 'react';
import {Layout} from '@ui-kitten/components';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import {paddingSmall} from '../../utils/UIConstants';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';
import {contactsStore} from '../../mobx/contactsStore';
import FoodCard from '../../components/food-contact-card';
import TransportationCard from '../../components/transportation-contact-card';
import {observer} from 'mobx-react';
import {Dimensions} from 'react-native';
import {useCallback} from 'react';
import {getContacts} from './API_CALLS';
import LoaderPage from '../LoadingScreen';
import {White} from '../../utils/colors';
const windowHeight = Dimensions.get('window').height;
const footer = () => {
  return <View style={{height: verticalScale(10)}} />;
};

const Food = observer(({navigation}) => {
  const food = contactsStore.state.categories2;
  const transportation = contactsStore.state.categories3;
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    contactsStore.setError(false);
    contactsStore.setErrorText('');
    contactsStore.setIsFoodLoading(true);
    contactsStore.setIsTransportationLoading(true);
    getContacts(navigation);
    setRefreshing(false);
  }, []);
  return (
    <>
      {contactsStore.state.isFoodLoading &&
      contactsStore.state.isTransportationLoading ? (
        <LoaderPage navigation={navigation} />
      ) : (
        <View style={{flex: 1, backgroundColor: White}}>
          <TransportationCard />
          <FoodCard />
        </View>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  menuGroup: {
    marginHorizontal: scale(paddingSmall),
    marginVertical: verticalScale(paddingSmall),
    backgroundColor: 'whitesmoke',
    height: verticalScale(40),
    elevation: moderateScale(5),
  },
  container: {
    flex: 1,
  },
});
export default Food;
