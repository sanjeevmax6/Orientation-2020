import React, {useRef, useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {Layout, Text, Tab, TabView, Icon} from '@ui-kitten/components';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import {BlueNavy, iconColor} from '../../utils/colors';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Carousel from 'react-native-snap-carousel';
import CarouselCardItem, {ITEM_WIDTH, SLIDER_WIDTH} from './CarouselCardItem';
import magazineData from '../../utils/magazineData';
import symposiumData from '../../utils/symposiumData';
const Height = Dimensions.get('window').height;

const MagazineAndSymposium = () => {
  const isCarousel = useRef(null);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const shouldLoadComponent = index => index === selectedIndex;

  const BellIcon = props => (
    <Icon
      name="award-outline"
      fill={iconColor}
      style={{height: verticalScale(25), width: scale(25)}}
    />
  );
  const BookIcon = props => (
    <Icon
      name="book-open-outline"
      fill={iconColor}
      style={{height: verticalScale(25), width: scale(25)}}
    />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1}}>
        <TabView
          selectedIndex={selectedIndex}
          shouldLoadComponent={shouldLoadComponent}
          swipeEnabled={false}
          onSelect={index => setSelectedIndex(index)}>
          <Tab title="MAGAZINES" icon={BookIcon} style={styles.tabheader}>
            <Layout style={styles.tabcontainer}>
              <View style={{marginTop: Height / 9}}>
                <Carousel
                  layout="stack"
                  layoutCardOffset={9}
                  ref={isCarousel}
                  data={magazineData}
                  renderItem={CarouselCardItem}
                  sliderWidth={SLIDER_WIDTH}
                  itemWidth={ITEM_WIDTH}
                  inactiveSlideShift={0}
                  useScrollView={true}
                />
              </View>
            </Layout>
          </Tab>
          <Tab title="SYMPOSIUMS" icon={BellIcon} style={styles.tabheader}>
            <Layout style={styles.tabcontainer}>
              <View style={{marginTop: Height / 9}}>
                <Carousel
                  layout="tinder"
                  layoutCardOffset={9}
                  ref={isCarousel}
                  data={symposiumData}
                  renderItem={CarouselCardItem}
                  sliderWidth={SLIDER_WIDTH}
                  itemWidth={ITEM_WIDTH}
                  inactiveSlideShift={0}
                  useScrollView={true}
                />
              </View>
            </Layout>
          </Tab>
        </TabView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabheader: {
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabcontainer: {
    height: Height,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default MagazineAndSymposium;
