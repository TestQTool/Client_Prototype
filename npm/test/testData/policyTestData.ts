export const validPolicyData = {
  customerName: 'John Doe',
  policyType: 'Auto Insurance',
  coverageAmount: '50000',
  premiumAmount: '1200',
  effectiveDate: '2024-06-01'
};

export const specialCharacterNames = [
  "O'Neil",
  "Smith-Johnson",
  "Dr. Anderson Jr.",
  "María García",
  "Jean-Pierre Dubois"
];

export const sqlInjectionPayloads = [
  "' OR '1'='1",
  "'; DROP TABLE policies; --",
  "admin'--",
  "' OR 1=1--"
];

export const xssPayloads = [
  '<script>alert("XSS")</script>',
  '<img src=x onerror=alert("XSS")>',
  '<svg onload=alert("XSS")>',
  'javascript:alert("XSS")'
];

export const invalidPremiumAmounts = [
  'abc',
  '12.34.56',
  '-1000',
  '!@#$',
  'null'
];

export const invalidDateFormats = [
  '01-06-2024',
  '2024/06/01',
  '06-01-2024',
  '01.06.2024',
  'June 1, 2024'
];

export const getPastDate = (daysAgo: number = 10): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

export const getFutureDate = (daysAhead: number = 30): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().split('T')[0];
};

export const generateMaxLengthString = (length: number): string => {
  return 'A'.repeat(length);
};

export const generateWhitespaceString = (length: number): string => {
  return ' '.repeat(length);
};
