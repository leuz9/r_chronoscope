import { useBirthDate } from '../../hooks/useBirthDate';

interface BirthDateDisplayProps {
  birthDate?: string;
}

export default function BirthDateDisplay({ birthDate }: BirthDateDisplayProps) {
  const { formatBirthDate, getAge } = useBirthDate();

  if (!birthDate) {
    return <span className="text-gray-500">Not provided</span>;
  }

  return (
    <>
      {formatBirthDate(birthDate)}
      <span className="ml-2 text-gray-500">
        ({getAge(birthDate)} years old)
      </span>
    </>
  );
}