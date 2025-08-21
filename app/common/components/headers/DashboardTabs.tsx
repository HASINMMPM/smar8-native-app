import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Tab {
  id: string;
  label: string;
}

interface DashboardTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
  disabled?: boolean;
}

export default function DashboardTabs({ tabs, activeTab, onTabPress, disabled = false }: DashboardTabsProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            activeTab === tab.id && styles.activeTab,
            disabled && styles.disabledTab
          ]}
          onPress={() => !disabled && onTabPress(tab.id)}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText,
              disabled && styles.disabledTabText
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  disabledTab: {
    opacity: 0.5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  disabledTabText: {
    color: Colors.textTertiary,
  },
});
