import { ViewMode } from '@/types/calendar';
interface CalendarViewButtonsProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
  primaryColor: string;
}

const CalendarViewButtons = ({
  viewMode,
  onChange,
  primaryColor,
}: CalendarViewButtonsProps) => {
  return (
    <div className="flex justify-center items-center space-x-4 mb-6">
      <button
        className={`px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer ${
          viewMode === 'month'
            ? `${primaryColor} text-white shadow-sm`
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => onChange(ViewMode.Month)}
      >
        Month
      </button>
      <button
        className={`px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer ${
          viewMode === 'week'
            ? `${primaryColor} text-white shadow-sm`
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => onChange(ViewMode.Week)}
      >
        Week
      </button>
    </div>
  );
};

export default CalendarViewButtons;
