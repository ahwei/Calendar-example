import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

interface CalendarProps {
  onDateSelect?: (date: Dayjs) => void;
  selectedDate?: Dayjs;
  primaryColor?: string;
  secondaryColor?: string;
}

const weekdays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type ViewMode = 'month' | 'week';

const Calendar = ({
  onDateSelect,
  selectedDate,
  primaryColor = 'bg-mint-500',
  secondaryColor = 'bg-mint-50',
}: CalendarProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [currentDate, setCurrentDate] = useState<Dayjs>(
    selectedDate || dayjs(),
  );

  const startOfMonth: Dayjs = currentDate.startOf('month').startOf('week');
  const endOfMonth: Dayjs = currentDate.endOf('month').endOf('week');
  const monthDays: Dayjs[] = [];

  let day: Dayjs = startOfMonth;
  while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, 'day')) {
    monthDays.push(day);
    day = day.add(1, 'day');
  }

  const startOfWeek: Dayjs = currentDate.startOf('week');
  const weekDays: Dayjs[] = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.add(i, 'day'),
  );

  const handlePrev = (): void => {
    setCurrentDate((prev) => prev.subtract(1, viewMode));
  };

  const handleNext = (): void => {
    setCurrentDate((prev) => prev.add(1, viewMode));
  };

  const handleToday = (): void => {
    setCurrentDate(dayjs());
  };

  const handleDateClick = (date: Dayjs) => {
    onDateSelect?.(date);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <button
          className={`px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer ${
            viewMode === 'month'
              ? `${primaryColor} text-white shadow-sm hover:opacity-90`
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setViewMode('month')}
        >
          Month
        </button>
        <button
          className={`px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer ${
            viewMode === 'week'
              ? `${primaryColor} text-white shadow-sm hover:opacity-90`
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setViewMode('week')}
        >
          Week
        </button>
      </div>
      <div className="flex justify-between items-center mb-6">
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          onClick={handlePrev}
        >
          <span className="material-icons">Prev</span>
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${primaryColor} text-white shadow-sm hover:opacity-90 transition-colors duration-200 cursor-pointer`}
          onClick={handleToday}
        >
          Today
        </button>
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          onClick={handleNext}
        >
          <span className="material-icons">Next</span>
        </button>
      </div>
      <div className="grid grid-cols-7 text-sm font-medium text-gray-600 mb-4">
        {weekdays.map((day) => (
          <div key={day} className="text-center py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {(viewMode === 'month' ? monthDays : weekDays).map((day) => (
          <div
            key={day.format('YYYY-MM-DD')}
            onClick={() => handleDateClick(day)}
            className={`
              aspect-square p-2 flex items-center justify-center rounded-lg
              transition-colors duration-200 cursor-pointer
              ${
                selectedDate?.isSame(day, 'day')
                  ? `${primaryColor} text-white font-medium`
                  : day.isSame(dayjs(), 'day')
                  ? `${secondaryColor} font-medium`
                  : day.isSame(currentDate, 'month')
                  ? 'hover:bg-gray-100'
                  : 'text-gray-400 hover:bg-gray-50'
              }
            `}
          >
            {day.date()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
