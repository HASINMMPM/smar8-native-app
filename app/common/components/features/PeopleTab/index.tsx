import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@/app/common/components/ui';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

type Person = {
  id: string;
  name: string;
  phone: string;
  date: string;
  room: string;
  profilePic: string;
};

interface PeopleTabProps {
  searchQuery: string;
  isSelectionMode: boolean;
  selectedItems: Set<string>;
  onItemPress: (itemId: string) => void;
  onItemLongPress: (itemId: string) => void;
}

export default function PeopleTab({
  searchQuery,
  isSelectionMode,
  selectedItems,
  onItemPress,
  onItemLongPress,
}: PeopleTabProps) {
  // People data - moved from DashboardScreen
  const peopleData = useMemo(() => [
    { id: '1', name: 'John Doe', phone: '+1 234 567 890', date: '2024-01-15', room: '101', profilePic: 'person1' },
    { id: '2', name: 'Jane Smith', phone: '+1 234 567 891', date: '2024-01-10', room: '102', profilePic: 'person2' },
    { id: '3', name: 'Mike Johnson', phone: '+1 234 567 892', date: '2024-01-05', room: '103', profilePic: 'person3' },
  ], []);

  // Filter people based on search query
  const filteredPeople = useMemo(() => {
    if (!searchQuery.trim()) {
      return peopleData;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return peopleData.filter(person => 
      person.name.toLowerCase().includes(query) ||
      person.phone.toLowerCase().includes(query) ||
      person.room.toLowerCase().includes(query)
    );
  }, [peopleData, searchQuery]);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderPersonItem = (person: Person) => {
    const isSelected = selectedItems.has(person.id);
    
    return (
      <TouchableOpacity 
        key={person.id} 
        style={[
          styles.personItem,
          isSelected && styles.selectedPersonItem
        ]}
        onPress={() => onItemPress(person.id)}
        onLongPress={() => onItemLongPress(person.id)}
        activeOpacity={0.7}
      >
        {isSelectionMode && (
          <View style={[styles.selectionIndicator, isSelected && styles.selectedIndicator]}>
            {isSelected && (<Text style={styles.checkmark}>✓</Text>)}
          </View>
        )}
        <View style={styles.profilePic}>
          <Ionicons name="person" size={24} color={Colors.primary} />
        </View>
        <View style={styles.content}>
          <View style={styles.mainInfo}>
            <Text variant="h3" color="textPrimary" style={styles.name}>{person.name}</Text>
            <Text variant="body" color="textSecondary" style={styles.phone}>{person.phone}</Text>
          </View>
          <View style={styles.sideInfo}>
            <Text variant="caption" color="textSecondary" style={styles.date}>{formatDate(person.date)}</Text>
            <Text variant="caption" color="primary" style={styles.room}>Room {person.room}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (filteredPeople.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text variant="body" color="textSecondary" style={styles.emptyText}>
          {searchQuery.trim() ? 'No people found matching your search.' : 'No people available.'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {filteredPeople.map(renderPersonItem)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  personItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
  },
  selectedPersonItem: {
    backgroundColor: Colors.lightBackground,
  },
  selectionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicator: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: Colors.textInverse,
    fontSize: 14,
    fontWeight: 'bold',
  },
  profilePic: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.lightBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainInfo: {
    flex: 1,
  },
  name: {
    marginBottom: 4,
    fontWeight: '600',
  },
  phone: {
    fontSize: 14,
  },
  sideInfo: {
    alignItems: 'flex-end',
  },
  date: {
    marginBottom: 4,
  },
  room: {
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
