// app/articles/emergency.tsx

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
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import Colors from '@/components/colors';

export default function EmergencyArticleScreen() {
  const router = useRouter();

  const article = {
    title: 'Pet Emergency Guide: How to Act in Critical Situations',
    image: require('@/assets/images/emes.jpg'),
    paragraphs: [
      'Knowing how to act quickly and effectively in emergency situations can make a crucial difference between life and death for your pet. Preparedness, understanding warning signs, and knowing basic first aid are key to saving your pet\'s life. This comprehensive guide will help you handle critical situations with confidence and calm.',
      'Pets, just like humans, can face sudden accidents or illnesses. In moments of emergency, every second counts. Being prepared means you can provide immediate first aid that might save your pet\'s life before reaching specialized veterinary care. Awareness of common warning signs enables you to detect problems early, increasing the chances of recovery.',
    ],
    emergencySignsTitle: 'Common Emergency Signs Requiring Immediate Intervention:',
    emergencySigns: [
      'Difficulty breathing: Severe panting, continuous coughing, wheezing sound when breathing, blue gums or tongue.',
      'Fainting or loss of consciousness: Unresponsiveness to stimuli or sudden collapse.',
      'Seizures: Involuntary body convulsions, loss of bladder and bowel control.',
      'Severe and continuous vomiting or diarrhea: Especially if accompanied by blood, weakness, or dehydration.',
      'Severe bleeding: Whether external (from a deep wound) or internal (such as bleeding from the nose, mouth, or rectum).',
      'Signs of severe pain: Crying, whining, unwillingness to move, severe limping, painful swelling.',
      'Accidents and physical injuries: Falling from a height, being hit by a vehicle, bitten by another animal, obvious fractures.',
      'Sudden swelling: Especially in the face, neck, or abdomen.',
      'Inability to stand or walk: Sudden paralysis, severe limb weakness.',
      'Exposure to toxins: Ingesting poisonous plants, household chemicals, human medications, or spoiled food.',
      'Urination problems: Severe straining to urinate, inability to urinate, blood in urine (especially in male cats).',
      'Extremely high or low body temperature: (Normal pet temperature ranges between 38-39.2 degrees Celsius).',
    ],
    firstAidKitTitle: 'Essential Pet First Aid Kit:',
    firstAidKitItems: [
      'Sterile gauze and adhesive bandages: To cover wounds.',
      'Medical adhesive tape: To secure bandages.',
      'Mild antiseptic: Such as saline solution or diluted Betadine for cleaning superficial wounds.',
      'Scissors and tweezers: To cut bandages or remove small splinters.',
      'Digital rectal thermometer: (For accurately taking your pet\'s temperature).',
      'Medical gloves: To protect yourself and the animal.',
      'Small blanket or towel: To warm a pet in shock or to gently restrain it.',
      'Muzzle: Essential to prevent bites from a frightened or in-pain animal (use with extreme caution).',
      'Sterile water or saline solution: For cleaning wounds or rinsing eyes.',
      'Hydrogen peroxide 3%: (To induce vomiting in poisoning cases, **only under veterinary supervision**).',
      'Cotton and gauze: For cleaning wounds.',
      'List of your pet\'s medications and health conditions: If it suffers from chronic illnesses.',
    ],
    tipsTitle: 'Additional Tips for Handling an Injured or Sick Pet:',
    tips: [
      '**Stay Calm:** Animals sense stress. Your calmness helps soothe the animal and allows you to think clearly.',
      '**Call the Vet Immediately:** Before any treatment attempt, call your veterinarian or an emergency center. Describe the situation accurately and follow their instructions. Do not hesitate to call even if you are unsure of the severity of the situation.',
      '**Secure the Animal:** An injured or frightened animal may bite, even if it is normally docile. For dogs, if possible, gently put a muzzle on its mouth to reduce the risk of biting (do not muzzle if it has difficulty breathing or is vomiting). For cats and small animals, wrap the animal in a thick towel (especially around the head and body) to protect yourself and restrain it.',
      '**Safely Assess the Situation:**\n  - **Bleeding:** Use clean gauze or a clean cloth for direct and continuous pressure on the wound to stop bleeding.\n  - **Fractures:** Try not to move the injured limb. If transport is necessary, use a rigid board or piece of cardboard to stabilize the injured limb as much as possible.\n  - **Choking:** If you see a foreign object in the animal\'s mouth and can safely remove it, do so. If you cannot, follow your veterinarian\'s instructions (they may ask you to carefully attempt the "Heimlich maneuver" for animals).\n  - **Poisoning:** Try to identify the substance the animal ingested, its quantity, and when it happened. Do not attempt to induce vomiting unless specifically instructed by your veterinarian, as some toxins cause more harm by vomiting.',
      '**Transport the Animal Safely:**\n  - Use a blanket or thick towel to lift large or injured animals gently and steadily, taking care to support the neck and spine.\n  - For small animals, use a pet carrier or a padded basket.\n  - Maintain your pet\'s body temperature, especially if it is in shock, by wrapping it in a blanket.',
      '**Avoid Human Medications:** Never give your pet any human medications without consulting a veterinarian. Many medications that are safe for us are toxic or fatal to pets.',
      '**Do Not Over-Intervene:** Your goal is to provide initial aid and stabilize the animal until it reaches the vet. Avoid complex treatment attempts that could worsen the situation.',
    ],
    preventionTitle: 'Prevention is Better Than Cure:',
    preventionTips: [
      'Regular vaccinations: Protect against serious diseases.',
      'Parasite control: Regular treatment against fleas, ticks, and worms.',
      'Home safety: Remove toxic plants, store detergents and medications out of reach of pets, secure electrical wires.',
      'Supervision during outdoor play: To reduce the risk of accidents or fights with other animals.',
      'Proper nutrition: Reduces digestive problems and chronic diseases.',
      'Regular veterinary check-ups: For early detection of any health problems before they worsen.',
    ],
    backgroundColor: Colors.background,
  };

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
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
            <Text key={`para-${index}`} style={styles.articleParagraph}>
              {paragraph}
            </Text>
          ))}

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{article.emergencySignsTitle}</Text>
            {article.emergencySigns.map((sign, index) => (
              <View key={`sign-${index}`} style={styles.listItem}>
                <FontAwesome6 name="exclamation-triangle" size={16} color={Colors.error} style={styles.listIcon} />
                <Text style={styles.listText}>{sign}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{article.firstAidKitTitle}</Text>
            {article.firstAidKitItems.map((item, index) => (
              // Added a check for 'item' not to be null/undefined as there was a leading comma in the original array
              item && (
                <View key={`kit-${index}`} style={styles.listItem}>
                  <Feather name="box" size={16} color={Colors.secondary} style={styles.listIcon} />
                  <Text style={styles.listText}>{item}</Text>
                </View>
              )
            ))}
            <TouchableOpacity style={styles.callButton} onPress={() => handleCall('0911234567')}>
              <Feather name="phone" size={18} color="#fff" />
              <Text style={styles.callButtonText}>Call Emergency Vet (Example)</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>{article.tipsTitle}</Text>
            {article.tips.map((tip, index) => (
              <View key={`tip-${index}`} style={styles.tipItem}>
                <Feather name="check-circle" size={16} color={Colors.primary} style={styles.tipIcon} />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{article.preventionTitle}</Text>
            {article.preventionTips.map((prevention, index) => (
              <View key={`prev-${index}`} style={styles.listItem}>
                <Feather name="shield" size={16} color={Colors.success} style={styles.listIcon} />
                <Text style={styles.listText}>{prevention}</Text>
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
  sectionContainer: {
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
  sectionTitle: {
    fontFamily: 'tajawal-medium',
    fontSize: 20,
    color: Colors.text,
    textAlign: 'left', // Changed from 'right' for LTR
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 8,
  },
  listItem: {
    flexDirection: 'row', // Changed from 'row-reverse' for LTR
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listIcon: {
    marginTop: 4,
    marginRight: 10, // Changed from 'marginLeft' for LTR icon spacing
  },
  listText: {
    flex: 1,
    fontFamily: 'tajawal-medium',
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'left', // Changed from 'right' for LTR
    lineHeight: 22,
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
  callButton: {
    flexDirection: 'row', // Changed from 'row-reverse' for LTR
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  callButtonText: {
    fontFamily: 'tajawal-medium',
    fontSize: 16,
    color: '#fff',
    marginLeft: 10, // Changed from 'marginLeft' for LTR icon spacing
  },
});