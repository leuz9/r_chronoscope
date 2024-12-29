import axios from 'axios';

const API_BASE_URL = 'https://disease.sh/v3/covid-19';

export interface MobileOperator {
  name: string;
  code: string;
  network: string;
  status: 'active' | 'inactive';
}

export interface CountryLeader {
  name: string;
  title: string;
  since: string;
}

export interface WorldStats {
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
  population: number;
  tests: number;
  updated: number;
}

export interface CountryStats extends WorldStats {
  country: string;
  countryInfo: {
    flag: string;
    lat: number;
    long: number;
    iso2: string;
    callingCode: string;
  };
  mobileOperators?: MobileOperator[];
  leader?: CountryLeader;
}

// Mock data for mobile operators
const MOCK_OPERATORS: Record<string, MobileOperator[]> = {
  US: [
    { name: 'AT&T', code: 'ATT', network: '4G/5G', status: 'active' },
    { name: 'Verizon', code: 'VZW', network: '4G/5G', status: 'active' },
    { name: 'T-Mobile', code: 'TMO', network: '4G/5G', status: 'active' }
  ],
  GB: [
    { name: 'Vodafone', code: 'VOD', network: '4G/5G', status: 'active' },
    { name: 'EE', code: 'EE', network: '4G/5G', status: 'active' },
    { name: 'O2', code: 'O2', network: '4G/5G', status: 'active' }
  ],
  FR: [
    { name: 'Orange', code: 'ORG', network: '4G/5G', status: 'active' },
    { name: 'SFR', code: 'SFR', network: '4G/5G', status: 'active' },
    { name: 'Free Mobile', code: 'FREE', network: '4G', status: 'active' }
  ]
};

// Mock data for country leaders
const COUNTRY_LEADERS: Record<string, CountryLeader> = {
  US: {
    name: 'Joe Biden',
    title: 'President',
    since: '2021-01-20'
  },
  GB: {
    name: 'Rishi Sunak',
    title: 'Prime Minister',
    since: '2022-10-25'
  },
  FR: {
    name: 'Emmanuel Macron',
    title: 'President',
    since: '2017-05-14'
  },
  DE: {
    name: 'Olaf Scholz',
    title: 'Chancellor',
    since: '2021-12-08'
  }
};

// Mock data for calling codes
const CALLING_CODES: Record<string, string> = {
  US: '+1',
  GB: '+44',
  FR: '+33',
  DE: '+49',
  IT: '+39',
  ES: '+34',
  CN: '+86',
  JP: '+81',
  KR: '+82',
  IN: '+91'
};

export async function getWorldStats(): Promise<WorldStats> {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching world stats:', error);
    throw new Error('Failed to fetch world statistics');
  }
}

export async function getAllCountriesStats(): Promise<CountryStats[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/countries`);
    const countries = response.data;
    
    return countries.map(country => ({
      ...country,
      countryInfo: {
        ...country.countryInfo,
        callingCode: getCallingCode(country.countryInfo.iso2)
      },
      mobileOperators: getMockOperators(country.countryInfo.iso2),
      leader: getCountryLeader(country.countryInfo.iso2)
    }));
  } catch (error) {
    console.error('Error fetching country stats:', error);
    throw new Error('Failed to fetch country statistics');
  }
}

function getCallingCode(iso2: string): string {
  return CALLING_CODES[iso2] || `+${Math.floor(Math.random() * 900) + 100}`;
}

function getCountryLeader(iso2: string): CountryLeader {
  if (COUNTRY_LEADERS[iso2]) {
    return COUNTRY_LEADERS[iso2];
  }

  // Generate mock leader data for countries without predefined data
  return {
    name: `${iso2} Leader`,
    title: Math.random() > 0.5 ? 'President' : 'Prime Minister',
    since: new Date(Date.now() - Math.random() * 5 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };
}

function getMockOperators(iso2: string): MobileOperator[] {
  if (MOCK_OPERATORS[iso2]) {
    return MOCK_OPERATORS[iso2];
  }

  // Generate mock operators for countries without predefined data
  const numOperators = Math.floor(Math.random() * 3) + 1;
  const operators: MobileOperator[] = [];

  for (let i = 0; i < numOperators; i++) {
    operators.push({
      name: `${iso2} Telecom ${i + 1}`,
      code: `${iso2}${i + 1}`,
      network: Math.random() > 0.3 ? '4G/5G' : '4G',
      status: Math.random() > 0.1 ? 'active' : 'inactive'
    });
  }

  return operators;
}