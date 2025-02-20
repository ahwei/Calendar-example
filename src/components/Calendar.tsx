// CalendarApp.tsx
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

const weekdays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type ViewMode = 'month' | 'week';

const Calendar = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

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

  const renderDays = (days: Dayjs[]) => (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => (
        <div
          key={day.format('YYYY-MM-DD')}
          className={`p-2 text-center rounded-lg border ${
            day.isSame(dayjs(), 'day')
              ? 'bg-sky-200 font-bold'
              : day.isSame(currentDate, 'month')
              ? 'bg-white'
              : 'bg-gray-200 text-gray-500'
          }`}
        >
          {day.date()}
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          className={`px-2 py-1 border rounded ${
            viewMode === 'month' ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => setViewMode('month')}
        >
          Month
        </button>
        <button
          className={`px-2 py-1 border rounded ${
            viewMode === 'week' ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => setViewMode('week')}
        >
          Week
        </button>
      </div>
      <div className="flex justify-between mb-4">
        <button className="px-2 py-1 border rounded" onClick={handlePrev}>
          Prev
        </button>
        <button className="px-2 py-1 border rounded" onClick={handleToday}>
          Today
        </button>
        <button className="px-2 py-1 border rounded" onClick={handleNext}>
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 font-semibold text-center mb-2">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      {viewMode === 'month' ? renderDays(monthDays) : renderDays(weekDays)}
    </div>
  );
};

export default Calendar;
