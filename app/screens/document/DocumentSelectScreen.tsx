import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, List } from '@/app/common/components/ui';
import { CommonHeader } from '@/app/common/components/headers';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function DocumentSelectScreen() {
  const router = useRouter();

  const handleDocumentTypePress = (item: any) => {
    console.log('Document type selected:', item.title);
    router.push('/screens/document/FrontScanScreen');
  };

  const documentTypes = [
    {
      id: 'id-card',
      title: 'ID Card',
      subtitle: 'National ID, State ID, or similar',
      icon: <Ionicons name="card-outline" size={24} color={Colors.textInverse} />,
    },
    {
      id: 'passport',
      title: 'Passport',
      subtitle: 'International passport or travel document',
      icon: <Ionicons name="document-text-outline" size={24} color={Colors.textInverse} />,
    },
    {
      id: 'driver-license',
      title: 'Driver License',
      subtitle: 'Driver\'s license or permit',
      icon: <Ionicons name="car-outline" size={24} color={Colors.textInverse} />,
    },
    {
      id: 'other',
      title: 'Other Document',
      subtitle: 'Any other type of document',
      icon: <Ionicons name="document-outline" size={24} color={Colors.textInverse} />,
    },
  ];

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/screens/core/DashboardScreen');
    }
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        title="Select Document Type"
        variant="default"
        onBackPress={handleBackPress}
        backIcon="text"
      />
      
      <View style={styles.content}>
        <List
          items={documentTypes}
          onItemPress={handleDocumentTypePress}
          style={styles.listContainer}
        />
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
  },
  listContainer: {
    paddingHorizontal: 0,
  },
});
