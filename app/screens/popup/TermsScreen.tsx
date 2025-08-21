import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, Button, Divider } from '@/app/common/components/ui';
import { CommonHeader } from '@/app/common/components/headers';
import { Colors } from '@/constants/Colors';

export default function TermsScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <CommonHeader
        title="Terms of Service"
        variant="default"
        onBackPress={handleBackPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text variant="caption" color="textTertiary" style={styles.lastUpdated}>
          Last updated: August 2024
        </Text>

        <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
          Acceptance of Terms
        </Text>
        
        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          By accessing and using Smar8Manage, you accept and agree to be bound by the terms and 
          provision of this agreement. If you do not agree to abide by the above, please do not 
          use this service.
        </Text>

        <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
          Description of Service
        </Text>
        
        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          Smar8Manage is a digital identity and document management platform that provides 
          services for managing people, buildings, and room allocations. Our service includes 
          document scanning, identity verification, and administrative management tools.
        </Text>

        <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
          User Accounts
        </Text>
        
        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          To access certain features of Smar8Manage, you must create an account. You are 
          responsible for maintaining the confidentiality of your account credentials and for 
          all activities that occur under your account.
        </Text>

        <View style={styles.bulletList}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              You must provide accurate and complete information when creating your account
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              You are responsible for all activities under your account
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              You must notify us immediately of any unauthorized use of your account
            </Text>
          </View>
        </View>

        <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
          Acceptable Use
        </Text>
        
        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          You agree to use Smar8Manage only for lawful purposes and in accordance with these 
          Terms of Service. You agree not to use the service:
        </Text>

        <View style={styles.bulletList}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              To violate any applicable laws or regulations
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              To infringe upon the rights of others
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              To upload or transmit malicious code or harmful content
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text variant="body" color="textSecondary" style={styles.bulletText}>
              To attempt to gain unauthorized access to our systems
            </Text>
          </View>
        </View>

        <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
          Data and Privacy
        </Text>
        
        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          Your privacy is important to us. Our collection and use of personal information 
          is governed by our Privacy Policy, which is incorporated into these Terms of Service.
        </Text>

        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          By using Smar8Manage, you consent to the collection and use of your information 
          as described in our Privacy Policy.
        </Text>

        <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
          Intellectual Property
        </Text>
        
        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          Smar8Manage and its original content, features, and functionality are owned by 
          Smar8 Technologies and are protected by international copyright, trademark, patent, 
          trade secret, and other intellectual property laws.
        </Text>

        <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
          Limitation of Liability
        </Text>
        
        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          In no event shall Smar8 Technologies be liable for any indirect, incidental, 
          special, consequential, or punitive damages, including without limitation, loss 
          of profits, data, use, goodwill, or other intangible losses.
        </Text>

        <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
          Service Availability
        </Text>
        
        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          We strive to maintain high availability of our service, but we do not guarantee 
          that Smar8Manage will be available at all times. We may suspend or discontinue 
          the service at any time with reasonable notice.
        </Text>

        <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
          Termination
        </Text>
        
        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          We may terminate or suspend your account and access to Smar8Manage immediately, 
          without prior notice, for any reason, including breach of these Terms of Service.
        </Text>

        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          Upon termination, your right to use the service will cease immediately, and we 
          may delete your account and data.
        </Text>

        <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
          Changes to Terms
        </Text>
        
        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          We reserve the right to modify these Terms of Service at any time. We will notify 
          users of any material changes via email or through the app. Your continued use of 
          Smar8Manage after such modifications constitutes acceptance of the updated terms.
        </Text>

        <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
          Governing Law
        </Text>
        
        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          These Terms of Service shall be governed by and construed in accordance with the 
          laws of India. Any disputes arising from these terms shall be subject to the 
          exclusive jurisdiction of the courts in Calicut, Kerala, India.
        </Text>

        <Text variant="h3" color="textPrimary" style={styles.sectionTitle}>
          Contact Information
        </Text>
        
        <Text variant="body" color="textSecondary" style={styles.paragraph}>
          If you have any questions about these Terms of Service, please contact us:
        </Text>

        <View style={styles.contactInfo}>
          <Text variant="body" color="textPrimary" style={styles.contactLabel}>
            Email:
          </Text>
          <Text variant="body" color="primary" style={styles.contactValue}>
            Contact@Smar8.com
          </Text>
          
          <Text variant="body" color="textPrimary" style={styles.contactLabel}>
            Phone:
          </Text>
          <Text variant="body" color="primary" style={styles.contactValue}>
            +91 9048235416
          </Text>
          
          <Text variant="body" color="textPrimary" style={styles.contactLabel}>
            Address:
          </Text>
          <Text variant="body" color="textSecondary" style={styles.contactValue}>
            Ground floor, Alfaris Building{'\n'}
            Rec Chundappurama Road{'\n'}
            Koduvally, Calicut{'\n'}
            Kerala, India 673572
          </Text>
        </View>

        <Text variant="caption" color="textTertiary" style={styles.disclaimer}>
          These terms constitute the entire agreement between you and Smar8 Technologies 
          regarding the use of Smar8Manage.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  lastUpdated: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  sectionTitle: {
    marginTop: 25,
    marginBottom: 15,
    fontWeight: '600',
  },
  paragraph: {
    marginBottom: 15,
    lineHeight: 22,
  },
  bulletList: {
    marginBottom: 20,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: Colors.primary,
    marginRight: 10,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    lineHeight: 20,
  },
  contactInfo: {
    backgroundColor: Colors.lightBackground,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  contactLabel: {
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  contactValue: {
    marginBottom: 15,
    lineHeight: 20,
  },
  disclaimer: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    fontStyle: 'italic',
    lineHeight: 18,
  },
});
