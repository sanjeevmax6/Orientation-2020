import React, { Component } from "react";
import { scale, verticalScale } from "react-native-size-matters";

import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacityBase,
  View,
  TouchableOpacity,
} from "react-native";

import {
  Accent,
  Grey,
  Yellow,
  Black,
  Coral,
  BlueNavy,
} from "../../utils/colors";
import {
  borderRadius,
  borderWidth,
  fontSizeBig,
  fontSizeMedium,
  fontSizeSmall,
  fontSizeVeryLarge,
  paddingBig,
  paddingMedium,
  paddingSmall,
} from "../../utils/UIConstants";

const Login = ({ route }) => {
  const LoggedIn = route.params.LoggedIn;
  const pressHandler = () => {
    LoggedIn(true);
  };
  const Button1 = ({ title }) => {
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
        placeholder={"Enter Username"}
      ></TextInput>
      <TextInput
        style={styles.textInput2}
        placeholder={"Enter Password"}
      ></TextInput>

      <Button1 title="Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: paddingBig,
    backgroundColor: Grey,
  },
  textInput1: {
    marginTop: verticalScale(paddingSmall),
    paddingLeft: scale(paddingMedium),
    fontSize: scale(fontSizeBig),
    alignItems: "center",
    borderWidth: borderWidth,
    borderRadius: borderRadius,
    textAlign: "left",
    backgroundColor: Yellow,
    color: Black,
  },
  button: {
    marginTop: scale(paddingSmall),
    padding: scale(paddingSmall / 2),
    marginLeft: scale(paddingBig * 2),
    marginRight: scale(paddingBig * 2),
    paddingLeft: scale(paddingSmall),
    fontSize: scale(fontSizeVeryLarge),
    alignItems: "center",
    borderWidth: borderWidth,
    borderRadius: borderRadius,
    textAlign: "center",
    backgroundColor: Accent,
    color: Black,
  },
  textButton: {
    fontSize: scale(fontSizeBig),
    alignItems: "center",
    padding: scale(paddingSmall / 2),
  },
  textInput2: {
    marginTop: verticalScale(paddingSmall),
    marginBottom: verticalScale(paddingSmall),
    paddingLeft: scale(paddingMedium),
    fontSize: scale(fontSizeBig),
    alignItems: "center",
    borderWidth: borderWidth,
    borderRadius: borderRadius,
    textAlign: "left",
    backgroundColor: Coral,
    color: Black,
  },
  title: {
    marginTop: verticalScale(paddingSmall),
    paddingVertical: scale(paddingSmall),
    borderWidth: borderWidth,
    borderColor: Black,
    borderRadius: borderRadius,
    backgroundColor: BlueNavy,
    color: Black,
    textAlign: "center",
    fontSize: scale(fontSizeVeryLarge),
    fontWeight: "bold",
  },
});

export default Login;
