import { supabase } from '@/integrations/supabase/client';

interface ConsentData {
  userId: string;
  consentType: 'lgpd_data_processing' | 'privacy_policy' | 'terms_of_service';
  consentGiven: boolean;
}

/**
 * Records user consent to the database for LGPD compliance
 * Captures IP address, user agent, and timestamp automatically
 */
export const recordConsent = async ({ userId, consentType, consentGiven }: ConsentData) => {
  try {
    // Get user's IP address (best effort - may not work behind proxies)
    let ipAddress = 'unknown';
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      ipAddress = data.ip;
    } catch {
      // If IP fetch fails, continue with 'unknown'
      console.warn('Could not fetch IP address for consent record');
    }

    const { error } = await supabase.from('user_consents').insert({
      user_id: userId,
      consent_type: consentType,
      consent_given: consentGiven,
      ip_address: ipAddress,
      user_agent: navigator.userAgent,
      consent_date: new Date().toISOString(),
    });

    if (error) {
      console.error('Error recording consent:', error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to record consent:', error);
    return { success: false, error };
  }
};

/**
 * Records all LGPD consents given during authentication
 */
export const recordAuthConsents = async (userId: string) => {
  // Record data processing consent
  await recordConsent({
    userId,
    consentType: 'lgpd_data_processing',
    consentGiven: true,
  });

  // Record privacy policy consent
  await recordConsent({
    userId,
    consentType: 'privacy_policy',
    consentGiven: true,
  });

  // Record terms of service consent
  await recordConsent({
    userId,
    consentType: 'terms_of_service',
    consentGiven: true,
  });
};
