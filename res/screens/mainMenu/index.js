import React from "react";
import { ScrollView, View, StyleSheet, ImageBackground } from "react-native";
import { Layout, Text, Card, Icon } from "@ui-kitten/components";
import * as Colors from "../../utils/colors";
import { scale, verticalScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native";
import {
  borderRadiusLarge,
  fontSizeBig,
  fontSizeMedium,
  fontSizeSmall,
  paddingLeftMedium,
  paddingLeftSmall,
  paddingRightMedium,
  paddingRightSmall,
} from "../../utils/UIconstants";

const MainMenu = ({ navigation }) => {
  const data = {
    orientationTitle: "Orientation 2021",
    studentName: "XYZ",
    studentRollNo: "106120000",
    studentBranch: "CSE",
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <View style={styles.dashboard}>
          <ImageBackground
            source={require("../../assets/dashboardBackground.png")}
            style={{
              flex: 1,
            }}
            resizeMode="cover"
          >
            <View style={styles.headingContainer}>
              <View style={styles.orientationTitleContainer}>
                <Text style={styles.orientationTitleText}>
                  {data.orientationTitle}
                </Text>
              </View>
              <View style={styles.logoutContainer}>
                <Icon
                  style={styles.iconDashBoard}
                  fill={Colors.DashboardLogo}
                  name="log-out-outline"
                />
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <View style={{ flexDirection: "row" }}>
                <Icon
                  style={styles.iconDashBoard}
                  fill={Colors.DashboardLogo}
                  name="person-outline"
                />
                <ScrollView
                  style={{ height: verticalScale(25), marginLeft: scale(10) }}
                  horizontal={true}
                >
                  <Text style={styles.textDashBoard}>{data.studentName}</Text>
                </ScrollView>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Icon
                  style={styles.iconDashBoard}
                  fill={Colors.DashboardLogo}
                  name="hash-outline"
                />
                <Text style={[styles.textDashBoard, { marginLeft: scale(10) }]}>
                  {data.studentRollNo}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Icon
                  style={styles.iconDashBoard}
                  fill={Colors.DashboardLogo}
                  name="book-outline"
                />
                <ScrollView
                  style={{ height: verticalScale(25), marginLeft: scale(10) }}
                  horizontal={true}
                >
                  <Text style={styles.textDashBoard}>{data.studentBranch}</Text>
                </ScrollView>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.mainMenu}>
          <View style={styles.cardRow}>
            <Card
              style={styles.card1}
              onPress={() => {
                navigation.navigate("Scheduler");
              }}
            >
              <ImageBackground
                source={require("../../assets/card1.jpg")}
                style={{
                  height: verticalScale(130),
                  width: scale(130),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    style={styles.iconMainMenu}
                    fill={Colors.White}
                    name="calendar-outline"
                  />
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={styles.textMainMenu}>Scheduler</Text>
                </View>
              </ImageBackground>
            </Card>
            <Card
              style={styles.card2}
              onPress={() => {
                navigation.navigate("VirtualMap");
              }}
            >
              <ImageBackground
                source={require("../../assets/card2.jpg")}
                style={{
                  height: verticalScale(90),
                  width: scale(130),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    style={styles.iconMainMenu}
                    fill={Colors.White}
                    name="map-outline"
                  />
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={styles.textMainMenu}>Virtual Map</Text>
                </View>
              </ImageBackground>
            </Card>
          </View>

          <View style={styles.cardRow}>
            <Card
              style={styles.card3}
              onPress={() => {
                navigation.navigate("Contacts");
              }}
            >
              <ImageBackground
                source={require("../../assets/card3.jpg")}
                style={{
                  height: verticalScale(90),
                  width: scale(130),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    style={styles.iconMainMenu}
                    fill={Colors.White}
                    name="people-outline"
                  />
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={styles.textMainMenu}>Contacts</Text>
                </View>
              </ImageBackground>
            </Card>
            <Card
              style={styles.card4}
              onPress={() => {
                navigation.navigate("ClubsAndFests");
              }}
            >
              <ImageBackground
                source={require("../../assets/card4.jpg")}
                style={{
                  height: verticalScale(160),
                  width: scale(130),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    style={styles.iconMainMenu}
                    fill={Colors.White}
                    name="bulb-outline"
                  />
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={styles.textMainMenu}>Clubs & Fests</Text>
                </View>
              </ImageBackground>
            </Card>
          </View>

          <View style={styles.cardRow}>
            <Card
              style={styles.card5}
              onPress={() => {
                navigation.navigate("MagazineAndSymposium");
              }}
            >
              <ImageBackground
                source={require("../../assets/card5.jpg")}
                style={{
                  height: verticalScale(140),
                  width: scale(130),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    style={styles.iconMainMenu}
                    fill={Colors.White}
                    name="award-outline"
                  />
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={styles.textMainMenu}>Magazine & Symposium</Text>
                </View>
              </ImageBackground>
            </Card>
            <Card
              style={styles.card6}
              onPress={() => {
                navigation.navigate("Timetable");
              }}
            >
              <ImageBackground
                source={require("../../assets/card6.jpg")}
                style={{
                  height: verticalScale(110),
                  width: scale(130),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    style={styles.iconMainMenu}
                    fill={Colors.White}
                    name="browser-outline"
                  />
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={styles.textMainMenu}>Academic Calendar</Text>
                </View>
              </ImageBackground>
            </Card>
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    height: verticalScale(150),
    backgroundColor: Colors.Primary,
  },
  headingContainer: {
    height: verticalScale(50),
  },
  orientationTitleContainer: {
    marginTop: verticalScale(15),
    alignItems: "center",
    justifyContent: "center",
  },
  logoutContainer: {
    marginTop: verticalScale(-30),
    paddingRight: scale(paddingRightSmall),
    alignItems: "flex-end",
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: scale(paddingLeftMedium),
    justifyContent: "center",
    paddingRight: scale(paddingRightMedium),
  },
  iconDashBoard: {
    width: scale(25),
    height: verticalScale(25),
  },
  orientationTitleText: {
    fontSize: scale(fontSizeBig),
    color: Colors.White,
  },
  textDashBoard: {
    fontSize: scale(fontSizeMedium) - 2,
    color: Colors.White,
  },
  mainMenu: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: "center",
  },
  cardGrid: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardRow: {
    flexDirection: "row",
    backgroundColor: Colors.White,
    justifyContent: "center",
  },
  card1: {
    height: verticalScale(130),
    width: scale(130),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(borderRadiusLarge),
    backgroundColor: Colors.Card1Color,
    marginRight: scale(paddingRightSmall),
    borderWidth: 0,
  },
  card2: {
    height: verticalScale(90),
    width: scale(130),
    marginLeft: scale(paddingLeftSmall),
    borderRadius: scale(borderRadiusLarge),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Card2Color,
    borderWidth: 0,
  },
  card3: {
    height: verticalScale(90),
    width: scale(130),
    marginRight: scale(paddingRightSmall),
    marginTop: verticalScale(20),
    justifyContent: "center",
    borderRadius: scale(borderRadiusLarge),
    alignItems: "center",
    backgroundColor: Colors.Card3Color,
    borderWidth: 0,
  },
  card4: {
    marginTop: verticalScale(-20),
    height: verticalScale(160),
    width: scale(130),
    marginLeft: scale(paddingLeftSmall),
    justifyContent: "center",
    borderRadius: scale(borderRadiusLarge),
    alignItems: "center",
    backgroundColor: Colors.Card4Color,
    borderWidth: 0,
  },
  card5: {
    marginTop: verticalScale(-10),
    height: verticalScale(140),
    width: scale(130),
    borderRadius: scale(borderRadiusLarge),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Card5Color,
    borderWidth: 0,
    marginRight: scale(paddingRightSmall),
  },
  card6: {
    marginTop: verticalScale(20),
    height: verticalScale(110),
    width: scale(130),
    marginLeft: scale(paddingLeftSmall),
    borderRadius: scale(borderRadiusLarge),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Card6Color,
    borderWidth: 0,
  },
  textMainMenu: {
    textAlign: "center",
    textAlignVertical: "top",
    fontSize: scale(fontSizeSmall),
    color: Colors.White,
  },
  iconMainMenu: {
    width: scale(40),
    height: verticalScale(40),
  },
});

export default MainMenu;