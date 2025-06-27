// HygieneArticleScreen.tsx
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

export default function HygieneArticleScreen() {
  const router = useRouter();

  const article = {
    title: 'Pet Hygiene',
    image: require('@/assets/images/bath.jpeg'),
    paragraphs: [
      'Hygiene is not just about outward appearance; it is an essential part of your pet\'s health and comfort. Regular bathing, fur cleaning, and nail trimming all contribute to preventing diseases and parasites, making your pet feel comfortable.',
      'Choose shampoo and conditioner specifically designed for pets, and avoid human products that may cause irritation. The frequency of bathing depends on the type of animal and its activity level, but avoid excessive bathing to prevent skin dryness.',
      'Fur care includes regular brushing to remove shedding hair and prevent tangles, which also reduces hairballs formed in the digestive system. This activity promotes blood circulation and helps in early detection of any skin problems.',
      'Don\'t forget dental and ear hygiene. Brushing teeth prevents plaque buildup and gum disease, while regular ear cleaning reduces the risk of infections. Consult your veterinarian for the best cleaning methods and tools.',
    ],
    tipsTitle: 'Daily/Weekly Hygiene Routine:',
    tips: [
      'Use bathing products specifically for pets.',
      'Brush fur daily or several times a week.',
      'Brush your pet\'s teeth with a special toothbrush and toothpaste.',
      'Regularly check their ears and eyes for any discharge.',
      'Trim nails regularly to avoid problems during walking and playing.',
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