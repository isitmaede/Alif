import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';

const Colors = {
  background: '#FAF9F7',
  surface: '#F1EDE3',
  primary: '#8BAA91',
  secondary: '#D3C6AD',
  text: '#2F2F2F',
  textSecondary: '#6B6B6B',
  border: '#E0DDD6',
  error: '#E57373',
  success: '#81C784',
};

interface HomeBannerProps {
  onInfoPress: () => void;
}

const HomeBanner = ({ onInfoPress }: HomeBannerProps) => (
  <ImageBackground
    source={require('@/assets/images/pawicon.png')}
    style={homeStyles.bannerBackground}
    imageStyle={homeStyles.bannerImageStyle}
  >
    <View style={homeStyles.bannerOverlay}>
      <TouchableOpacity onPress={onInfoPress} style={homeStyles.bannerInfoButton}>
        <Feather name="help-circle" size={24} color={Colors.surface} />
      </TouchableOpacity>
      <View style={homeStyles.bannerTextContainer}>
        <Text style={homeStyles.bannerTitle}>Welcome to Alif!</Text>
        <Text style={homeStyles.bannerSubtitle}>Your ultimate companion for pet care</Text>
      </View>
    </View>
  </ImageBackground>
);

interface NavBoxProps {
  title: string;
  iconName: keyof typeof Feather.glyphMap;
  onPress: () => void;
  color: string;
}

const NavBox = ({ title, iconName, onPress, color }: NavBoxProps) => (
  <TouchableOpacity style={[homeStyles.navBox, { backgroundColor: color }]} onPress={onPress}>
    <Feather name={iconName} size={40} color="#fff" />
    <Text style={homeStyles.navBoxText}>{title}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const handleInfoPress = () => {
    router.push('/pages/aboutaleef');
  };

  const handleClinicsPress = () => {
    router.push('/(tabs)/Clinics');
  };

  const handleReportsPress = () => {
    router.push('/Reports');
  };

  const handleArticlesPress = () => {
    router.push('/(tabs)/Articles');
  };

  const handleServicesPress = () => {
    router.push('/(tabs)/Reports'); // Assuming 'Create Report' navigates to the same reports screen
  };

  return (
    <SafeAreaView style={homeStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView contentContainerStyle={homeStyles.scrollViewContent}>
        <HomeBanner onInfoPress={handleInfoPress} />

        <View style={homeStyles.navBoxesContainer}>
          <NavBox
            title="Veterinary Clinics"
            iconName="heart"
            onPress={handleClinicsPress}
            color={Colors.primary}
          />
          <NavBox
            title="Rescue & Assistance Reports"
            iconName="bell"
            onPress={handleReportsPress}
            color={Colors.error}
          />
          <NavBox
            title="Articles & Tips"
            iconName="book-open"
            onPress={handleArticlesPress}
            color={Colors.secondary}
          />
          <NavBox
            title="Create Report"
            iconName="edit" // Changed icon to "edit" for "Create Report"
            onPress={handleServicesPress}
            color={Colors.success}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const homeStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollViewContent: {
    paddingBottom: 30,
    alignItems: 'center',
  },
  bannerBackground: {
    width: '90%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  bannerImageStyle: {
    borderRadius: 15,
  },
  bannerOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row', // Changed from 'row-reverse'
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  bannerTextContainer: {
    flex: 1,
    alignItems: 'flex-start', // Changed from 'flex-end'
  },
  bannerTitle: {
    fontFamily: 'tajawal-bold',
    fontSize: 22,
    color: '#fff',
    textAlign: 'left', // Changed from 'right'
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontFamily: 'tajawal-medium',
    fontSize: 14,
    color: '#eee',
    textAlign: 'left', // Changed from 'right'
  },
  bannerInfoButton: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 20,
    marginRight: 15, // Changed from marginLeft
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  navBoxesContainer: {
    flexDirection: 'row', // Changed from 'row-reverse'
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '90%',
  },
  navBox: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
  },
  navBoxText: {
    fontFamily: 'tajawal-bold',
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
});