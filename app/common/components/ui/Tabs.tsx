import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Text from './Text';
import { Colors } from '@/constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

export interface TabItem {
  id: string;
  label: string;
  badge?: number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
  disabled?: boolean;
  style?: any;
  tabStyle?: any;
  activeTabStyle?: any;
  textStyle?: any;
  activeTextStyle?: any;
  indicatorStyle?: any;
}

export default function Tabs({
  tabs,
  activeTab,
  onTabPress,
  disabled = false,
  style,
  tabStyle,
  activeTabStyle,
  textStyle,
  activeTextStyle,
  indicatorStyle,
}: TabsProps) {
  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
  const tabWidth = screenWidth / tabs.length;

  return (
    <View style={[styles.container, style]}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          
          return (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                { width: tabWidth },
                tabStyle,
                isActive && styles.activeTab,
                isActive && activeTabStyle,
              ]}
              onPress={() => !disabled && onTabPress(tab.id)}
              disabled={disabled}
              activeOpacity={0.7}
            >
              <View style={styles.tabContent}>
                <Text
                  variant="button"
                  color={isActive ? 'primary' : 'textSecondary'}
                  style={[
                    styles.tabText,
                    textStyle,
                    isActive && styles.activeTabText,
                    isActive && activeTextStyle,
                  ]}
                >
                  {tab.label}
                </Text>
                {tab.badge && tab.badge > 0 && (
                  <View style={styles.badge}>
                    <Text variant="caption" color="textInverse" style={styles.badgeText}>
                      {tab.badge > 99 ? '99+' : tab.badge}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      
      {/* Active Indicator */}
      <View style={[styles.indicatorContainer, indicatorStyle]}>
        <View
          style={[
            styles.indicator,
            {
              width: tabWidth * 0.6, // 60% of tab width
              transform: [{ translateX: activeIndex * tabWidth + (tabWidth * 0.2) }], // Center in tab
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundSecondary,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  activeTab: {
    // Active tab styling if needed
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeTabText: {
    fontWeight: '600',
  },
  badge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  indicatorContainer: {
    height: 3,
    backgroundColor: 'transparent',
  },
  indicator: {
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
});
