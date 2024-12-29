import ActivityCard from './ActivityCard';
import type { HealthCategory } from './types';

interface CategorySectionProps {
  category: HealthCategory;
}

export default function CategorySection({ category }: CategorySectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
      <p className="text-gray-600 mb-4">{category.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.recommendations.map((recommendation, index) => (
          <ActivityCard key={index} recommendation={recommendation} />
        ))}
      </div>
    </div>
  );
}