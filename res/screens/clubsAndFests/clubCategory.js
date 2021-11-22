import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import ClubCard from '../../components/club-card';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  fontSizeVeryLarge,
  paddingMedium,
  paddingSmall,
} from '../../utils/UIConstants';

const FlatListItemSeparator = () => {
  return <View style={{width: verticalScale(paddingMedium)}} />;
};

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
          //disableVirtualization={true}
          ListHeaderComponent={FlatListItemSeparator}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListFooterComponent={FlatListItemSeparator}
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
