import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ContactCard from '../../components/contact-card';
import {observer} from 'mobx-react';
import {contactsStore} from '../../mobx/contactsStore';
import {Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height;
const footer = () => {
  return <View style={{height: windowHeight / 4}} />;
};
const Orientation = observer(() => {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListFooterComponent={footer}
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
