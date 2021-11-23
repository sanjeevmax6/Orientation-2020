import React from 'react';
import {Layout} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet, View, FlatList} from 'react-native';
import {paddingSmall} from '../../utils/UIConstants';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';
import {contactsStore} from '../../mobx/contactsStore';
import GroupCard from '../../components/admin-group-card';
import {observer} from 'mobx-react';
import {Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height;
const footer = () => {
  return <View style={{height: windowHeight / 4}} />;
};
const Admin = observer(() => {
  const categories = contactsStore.state.categories;
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={styles.container}>
        <FlatList
          ListFooterComponent={footer}
          showsVerticalScrollIndicator={false}
          data={categories}
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
