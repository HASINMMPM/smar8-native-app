import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { CommonHeader } from '@/app/common/components/headers';
import { Button, Text, Divider } from '@/app/common/components/ui';

interface UPIApp {
  id: string;
  name: string;
  icon: string;
  color: string;
  isPopular?: boolean;
}

const UPI_APPS: UPIApp[] = [
  { id: 'gpay', name: 'Google Pay', icon: 'logo-google', color: '#4285F4', isPopular: true },
  { id: 'phonepe', name: 'PhonePe', icon: 'phone-portrait', color: '#5F259F', isPopular: true },
  { id: 'paytm', name: 'Paytm', icon: 'wallet', color: '#00BAF2', isPopular: true },
  { id: 'amazonpay', name: 'Amazon Pay', icon: 'logo-amazon', color: '#FF9900' },
  { id: 'bhim', name: 'BHIM', icon: 'card', color: '#FF6B35' },
  { id: 'whatsapp', name: 'WhatsApp Pay', icon: 'logo-whatsapp', color: '#25D366' },
  { id: 'icici', name: 'ICICI iPay', icon: 'business', color: '#FF6B35' },
  { id: 'hdfc', name: 'HDFC PayZapp', icon: 'card', color: '#FF6B35' },
];

export default function PaymentScreen() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [selectedUPI, setSelectedUPI] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Payment details - these would come from your business logic
  const paymentDetails = {
    amount: 299.00,
    currency: 'INR',
    description: 'Document Processing Fee',
    service: 'Smart8 Document Management',
    orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    timestamp: new Date().toLocaleString(),
  };

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Time expired - show alert and redirect
      Alert.alert(
        'Session Expired',
        'Payment session has expired. Please try again.',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    }
  }, [timeLeft, router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleUPISelection = (upiId: string) => {
    setSelectedUPI(upiId);
  };

  const handleProceedToPayment = () => {
    if (!selectedUPI) {
      Alert.alert('Select Payment Method', 'Please select a payment method to continue');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Payment Initiated',
        `Redirecting to ${UPI_APPS.find(app => app.id === selectedUPI)?.name}...`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Here you would typically redirect to the actual UPI app
              // For now, we'll just show a success message
              Alert.alert(
                'Success',
                'Payment completed successfully!',
                [
                  {
                    text: 'Done',
                    onPress: () => router.push('/screens/core/DashboardScreen')
                  }
                ]
              );
            }
          }
        ]
      );
    }, 2000);
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <CommonHeader
        title="Secure Payment"
        variant="default"
        onBackPress={handleBackPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Payment Amount Section */}
        <View style={styles.amountSection}>
          <View style={styles.amountContainer}>
            <Text variant="caption" color="textSecondary" style={styles.currencyLabel}>
              {paymentDetails.currency}
            </Text>
            <Text variant="h1" style={styles.amountText}>
              {paymentDetails.amount.toFixed(2)}
            </Text>
            <Text variant="body" color="textSecondary" style={styles.descriptionText}>
              {paymentDetails.description}
            </Text>
          </View>
          
          {/* Timer */}
          <View style={styles.timerContainer}>
            <Ionicons name="time-outline" size={16} color={Colors.warning} />
            <Text variant="caption" color="warning" style={styles.timerText}>
              Session expires in {formatTime(timeLeft)}
            </Text>
          </View>
        </View>

        {/* Payment Details Card */}
        <View style={styles.detailsCard}>
          <Text variant="h3" style={styles.cardTitle}>
            Payment Details
          </Text>
          
          <View style={styles.detailRow}>
            <Text variant="body" color="textSecondary">Service</Text>
            <Text variant="body" style={styles.detailValue}>{paymentDetails.service}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text variant="body" color="textSecondary">Order ID</Text>
            <Text variant="body" style={styles.detailValue}>{paymentDetails.orderId}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text variant="body" color="textSecondary">Date & Time</Text>
            <Text variant="body" style={styles.detailValue}>{paymentDetails.timestamp}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text variant="body" color="textSecondary">Amount</Text>
            <Text variant="h3" color="primary" style={styles.detailValue}>
              ₹{paymentDetails.amount.toFixed(2)}
            </Text>
          </View>
        </View>

        <Divider />

        {/* Payment Methods Section */}
        <View style={styles.paymentMethodsSection}>
          <Text variant="h3" style={styles.sectionTitle}>
            Choose Payment Method
          </Text>
          
          <View style={styles.upiGrid}>
            {UPI_APPS.map((app) => (
              <TouchableOpacity
                key={app.id}
                style={[
                  styles.upiAppItem,
                  selectedUPI === app.id && styles.selectedUPIApp
                ]}
                onPress={() => handleUPISelection(app.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.appIcon, { backgroundColor: app.color }]}>
                  <Ionicons name={app.icon as any} size={20} color={Colors.textInverse} />
                </View>
                <Text variant="body" style={styles.appName} numberOfLines={1}>
                  {app.name}
                </Text>
                {app.isPopular && (
                  <View style={styles.popularBadge}>
                    <Text variant="caption" color="textInverse" style={styles.popularText}>
                      Popular
                    </Text>
                  </View>
                )}
                {selectedUPI === app.id && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Security & Trust Section */}
        <View style={styles.securitySection}>
          <View style={styles.securityRow}>
            <Ionicons name="shield-checkmark" size={20} color={Colors.success} />
            <Text variant="body" color="textSecondary" style={styles.securityText}>
              Secure payment powered by UPI
            </Text>
          </View>
          <View style={styles.securityRow}>
            <Ionicons name="lock-closed" size={20} color={Colors.primary} />
            <Text variant="body" color="textSecondary" style={styles.securityText}>
              Your payment information is encrypted
            </Text>
          </View>
        </View>

        {/* Payment Button */}
        <View style={styles.paymentButtonContainer}>
          <Button
            title={isProcessing ? "Processing Payment..." : "Pay ₹299.00"}
            onPress={handleProceedToPayment}
            variant="primary"
            size="large"
            loading={isProcessing}
            disabled={!selectedUPI || isProcessing}
            style={styles.paymentButton}
          />
        </View>

        {/* Terms & Conditions */}
        <View style={styles.termsSection}>
          <Text variant="caption" color="textSecondary" style={styles.termsText}>
            By proceeding, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  
  amountSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: Colors.background,
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  
  amountContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  
  currencyLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  
  amountText: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 8,
  },
  
  descriptionText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  
  timerText: {
    marginLeft: 6,
    fontWeight: '600',
    fontSize: 12,
  },
  
  detailsCard: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  
  cardTitle: {
    marginBottom: 16,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  
  detailValue: {
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  
  paymentMethodsSection: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  
  sectionTitle: {
    marginBottom: 20,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  
  upiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  upiAppItem: {
    width: '48%',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.transparent,
    position: 'relative',
    minHeight: 80,
  },
  
  selectedUPIApp: {
    borderColor: Colors.primary,
    backgroundColor: Colors.lightBackground,
  },
  
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  appName: {
    textAlign: 'center',
    fontWeight: '500',
    color: Colors.textPrimary,
    fontSize: 13,
  },
  
  popularBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  
  popularText: {
    fontSize: 9,
    fontWeight: '600',
  },
  
  selectedIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  
  securitySection: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  securityText: {
    marginLeft: 12,
    fontSize: 14,
  },
  
  paymentButtonContainer: {
    paddingVertical: 16,
  },
  
  paymentButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
  },
  
  termsSection: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  
  termsText: {
    textAlign: 'center',
    lineHeight: 18,
    fontSize: 12,
  },
});
