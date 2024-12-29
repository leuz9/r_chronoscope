import { HEALTH_RECOMMENDATIONS } from './constants';
import CategorySection from './CategorySection';

export default function HealthAdvice() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Health & Longevity Recommendations</h2>
        <p className="mt-2 text-gray-600">
          Evidence-based recommendations from the World Health Organization for optimal health and increased life expectancy.
        </p>
      </div>

      <div className="space-y-12">
        {HEALTH_RECOMMENDATIONS.map(category => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">
          Note: These recommendations are based on WHO guidelines and general health research. 
          Always consult with healthcare professionals before starting new activities or making significant lifestyle changes.
        </p>
      </div>
    </div>
  );
}