// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/components/colors';
import { scale, verticalScale, moderateScale } from '../utils/metrics';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const initApp = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        router.replace('/WelcomePage');
      } catch (err: any) {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    };

    initApp();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/pawicon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>Every soul matters, no matter how small.</Text>
      <Text style={styles.companyText}>From MaedeDev</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: scale(120),
    height: verticalScale(120),
    marginBottom: verticalScale(40),
    borderTopLeftRadius: 55,
  },
  companyText: {
    position: 'absolute',
    bottom: verticalScale(70),
    color: 'black',
    fontSize: moderateScale(12),
    fontFamily: 'Poppins-Bold.ttf',
  },
  subtitle: {
    color: Colors.text,
    fontFamily: 'tajawal-medium',
  },
});