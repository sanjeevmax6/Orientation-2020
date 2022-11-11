import React, {useState, useRef, useEffect} from 'react';
import ErrorScreen from '../../components/errorScreen';
import SuccessScreen from '../../components/successScreen';
import {FEEDBACK_STORE} from '../../mobx/feedbackStore';
import LoaderPage from '../LoadingScreen';
import {observer} from 'mobx-react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {PostFeedback} from './API_CALLS';
import { INVALID_FEEDBACK } from '../../utils/ERROR_MESSAGES';

const FeedbackScreen = observer(({navigation}) => {
  const onPressHandler =  () => {
    // PostFeedback(feedbackStore.getName,feedbackStore.getDept,feedbackStore.getRollNum,feedbackStore.getMessage);
    // console.log(FEEDBACK_STORE.getSuccess);
    console.log(FEEDBACK_STORE.getMessage.trim()+"bhai")
    if(!FEEDBACK_STORE.getMessage.trim()) {
      FEEDBACK_STORE.setError(true);
      FEEDBACK_STORE.setErrorText(INVALID_FEEDBACK)

    }else {
    PostFeedback();
    }
  };
  
  return (
    <>
      {FEEDBACK_STORE.isLoading ? (
      <LoaderPage navigation={navigation} />) : (
      <>
        {FEEDBACK_STORE.getError ? (
          <ErrorScreen
          navigation="show"
          errorMessage={FEEDBACK_STORE.getErrorText}
          // useOnlyFn={true}
          fn={()=>{
            navigation = {navigation}
            FEEDBACK_STORE.reset();
          }}
          />
        ) : (
          <>
            {FEEDBACK_STORE.getSuccess ? (
              <SuccessScreen
              navigation="show"
              buttonText='Home'
              useOnlyFn={true}
              fn={() => {
                navigation = navigation.goBack();
                FEEDBACK_STORE.reset();
              }}
              />
            ) : (
              <>
                <SafeAreaView>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => {
                      FEEDBACK_STORE.setMessage(text);
                    }}
                    placeholder="Message"
                    // value={message}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={onPressHandler}>
                    <Text>Press Here</Text>
                  </TouchableOpacity>
                </SafeAreaView>
              </>
            )}
          </>
        )}
      </>
      )}
    </>
  );
});

const styles = StyleSheet.create({

});

export default FeedbackScreen;
