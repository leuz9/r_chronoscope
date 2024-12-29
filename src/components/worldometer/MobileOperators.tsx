import type { MobileOperator } from '../../services/worldometerService';
import { SignalIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface MobileOperatorsProps {
  operators: MobileOperator[];
}

export default function MobileOperators({ operators }: MobileOperatorsProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-3">Mobile Operators</h3>
      <div className="grid grid-cols-1 gap-3">
        {operators.map((operator) => (
          <div 
            key={operator.code}
            className="bg-gray-50 rounded-lg p-3 flex items-center justify-between"
          >
            <div className="flex items-center">
              <SignalIcon 
                className={`h-5 w-5 ${
                  operator.status === 'active' ? 'text-green-500' : 'text-gray-400'
                }`}
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{operator.name}</p>
                <p className="text-xs text-gray-500">Network: {operator.network}</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className={`
                px-2 py-1 text-xs font-medium rounded-full
                ${operator.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'}
              `}>
                {operator.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}