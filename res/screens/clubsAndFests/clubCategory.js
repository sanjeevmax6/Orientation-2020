import React from 'react';
import {Text, SafeAreaView, View, StyleSheet, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ClubCard from '../../components/club-card';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  fontSizeBig,
  fontSizeVeryLarge,
  paddingMedium,
  paddingSmall,
} from '../../utils/UIConstants';

const ClubCategory = ({categoryName, clubList}) => {
  return (
    <View>
      <Text style={styles.textLabel}>
        {categoryName}
        {': '}
      </Text>
      <View style={styles.clubContainer}>
        <FlatList
          horizontal
          data={clubList}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <ClubCard
              clubName={item.name}
              url={item.imageUrl}
              description={item.description}
              LinkedIn={item.LinkedIn}
              website={item.website}
              Youtube={item.Youtube}
              Instagram={item.Instagram}
              Medium={item.Medium}
              Facebook={item.Facebook}
            />
          )}
        />
      </View>
    </View>
  );
};

export default ClubCategory;

const styles = StyleSheet.create({
  clubContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textLabel: {
    fontSize: scale(fontSizeVeryLarge),
    paddingLeft: scale(paddingMedium),
    paddingBottom: verticalScale(paddingSmall),
    paddingTop: verticalScale(paddingSmall),
  },
});
