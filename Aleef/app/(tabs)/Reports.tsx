import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

// Supabase import removed as per your request for a UI-only project

const allCities = [
  'All',
  'Tripoli',
  'Benghazi',
  'Misrata',
  'Zliten',
  'Zawiya',
  'Bayda',
  'Sabha',
  'Sirte',
];

const DEFAULT_IMAGE_HOMELESS = require('@/assets/images/mahjor.jpg');
const DEFAULT_IMAGE_MISSING = require('@/assets/images/missing.jpg');
const DEFAULT_IMAGE_INJURED = require('@/assets/images/pain.jpg');

type Report = {
  id: string;
  image_url: string | null;
  type: string;
  city: string;
  description: string;
  created_at: string;
  user_id: string | null;
};

export default function ReportsScreen() {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ type: '', city: '', description: '' });
  const [displayReports, setDisplayReports] = useState<Report[]>([]); // Renamed from supabaseReports
  const [loadingReports, setLoadingReports] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // userId state and its related logic removed

  // Removed useEffect for getSessionAndSignInAnon

  useEffect(() => {
    // Simulate fetching reports for UI display
    simulateFetchReports();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      simulateFetchReports();
    }, 300);
    return () => clearTimeout(handler);
  }, [selectedCity, search]);

  const simulateFetchReports = () => {
    setLoadingReports(true);
    // In a real UI-only app, you might load from a local JSON or mock data
    // For now, we'll use a hardcoded list to demonstrate filtering
    const mockReports: Report[] = [
      {
        id: '1',
        image_url: null,
        type: 'Homeless',
        city: 'Tripoli',
        description: 'A stray dog seen near the old city entrance.',
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        user_id: 'mock_user_1',
      },
      {
        id: '2',
        image_url: null,
        type: 'Injured',
        city: 'Benghazi',
        description: 'Cat with a leg injury spotted in city park.',
        created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        user_id: 'mock_user_2',
      },
      {
        id: '3',
        image_url: null,
        type: 'Missing',
        city: 'Misrata',
        description: 'Lost parrot, green feathers, last seen near the port.',
        created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        user_id: 'mock_user_3',
      },
      {
        id: '4',
        image_url: null,
        type: 'Homeless',
        city: 'Zliten',
        description: 'Small kitten wandering near the market.',
        created_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        user_id: 'mock_user_4',
      },
      {
        id: '5',
        image_url: null,
        type: 'Missing',
        city: 'Tripoli',
        description: 'Missing dog, golden retriever, friendly, wearing a blue collar.',
        created_at: new Date().toISOString(), // Just now
        user_id: 'mock_user_5',
      },
    ];

    let filteredReports = mockReports;

    if (selectedCity !== 'All') {
      filteredReports = filteredReports.filter((report) => report.city === selectedCity);
    }

    const filteredBySearch = filteredReports.filter((item: Report) => {
      const lowerCaseSearch = search.toLowerCase();
      return (
        item.description.toLowerCase().includes(lowerCaseSearch) ||
        item.city.toLowerCase().includes(lowerCaseSearch) ||
        item.type.toLowerCase().includes(lowerCaseSearch)
      );
    });

    // Sort by created_at (most recent first)
    filteredBySearch.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    setTimeout(() => {
      setDisplayReports(filteredBySearch);
      setLoadingReports(false);
    }, 500); // Simulate network delay
  };

  const handleSubmitReport = () => {
    if (isSubmitting) return;

    if (!form.type || !form.city || !form.description) {
      Alert.alert('Error', 'Please fill in all required report fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate successful submission for UI
    Toast.show({
      type: 'success',
      text1: 'Successfully Posted ✅',
      text2: 'Your post has been added 🎉',
      position: 'bottom',
      visibilityTime: 3000,
      topOffset: 30,
      bottomOffset: 40,
      autoHide: true,
      swipeable: true,
    });
    setModalVisible(false);
    setForm({ type: '', city: '', description: '' });
    // In a real UI-only app, you might add this to local state for immediate display
    // For now, we just close the modal and show success.
    // simulateFetchReports(); // Re-fetch to show the "new" report in the mock data if implemented
    setIsSubmitting(false);
  };

  const getBadgeTextStyle = (type: string) => ({
    color:
      type === 'Missing' ? '#C27C0E' : type === 'Injured' ? '#B91C1C' : '#4B5563',
    fontSize: 13,
    fontFamily: 'tajawal-medium',
  });

  const getReportImage = (type: string) => {
    switch (type) {
      case 'Homeless':
        return DEFAULT_IMAGE_HOMELESS;
      case 'Missing':
        return DEFAULT_IMAGE_MISSING;
      case 'Injured':
        return DEFAULT_IMAGE_INJURED;
      default:
        return DEFAULT_IMAGE_HOMELESS;
    }
  };

  const renderItem = ({ item }: { item: Report }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={getReportImage(item.type)} style={styles.image} />
        <View style={styles.badgeWrapper}>
          <Text style={getBadgeTextStyle(item.type)}>{item.type}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.city}>📍 {item.city}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>
          {item.created_at
            ? new Date(item.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            : 'Unknown Date'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#888" style={{ marginRight: 6 }} />
        <TextInput
          placeholder="Search for a report..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#999"
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cityScroll}
      >
        {allCities.map((city) => (
          <TouchableOpacity
            key={city}
            style={[
              styles.cityPill,
              selectedCity === city && styles.cityPillActive,
            ]}
            onPress={() => setSelectedCity(city)}
          >
            <Text
              style={[
                styles.cityPillText,
                selectedCity === city && styles.cityPillTextActive,
              ]}
            >
              {city}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {loadingReports ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8BAA91" />
          <Text style={styles.loadingText}>Loading Reports...</Text>
        </View>
      ) : displayReports.length === 0 ? (
        <View style={styles.noReportsContainer}>
          <Feather name="info" size={50} color="#ccc" />
          <Text style={styles.noReportsText}>No reports to display.</Text>
        </View>
      ) : (
        <FlatList
          data={displayReports}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setModalVisible(true);
          setForm({ type: '', city: '', description: '' });
        }}
      >
        <FontAwesome6 name="paw" size={26} color="#fff" />
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.3}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>New Report</Text>
          <Text style={styles.label}>Report Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
            {['Missing', 'Injured', 'Homeless'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.option,
                  form.type === type && styles.optionSelected,
                ]}
                onPress={() => setForm({ ...form, type })}
              >
                <Text
                  style={[
                    styles.optionText,
                    form.type === type && styles.optionTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.label}>City</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
            {allCities.slice(1).map((city) => (
              <TouchableOpacity
                key={city}
                style={[
                  styles.option,
                  form.city === city && styles.optionSelected,
                ]}
                onPress={() => setForm({ ...form, city })}
              >
                <Text
                  style={[
                    styles.optionText,
                    form.city === city && styles.optionTextSelected,
                  ]}
                >
                  {city}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.label}>Description</Text>
          <TextInput
            placeholder="Write a short description..."
            style={styles.textArea}
            value={form.description}
            onChangeText={(text) => setForm({ ...form, description: text })}
            multiline
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSubmitReport}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.sendButtonText}>Submit Report</Text>
            )}
          </TouchableOpacity>
        </View>
      </Modal>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF9F7',
    paddingTop: Platform.OS === 'android' ? ((StatusBar.currentHeight ?? 0) + 8) : 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    marginHorizontal: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 42,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'tajawal-medium',
    fontSize: 14,
    color: '#333',
    textAlign: 'left', // Changed from 'right' for LTR
  },
  cityScroll: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  cityPill: {
    backgroundColor: '#E4E4E4',
    paddingHorizontal: 14,
    paddingVertical: 1,
    borderRadius: 16,
    marginRight: 8,
  },
  cityPillActive: {
    backgroundColor: '#8BAA91',
  },
  cityPillText: {
    fontFamily: 'tajawal-medium',
    color: '#444',
    fontSize: 14,
  },
  cityPillTextActive: {
    color: '#fff',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  badgeWrapper: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FFFFFFDD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  content: {
    padding: 14,
  },
  city: {
    fontSize: 15,
    fontFamily: 'tajawal-medium',
    color: '#4A4A4A',
    marginBottom: 4,
    textAlign: 'left', // Changed from 'right' for LTR
  },
  description: {
    fontSize: 14,
    fontFamily: 'tajawal-medium',
    color: '#6B6B6B',
    marginBottom: 6,
    textAlign: 'left', // Changed from 'right' for LTR
  },
  time: {
    fontSize: 12,
    fontFamily: 'tajawal-medium',
    color: '#A1A1A1',
    textAlign: 'left', // Changed from 'right' for LTR
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 30,
    backgroundColor: '#E12A2AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 2 },
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 400,
  },
  modalTitle: {
    fontFamily: 'tajawal-medium',
    fontSize: 18,
    color: '#4A4A4A',
    marginBottom: 14,
    textAlign: 'left', // Changed from 'right' for LTR
  },
  label: {
    fontFamily: 'tajawal-medium',
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    marginTop: 10,
    textAlign: 'left', // Changed from 'right' for LTR
  },
  option: {
    backgroundColor: '#E4E4E4',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  optionSelected: {
    backgroundColor: '#8BAA91',
  },
  optionText: {
    fontFamily: 'tajawal-medium',
    color: '#444',
    fontSize: 13,
  },
  optionTextSelected: {
    color: '#fff',
  },
  textArea: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    height: 80,
    fontFamily: 'tajawal-medium',
    textAlignVertical: 'top',
    marginBottom: 16,
    color: '#333',
    textAlign: 'left', // Changed from 'right' for LTR
  },
  sendButton: {
    backgroundColor: '#8BAA91',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  sendButtonText: {
    fontFamily: 'tajawal-medium',
    color: '#fff',
    fontSize: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    fontFamily: 'tajawal-medium',
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  noReportsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  noReportsText: {
    fontFamily: 'tajawal-medium',
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
});