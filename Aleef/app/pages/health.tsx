// HealthArticleScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import Colors from '@/components/colors';

export default function HealthArticleScreen() {
  const router = useRouter();

  const article = {
    title: 'General Health of Your Pet',
    image: require('@/assets/images/vet.jpg'),
    paragraphs: [
      'Maintaining your pet\'s health is the foundation of its happiness and long life. Good health care begins with regular visits to the veterinarian, even if your pet seems healthy. These visits help in early detection of any potential problems and receiving necessary vaccinations.',
      'Proper nutrition plays a vital role in maintaining organ health and the immune system. Choose high-quality food appropriate for your pet\'s age, type, and activity level. Monitor its weight and avoid overfeeding.',
      'Regular physical activity not only strengthens your pet\'s muscles but also helps maintain its heart health and reduce its stress levels. Set daily times for play or walks that suit its breed\'s needs.',
      'Providing a clean and safe environment reduces the risk of diseases and parasites. Keep your pet\'s sleeping area and tools clean. Also, paying attention to the cleanliness of its fur, teeth, and ears significantly contributes to its overall health and comfort.',
    ],
    tipsTitle: 'Essential Health Tips:',
    tips: [
      'Consistent schedule for vaccinations and veterinary check-ups.',
      'Monitor for any changes in behavior, appetite, or elimination habits.',
      'Always provide clean and fresh water.',
      'Regularly clean ears and eyes.',
      'Proactively manage parasites (fleas and ticks).',
    ],
    backgroundColor: Colors.background,
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: article.backgroundColor }]}>
      <StatusBar barStyle="dark-content" backgroundColor={article.backgroundColor} />

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Feather name="arrow-left" size={24} color={Colors.text} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={article.image} style={styles.articleImage} />

        <View style={styles.contentContainer}>
          <Text style={styles.articleTitle}>{article.title}</Text>
          {article.paragraphs.map((paragraph, index) => (
            <Text key={index} style={styles.articleParagraph}>
              {paragraph}
            </Text>
          ))}

          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>{article.tipsTitle}</Text>
            {article.tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Feather name="check-circle" size={16} color={Colors.primary} style={styles.tipIcon} />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 20,
    left: 20, // Changed from 'right' for LTR
    zIndex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  articleImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  articleTitle: {
    fontFamily: 'tajawal-medium',
    fontSize: 26,
    color: Colors.text,
    textAlign: 'left', // Changed from 'right' for LTR
    marginBottom: 20,
    lineHeight: 34,
  },
  articleParagraph: {
    fontFamily: 'tajawal-medium',
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'left', // Changed from 'right' for LTR
    marginBottom: 15,
    lineHeight: 25,
  },
  tipsSection: {
    backgroundColor: Colors.surface,
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tipsTitle: {
    fontFamily: 'tajawal-medium',
    fontSize: 20,
    color: Colors.text,
    textAlign: 'left', // Changed from 'right' for LTR
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 8,
  },
  tipItem: {
    flexDirection: 'row', // Changed from 'row-reverse' for LTR
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tipIcon: {
    marginTop: 4,
    marginRight: 10, // Changed from 'marginLeft' for LTR icon spacing
  },
  tipText: {
    flex: 1,
    fontFamily: 'tajawal-medium',
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'left', // Changed from 'right' for LTR
    lineHeight: 22,
  },
});