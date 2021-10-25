import { Card } from '@ui-kitten/components';
import React from 'react';
import {ImageBackground, StyleSheet, View,Text} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import {} from 'react-native-ui-kitten';
import { Black, Grey, White, Yellow } from '../utils/colors';
import { borderRadiusLarge, fontSizeBig, fontSizeMedium, fontSizeSmall, paddingMedium } from '../utils/UIConstants';

const ClubCard=()=>{
    return(
        <>
        <Card style={styles.card}>
            <View style={{height:verticalScale(70),margin:verticalScale(-15),backgroundColor:White}}>
            <ImageBackground source={require('../assets/spider.png')} resizeMode='repeat' style={styles.image}>

            </ImageBackground>
            </View>
            <View style={styles.imageContainer}>
                <Card style={styles.circle}>
                <View style={{marginLeft:scale(-24),marginTop:scale(-14),backgroundColor:White}}>
                    <ImageBackground source={require('../assets/spider1.jpg')} resizeMode='cover' style={styles.image2}>

                    </ImageBackground>
                    </View>
                </Card>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',margin:scale(10)}}>
                <Text style={styles.name}>Spider R&D Club</Text>
            </View>
            <View style={{justifyContent:'center',marginTop:scale(-5)}}>
                <Text style={styles.description}>It is research and development club of NIT Trichy. It has four domains:App Dev,Web Dev,Tronix,Algos.</Text>
            </View>
        </Card>
        </>
    );
};

const styles=StyleSheet.create({
    card:{
        borderRadius:borderRadiusLarge,
        backgroundColor:Yellow,
        marginTop:verticalScale(0),
        alignItems:'center',
        overflow:'hidden',
        marginLeft:scale(paddingMedium),
        borderWidth:3,
        height:verticalScale(220),
        width:scale(190),
    },
    image:{
        width:scale(190),
        height:verticalScale(70),
    },
    image2:{
        height:verticalScale(70),
        width:scale(70),
    },
    imageContainer:{
        height:verticalScale(70),
        marginTop:verticalScale(-20),
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    circle :{
        height : verticalScale(70) ,
        width :scale(70),
        borderRadius: scale(1000),
        borderWidth:scale(3),
    },
    name:{
        fontSize:fontSizeBig,
    },
    description:{
        fontSize:fontSizeSmall,
    },
});

export default ClubCard;