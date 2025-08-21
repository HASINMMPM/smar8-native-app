import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import Text from './Text';

interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  rightText?: string;
  icon?: React.ReactNode;
  selected?: boolean;
}

interface ListProps {
  items: ListItem[];
  onItemPress?: (item: ListItem) => void;
  onItemLongPress?: (item: ListItem) => void;
  selectionMode?: boolean;
  emptyText?: string;
  emptySubtext?: string;
  style?: any;
}

export default function List({
  items,
  onItemPress,
  onItemLongPress,
  selectionMode = false,
  emptyText = 'No items available',
  emptySubtext = 'Try adding some items',
  style,
}: ListProps) {
  const renderListItem = (item: ListItem) => {
    return (
      <TouchableOpacity 
        key={item.id} 
        style={[
          styles.listItem,
          item.selected && styles.selectedListItem
        ]}
        onPress={() => onItemPress?.(item)}
        onLongPress={() => onItemLongPress?.(item)}
        activeOpacity={0.7}
      >
        {selectionMode && (
          <View style={[styles.selectionIndicator, item.selected && styles.selectedIndicator]}>
            {item.selected && <Text style={styles.checkmark}>✓</Text>}
          </View>
        )}
        
        {item.icon && (
          <View style={styles.iconContainer}>
            {item.icon}
          </View>
        )}
        
        <View style={styles.content}>
          <View style={styles.mainInfo}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            {item.rightText && (
              <Text style={styles.rightText}>{item.rightText}</Text>
            )}
          </View>
          
          {item.subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>{item.subtitle}</Text>
          )}
          
          {item.description && (
            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{emptyText}</Text>
      <Text style={styles.emptySubtext}>{emptySubtext}</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, style]}>
      {items.length > 0 ? (
        items.map(renderListItem)
      ) : (
        renderEmptyState()
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  selectedListItem: {
    backgroundColor: Colors.selectedItemBackground,
    borderRadius: 8,
  },
  selectionIndicator: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.textInverse,
    zIndex: 1,
  },
  selectedIndicator: {
    backgroundColor: Colors.textInverse,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  rightText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
});
