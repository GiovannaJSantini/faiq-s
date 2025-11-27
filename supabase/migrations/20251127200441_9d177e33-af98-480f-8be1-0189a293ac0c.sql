-- Remove old constraint that only allows 'data_processing', 'marketing', 'cookies'
ALTER TABLE user_consents DROP CONSTRAINT IF EXISTS user_consents_consent_type_check;

-- Add new constraint with LGPD-compliant consent types
ALTER TABLE user_consents ADD CONSTRAINT user_consents_consent_type_check 
CHECK (consent_type IN (
  'data_processing',
  'marketing', 
  'cookies',
  'lgpd_data_processing',
  'privacy_policy',
  'terms_of_service'
));