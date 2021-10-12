import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacityBase,
  View,
  TouchableOpacity,
} from 'react-native';
import {Accent, Grey, Yellow, Black, Coral, BlueNavy} from '../../utils/colors';

const Login = ({route}) => {
  const LoggedIn = route.params.LoggedIn;
  const pressHandler = () => {
    LoggedIn(true);
  };
  const Button1 = ({title}) => {
    return (
      <TouchableOpacity style={styles.button} onPress={pressHandler}>
        <Text style={styles.textButton}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.textInput1}
        placeholder={'Enter Username'}></TextInput>
      <TextInput
        style={styles.textInput2}
        placeholder={'Enter Password'}></TextInput>

      <Button1 title="Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: Grey,
  },
  textInput1: {
    marginTop: 10,
    padding: 10,
    paddingLeft: 20,
    fontSize: 20,
    alignItems: 'center',
    borderWidth: 4,
    borderRadius: 10,
    textAlign: 'left',
    backgroundColor: Yellow,
    color: Black,
  },
  button: {
    marginTop: 10,
    padding: 5,
    marginLeft: 80,
    marginRight: 80,
    paddingLeft: 20,
    fontSize: 20,
    alignItems: 'center',
    borderWidth: 4,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: Accent,
    color: Black,
  },
  textButton: {
    fontSize: 20,
    alignItems: 'center',
    padding: 5,
  },
  textInput2: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingLeft: 20,
    fontSize: 20,
    alignItems: 'center',
    borderWidth: 4,
    borderRadius: 10,
    textAlign: 'left',
    backgroundColor: Coral,
    color: Black,
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: Black,
    borderRadius: 6,
    backgroundColor: BlueNavy,
    color: Black,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Login;
