import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {SafeAreaView, View,StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ClubCard from '../../components/club-card';
import { scale } from 'react-native-size-matters';
import { fontSizeBig, fontSizeVeryLarge, paddingMedium, paddingSmall } from '../../utils/UIConstants';

const ClubsAndFests = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex:1}}>
        <View style={styles.container}>
        <Text style={styles.textLabel}>Clubs :</Text>
        <View style={styles.clubContainer}>
          <ScrollView horizontal={true}
          showsHorizontalScrollIndicator={false}>
            <ClubCard/>
            <ClubCard/>
          </ScrollView>
        </View>
        <Text style={styles.textLabel}>Fests :</Text>
        <View style={styles.clubContainer}>
          <ScrollView horizontal={true}
          showsHorizontalScrollIndicator={false}>
            <ClubCard/>
            <ClubCard/>
          </ScrollView>
        </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

const styles=StyleSheet.create({
  clubContainer: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignContent:'center',
  },
  textLabel:{
    fontSize:fontSizeVeryLarge,
    paddingLeft:paddingMedium,
    paddingBottom:paddingSmall,
    paddingTop:paddingSmall
  },
});

export default ClubsAndFests;
