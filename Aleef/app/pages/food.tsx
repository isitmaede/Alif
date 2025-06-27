// NutritionArticleScreen.tsx
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

export default function NutritionArticleScreen() {
  const router = useRouter();

  const article = {
    title: 'Pet Nutrition: A Comprehensive Guide',
    image: require('@/assets/images/feed.jpg'),
    paragraphs: [
      'Nutrition is the cornerstone of any pet\'s health. A balanced diet provides the necessary energy for play, maintains healthy skin and coat, and supports the immune system. Food should be appropriate for age, breed, and activity level.',
      'Read food labels carefully. Look for foods that have high-quality protein as a primary ingredient, and avoid artificial additives, colors, and flavors. Your veterinarian can help you choose the best option.',
      'Portion control is crucial. Obesity is a serious health problem for pets. Follow the feeding guidelines on the package but adjust them based on your pet\'s weight and activity. Consult your veterinarian about the appropriate amount.',
      'Avoid harmful human foods. Many foods we consume are safe for us but toxic to pets, such as chocolate, grapes, onions, garlic, and coriander. Always be careful and do not share your food with your pet unless you are sure it is safe.',
    ],
    tipsTitle: 'Best Nutrition Practices:',
    tips: [
      'Consult your veterinarian to determine the most suitable diet.',
      'Ensure fresh and clean water is always available.',
      'Serve meals at fixed times to establish a routine for the animal.',
      'Regularly monitor your pet\'s weight and avoid excessive gain.',
      'Use clean food bowls and avoid residue buildup.',
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