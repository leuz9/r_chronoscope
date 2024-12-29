import type { ActivityRecommendation } from './types';

interface ActivityCardProps {
  recommendation: ActivityRecommendation;
}

export default function ActivityCard({ recommendation }: ActivityCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <h4 className="font-medium text-gray-900">{recommendation.activity}</h4>
      <div className="mt-2 space-y-2">
        <p className="text-sm">
          <span className="text-gray-500">Duration:</span>{' '}
          <span className="text-indigo-600 font-medium">{recommendation.duration}</span>
        </p>
        <p className="text-sm">
          <span className="text-gray-500">Frequency:</span>{' '}
          <span className="text-indigo-600 font-medium">{recommendation.frequency}</span>
        </p>
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1">Benefits:</p>
          <ul className="text-sm space-y-1">
            {recommendation.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5" />
                <span className="ml-2 text-gray-600">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}