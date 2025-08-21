import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@/app/common/components/ui';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

type Room = {
  id: string;
  name: string;
  phone: string;
  date: string;
  room: string;
  profilePic: string;
};

interface RoomsTabProps {
  searchQuery: string;
  isSelectionMode: boolean;
  selectedItems: Set<string>;
  onItemPress: (itemId: string) => void;
  onItemLongPress: (itemId: string) => void;
  onRoomPress?: (room: Room) => void;
}

export default function RoomsTab({
  searchQuery,
  isSelectionMode,
  selectedItems,
  onItemPress,
  onItemLongPress,
  onRoomPress,
}: RoomsTabProps) {
  // Rooms data - moved from DashboardScreen
  const roomsData = useMemo(() => [
    { id: 'r1', name: 'Room 101', phone: '+1 234 567 896', date: '2024-01-22', room: '101', profilePic: 'room1' },
    { id: 'r2', name: 'Room 102', phone: '+1 234 567 897', date: '2024-01-21', room: '102', profilePic: 'room2' },
    { id: 'r3', name: 'Room 103', phone: '+1 234 567 898', date: '2024-01-19', room: '103', profilePic: 'room3' },
  ], []);

  // Filter rooms based on search query
  const filteredRooms = useMemo(() => {
    if (!searchQuery.trim()) {
      return roomsData;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return roomsData.filter(room => 
      room.name.toLowerCase().includes(query) ||
      room.phone.toLowerCase().includes(query) ||
      room.room.toLowerCase().includes(query)
    );
  }, [roomsData, searchQuery]);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderRoomItem = (room: Room) => {
    const isSelected = selectedItems.has(room.id);
    
    return (
      <TouchableOpacity 
        key={room.id} 
        style={[
          styles.roomItem,
          isSelected && styles.selectedRoomItem
        ]}
        onPress={() => {
          if (isSelectionMode) {
            onItemPress(room.id);
          } else if (onRoomPress) {
            onRoomPress(room);
          }
        }}
        onLongPress={() => onItemLongPress(room.id)}
        activeOpacity={0.7}
      >
        {isSelectionMode && (
          <View style={[styles.selectionIndicator, isSelected && styles.selectedIndicator]}>
            {isSelected && (<Text style={styles.checkmark}>✓</Text>)}
          </View>
        )}
        <View style={styles.roomIcon}>
          <MaterialIcons name="home" size={24} color={Colors.primary} />
        </View>
        <View style={styles.content}>
          <View style={styles.mainInfo}>
            <Text variant="h3" color="textPrimary" style={styles.name}>{room.name}</Text>
            <Text variant="body" color="textSecondary" style={styles.phone}>{room.phone}</Text>
          </View>
          <View style={styles.sideInfo}>
            <Text variant="caption" color="textSecondary" style={styles.date}>{formatDate(room.date)}</Text>
            <Text variant="caption" color="primary" style={styles.roomNumber}>Room {room.room}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (filteredRooms.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text variant="body" color="textSecondary" style={styles.emptyText}>
          {searchQuery.trim() ? 'No rooms found matching your search.' : 'No rooms available.'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {filteredRooms.map(renderRoomItem)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
  },
  selectedRoomItem: {
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
  roomIcon: {
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
  roomNumber: {
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
