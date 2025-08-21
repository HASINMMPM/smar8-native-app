import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Text, Popup } from '@/app/common/components/ui';

import CommonHeader from '@/app/common/components/headers/CommonHeader';
import DashboardTabs from '@/app/common/components/headers/DashboardTabs';
import { PeopleTab, BuildingsTab, RoomsTab } from '@/app/common/components/features';

import { Colors } from '@/constants/Colors';

type TabType = 'current' | 'building' | 'room';

export default function DashboardScreen() {
  console.log('DashboardScreen is rendering...');
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('current');
  const [selectedItems, setSelectedItems] = useState<Map<TabType, Set<string>>>(new Map());
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Tabs configuration
  const tabs = useMemo(() => [
    { id: 'current', label: 'People' },
    { id: 'building', label: 'Buildings' },
    { id: 'room', label: 'Rooms' },
  ], []);

  // Auto-manage selection mode based on selected items
  useEffect(() => {
    const currentTabSelections = selectedItems.get(activeTab) || new Set();
    if (isSelectionMode && currentTabSelections.size === 0) {
      console.log('Auto-resetting selection mode - no items selected');
      setIsSelectionMode(false);
    }
  }, [selectedItems, activeTab, isSelectionMode]);

  // Handle tab change
  const handleTabChange = (newTab: string) => {
    if (isSelectionMode) {
      return; // Disable tab switching only during selection mode
    }
    setActiveTab(newTab as TabType);
    setSelectedItems(new Map());
    setIsSelectionMode(false);
  };

  // Handle item press
  const handleItemPress = (itemId: string) => {
    if (isSelectionMode) {
      const currentTabSelections = new Set(selectedItems.get(activeTab) || []);
      if (currentTabSelections.has(itemId)) {
        currentTabSelections.delete(itemId);
      } else {
        currentTabSelections.add(itemId);
      }
      
      // Create a new Map with the updated selections
      const newSelected = new Map(selectedItems);
      newSelected.set(activeTab, currentTabSelections);
      setSelectedItems(newSelected);
      
      // If no items selected, exit selection mode
      if (currentTabSelections.size === 0) {
        console.log('No items selected, exiting selection mode');
        setIsSelectionMode(false);
      }
    } else {
      console.log('Item pressed:', itemId);
    }
  };

  // Handle item long press
  const handleItemLongPress = (itemId: string) => {
    if (!isSelectionMode) {
      setIsSelectionMode(true);
    }
    const currentTabSelections = new Set(selectedItems.get(activeTab) || []);
    currentTabSelections.add(itemId);
    
    // Create a new Map with the updated selections
    const newSelected = new Map(selectedItems);
    newSelected.set(activeTab, currentTabSelections);
    setSelectedItems(newSelected);
  };

  const handleBackPress = () => {
    setIsSelectionMode(false);
    setSelectedItems(new Map());
    // If we're in search mode, also close search
    if (isSearchActive) {
      setIsSearchActive(false);
      setSearchQuery('');
    }
  };

  const handleForwardPress = () => {
    console.log('Forward pressed for items:', Array.from(selectedItems.get(activeTab) || []));
    // TODO: Implement forward functionality
  };

  const handleDeletePress = () => {
    console.log('Delete pressed for items:', Array.from(selectedItems.get(activeTab) || []));
    setIsSelectionMode(false);
    setSelectedItems(new Map());
    // TODO: Implement actual delete functionality
  };

  const handleMenuPress = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleMenuClose = () => {
    setIsMenuVisible(false);
  };

  // Handle user plus button press - navigate to document selection
  const handleUserPlusPress = () => {
    console.log('User Plus pressed - navigating to DocumentSelectScreen');
    router.push('/screens/document/DocumentSelectScreen');
  };

  // Handle building press - navigate to BuildingsScreen
  const handleBuildingPress = (building: any) => {
    console.log('Building pressed:', building.name);
    router.push('/screens/Dashboard/BuildingsScreen');
  };

  // Handle room press - navigate to RoomsScreen
  const handleRoomPress = (room: any) => {
    console.log('Room pressed:', room.name);
    router.push('/screens/Dashboard/RoomsScreen');
  };

  // Handle search button press - toggle search on/off
  const handleSearchPress = () => {
    if (isSearchActive) {
      // If search is already active, close it
      setIsSearchActive(false);
      setSearchQuery('');
    } else {
      // If search is not active, open it
      setIsSearchActive(true);
      setSearchQuery('');
    }
  };

  // Handle search query change
  const handleSearchQueryChange = (text: string) => {
    setSearchQuery(text);
  };

  const renderTabContent = () => {
    const currentTabSelections = selectedItems.get(activeTab) || new Set();
    
    switch (activeTab) {
      case 'current':
        return (
          <PeopleTab
            searchQuery={searchQuery}
            isSelectionMode={isSelectionMode}
            selectedItems={currentTabSelections}
            onItemPress={handleItemPress}
            onItemLongPress={handleItemLongPress}
          />
        );
      case 'building':
        return (
          <BuildingsTab
            searchQuery={searchQuery}
            isSelectionMode={isSelectionMode}
            selectedItems={currentTabSelections}
            onItemPress={handleItemPress}
            onItemLongPress={handleItemLongPress}
            onBuildingPress={handleBuildingPress}
          />
        );
      case 'room':
        return (
          <RoomsTab
            searchQuery={searchQuery}
            isSelectionMode={isSelectionMode}
            selectedItems={currentTabSelections}
            onItemPress={handleItemPress}
            onItemLongPress={handleItemLongPress}
            onRoomPress={handleRoomPress}
          />
        );
      default:
        return null;
    }
  };

  // Menu items for popup
  const menuItems = [
    {
      id: 'settings',
      title: 'Settings',
      onPress: () => {
        setIsMenuVisible(false);
        router.push('/screens/popup/SettingsScreen');
      },
    },
    {
      id: 'privacy',
      title: 'Privacy',
      onPress: () => {
        setIsMenuVisible(false);
        router.push('/screens/popup/PrivacyScreen');
      },
    },
    {
      id: 'about',
      title: 'About',
      onPress: () => {
        setIsMenuVisible(false);
        router.push('/screens/popup/AboutScreen');
      },
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      onPress: () => {
        setIsMenuVisible(false);
        router.push('/screens/popup/TermsScreen');
      },
    },
    {
      id: 'logout',
      title: 'Logout',
      onPress: () => {
        setIsMenuVisible(false);
        console.log('Logout pressed');
        router.replace('/screens/auth/LoginScreen');
      },
      destructive: true,
    },
  ];

  console.log('DashboardScreen render - Header props:', { isSelectionMode, selectedCount: (selectedItems.get(activeTab) || new Set()).size });

  // Safety check - ensure header props are always valid
  const headerSelectedCount = Math.max(0, (selectedItems.get(activeTab) || new Set()).size);
  const headerIsSelectionMode = Boolean(isSelectionMode);

  return (
    <View style={styles.container}>
      {/* Dashboard Header */}
      <CommonHeader
        title="SMAR8 MANAGE"
        variant="dashboard"
        onAddPress={handleUserPlusPress}
        onSearchPress={handleSearchPress}
        onMenuPress={handleMenuPress}
      />
      
      {/* Dashboard Tabs - Hidden during selection mode only */}
      {!isSelectionMode && (
        <DashboardTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={handleTabChange}
          disabled={false}
        />
      )}
      
      {/* Search Bar - Between tabs and content */}
      {isSearchActive && (
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor={Colors.textTertiary}
              value={searchQuery}
              onChangeText={handleSearchQueryChange}
              autoFocus={true}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                style={styles.searchCloseButton}
                onPress={() => handleSearchQueryChange('')}
                activeOpacity={0.7}
              >
                <Text style={styles.searchCloseButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      
      {/* Content */}
      <View style={styles.contentContainer}>
        {renderTabContent()}
      </View>
      
      {/* Render menu popup */}
      <Popup
        visible={isMenuVisible}
        onClose={handleMenuClose}
        items={menuItems}
        position="top-right"
      />

      {/* Delete confirmation popup */}
      {/* Removed delete confirmation popup */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  searchCloseButton: {
    padding: 8,
  },
  searchCloseButtonText: {
    fontSize: 20,
    color: Colors.textTertiary,
  },
});
