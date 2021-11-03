const latDelta = 0.0025;
const longDelta = 0.0025;

export const initialRegion = {
  latitude: 10.7555 - 0.0006,
  longitude: 78.81701,
  latitudeDelta: 0.04,
  longitudeDelta: 0.0009,
};

export const mapBoundaries = [
  {
    latitude: 10.756898,
    longitude: 78.813272,
  },
  {
    latitude: 10.753005,
    longitude: 78.821294,
  },
  {
    latitude: 10.756691,
    longitude: 78.825215,
  },
  {
    latitude: 10.772912,
    longitude: 78.81799,
  },
  {
    latitude: 10.770074,
    longitude: 78.812303,
  },
  {
    latitude: 10.765537,
    longitude: 78.811917,
  },
  {
    latitude: 10.760815,
    longitude: 78.808065,
  },
];

export const generalCoordinates = [
  {
    name: 'Campus',
    latitude: 10.7555,
    longitude: 78.81701,
    latitudeDelta: 0.04,
    longitudeDelta: 0.0009,
    // image: 'media/collegeImages/main_gate.jpg',
    icon: 'graduation-cap',
  },
  {
    name: 'NITT Main Gate',
    latitude: 10.75705919186815,
    longitude: 78.81329007446766,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    // image: 'media/collegeImages/main_gate.jpg',
    icon: 'archway',
  },
  {
    name: 'BARN Hall',
    latitude: 10.759305585496127,
    longitude: 78.8132243603468,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    // image: 'media/collegeImages/barn.jpg',
    icon: 'warehouse',
  },
  {
    name: 'Golden Jubilee Convention Hall',
    latitude: 10.761426798133462,
    longitude: 78.81147623062134,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    // image: 'media/collegeImages/gjch_idecIJ5.jpeg',
    icon: 'place-of-worship',
  },
  {
    name: 'Orion',
    latitude: 10.759710066324518,
    longitude: 78.81085127592087,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    // image: 'media/collegeImages/orion.png',
    icon: 'university',
  },
  {
    name: 'Lecture Hall Complex (LHC)',
    latitude: 10.761013096964556,
    longitude: 78.81417050957681,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    // image: 'media/collegeImages/lhc.png',
    icon: 'chalkboard-teacher',
  },
  {
    name: 'Octagon Computer Center',
    latitude: 10.76054142423861,
    longitude: 78.81483301520348,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    // image: 'media/collegeImages/octagon.jpeg',
    icon: 'desktop',
  },
  {
    name: 'NITT Hospital',
    latitude: 10.762621785264015,
    longitude: 78.81886169314386,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    // image: 'media/collegeImages/hospital.jpeg',
    icon: 'hospital',
  },
  {
    name: 'NSO Ground',
    latitude: 10.757027570958654,
    longitude: 78.81473913788795,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    // image: 'media/collegeImages/nso_ground.png',
    icon: 'futbol',
  },
  {
    name: 'CEESAT Ground',
    latitude: 10.760957102335986,
    longitude: 78.81280325353146,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    // image: 'media/collegeImages/ceesat_ground.png',
    icon: 'basketball-ball',
  },
  {
    name: 'Indoor Stadium',
    latitude: 10.756980139588169,
    longitude: 78.81667837500572,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    // image: 'media/collegeImages/indoor.png',
    icon: 'table-tennis',
  },
  {
    name: 'Café Coffee Day',
    latitude: 10.756168534981999,
    longitude: 78.81548345088959,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    // image: 'media/collegeImages/ccd.png',
    icon: 'coffee',
  },
];

export const departmentCoordinates = [
  {
    // // image: require('../assets/images/ARCHI.png'),
    latitude: 10.760212702167816,
    longitude: 78.80988769233228,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    name: 'ARCH Department',
    icon: 'drafting-compass',
  },
  {
    name: 'CHEM Department',
    // // image: require('../assets/images/CHEM.png'),
    latitude: 10.759451172306305,
    longitude: 78.81151847541334,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    icon: 'atom',
  },
  {
    name: 'CIVIL Department',
    // // image: require('../assets/images/CIVIL.png'),
    latitude: 10.759002553901095,
    longitude: 78.81722554564476,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    icon: 'hard-hat',
  },
  {
    name: 'CSE Department',
    // image: require('../assets/images/CSE.png'),
    latitude: 10.759826667374597,
    longitude: 78.8181784003973,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    icon: 'laptop-code',
  },
  {
    name: 'ECE Department',
    // // image: require('../assets/images/ECE.png'),
    latitude: 10.76066790638279,
    longitude: 78.81693184375763,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    icon: 'robot',
  },
  {
    name: 'EEE Department',
    // // image: require('../assets/images/EEE.png'),
    latitude: 10.758874753528406,
    longitude: 78.81466001272202,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    icon: 'bolt',
  },
  {
    name: 'ICE Department',
    // // image: require('../assets/images/ICE.png'),
    latitude: 10.760756839108634,
    longitude: 78.81817102432251,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    icon: 'city',
  },
  {
    name: 'MECH Department',
    // // image: require('../assets/images/MECH.png'),
    latitude: 10.759480157907184,
    longitude: 78.8155370950699,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    icon: 'cogs',
  },
  {
    name: 'MME Department',
    // // image: require('../assets/images/MME.png'),
    latitude: 10.759980157907184,
    longitude: 78.8155370950699,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    icon: 'temperature-high',
  },
  {
    name: 'PROD Department',
    // // image: require('../assets/images/PROD.png'),
    latitude: 10.761148801550684,
    longitude: 78.81604067981243,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    icon: 'industry',
  },
];

export const hostelCoordinates = [
  {
    // // image: require('../assets/images/NIT.png'),
    latitude: 10.76209741442728,
    longitude: 78.8133805990219,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    name: 'Agate',
    icon: 'male',
  },
  {
    // // image: require('../assets/images/NIT.png'),
    latitude: 10.762467636142858,
    longitude: 78.81156407296658,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    name: 'Garnet A',
    icon: 'male',
  },
  {
    // // image: require('../assets/images/NIT.png'),
    latitude: 10.763134297587255,
    longitude: 78.81164856255054,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    name: 'Garnet B',
    icon: 'male',
  },
  {
    // // image: require('../assets/images/NIT.png'),
    latitude: 10.763535479504712,
    longitude: 78.81233118474483,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    name: 'Garnet C',
    icon: 'male',
  },
  {
    // // image: require('../assets/images/NIT.png'),
    latitude: 10.75719094562206,
    longitude: 78.82198244333269,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    name: 'Opal',
    icon: 'female',
  },
  {
    // // image: require('../assets/images/NIT.png'),
    latitude: 10.762405712969432,
    longitude: 78.81422080099584,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    name: 'Hostel Office',
    icon: 'briefcase',
  },
];

export const customMapStyle = [
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
];
