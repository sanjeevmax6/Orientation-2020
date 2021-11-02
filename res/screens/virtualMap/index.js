import React, {useRef, useState} from 'react';
import {Layout, Icon, Card} from '@ui-kitten/components';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Polyline,
} from 'react-native-maps';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import * as Coorindates from '../../utils/coordinates';
import * as Colors from '../../utils/colors';
import Carousel from 'react-native-snap-carousel';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  borderRadiusLarge,
  borderRadiusMedium,
  borderRadiusSmall,
  paddingBig,
  fontSizeMedium,
  paddingMedium,
  paddingSmall,
  iconLarge,
  iconMedium,
  iconSmall,
  fontSizeSmall,
} from '../../utils/UIConstants';

const carouselCardDimension = 175;
const categoryCardDimension = 50;
const mapStyle = Coorindates.customMapStyle;

const VirtualMap = () => {
  const _map = useRef();
  const _carousel = useRef();

  const [general, setGeneral] = useState(Coorindates.generalCoordinates);
  const [department, setDepartment] = useState(
    Coorindates.departmentCoordinates,
  );
  const [hostel, setHostel] = useState(Coorindates.hostelCoordinates);

  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState(general);
  const [choice, setChoice] = useState(0);

  // requestLocationPermission = async () => {
  //   if (Platform.OS === 'ios') {
  //     var reponse = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

  //     if (reponse === 'granted') {
  //       locateCurrentPosition();
  //     }
  //   } else {
  //     var reponse = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

  //     if (reponse === 'granted') {
  //       locateCurrentPosition();
  //     }
  //   }
  // };

  // locateCurrentPosition = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       console.log(JSON.stringify(position));
  //     },
  //     {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
  //   );
  // };

  // useEffect(() => {
  //   locateCurrentPosition();
  // });

  const onCarouselItemChange = index => {
    let location = places[index];

    _map.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0025,
      longitudeDelta: 0.0025,
    });

    markers[index].showCallout();
  };

  const onMarkerPressed = (location, index) => {
    _map.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0025,
      longitudeDelta: 0.0025,
    });
    _carousel.current.snapToItem(index);
  };

  const renderCarouselItem = ({item}) => (
    <View style={styles.cardContainer}>
      <Image
        style={styles.cardImage}
        //Change during API Integration
        source={require('../../assets/images/dashboardBackground.png')}
      />
      <View style={styles.cardTitleContainer}>
        <Text style={styles.cardTitleFont}>{item.name}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={styles.container}>
        <MapView
          ref={_map}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={Coorindates.initialRegion}
          showsPointsOfInterest={false}
          showsTraffic={false}
          showsUserLocation={true}
          showsIndoors={false}>
          <Polygon
            coordinates={Coorindates.mapBoundaries}
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
                latitude: marker.latitude,
                longitude: marker.longitude,
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
                if (0 == choice) {
                } else {
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
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.categoryText}>General</Text>
                </View>
              </ImageBackground>
            </Card>
            <Card
              style={styles.categoryCards}
              onPress={() => {
                if (1 == choice) {
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
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.categoryText}>Dept</Text>
                </View>
              </ImageBackground>
            </Card>
            <Card
              style={styles.categoryCards}
              onPress={() => {
                if (2 == choice) {
                } else {
                  setChoice(2);
                  setPlaces(hostel);
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
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.categoryText}>Hostel</Text>
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
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carousel: {},
  cardContainer: {
    backgroundColor: Colors.cardContainer,
    height: verticalScale(carouselCardDimension),
    width: scale(carouselCardDimension),
    borderRadius: scale(borderRadiusLarge),
  },
  cardImage: {
    height: verticalScale((2 / 3) * carouselCardDimension),
    width: scale(carouselCardDimension),
    borderTopLeftRadius: scale(borderRadiusLarge),
    borderTopRightRadius: scale(borderRadiusLarge),
    opacity: 0.7,
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
  },
  icon: {
    //width: scale(iconMedium - 5),
    height: verticalScale(iconSmall),
    color: Colors.Secondary,
  },
  dashBoard: {
    position: 'absolute',
    bottom: 0,
    marginBottom: verticalScale(paddingMedium),
  },
  categoryCardsContainer: {
    padding: scale(paddingSmall),
    alignItems: 'flex-end',
  },
  categoryCards: {
    marginTop: verticalScale(paddingSmall / 2),
    width: scale(categoryCardDimension),
    height: scale(categoryCardDimension),
    borderRadius: scale(borderRadiusLarge),
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcons: {
    width: scale(iconSmall),
    height: verticalScale(iconSmall),
    color: Colors.White,
  },
  categoryText: {
    paddingHorizontal: scale(5),
    textAlign: 'center',
    fontSize: scale(fontSizeSmall - 2),
    color: Colors.White,
  },
});

export default VirtualMap;
