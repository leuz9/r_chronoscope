import { useState, useEffect } from 'react';
import { getWorldStats, WorldStats } from '../../services/worldometerService';
import StatCard from './StatCard';

export default function WorldStats() {
  const [stats, setStats] = useState<WorldStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getWorldStats();
        setStats(data);
      } catch (err) {
        setError('Failed to load world statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading statistics...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-4">{error}</div>;
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Global Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Population"
          value={stats.population}
          color="text-blue-600"
        />
        <StatCard
          title="Total Tests"
          value={stats.tests}
          color="text-purple-600"
        />
        <StatCard
          title="Last Updated"
          value={new Date(stats.updated).toLocaleString()}
          color="text-gray-600"
        />
      </div>
    </div>
  );
}