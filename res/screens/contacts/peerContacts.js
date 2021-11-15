import React, {useState} from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {
  Layout,
  Text,
  Popover,
  Button,
  Card,
  Modal,
} from '@ui-kitten/components';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {
  fontSizeBig,
  fontSizeVeryLarge,
  paddingMedium,
  paddingSmall,
  fontSizeMedium,
  fontSizeSmall,
  borderRadiusLarge,
  borderRadius,
} from '../../utils/UIConstants';
import {ScrollView} from 'react-native-gesture-handler';
import ContactCard from '../../components/contact-card.js';
import {scale, verticalScale} from 'react-native-size-matters';
import {White} from '../../utils/colors';
import {PopoverView} from '@ui-kitten/components/ui/popover/popoverView.component';

const Peers = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Layout>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.department}>COMPUTER SCIENCE</Text>
            <View style={styles.cardContainer}>
              <ContactCard
                params={setVisible}
                name="Ram Kapoor"
                dept="CSE"
                intro="Likes to code, draw water from well. Likes to code, draw water from well. Likes to code, draw water from well. Likes to code, draw water from well."
                phone="+91 34500 34500"
              />
              <ContactCard
                params={setVisible}
                name="TEST Kumar"
                dept="CSE"
                intro="Blood is a body fluid in humans and other animals that delivers necessary substances such as nutrients and oxygen to the cells and transports metabolic waste products away from those same cells. In vertebrates, it is composed of blood cells suspended in blood plasma. Plasma, which constitutes 55% of blood fluid, is mostly water (92% by volume),[2] and contains proteins, glucose, mineral ions, hormones, carbon dioxide (plasma being the main medium for excretory product transportation), and blood cells themselves. Albumin is the main protein in plasma, and it functions to regulate the colloidal osmotic pressure of blood. The blood cells are mainly red blood cells (also called RBCs or erythrocytes), white blood cells (also called WBCs or leukocytes) and platelets (also called thrombocytes). The most abundant cells in vertebrate blood are red blood cells. These contain hemoglobin, an iron-containing protein, which facilitates oxygen transport by reversibly binding to this respiratory gas and greatly increasing its solubility in blood. In contrast, carbon dioxide is mostly transported extracellularly as bicarbonate ion transported in plasma. Vertebrate blood is bright red when its hemoglobin is oxygenated and dark red when it is deoxygenated. Some animals, such as crustaceans and mollusks, use hemocyanin to carry oxygen, instead of hemoglobin. Insects and some mollusks use a fluid called hemolymph instead of blood, the difference being that hemolymph is not contained in a closed circulatory system. In most insects, this blood does not contain oxygen-carrying molecules such as hemoglobin because their bodies are small enough for their tracheal system to suffice for supplying oxygen."
                phone="+91 34500 34500"
              />
            </View>
            <Text style={styles.department}>ELECTRICAL</Text>
            <View style={styles.cardContainer}>
              <ContactCard
                params={setVisible}
                name="Shyam Sundar"
                dept="EEE"
                intro="Likes to code, draw water from well"
                phone="+91 34500 34500"
              />
              <ContactCard
                params={setVisible}
                name="Ganesh Kumar"
                dept="EEE"
                intro="Likes to code, draw water from well"
                phone="+91 34500 34500"
              />
            </View>
            <Text style={styles.department}>MECHANICAL</Text>
            <View style={styles.cardContainer}>
              <ContactCard
                params={setVisible}
                name="Rajeev Das"
                dept="Mech"
                intro="Likes to code, draw water from well"
                phone="+91 34500 34500"
              />
              <ContactCard
                params={setVisible}
                name="G.S. Gupta"
                dept="Mech"
                intro="Likes to code, draw water from well"
                phone="+91 34500 34500"
              />
            </View>
            <Text style={styles.department}>CHEMICAL</Text>
            <View style={styles.cardContainer}>
              <ContactCard
                params={setVisible}
                name="Abhishek Singh"
                dept="Chem"
                intro="Likes to code, draw water from well"
                phone="+91 34500 34500"
              />
              <ContactCard
                params={setVisible}
                name="Nirmal Singhal"
                dept="Chem"
                intro="Likes to code, draw water from well"
                phone="+91 34500 34500"
              />
            </View>
          </ScrollView>
        </Layout>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: paddingMedium,
    paddingRight: paddingMedium,
  },
  department: {
    marginTop: paddingSmall,
    fontSize: fontSizeBig,
  },
  cardContainer: {
    flexDirection: 'row',
    paddingTop: paddingSmall,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: borderRadius,
  },
  text: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: verticalScale(150),
    width: scale(180),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  circle: {
    height: verticalScale(70),
    width: scale(70),
    borderRadius: scale(1000),
    borderWidth: scale(3),
    marginBottom: verticalScale(10),
  },
  image2: {
    height: verticalScale(70),
    width: scale(70),
  },
  popoverView: {
    position: 'absolute',
  },
});

export default Peers;
