import React, {useRef, useState, useEffect} from 'react';
import {Layout, Icon, Card} from '@ui-kitten/components';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  RefreshControl,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polygon} from 'react-native-maps';
import Label, {Orientation} from 'react-native-label';

import * as Coordinates from '../../utils/coordinates';
import * as Colors from '../../utils/colors';
import Carousel from 'react-native-snap-carousel';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  borderRadiusLarge,
  fontSizeMedium,
  paddingMedium,
  paddingSmall,
  iconSmall,
  fontSizeSmall,
  FONT,
} from '../../utils/UIConstants';
import {API_GET_MAP_DATA} from '../../utils/APIConstants';
import NetInfo from '@react-native-community/netinfo';
import ErrorScreen from '../../components/errorScreen';
import {UserData} from '../../mobx/userStore';
import * as ERRORS from '../../utils/ERROR_MESSAGES';
import LoaderPage from '../LoadingScreen';
import axios from 'axios';

const carouselCardDimension = 175;
const categoryCardDimension = 55;
const mapStyle = Coordinates.customMapStyle;

const VirtualMap = ({navigation}) => {
  const _map = useRef();
  const _carousel = useRef();

  const [isLoading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isConnected, setConnectivity] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  //Response Data
  const [data, setData] = useState([]);
  const [places, setPlaces] = useState([]);
  const [zero, setZero] = useState(0);
  var general = [];
  var department = [];
  var hostel = [];
  var foodAndSports = [];

  const handleAPICALL = () => {
    var url = UserData.getBaseUrl + API_GET_MAP_DATA;
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        setConnectivity(true);
        setLoading(true);
        axios
          .get(
            url,
            // Token from Mobux
            {headers: {token: UserData.token}},
          )
          .then(response => {
            setLoading(false);
            setSuccess(true);
            console.log('Virtual Map API Success');
            console.log(response.data);
            setData(response.data);
            setPlaces(response.data.General);
          })
          .catch(error => {
            console.log(error);
            if (error.response) {
              console.log(error.response);
              setLoading(false);
              setSuccess(false);
              setErrorText(error.response.data.message);
            } else if (error.request) {
              console.log(error.request);
              setLoading(false);
              setSuccess(false);
              setErrorText(ERRORS.TIME_OUT);
            } else {
              console.log(error);
              setLoading(false);
              setSuccess(false);
              setErrorText(ERRORS.UNEXPECTED);
            }
          });
      } else {
        setSuccess(false);
        setConnectivity(false);
        setErrorText(ERRORS.NO_NETWORK);
      }
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoading(false);
    setSuccess(false);
    handleAPICALL();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    handleAPICALL();
  }, []);

  if (isLoading == false) {
    general = data.General;
    department = data.departments;
    hostel = data.hostels;
    foodAndSports = data.Sport_and_Food;
  }

  const [markers, setMarkers] = useState([]);
  const [choice, setChoice] = useState(0);
  const [choiceNames, setChoiceNames] = useState([
    'General',
    'Dept',
    'Hostel',
    'S&F',
  ]);
  const [choiceColors, setChoiceColors] = useState([
    '#2f6bcd',
    '#f59838',
    '#78b349',
    '#6c388b',
  ]);

  const onCarouselItemChange = index => {
    let location = places[index];
    //Entire Campus will be seen
    if (location.name === 'NITT Campus') {
      var lat = 10.7555;
      var long = 78.82;
      var latDelta = 0.04;
      var longDelta = 0.0009;
    } else {
      var lat = location.coordinates[0];
      var long = location.coordinates[1];
      var latDelta = 0.0025;
      var longDelta = 0.0025;
    }

    _map.current.animateToRegion({
      latitude: lat,
      longitude: long + 0.00027,
      latitudeDelta: latDelta,
      longitudeDelta: longDelta,
    });

    markers[index].showCallout();
  };

  const onMarkerPressed = (location, index) => {
    //Entire Campus will be seen
    if (location.name == 'NITT Campus') {
      var lat = 10.7555;
      var long = 78.82;
      var latDelta = 0.04;
      var longDelta = 0.0009;
    } else {
      var lat = location.coordinates[0];
      var long = location.coordinates[1];
      var latDelta = 0.0025;
      var longDelta = 0.0025;
    }
    _map.current.animateToRegion({
      latitude: lat,
      longitude: long + 0.0003,
      latitudeDelta: latDelta,
      longitudeDelta: longDelta,
    });
    _carousel.current.snapToItem(index);
  };

  const renderCarouselItem = ({item}) => (
    <Label
      orientation={Orientation.TOP_RIGHT}
      containerStyle={styles.cardContainer}
      style={{
        fontSize: scale(fontSizeSmall - 5),
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      title={choiceNames[choice]}
      color={choiceColors[choice]}
      distance={scale(20)}>
      <View style={styles.cardContainer}>
        <Image
          style={styles.cardImage}
          //Change during API Integration
          source={{
            uri: item.imgUrl,
          }}
        />
        <View style={styles.cardTitleContainer}>
          <Text numberOfLines={2} style={styles.cardTitleFont}>
            {item.name}
          </Text>
        </View>
      </View>
    </Label>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1}}>
        {isConnected == false ? (
          //No Internet
          <ErrorScreen errorMessage={errorText} navigation={navigation} />
        ) : isLoading ? (
          <LoaderPage navigation={navigation} />
        ) : success ? (
          <ScrollView
            contentContainerStyle={StyleSheet.absoluteFillObject}
            showsVerticalScrollIndicator={false}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
          >
            <MapView
              ref={_map}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              customMapStyle={mapStyle}
              initialRegion={Coordinates.initialRegion}
              showsPointsOfInterest={false}
              showsTraffic={false}
              showsIndoors={false}>
              <Polygon
                coordinates={Coordinates.mapBoundaries}
                fillColor={Colors.mapNittRegion}
                strokeWidth={1.5}
              />
              {places.map((marker, index) => (
                <Marker
                  provider={PROVIDER_GOOGLE}
                  key={marker.name}
                  ref={ref => (markers[index] = ref)}
                  onPress={() => onMarkerPressed(marker, index)}
                  coordinate={{
                    latitude: marker.coordinates[0],
                    longitude: marker.coordinates[1],
                  }}
                  title={marker.name}>
                  <Icon
                    name={marker.icon}
                    style={styles.icon}
                    pack="FontAwesome5"
                  />
                </Marker>
              ))}
            </MapView>
            <View style={styles.dashBoard}>
              <View style={styles.categoryCardsContainer}>
                <Card
                  style={styles.categoryCards}
                  onPress={() => {
                    if (choice == 0) {
                    } else {
                      _map.current.animateToRegion({
                        latitude: 10.7555,
                        longitude: 78.82 + 0.00027,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.0009,
                      });
                      setChoice(0);
                      setPlaces(general);
                      _carousel.current.snapToItem(0);
                    }
                  }}>
                  <ImageBackground
                    source={require('../../assets/images/card1.jpg')}
                    style={{
                      height: verticalScale(categoryCardDimension),
                      width: scale(categoryCardDimension),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="building"
                        style={styles.categoryIcons}
                        pack="FontAwesome5"
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.categoryText}>General</Text>
                    </View>
                  </ImageBackground>
                </Card>
                <Card
                  style={styles.categoryCards}
                  onPress={() => {
                    if (choice == 1) {
                    } else {
                      setChoice(1);
                      setPlaces(department);
                      _carousel.current.snapToItem(0);
                    }
                  }}>
                  <ImageBackground
                    source={require('../../assets/images/card2.jpg')}
                    style={{
                      height: verticalScale(categoryCardDimension),
                      width: scale(categoryCardDimension),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="school"
                        style={styles.categoryIcons}
                        pack="FontAwesome5"
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.categoryText}>Dept</Text>
                    </View>
                  </ImageBackground>
                </Card>
                <Card
                  style={styles.categoryCards}
                  onPress={() => {
                    if (choice == 2) {
                    } else {
                      setChoice(2);
                      setPlaces(hostel);
                      setZero(0);
                      _carousel.current.snapToItem(0);
                    }
                  }}>
                  <ImageBackground
                    source={require('../../assets/images/card3.jpg')}
                    style={{
                      height: verticalScale(categoryCardDimension),
                      width: scale(categoryCardDimension),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="house-user"
                        style={styles.categoryIcons}
                        pack="FontAwesome5"
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.categoryText}>Hostel</Text>
                    </View>
                  </ImageBackground>
                </Card>
                <Card
                  style={styles.categoryCards}
                  onPress={() => {
                    if (choice == 3) {
                    } else {
                      setChoice(3);
                      setPlaces(foodAndSports);
                      setZero(0);
                      _carousel.current.snapToItem(0);
                    }
                  }}>
                  <ImageBackground
                    source={require('../../assets/images/card4.jpg')}
                    style={{
                      height: verticalScale(categoryCardDimension),
                      width: scale(categoryCardDimension),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="utensils"
                        style={[
                          styles.categoryIcons,
                          {marginRight: scale(paddingSmall / 4)},
                        ]}
                        pack="FontAwesome5"
                      />
                      <Icon
                        name="baseball-ball"
                        style={[
                          styles.categoryIcons,
                          {marginLeft: scale(paddingSmall / 4)},
                        ]}
                        pack="FontAwesome5"
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.categoryText}>Sport & Food</Text>
                    </View>
                  </ImageBackground>
                </Card>
              </View>
              <Carousel
                ref={_carousel}
                data={places}
                renderItem={renderCarouselItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={scale(carouselCardDimension + paddingSmall)}
                containerCustomStyle={styles.carousel}
                onSnapToItem={index => onCarouselItemChange(index)}
                removeClippedSubviews={false}
              />
            </View>
          </ScrollView>
        ) : (
          <ErrorScreen errorMessage={errorText} navigation={navigation} />
        )}
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    //To hide 'Open with Google Maps' Logo
    right: scale(-100),
    top: 0,
    bottom: 0,
    left: 0,
  },
  carousel: {},
  cardContainer: {
    backgroundColor: Colors.cardContainer,
    overflow: 'hidden',
    height: verticalScale(carouselCardDimension),
    width: scale(carouselCardDimension),
    borderRadius: scale(borderRadiusLarge),
  },
  cardImage: {
    height: verticalScale((2 / 3) * carouselCardDimension),
    width: scale(carouselCardDimension),
    borderTopLeftRadius: scale(borderRadiusLarge),
    borderTopRightRadius: scale(borderRadiusLarge),
    opacity: 0.85,
  },
  cardTitleContainer: {
    height: verticalScale((1 / 3) * carouselCardDimension),
    width: scale(carouselCardDimension),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: verticalScale(paddingSmall),
    bottom: 0,
  },
  cardTitleFont: {
    color: Colors.White,
    fontSize: scale(fontSizeMedium),
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: FONT,
  },
  icon: {
    //width: scale(iconMedium - 5),
    height: verticalScale(iconSmall - 2),
    color: Colors.Secondary,
  },
  dashBoard: {
    position: 'absolute',
    bottom: 0,
    marginBottom: verticalScale(paddingMedium),
  },
  categoryCardsContainer: {
    alignItems: 'flex-end',
    padding: scale(paddingSmall),
  },
  categoryCards: {
    marginTop: verticalScale(paddingSmall / 2),
    width: scale(categoryCardDimension),
    height: verticalScale(categoryCardDimension),
    borderRadius: scale(borderRadiusLarge),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.Transparent,
  },
  categoryIcons: {
    //width: scale(iconSmall - 5),
    height: verticalScale(iconSmall - 2),
    color: Colors.White,
  },
  categoryText: {
    paddingHorizontal: scale(5),
    textAlign: 'center',
    fontSize: scale(fontSizeSmall - 2),
    color: Colors.White,
    fontFamily: FONT,
  },
});

export default VirtualMap;
