import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-element-textinput';
import {
  fontSizeBig,
  fontSizeVeryLarge,
  paddingMedium,
  paddingSmall,
} from '../../utils/UIConstants';
import {scale, verticalScale} from 'react-native-size-matters';
import {Black} from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';

const AdminScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ImageUrl, setImageUrl] = useState('');
  const [RedirectLink, setRedirectLink] = useState('');

  const submit = () => {};

  return (
    <ScrollView style={{}}>
      <TextInput
        value={title}
        style={styles.input1}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholder="Title"
        placeholderTextColor="gray"
        onChangeText={text => {
          setTitle(text);
        }}
        focusColor="black"
      />
      <TextInput
        value={description}
        style={styles.input1}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholder="Description"
        placeholderTextColor="gray"
        onChangeText={text => {
          setDescription(text);
        }}
        focusColor="black"
      />
      <TextInput
        value={ImageUrl}
        style={styles.input1}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholder="Image URL"
        placeholderTextColor="gray"
        onChangeText={text => {
          setImageUrl(text);
        }}
        focusColor="black"
      />
      <TextInput
        value={RedirectLink}
        style={styles.input1}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholder="Redirect Link"
        placeholderTextColor="gray"
        onChangeText={text => {
          setRedirectLink(text);
        }}
        focusColor="black"
      />
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '500',
            textTransform: 'uppercase',
            fontSize: scale(12),
          }}>
          Users will be redirected to this link
        </Text>
      </View>
      <View style={{elevation: 15}}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          locations={[0, 0.6, 0.8]}
          colors={['#f13e4d', '#ff5130', '#ff512f']}
          style={{
            padding: scale(9),
            paddingRight: scale(18),
            marginTop: verticalScale(40),
            borderRadius: scale(24),
            marginBottom: verticalScale(28),
            width: scale(150),

            alignSelf: 'center',
          }}>
          <TouchableOpacity style={{}} onPress={submit}>
            <View style={{width: scale(9)}} />

            <Text
              style={{
                fontSize: scale(18),
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  input1: {
    marginHorizontal: paddingMedium,
    marginTop: paddingSmall,
    borderWidth: scale(1),
    height: verticalScale(55),
    paddingHorizontal: scale(8),
    borderRadius: scale(8),
  },
  inputStyle: {fontSize: scale(fontSizeBig), color: 'black'},
  labelStyle: {fontSize: scale(fontSizeBig)},

  title: {
    marginTop: verticalScale(paddingSmall),
    paddingVertical: scale(paddingSmall),
    color: Black,
    paddingLeft: scale(paddingMedium),
    fontSize: scale(fontSizeVeryLarge),
    fontWeight: 'bold',
  },
});
