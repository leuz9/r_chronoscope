import { UsersIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { useState, useMemo } from 'react';
import type { CountryStats } from '../../services/worldometerService';
import SearchInput from './SearchInput';
import CountryDetailModal from './CountryDetailModal';

interface CountryListProps {
  countries: CountryStats[];
}

export default function CountryList({ countries }: CountryListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryStats | null>(null);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries;
    
    const query = searchQuery.toLowerCase();
    return countries.filter(country => 
      country.country.toLowerCase().includes(query)
    );
  }, [countries, searchQuery]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Countries</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          Detailed statistics by country
        </p>
        <div className="mt-4 max-w-md">
          <SearchInput 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        {filteredCountries.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
            No countries found matching "{searchQuery}"
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredCountries.map((country) => (
              <li 
                key={country.country} 
                className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => setSelectedCountry(country)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={country.countryInfo.flag}
                      alt={`${country.country} flag`}
                      className="h-8 w-12 object-cover rounded-sm"
                    />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{country.country}</p>
                      <div className="flex items-center mt-1">
                        <UsersIcon className="h-4 w-4 text-gray-400" />
                        <p className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                          {country.population.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <CountryDetailModal
        country={selectedCountry}
        isOpen={selectedCountry !== null}
        onClose={() => setSelectedCountry(null)}
      />
    </div>
  );
}