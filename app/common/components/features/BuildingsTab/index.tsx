import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@/app/common/components/ui';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

type Building = {
  id: string;
  name: string;
  phone: string;
  date: string;
  profilePic: string;
};

interface BuildingsTabProps {
  searchQuery: string;
  isSelectionMode: boolean;
  selectedItems: Set<string>;
  onItemPress: (itemId: string) => void;
  onItemLongPress: (itemId: string) => void;
  onBuildingPress?: (building: Building) => void;
}

export default function BuildingsTab({
  searchQuery,
  isSelectionMode,
  selectedItems,
  onItemPress,
  onItemLongPress,
  onBuildingPress,
}: BuildingsTabProps) {
  // Buildings data - moved from DashboardScreen
  const buildingsData = useMemo(() => [
    { id: 'b1', name: 'Sunset Apartments', phone: '+1 234 567 893', date: '2024-01-20', profilePic: 'building1' },
    { id: 'b2', name: 'Ocean View Complex', phone: '+1 234 567 894', date: '2024-01-18', profilePic: 'building2' },
    { id: 'b3', name: 'Mountain Heights', phone: '+1 234 567 895', date: '2024-01-12', profilePic: 'building3' },
  ], []);

  // Filter buildings based on search query
  const filteredBuildings = useMemo(() => {
    if (!searchQuery.trim()) {
      return buildingsData;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return buildingsData.filter(building => 
      building.name.toLowerCase().includes(query) ||
      building.phone.toLowerCase().includes(query)
    );
  }, [buildingsData, searchQuery]);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderBuildingItem = (building: Building) => {
    const isSelected = selectedItems.has(building.id);
    
    return (
      <TouchableOpacity 
        key={building.id} 
        style={[
          styles.buildingItem,
          isSelected && styles.selectedBuildingItem
        ]}
        onPress={() => {
          if (isSelectionMode) {
            onItemPress(building.id);
          } else if (onBuildingPress) {
            onBuildingPress(building);
          }
        }}
        onLongPress={() => onItemLongPress(building.id)}
        activeOpacity={0.7}
      >
        {isSelectionMode && (
          <View style={[styles.selectionIndicator, isSelected && styles.selectedIndicator]}>
            {isSelected && (<Text style={styles.checkmark}>✓</Text>)}
          </View>
        )}
        <View style={styles.buildingIcon}>
          <MaterialIcons name="business" size={24} color={Colors.primary} />
        </View>
        <View style={styles.content}>
          <View style={styles.mainInfo}>
            <Text variant="h3" color="textPrimary" style={styles.name}>{building.name}</Text>
            <Text variant="body" color="textSecondary" style={styles.phone}>{building.phone}</Text>
          </View>
          <View style={styles.sideInfo}>
            <Text variant="caption" color="textSecondary" style={styles.date}>{formatDate(building.date)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (filteredBuildings.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text variant="body" color="textSecondary" style={styles.emptyText}>
          {searchQuery.trim() ? 'No buildings found matching your search.' : 'No buildings available.'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {filteredBuildings.map(renderBuildingItem)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buildingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
  },
  selectedBuildingItem: {
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
  buildingIcon: {
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
