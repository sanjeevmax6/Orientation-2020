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
import GroupCard from '../../components/admin-group-card';
import {observer} from 'mobx-react';
import {Dimensions} from 'react-native';
import {useCallback} from 'react';
import {getContacts} from './API_CALLS';
const windowHeight = Dimensions.get('window').height;
const footer = () => {
  return <View style={{height: windowHeight / 4}} />;
};
const Admin = observer(({navigation}) => {
  const categories = contactsStore.state.categories;
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    contactsStore.setError(false);
    contactsStore.setErrorText('');
    contactsStore.setIsAdminLoading(true);
    getContacts(navigation);
    setRefreshing(false);
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={styles.container}>
        <FlatList
          ListFooterComponent={footer}
          showsVerticalScrollIndicator={false}
          data={categories}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => <GroupCard category={item} />}
        />
      </Layout>
    </SafeAreaView>
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

export default Admin;
