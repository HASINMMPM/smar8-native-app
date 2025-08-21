import { CommonHeader } from '@/app/common/components/headers';
import Button from '@/app/common/components/ui/Button';
import Input from '@/app/common/components/ui/Input';
import { Colors } from '@/constants/Colors';
import * as FileSystem from 'expo-file-system';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { AadhaarOCRService } from '../../OCR';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface AadhaarData {
  name: string;
  fatherName: string;
  dateOfBirth: string;
  gender: string;
  aadhaarNumber: string;
  address: string;
}

export default function DocumentReview() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const { 
    frontPhotoUri, 
    backPhotoUri, 
    personPhotoUri
  } = useLocalSearchParams<{ 
    frontPhotoUri: string;
    backPhotoUri: string;
    personPhotoUri?: string;
  }>();

  const [aadhaarData, setAadhaarData] = useState<AadhaarData>({
    name: '',
    fatherName: '',
    dateOfBirth: '',
    gender: '',
    aadhaarNumber: '',
    address: '',
  });

  const [isExtracting, setIsExtracting] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  // Extract data from photos when component mounts
  useEffect(() => {
    console.log('DocumentReview - useEffect triggered');
    console.log('DocumentReview - frontPhotoUri:', frontPhotoUri);
    console.log('DocumentReview - backPhotoUri:', backPhotoUri);
    
    if (frontPhotoUri && backPhotoUri) {
      console.log('DocumentReview - Both URIs available, starting extraction');
      // Add a small delay to ensure URIs are fully loaded
      setTimeout(() => {
        extractDataFromPhotos();
      }, 100);
    } else {
      console.log('DocumentReview - Missing URIs, cannot extract');
    }
  }, [frontPhotoUri, backPhotoUri]);

  // Monitor state changes for debugging
  useEffect(() => {
    console.log('DocumentReview - aadhaarData state changed:', aadhaarData);
  }, [aadhaarData]);

  const extractDataFromPhotos = async () => {
    if (!frontPhotoUri || !backPhotoUri) {
      console.log('DocumentReview - Missing URIs, cannot extract');
      console.log('DocumentReview - frontPhotoUri:', frontPhotoUri);
      console.log('DocumentReview - backPhotoUri:', backPhotoUri);
      return;
    }
    
    setIsExtracting(true);
    console.log('DocumentReview - Starting data extraction from photos...');
    console.log('DocumentReview - Using frontPhotoUri:', frontPhotoUri);
    console.log('DocumentReview - Using backPhotoUri:', backPhotoUri);
    
    try {
      // Validate that files exist before processing
      console.log('DocumentReview - Validating file existence...');
      
      try {
        const frontFileInfo = await FileSystem.getInfoAsync(frontPhotoUri);
        console.log('DocumentReview - Front file info:', frontFileInfo);
        
        if (!frontFileInfo.exists) {
          console.error('DocumentReview - Front photo file does not exist!');
          throw new Error('Front photo file not found');
        }
        
        const backFileInfo = await FileSystem.getInfoAsync(backPhotoUri);
        console.log('DocumentReview - Back file info:', backFileInfo);
        
        if (!backFileInfo.exists) {
          console.error('DocumentReview - Back photo file does not exist!');
          throw new Error('Back photo file not found');
        }
        
        console.log('DocumentReview - Both files exist and are accessible');
      } catch (fileCheckError) {
        console.error('DocumentReview - File validation failed:', fileCheckError);
        throw new Error(`File validation failed: ${fileCheckError instanceof Error ? fileCheckError.message : 'Unknown error'}`);
      }
      
      const aadhaarOCRService = new AadhaarOCRService();
      console.log('DocumentReview - AadhaarOCRService created');
      
      // Extract front side data
      console.log('DocumentReview - Calling extractFrontSide...');
      const frontResponse = await aadhaarOCRService.extractFrontSide(frontPhotoUri);
      console.log('DocumentReview - Front response received:', frontResponse);
      
      if (frontResponse.data) {
        console.log('Front side extraction successful (data available):', frontResponse.data);
        
        // Extract back side data
        console.log('DocumentReview - Calling extractBackSide...');
        const backResponse = await aadhaarOCRService.extractBackSide(backPhotoUri);
        console.log('DocumentReview - Back response received:', backResponse);
        
        if (backResponse.data) {
          console.log('Back side extraction successful (data available):', backResponse.data);
          
          // Combine the data
          const combinedData = {
            name: frontResponse.data.name || '',
            fatherName: frontResponse.data.fatherName || '',
            dateOfBirth: frontResponse.data.dateOfBirth || '',
            gender: frontResponse.data.gender || '',
            aadhaarNumber: frontResponse.data.aadhaarNumber || '',
            address: backResponse.data.address || '',
          };
          
          console.log('Combined extracted data:', combinedData);
          setAadhaarData(combinedData);
          console.log('DocumentReview - State updated with combined data');
          
        } else {
          console.log('Back side extraction failed (no data):', backResponse.message);
          // Still update with front data
          const partialData = {
            name: frontResponse.data.name || '',
            fatherName: frontResponse.data.fatherName || '',
            dateOfBirth: frontResponse.data.dateOfBirth || '',
            gender: frontResponse.data.gender || '',
            aadhaarNumber: frontResponse.data.aadhaarNumber || '',
            address: '',
          };
          console.log('Setting partial data (front only):', partialData);
          setAadhaarData(partialData);
          console.log('DocumentReview - State updated with partial data (front only)');
        }
      } else {
        console.log('Front side extraction failed (no data):', frontResponse.message);
        console.log('Front response details:', frontResponse);
        
        // Try to extract back side anyway
        console.log('DocumentReview - Trying back side extraction as fallback...');
        const backResponse = await aadhaarOCRService.extractBackSide(backPhotoUri);
        console.log('DocumentReview - Back response (fallback):', backResponse);
        
        if (backResponse.data) {
          const partialData = {
            name: '',
            fatherName: '',
            dateOfBirth: '',
            gender: '',
            aadhaarNumber: '',
            address: backResponse.data.address || '',
          };
          console.log('Setting partial data (back only):', partialData);
          setAadhaarData(partialData);
          console.log('DocumentReview - State updated with partial data (back only)');
        }
      }
      
      // Clean up photos after extraction (optional - to save storage)
      // REMOVED: Don't clean up photos automatically - user might want to retry extraction
      // Photos will be cleaned up when user confirms data or navigates away
      console.log('DocumentReview - Photos kept for potential re-extraction');
      
    } catch (error) {
      console.error('Error extracting data from photos:', error);
      console.error('Error details:', error);
      
      // Provide user-friendly error message
      if (error instanceof Error) {
        if (error.message.includes('File validation failed')) {
          console.error('File validation error - photos may have been moved or deleted');
        } else if (error.message.includes('FileNotFoundException') || error.message.includes('ENOENT')) {
          console.error('File not found error - photos are not accessible');
        } else if (error.message.includes('Permission denied')) {
          console.error('Permission error - app may not have access to photo files');
        }
      }
    } finally {
      setIsExtracting(false);
      console.log('DocumentReview - Extraction completed, isExtracting set to false');
    }
  };

  const goBack = () => {
    // Clean up photos before navigating away
    cleanupPhotos();
    router.push('/screens/document/PhotoCaptureScreen');
  };

  const handleContinue = () => {
    // Clean up photos before navigating away
    cleanupPhotos();
    // Navigate to payment screen
    router.push('/screens/core/PaymentScreen');
  };

  const cleanupPhotos = async () => {
    try {
      console.log('DocumentReview - Cleaning up photos before navigation...');
      if (frontPhotoUri && frontPhotoUri.startsWith('file://')) {
        await FileSystem.deleteAsync(frontPhotoUri);
        console.log('Front photo cleaned up');
      }
      if (backPhotoUri && backPhotoUri.startsWith('file://')) {
        await FileSystem.deleteAsync(backPhotoUri);
        console.log('Back photo cleaned up');
      }
      if (personPhotoUri && personPhotoUri.startsWith('file://')) {
        await FileSystem.deleteAsync(personPhotoUri);
        console.log('Person photo cleaned up');
      }
    } catch (cleanupError) {
      console.log('Photo cleanup failed (non-critical):', cleanupError);
    }
  };

  const updateField = (field: keyof AadhaarData, value: string) => {
    console.log(`DocumentReview - Updating field ${field} to: "${value}"`);
    setAadhaarData(prev => {
      const newState = {
        ...prev,
        [field]: value
      };
      console.log(`DocumentReview - New state after ${field} update:`, newState);
      return newState;
    });
  };

  const handleFieldFocus = (fieldName: string) => {
    setActiveField(fieldName);
    // Scroll to the field when it's focused
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, 100);
  };

  const handleFieldBlur = () => {
    setActiveField(null);
  };

  // Helper function to format date for display
  const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return '';
    
    // If it's already in plain text format, return as is
    if (dateString.includes(' ') && !dateString.includes('/') && !dateString.includes('-')) {
      return dateString;
    }
    
    // If it's in DD/MM/YYYY format, convert to plain text
    const dateMatch = dateString.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (dateMatch) {
      const day = parseInt(dateMatch[1]);
      const month = parseInt(dateMatch[2]);
      const year = parseInt(dateMatch[3]);
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return `${day} ${months[month - 1]} ${year}`;
    }
    
    return dateString;
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <CommonHeader
        title="Review Aadhaar Data"
        variant="default"
        onBackPress={goBack}
        backIcon="arrow"
      />

      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Photos Section */}
        <View style={styles.photosSection}>
          <Text style={styles.sectionTitle}>📸 Captured Photos</Text>
          <View style={styles.photosRow}>
            <View style={styles.photoContainer}>
              <Image source={{ uri: frontPhotoUri }} style={styles.photo} resizeMode="cover" />
              <Text style={styles.photoLabel}>Front Side</Text>
            </View>
            <View style={styles.photoContainer}>
              <Image source={{ uri: backPhotoUri }} style={styles.photo} resizeMode="cover" />
              <Text style={styles.photoLabel}>Back Side</Text>
            </View>
            <View style={styles.photoContainer}>
              {personPhotoUri ? (
                <Image source={{ uri: personPhotoUri }} style={styles.photo} resizeMode="cover" />
              ) : (
                <View style={styles.noPhotoPlaceholder}>
                  <Text style={styles.noPhotoText}>No Photo</Text>
                </View>
              )}
              <Text style={styles.photoLabel}>Person</Text>
            </View>
          </View>
        </View>

        {/* Aadhaar Information Section */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>🆔 Aadhaar Information</Text>
          
          {isExtracting && (
            <View style={styles.extractingSection}>
              <Text style={styles.extractingText}>
                🔍 Extracting data from photos... Please wait
              </Text>
            </View>
          )}
          
          <View style={styles.infoGrid}>
            {/* Full Name Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <Input
                value={aadhaarData.name}
                onChangeText={(value) => updateField('name', value)}
                placeholder="Enter full name"
                style={[styles.inputField, activeField === 'name' && styles.activeInputField]}
                autoCapitalize="words"
                autoCorrect={false}
                onFocus={() => handleFieldFocus('name')}
                onBlur={handleFieldBlur}
              />
            </View>

            {/* Father's Name Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Father's Name</Text>
              <Input
                value={aadhaarData.fatherName}
                onChangeText={(value) => updateField('fatherName', value)}
                placeholder="Enter father's name"
                style={[styles.inputField, activeField === 'fatherName' && styles.activeInputField]}
                autoCapitalize="words"
                autoCorrect={false}
                onFocus={() => handleFieldFocus('fatherName')}
                onBlur={handleFieldBlur}
              />
            </View>

            {/* Date of Birth Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Date of Birth</Text>
              <Input
                value={aadhaarData.dateOfBirth}
                onChangeText={(value) => updateField('dateOfBirth', value)}
                placeholder="e.g., 15 July 1991 or Year 1991"
                style={[styles.inputField, activeField === 'dateOfBirth' && styles.activeInputField]}
                autoCapitalize="words"
                autoCorrect={false}
                onFocus={() => handleFieldFocus('dateOfBirth')}
                onBlur={handleFieldBlur}
              />
              <View style={styles.helpTextContainer}>
                <Text style={styles.helpText}>
                  💡 Date will be automatically converted to plain text format
                </Text>
              </View>
            </View>

            {/* Gender Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Gender</Text>
              <Input
                value={aadhaarData.gender}
                onChangeText={(value) => updateField('gender', value)}
                placeholder="Male/Female"
                style={[styles.inputField, activeField === 'gender' && styles.activeInputField]}
                autoCapitalize="words"
                autoCorrect={false}
                onFocus={() => handleFieldFocus('gender')}
                onBlur={handleFieldBlur}
              />
            </View>

            {/* Aadhaar Number Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Aadhaar Number</Text>
              <Input
                value={aadhaarData.aadhaarNumber}
                onChangeText={(value) => updateField('aadhaarNumber', value)}
                placeholder="12-digit Aadhaar number"
                style={[styles.inputField, activeField === 'aadhaarNumber' && styles.activeInputField]}
                keyboardType="numeric"
                maxLength={12}
                onFocus={() => handleFieldFocus('aadhaarNumber')}
                onBlur={handleFieldBlur}
              />
            </View>

            {/* Address Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Address</Text>
              <Input
                value={aadhaarData.address}
                onChangeText={(value) => updateField('address', value)}
                placeholder="Enter full address"
                style={[styles.inputField, styles.addressInputField, activeField === 'address' && styles.activeInputField]}
                autoCapitalize="sentences"
                autoCorrect={false}
                multiline={true}
                numberOfLines={4}
                onFocus={() => handleFieldFocus('address')}
                onBlur={handleFieldBlur}
              />
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonSection}>
          <Button
            title="Continue to Payment"
            onPress={handleContinue}
            style={styles.continueButton}
            textStyle={styles.continueButtonText}
          />
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 20,
  },
  photosSection: {
    padding: 24,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  photosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  photoContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  photo: {
    width: screenWidth * 0.22,
    height: screenWidth * 0.22,
    borderRadius: 8,
    marginBottom: 8,
  },
  noPhotoPlaceholder: {
    width: screenWidth * 0.22,
    height: screenWidth * 0.22,
    borderRadius: 8,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  noPhotoText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  photoLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  infoSection: {
    padding: 24,
    backgroundColor: Colors.background,
  },
  infoGrid: {
    gap: 24,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
    marginLeft: 4,
  },
  inputField: {
    width: '100%',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.backgroundSecondary,
    color: Colors.textPrimary,
  },
  activeInputField: {
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: Colors.background,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addressInputField: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 16,
  },
  helpTextContainer: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  helpText: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'left',
    fontStyle: 'italic',
  },
  extractingSection: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    marginBottom: 24,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  extractingText: {
    fontSize: 15,
    color: '#1976d2',
    textAlign: 'center',
    fontWeight: '500',
  },
  successSection: {
    backgroundColor: '#d4edda',
    padding: 20,
    marginBottom: 24,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
  },
  successText: {
    fontSize: 15,
    color: '#155724',
    textAlign: 'center',
    fontWeight: '500',
  },
  buttonSection: {
    padding: 24,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  continueButtonText: {
    color: Colors.textInverse,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 40,
  },
});
