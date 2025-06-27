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
  Linking,
  Alert,
} from 'react-native';
import { Feather, FontAwesome6 } from '@expo/vector-icons';

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

interface AboutAppScreenProps {
  onBackPress?: () => void;
}

export default function AboutAppScreen({ onBackPress }: AboutAppScreenProps) {
  const myGitHub = 'https://github.com/isitmaede';
  const myGmail = 'maededeveloper@gmail.com';
  const myFacebook = 'https://www.facebook.com/profile.php?id=100094142845064';

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) => Alert.alert('Error', 'Could not open link: ' + err.message));
  };

  return (
    <SafeAreaView style={aboutStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView contentContainerStyle={aboutStyles.scrollViewContent}>

        {onBackPress && (
          <TouchableOpacity style={aboutStyles.backButton} onPress={onBackPress}>
            <Feather name="arrow-left" size={24} color={Colors.primary} />
          </TouchableOpacity>
        )}

        <Text style={aboutStyles.screenTitle}>About Alif App</Text>

        <View style={aboutStyles.sectionContainer}>
          <Text style={aboutStyles.sectionTitle}>Introduction to the App</Text>
          <Text style={aboutStyles.sectionText}>
            Alif is not just an application; it is a beacon of hope for our animal friends in Libya, where specialized services for their care and rescue are scarce. Alif was founded on the deep belief that every living creature has the right to care and protection. This application aims to bridge the existing gap by providing a vital platform that connects the animal-loving community with essential resources and emergency services. We strive to create a supportive ecosystem to ensure a safer and more prosperous future for every animal living among us.
          </Text>
          <Text style={aboutStyles.sectionText}>
            Through Alif, you can now easily find the nearest available veterinary clinics and immediately report cases of lost animals or those in urgent need of rescue. We also provide a wealth of valuable articles and tips on proper care, optimal nutrition, and healthy behavior for your pet, empowering you to provide the best possible care.
          </Text>
        </View>

        <View style={aboutStyles.sectionContainer}>
          <Text style={aboutStyles.sectionTitle}>Our Vision</Text>
          <Text style={aboutStyles.sectionText}>
            To be pioneers and key contributors in raising awareness and animal care in Libya, and to build a cohesive and compassionate community that sees every animal as a soul deserving of love and respect, until the day no animal suffers from neglect or cruelty.
          </Text>
        </View>

        <View style={aboutStyles.sectionContainer}>
          <Text style={aboutStyles.sectionTitle}>Contact Us</Text>
          <TouchableOpacity
            style={aboutStyles.contactButton}
            onPress={() => handleLinkPress(myGitHub)}
          >
            <Feather name="github" size={20} color={Colors.primary} />
            <Text style={aboutStyles.contactButtonText}>github</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={aboutStyles.contactButton}
            onPress={() => handleLinkPress(`mailto:${myGmail}`)}
          >
            <Feather name="mail" size={20} color={Colors.primary} />
            <Text style={aboutStyles.contactButtonText}>gmail</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={aboutStyles.contactButton}
            onPress={() => handleLinkPress(myFacebook)}
          >
            <FontAwesome6 name="facebook" size={20} color={Colors.primary} />
            <Text style={aboutStyles.contactButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <View style={aboutStyles.copyrightContainer}>
          <Text style={aboutStyles.copyrightText}>
            &copy; {new Date().getFullYear()} Alif App. All rights reserved.
          </Text>
          <Text style={aboutStyles.copyrightText}>
            Designed and developed by Alif Team.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const aboutStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 10,
    left: 20, // Changed from 'right'
    zIndex: 1,
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  screenTitle: {
    fontFamily: 'tajawal-bold',
    fontSize: 26,
    color: Colors.text,
    marginBottom: 30,
    textAlign: 'center',
    width: '100%',
  },
  sectionContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'flex-start', // Changed from 'flex-end'
  },
  sectionTitle: {
    fontFamily: 'tajawal-bold',
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 10,
    textAlign: 'left', // Changed from 'right'
  },
  sectionText: {
    fontFamily: 'tajawal-regular',
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'left', // Changed from 'right'
  },
  contactButton: {
    flexDirection: 'row', // Changed from 'row-reverse'
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  contactButtonText: {
    fontFamily: 'tajawal-regular',
    fontSize: 15,
    color: Colors.text,
    marginLeft: 10, // Changed from 'marginRight'
  },
  copyrightContainer: {
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
  },
  copyrightText: {
    fontFamily: 'tajawal-regular',
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});