import { AadhaarData, BackSideExtraction, FrontSideExtraction, OCRResult } from '../types/aadhaarTypes';

export class AadhaarExtractionUtils {
  
  /**
   * Extract front side data from OCR results using simple text pattern matching
   */
  static extractFrontSideData(ocrResults: OCRResult[]): FrontSideExtraction {
    const extraction: FrontSideExtraction = {
      name: '',
      fatherName: '',
      dateOfBirth: '',
      gender: '',
      aadhaarNumber: '',
      confidence: 0
    };

    try {
      // Get all detected text
      const allText = ocrResults.map(r => r.text).join(' ');
      console.log('All detected text:', allText);
      
      // Extract Name - look for text below "Government of India" or "भारत सरकार"
      // First, find the position of government text
      const governmentIndex = allText.toLowerCase().indexOf('government of india');
      const bharatIndex = allText.toLowerCase().indexOf('भारत सरकार');
      
      if (governmentIndex !== -1 || bharatIndex !== -1) {
        // Look for text after government text that looks like a name
        const searchStart = Math.max(governmentIndex, bharatIndex);
        const textAfterGovernment = allText.substring(searchStart + 20); // Skip government text
        
        // Look for patterns like "FirstName LastName" or "FirstName MiddleName LastName"
        const namePatterns = [
          /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g,  // FirstName LastName
          /([A-Z][a-z]+\s+[A-Z][a-z]+\s+[A-Z][a-z]+)/g,  // First Middle Last
          /([A-Z][a-z]+\s+[A-Z][a-z]+)/g  // First Last
        ];
        
        for (const pattern of namePatterns) {
          const matches = textAfterGovernment.match(pattern);
          if (matches) {
            // Filter out common non-name words
            const validNames = matches.filter(name => 
              name.length > 3 && 
              name.length < 50 && 
              !/\d/.test(name) &&
              !['Government', 'India', 'Aadhaar', 'Father', 'Male', 'Female', 'DOB', 'issued'].some(word => 
                name.toLowerCase().includes(word.toLowerCase())
              )
            );
            if (validNames.length > 0) {
              extraction.name = validNames[0].trim();
              console.log('Name extracted:', extraction.name);
              break;
            }
          }
        }
      }
      
      // Fallback: if no name found above, look for any text that looks like a name
      if (!extraction.name) {
        const nameMatch = allText.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g);
        if (nameMatch) {
          const validNames = nameMatch.filter(name => 
            name.length > 3 && 
            name.length < 50 && 
            !/\d/.test(name) &&
            !['Government', 'India', 'Aadhaar', 'Father', 'Male', 'Female', 'DOB', 'issued'].some(word => 
              name.toLowerCase().includes(word.toLowerCase())
            )
          );
          if (validNames.length > 0) {
            extraction.name = validNames[0].trim();
            console.log('Name extracted (fallback):', extraction.name);
          }
        }
      }

      // Extract Father's name - look for "Father:" pattern
      const fatherMatch = allText.match(/(?:Father|पिता|pita)\s*:?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i);
      if (fatherMatch && fatherMatch[1]) {
        extraction.fatherName = fatherMatch[1].trim();
      }

      // Extract Date of Birth - handle multiple formats and convert to plain text
      extraction.dateOfBirth = this.extractAndFormatDateOfBirth(allText);

      // Extract Gender - look for Male/Female patterns
      if (allText.toLowerCase().includes('male')) {
        extraction.gender = 'Male';
      } else if (allText.toLowerCase().includes('female')) {
        extraction.gender = 'Female';
      }

      // Extract Aadhaar Number - look for 12 digits in 4-4-4 format
      const aadhaarMatch = allText.match(/\d{4}\s?\d{4}\s?\d{4}/);
      if (aadhaarMatch) {
        extraction.aadhaarNumber = aadhaarMatch[0].replace(/\s/g, '');
      }

      // Calculate confidence based on how many fields we found
      const fields = [extraction.name, extraction.fatherName, extraction.dateOfBirth, extraction.gender, extraction.aadhaarNumber];
      const filledFields = fields.filter(field => field.length > 0).length;
      extraction.confidence = filledFields / fields.length;

      console.log('Extraction result:', extraction);

    } catch (error) {
      console.error('Error extracting front side data:', error);
    }

    return extraction;
  }

  /**
   * Extract and format date of birth from various formats to plain text
   */
  private static extractAndFormatDateOfBirth(text: string): string {
    try {
      // Pattern 1: DD/MM/YYYY format
      const ddMmYyyyMatch = text.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
      if (ddMmYyyyMatch) {
        const day = parseInt(ddMmYyyyMatch[1]);
        const month = parseInt(ddMmYyyyMatch[2]);
        const year = parseInt(ddMmYyyyMatch[3]);
        return `${day} ${this.getMonthName(month)} ${year}`;
      }

      // Pattern 2: DD-MM-YYYY format
      const ddMmYyyyDashMatch = text.match(/(\d{1,2})-(\d{1,2})-(\d{4})/);
      if (ddMmYyyyDashMatch) {
        const day = parseInt(ddMmYyyyDashMatch[1]);
        const month = parseInt(ddMmYyyyDashMatch[2]);
        const year = parseInt(ddMmYyyyDashMatch[3]);
        return `${day} ${this.getMonthName(month)} ${year}`;
      }

      // Pattern 3: DD.MM.YYYY format
      const ddMmYyyyDotMatch = text.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
      if (ddMmYyyyDotMatch) {
        const day = parseInt(ddMmYyyyDotMatch[1]);
        const month = parseInt(ddMmYyyyDotMatch[2]);
        const year = parseInt(ddMmYyyyDotMatch[3]);
        return `${day} ${this.getMonthName(month)} ${year}`;
      }

      // Pattern 4: "Year of Birth: 1991" format
      const yearOfBirthMatch = text.match(/(?:Year of Birth|Birth Year|DOB|Date of Birth)\s*:?\s*(\d{4})/i);
      if (yearOfBirthMatch) {
        return `Year ${yearOfBirthMatch[1]}`;
      }

      // Pattern 5: Just year (4 digits) - look for standalone years
      const yearMatch = text.match(/\b(19|20)\d{2}\b/);
      if (yearMatch) {
        return `Year ${yearMatch[0]}`;
      }

      // Pattern 6: Month Year format (e.g., "July 1991")
      const monthYearMatch = text.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/i);
      if (monthYearMatch) {
        return `${monthYearMatch[1]} ${monthYearMatch[2]}`;
      }

      // Pattern 7: Abbreviated month year (e.g., "Jul 1991")
      const abbrMonthYearMatch = text.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/i);
      if (abbrMonthYearMatch) {
        return `${this.expandAbbreviatedMonth(abbrMonthYearMatch[1])} ${abbrMonthYearMatch[2]}`;
      }

      // If no pattern matches, return empty string
      return '';
    } catch (error) {
      console.error('Error formatting date of birth:', error);
      return '';
    }
  }

  /**
   * Get month name from month number
   */
  private static getMonthName(month: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1] || 'Unknown';
  }

  /**
   * Expand abbreviated month to full month name
   */
  private static expandAbbreviatedMonth(abbr: string): string {
    const monthMap: { [key: string]: string } = {
      'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April',
      'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August',
      'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December'
    };
    return monthMap[abbr] || abbr;
  }

  /**
   * Extract back side data from OCR results using simple text pattern matching
   */
  static extractBackSideData(ocrResults: OCRResult[]): BackSideExtraction {
    const extraction: BackSideExtraction = {
      address: '',
      confidence: 0
    };

    try {
      // Get all detected text
      const allText = ocrResults.map(r => r.text).join(' ');
      console.log('All detected text (back side):', allText);
      
      // Look for address after "Address:" label
      const addressMatch = allText.match(/(?:Address|पता)\s*:?\s*(.+?)(?=\n|$)/i);
      if (addressMatch && addressMatch[1]) {
        // Extract English text only (remove regional language)
        const rawAddress = this.extractEnglishAddress(addressMatch[1].trim());
        // Clean the address by removing UIDAI contact info and other non-address data
        extraction.address = this.cleanAddressText(rawAddress);
      } else {
        // If no "Address:" label found, try to extract any text that looks like an address
        const lines = allText.split('\n').filter(line => line.trim().length > 5);
        if (lines.length > 0) {
          const rawAddress = this.extractEnglishAddress(lines.join(' '));
          extraction.address = this.cleanAddressText(rawAddress);
        }
      }
      
      // Calculate confidence
      extraction.confidence = extraction.address.length > 0 ? 0.8 : 0.3;

      console.log('Back side extraction result:', extraction);

    } catch (error) {
      console.error('Error extracting back side data:', error);
    }

    return extraction;
  }

  /**
   * Extract English text from mixed language text
   */
  private static extractEnglishAddress(text: string): string {
    // Remove Hindi/regional characters and keep English, numbers, and common symbols
    const englishOnly = text.replace(/[\u0900-\u097F\u0A80-\u0AFF\u0B80-\u0BFF\u0C80-\u0CFF\u0D80-\u0DFF\u0E80-\u0EFF\u0F00-\u0FFF]/g, '');
    return englishOnly.trim();
  }

  /**
   * Clean address text by removing UIDAI contact info and other non-address data
   */
  private static cleanAddressText(addressText: string): string {
    if (!addressText) return '';

    // Remove common UIDAI contact information and non-address data
    const patternsToRemove = [
      // PO Box patterns
      /\bP\.?O\.?\s*Box\s*\d+/gi,
      /\bPost\s*Office\s*Box\s*\d+/gi,
      
      // Phone numbers
      /\b\d{3,4}\s*\d{3,4}\s*\d{3,4}\b/g,
      /\b\d{10,12}\b/g,
      
      // Email addresses
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
      
      // Website URLs
      /\b(?:www\.|https?:\/\/)?[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
      
      // UIDAI specific patterns
      /\b(?:help|contact|support)@udai\.gov\.in\b/gi,
      /\bWWW\.www\.udai\.gov\.in\b/gi,
      /\bwww\.udai\.gov\.in\b/gi,
      /\budai\.gov\.in\b/gi,
      
      // Year patterns that are not part of address
      /\b(?:19|20)\d{2}\b/g,
      
      // Common non-address words
      /\b(?:Aadhaar|UID|Unique|Identity|Authority|Government|India|भारत|सरकार)\b/gi,
      
      // PIN code patterns (keep only the actual PIN code, remove surrounding text)
      /\b(?:PIN|Pincode|Postal|Code)\s*:?\s*\d{6}\b/gi,
      
      // Remove multiple spaces and clean up
      /\s+/g
    ];

    let cleanedAddress = addressText;
    
    // Apply all cleaning patterns
    patternsToRemove.forEach(pattern => {
      cleanedAddress = cleanedAddress.replace(pattern, ' ');
    });

    // Clean up the result
    cleanedAddress = cleanedAddress
      .trim()
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/^[,\s]+|[,\s]+$/g, '') // Remove leading/trailing commas and spaces
      .replace(/,\s*,/g, ',') // Remove multiple consecutive commas
      .replace(/^\s*,\s*|\s*,\s*$/g, '') // Remove leading/trailing commas
      .trim();

    // If the cleaned address is too short or contains mostly numbers, return empty
    if (cleanedAddress.length < 10 || /^\d+\s*$/.test(cleanedAddress)) {
      return '';
    }

    return cleanedAddress;
  }

  /**
   * Validate Aadhaar number format
   */
  static validateAadhaarNumber(aadhaarNumber: string): boolean {
    // Must be exactly 12 digits
    return /^\d{12}$/.test(aadhaarNumber);
  }

  /**
   * Combine front and back extractions into complete Aadhaar data
   */
  static combineExtractions(
    frontExtraction: FrontSideExtraction,
    backExtraction: BackSideExtraction,
    frontPhotoUri: string,
    backPhotoUri: string,
    personPhotoUri?: string
  ): AadhaarData {
    return {
      name: frontExtraction.name,
      fatherName: frontExtraction.fatherName,
      dateOfBirth: frontExtraction.dateOfBirth,
      gender: frontExtraction.gender,
      aadhaarNumber: frontExtraction.aadhaarNumber,
      address: backExtraction.address,
      frontPhotoUri,
      backPhotoUri,
      personPhotoUri,
      extractionTimestamp: new Date(),
      confidence: (frontExtraction.confidence + backExtraction.confidence) / 2
    };
  }
}

export default AadhaarExtractionUtils;
