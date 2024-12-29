import { Dialog } from '@headlessui/react';
import { XMarkIcon, PhoneIcon } from '@heroicons/react/24/outline';
import type { CountryStats } from '../../services/worldometerService';
import StatCard from './StatCard';
import CountryMap from './CountryMap';
import MobileOperators from './MobileOperators';
import CountryLeaderInfo from './CountryLeaderInfo';

interface CountryDetailModalProps {
  country: CountryStats | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CountryDetailModal({ country, isOpen, onClose }: CountryDetailModalProps) {
  if (!country) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-6 border-b">
            <div className="flex items-center">
              <img
                src={country.countryInfo.flag}
                alt={`${country.country} flag`}
                className="h-8 w-12 object-cover rounded-sm"
              />
              <div className="ml-4">
                <Dialog.Title className="text-xl font-semibold text-gray-900">
                  {country.country}
                </Dialog.Title>
                <div className="flex items-center mt-1">
                  <PhoneIcon className="h-4 w-4 text-gray-400" />
                  <span className="ml-1 text-sm text-gray-500">
                    {country.countryInfo.callingCode}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            {country.leader && (
              <div className="mb-6">
                <CountryLeaderInfo leader={country.leader} />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <StatCard
                title="Population"
                value={country.population}
                color="text-blue-600"
              />
              <StatCard
                title="Total Tests"
                value={country.tests}
                color="text-purple-600"
              />
              <StatCard
                title="Active Cases"
                value={country.active}
                color="text-yellow-600"
              />
              <StatCard
                title="Recovered"
                value={country.recovered}
                color="text-green-600"
              />
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Location</h3>
              <CountryMap country={country} />
            </div>

            {country.mobileOperators && (
              <div className="mt-6">
                <MobileOperators operators={country.mobileOperators} />
              </div>
            )}

            <div className="mt-6 text-xs text-gray-500">
              Last updated: {new Date(country.updated).toLocaleString()}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}