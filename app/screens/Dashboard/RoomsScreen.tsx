import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/app/common/components/ui';
import CommonHeader from '@/app/common/components/headers/CommonHeader';
import { Colors } from '@/constants/Colors';

// People data for the room (same structure as PeopleTab)
const peopleData = [
  { id: '1', name: 'John Doe', phone: '+1 234 567 890', date: '2024-01-15', profilePic: 'person1' },
  { id: '2', name: 'Jane Smith', phone: '+1 234 567 891', date: '2024-01-10', profilePic: 'person2' },
  { id: '3', name: 'Mike Johnson', phone: '+1 234 567 892', date: '2024-01-05', profilePic: 'person3' },
  { id: '4', name: 'Emily Wilson', phone: '+1 234 567 893', date: '2024-01-20', profilePic: 'person4' },
  { id: '5', name: 'David Brown', phone: '+1 234 567 894', date: '2024-01-18', profilePic: 'person5' },
  { id: '6', name: 'Lisa Anderson', phone: '+1 234 567 895', date: '2024-01-12', profilePic: 'person6' },
];

export default function RoomsScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <CommonHeader
        title="Rooms"
        variant="default"
        onBackPress={handleBackPress}
      />
      
      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle} color="textPrimary">People in Room</Text>
        
        {/* People List */}
        <View style={styles.peopleList}>
          {peopleData.map((person) => (
            <View key={person.id} style={styles.personItem}>
              <View style={styles.personInfo}>
                <Text style={styles.personName} color="textPrimary">{person.name}</Text>
                <Text style={styles.personDetails} color="textSecondary">{person.phone}</Text>
              </View>
              <View style={styles.dateInfo}>
                <Text style={styles.dateText} color="textSecondary">{formatDate(person.date)}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  peopleList: {
    gap: 12,
  },
  personItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  personDetails: {
    fontSize: 14,
  },
  dateInfo: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
