import { useState, useEffect } from 'react';
import { getWorldStats, getAllCountriesStats } from '../../services/worldometerService';
import type { WorldStats, CountryStats } from '../../services/worldometerService';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import StatCard from './StatCard';
import CountryList from './CountryList';
import { GlobeAltIcon, BeakerIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Worldometer() {
  const [worldStats, setWorldStats] = useState<WorldStats | null>(null);
  const [countries, setCountries] = useState<CountryStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [world, countriesData] = await Promise.all([
          getWorldStats(),
          getAllCountriesStats()
        ]);
        setWorldStats(world);
        setCountries(countriesData.sort((a, b) => b.population - a.population));
      } catch (err) {
        setError('Failed to load world statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!worldStats) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">World Statistics</h1>
        <p className="mt-2 text-gray-600">
          Real-time global population and health statistics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Global Population"
          value={worldStats.population}
          color="text-blue-600"
          icon={GlobeAltIcon}
        />
        <StatCard
          title="Total Tests"
          value={worldStats.tests}
          color="text-purple-600"
          icon={BeakerIcon}
        />
        <StatCard
          title="Last Updated"
          value={new Date(worldStats.updated).toLocaleString()}
          color="text-gray-600"
          icon={ClockIcon}
        />
      </div>

      <CountryList countries={countries} />
    </div>
  );
}