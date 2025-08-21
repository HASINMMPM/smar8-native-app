import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/app/common/components/ui';
import CommonHeader from '@/app/common/components/headers/CommonHeader';
import { Colors } from '@/constants/Colors';

// Dummy building data
const buildingData = {
  name: 'Sunset Tower',
  address: '123 Main Street, Downtown',
  type: 'Residential Complex',
  floors: 15,
  totalRooms: 120,
  occupiedRooms: 98,
  yearBuilt: 2020,
  amenities: ['Gym', 'Pool', 'Parking', 'Security', 'Elevator'],
  description: 'A modern residential complex located in the heart of downtown, offering luxury living with premium amenities and 24/7 security.',
  contact: {
    manager: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    email: 'manager@sunsettower.com'
  }
};

export default function BuildingsScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const occupancyRate = Math.round((buildingData.occupiedRooms / buildingData.totalRooms) * 100);

  return (
    <View style={styles.container}>
      {/* Header */}
      <CommonHeader
        title="Buildings"
        variant="default"
        onBackPress={handleBackPress}
      />
      
      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Building Header */}
        <View style={styles.buildingHeader}>
          <Text style={styles.buildingName} color="textPrimary">{buildingData.name}</Text>
          <Text style={styles.buildingType} color="textSecondary">{buildingData.type}</Text>
        </View>

        {/* Key Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber} color="primary">{buildingData.floors}</Text>
            <Text style={styles.statLabel} color="textSecondary">Floors</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber} color="primary">{buildingData.totalRooms}</Text>
            <Text style={styles.statLabel} color="textSecondary">Total Rooms</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber} color="primary">{occupancyRate}%</Text>
            <Text style={styles.statLabel} color="textSecondary">Occupancy</Text>
          </View>
        </View>

        {/* Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle} color="textPrimary">Location</Text>
          <View style={styles.addressContainer}>
            <Text style={styles.addressText} color="textPrimary">{buildingData.address}</Text>
            <Text style={styles.yearBuilt} color="textSecondary">Built in {buildingData.yearBuilt}</Text>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle} color="textPrimary">Description</Text>
          <Text style={styles.descriptionText} color="textPrimary">{buildingData.description}</Text>
        </View>

        {/* Amenities Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle} color="textPrimary">Amenities</Text>
          <View style={styles.amenitiesContainer}>
            {buildingData.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Text style={styles.amenityText} color="textInverse">{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle} color="textPrimary">Contact Information</Text>
          <View style={styles.contactContainer}>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel} color="textSecondary">Manager:</Text>
              <Text style={styles.contactValue} color="textPrimary">{buildingData.contact.manager}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel} color="textSecondary">Phone:</Text>
              <Text style={styles.contactValue} color="textPrimary">{buildingData.contact.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel} color="textSecondary">Email:</Text>
              <Text style={styles.contactValue} color="textPrimary">{buildingData.contact.email}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  buildingHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  buildingName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  buildingType: {
    fontSize: 16,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingVertical: 20,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  addressContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 8,
  },
  yearBuilt: {
    fontSize: 14,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityItem: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  amenityText: {
    fontSize: 14,
    fontWeight: '500',
  },
  contactContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  contactValue: {
    fontSize: 14,
  },
});
