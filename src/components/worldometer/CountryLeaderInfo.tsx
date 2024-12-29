import { UserCircleIcon } from '@heroicons/react/24/outline';
import type { CountryLeader } from '../../services/worldometerService';

interface CountryLeaderInfoProps {
  leader: CountryLeader;
}

export default function CountryLeaderInfo({ leader }: CountryLeaderInfoProps) {
  const yearsInOffice = Math.floor(
    (new Date().getTime() - new Date(leader.since).getTime()) / 
    (1000 * 60 * 60 * 24 * 365)
  );

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-start">
        <UserCircleIcon className="h-10 w-10 text-gray-400" />
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{leader.name}</h3>
          <p className="text-sm text-gray-500">{leader.title}</p>
          <p className="text-sm text-gray-500 mt-1">
            In office since {new Date(leader.since).toLocaleDateString()} 
            ({yearsInOffice} {yearsInOffice === 1 ? 'year' : 'years'})
          </p>
        </div>
      </div>
    </div>
  );
}