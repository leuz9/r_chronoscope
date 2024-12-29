import { useState, useEffect } from 'react';
import { getAllCountriesStats, CountryStats } from '../../services/worldometerService';

export default function CountryStats() {
  const [countries, setCountries] = useState<CountryStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountriesStats();
        setCountries(data.sort((a, b) => b.population - a.population));
      } catch (err) {
        setError('Failed to load country statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading countries...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-4">{error}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Countries</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {countries.map((country) => (
            <li key={country.country}>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    <img
                      src={country.countryInfo.flag}
                      alt={`${country.country} flag`}
                      className="h-8 w-12 object-cover"
                    />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-indigo-600">
                        {country.country}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Population: {country.population.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <p className="text-sm text-gray-600">
                      Tests: {country.tests.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}