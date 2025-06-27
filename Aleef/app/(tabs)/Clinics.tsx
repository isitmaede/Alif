import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  Linking,
} from 'react-native';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import Colors from '@/components/colors';

import clinicData from '@/assets/data/cls.json';

interface Clinic {
  name: string;
  city: string | string[] | null;
  state: string | null;
  country: string | null;
  phone: string | string[] | null;
  email: string | null;
  lat: number | null;
  lng: number | null;
  category: string;
  rating: number | null;
  rating_count: number | null;
}

const allCities = [
  'All', 'Tripoli', 'Benghazi', 'Misrata', 'Zliten', 'Zawiya', 'Bayda', 'Sabha',
  'Sirte', 'Marj', 'Ajaylat', 'Ajdabiya'
];

export default function ClinicsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([]);

  useEffect(() => {
    let currentClinics: Clinic[] = clinicData as Clinic[];

    if (selectedCity !== 'All') {
      currentClinics = currentClinics.filter(clinic => {
        if (Array.isArray(clinic.city)) {
          return clinic.city.includes(selectedCity);
        }
        return clinic.city === selectedCity;
      });
    }

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      currentClinics = currentClinics.filter(clinic =>
        clinic.name.toLowerCase().includes(lowerCaseQuery) ||
        (Array.isArray(clinic.city) ? clinic.city.some(c => c.toLowerCase().includes(lowerCaseQuery)) : clinic.city?.toLowerCase().includes(lowerCaseQuery)) ||
        clinic.state?.toLowerCase().includes(lowerCaseQuery) ||
        clinic.category.toLowerCase().includes(lowerCaseQuery)
      );
    }

    setFilteredClinics(currentClinics);
  }, [selectedCity, searchQuery]);

  const displayPhoneNumber = (phone: string | string[] | null): string => {
    if (Array.isArray(phone) && phone.length > 0) {
      return phone[0];
    }
    if (Array.isArray(phone)) {
      return phone.length > 0 ? phone[0] : 'N/A';
    }
    if (typeof phone === 'string') {
      return phone;
    }
    return 'N/A';
  };

  const displayAddress = (clinic: Clinic): string => {
    let addressParts: string[] = [];
    if (clinic.city) {
      addressParts.push(Array.isArray(clinic.city) ? clinic.city[0] : clinic.city);
    }
    if (clinic.state) {
      addressParts.push(clinic.state);
    }
    if (addressParts.length === 0) {
      return 'Address Not Available';
    }
    return addressParts.join(', ');
  };

  const renderClinicCard = ({ item }: { item: Clinic }) => (
    <View style={styles.clinicCard}>
      <View style={styles.clinicInfo}>
        <Text style={styles.clinicName}>{item.name}</Text>
        {item.rating !== null ? (
          <View style={styles.ratingContainer}>
            <FontAwesome6
              name="star"
              size={14}
              color={item.rating > 0 ? Colors.secondary : Colors.border}
            />
            <Text
              style={[
                styles.ratingText,
                { color: item.rating > 0 ? Colors.secondary : Colors.textSecondary }
              ]}
            >
              {item.rating.toFixed(1)}
            </Text>
            {item.rating_count !== null && (
              <Text style={styles.ratingCountText}> ({item.rating_count} reviews)</Text>
            )}
          </View>
        ) : (
          <View style={styles.ratingContainer}>
            <FontAwesome6 name="star" size={14} color={Colors.border} />
            <Text style={[styles.ratingText, { color: Colors.textSecondary }]}>No rating</Text>
            {item.rating_count !== null && item.rating_count > 0 && (
                <Text style={styles.ratingCountText}> ({item.rating_count} reviews)</Text>
            )}
          </View>
        )}
        <Text style={styles.clinicAddress}>
          <Feather name="map-pin" size={13} color={Colors.textSecondary} /> {displayAddress(item)}
        </Text>
        <Text style={styles.clinicCategory}>
          <Feather name="tag" size={13} color={Colors.textSecondary} /> {item.category}
        </Text>
        {item.phone && (
          <TouchableOpacity
            style={styles.phoneButton}
            onPress={() => Linking.openURL(`tel:${displayPhoneNumber(item.phone)}`)}
          >
            <Feather name="phone" size={16} color="#fff" />
            <Text style={styles.phoneButtonText}>Call: {displayPhoneNumber(item.phone)}</Text>
          </TouchableOpacity>
        )}
        {item.email && (
          <TouchableOpacity
            style={styles.emailButton}
            onPress={() => Linking.openURL(`mailto:${item.email}`)}
          >
            <Feather name="mail" size={16} color="#fff" />
            <Text style={styles.emailButtonText}>Email: {item.email}</Text>
          </TouchableOpacity>
        )}
        {item.lat && item.lng && (
          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => Linking.openURL(`http://maps.google.com/maps?q=${item.lat},${item.lng}`)}
          >
            <Feather name="map" size={16} color="#fff" />
            <Text style={styles.mapButtonText}>View on Map</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <Text style={styles.screenTitle}>Veterinary Clinics</Text>

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color={Colors.textSecondary} />
        <TextInput
          placeholder="Search for a clinic or city..."
          placeholderTextColor={Colors.textSecondary}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cityPillsContainer}
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

      {filteredClinics.length === 0 ? (
        <View style={styles.noClinicsContainer}>
          <Feather name="info" size={50} color={Colors.border} />
          <Text style={styles.noClinicsText}>No clinics available in this city or matching your search.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredClinics}
          renderItem={renderClinicCard}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.clinicsList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  screenTitle: {
    fontFamily: 'tajawal-medium',
    fontSize: 24,
    color: Colors.text,
    textAlign: 'left', // Changed from 'right'
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row', // Changed from 'row-reverse'
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 15,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'tajawal-medium',
    fontSize: 15,
    color: Colors.text,
    textAlign: 'left', // Changed from 'right'
    paddingLeft: 10, // Changed from paddingRight
  },
  cityPillsContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  cityPill: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cityPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  cityPillText: {
    fontFamily: 'tajawal-medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  cityPillTextActive: {
    color: '#fff',
  },
  clinicsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  clinicCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  clinicInfo: {
    padding: 15,
    alignItems: 'flex-start', // Changed from 'flex-end'
  },
  clinicName: {
    fontFamily: 'tajawal-medium',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 5,
    textAlign: 'left', // Changed from 'right'
  },
  ratingContainer: {
    flexDirection: 'row', // Changed from 'row-reverse'
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    fontFamily: 'tajawal-medium',
    fontSize: 14,
    color: Colors.secondary,
    marginLeft: 5, // Changed from marginRight
  },
  ratingCountText: {
    fontFamily: 'tajawal-medium',
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 5, // Changed from marginRight
  },
  clinicAddress: {
    fontFamily: 'tajawal-medium',
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 3,
    textAlign: 'left', // Changed from 'right'
  },
  clinicCategory: {
    fontFamily: 'tajawal-medium',
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 10,
    textAlign: 'left', // Changed from 'right'
  },
  phoneButton: {
    flexDirection: 'row', // Changed from 'row-reverse'
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  phoneButtonText: {
    fontFamily: 'tajawal-medium',
    fontSize: 14,
    color: '#fff',
    marginLeft: 8, // Changed from marginLeft to account for icon on left
  },
  emailButton: {
    flexDirection: 'row', // Changed from 'row-reverse'
    backgroundColor: Colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  emailButtonText: {
    fontFamily: 'tajawal-medium',
    fontSize: 14,
    color: '#fff',
    marginLeft: 8, // Changed from marginLeft
  },
  mapButton: {
    flexDirection: 'row', // Changed from 'row-reverse'
    backgroundColor: Colors.success,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  mapButtonText: {
    fontFamily: 'tajawal-medium',
    fontSize: 14,
    color: '#fff',
    marginLeft: 8, // Changed from marginLeft
  },
  noClinicsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noClinicsText: {
    fontFamily: 'tajawal-medium',
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});