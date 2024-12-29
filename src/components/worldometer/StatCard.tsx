interface StatCardProps {
  title: string;
  value: number | string;
  color: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function StatCard({ title, value, color, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        {Icon && <Icon className={`h-6 w-6 ${color} mr-2`} />}
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      </div>
      <p className={`mt-2 text-3xl font-semibold ${color}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </div>
  );
}