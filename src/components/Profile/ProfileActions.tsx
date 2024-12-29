interface ProfileActionsProps {
  onLogout: () => Promise<void>;
}

export default function ProfileActions({ onLogout }: ProfileActionsProps) {
  return (
    <div className="px-4 py-5 sm:p-6">
      <div className="space-y-4">
        <button
          onClick={onLogout}
          className="w-full sm:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}