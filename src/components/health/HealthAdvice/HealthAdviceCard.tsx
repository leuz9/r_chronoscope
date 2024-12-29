import { ComponentType, SVGProps } from 'react';

interface HealthAdviceCardProps {
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  recommendations: string[];
}

export default function HealthAdviceCard({ title, icon: Icon, recommendations }: HealthAdviceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Icon className="h-6 w-6 text-indigo-600" />
        <h3 className="ml-2 text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <ul className="space-y-2">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-indigo-600 mt-2" />
            <p className="ml-2 text-sm text-gray-600">{recommendation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}