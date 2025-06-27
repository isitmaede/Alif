import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import {moderateScale , verticalScale , scale} from '@/utils/metrics'

export default function ArticlesScreen() {
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF9F7' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>📝 Articles & Tips</Text>
        <Text style={styles.subtext}>Choose a topic that interests you</Text>

        <View style={styles.grid}>
          {/* Nutrition */}
          <TouchableOpacity
            style={[styles.box, { backgroundColor: '#F7EFE8' }]}
            onPress={() => router.push('/pages/food')}
            activeOpacity={0.8}
          >
            <Image
              source={require('@/assets/images/catfood.png')}
              style={styles.img}
              resizeMode="contain"
            />
            <Text style={styles.label}>Nutrition</Text>
          </TouchableOpacity>

          {/* Hygiene */}
          <TouchableOpacity
            style={[styles.box, { backgroundColor: '#EAF8F2' }]}
            onPress={() => router.push('/pages/cleaning')}
            activeOpacity={0.8}
          >
            <Image
              source={require('@/assets/images/catclean.png')}
              style={styles.img}
              resizeMode="contain"
            />
            <Text style={styles.label}>Hygiene</Text>
          </TouchableOpacity>

          {/* Health */}
          <TouchableOpacity
            style={[styles.box, { backgroundColor: '#FDF6E3' }]}
            onPress={() => router.push('/pages/health')}
            activeOpacity={0.8}
          >
            <Image
              source={require('@/assets/images/catwvet.png')}
              style={styles.img}
              resizeMode="contain"
            />
            <Text style={styles.label}>Health</Text>
          </TouchableOpacity>

          {/* Emergency */}
          <TouchableOpacity
            style={[styles.box, { backgroundColor: '#EEEAF8' }]}
            onPress={() =>router.push('/pages/emergnesy')}
            activeOpacity={0.8}
          >
            <Image
              source={require('@/assets/images/emepng.png')}
              style={styles.img}
              resizeMode="contain"
            />
            <Text style={styles.label}>Emergency</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
    backgroundColor: '#FAF9F7',
  },
  header: {
    fontSize: 22,
    fontFamily: 'tajawal-medium',
    color: '#4A4A4A',
    marginBottom: 4,
    textAlign: 'left', // Changed from 'right'
    marginTop:scale(25)
  },
  subtext: {
    fontSize: 14,
    fontFamily: 'tajawal-medium',
    color: '#7A7A7A',
    marginBottom: 20,
    textAlign: 'left', // Changed from 'right'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 18,
  },
  box: {
    width: '47%',
    aspectRatio: 1.1,
    borderRadius: 18,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  img: {
    width: '80%',
    height: '60%',
  },
  label: {
    fontFamily: 'tajawal-medium',
    fontSize: 16,
    color: '#4A4A4A',
    marginTop: 12,
  },
})