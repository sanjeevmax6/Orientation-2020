import React from 'react';
import { Dimensions, Image, Text,StyleSheet, View } from 'react-native';
import { styles } from 'react-native-element-textinput/src/TextInput/styles';
import { scale, verticalScale } from 'react-native-size-matters';
import { White } from '../../utils/colors';
import { borderRadius } from '../../utils/UIConstants';

export const SLIDER_WIDTH=Dimensions.get('window').width+80;
export const ITEM_WIDTH=Math.round(SLIDER_WIDTH*0.7);

const CarouselCardItem = ({item,index})=>{
    return(
        <View style={styless.container} key={index}>
            <Image source={{uri:item.imgUrl}}
            resizeMode='stretch'
            style={styless.image}
            />
            <Text style={styless.header}>{item.title}</Text>
            <Text style={styless.body}>{item.body}</Text>
        </View>
    );
};

const styless= StyleSheet.create({
    container:{
        backgroundColor:White,
        borderRadius:borderRadius,
        width:ITEM_WIDTH,
        paddingBottom:verticalScale(20),
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:3,
        },
        shadowOpacity:0.29,
        shadowRadius:4.65,
        elevation:7,
    },
    image:{
        width:ITEM_WIDTH,
        height:verticalScale(300),
    },
    header:{
        color:"#222",
        fontSize:28,
        fontWeight:'bold',
        paddingLeft:scale(20),
        paddingTop:scale(20),
    },
    body:{
        color:"#222",
        fontSize:18,
        paddingLeft:scale(20),
        paddingRight:scale(20),
        paddingTop:scale(20),
    },
});

export default CarouselCardItem;