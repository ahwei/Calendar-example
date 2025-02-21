import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
interface CalendarProps {
  onDateSelect?: (date: Dayjs) => void;
  selectedDate?: Dayjs;
  primaryColor?: string;
  secondaryColor?: string;
}

const weekdays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type ViewMode = 'month' | 'week';

type ZoomLevel = 'day' | 'month' | 'year' | 'multi-year';

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
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('day');

  const displayDays = useMemo(() => {
    if (zoomLevel !== 'day') return [];
    if (viewMode === 'month') {
      const startOfMonth: Dayjs = currentDate.startOf('month').startOf('week');
      const endOfMonth: Dayjs = currentDate.endOf('month').endOf('week');
      const days: Dayjs[] = [];
      let day: Dayjs = startOfMonth;
      while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, 'day')) {
        days.push(day);
        day = day.add(1, 'day');
      }
      return days;
    } else {
      const startOfWeek: Dayjs = currentDate.startOf('week');
      return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
    }
  }, [currentDate, viewMode, zoomLevel]);

  const handleHeaderClick = (): void => {
    if (zoomLevel === 'day') setZoomLevel('month');
    else if (zoomLevel === 'month') setZoomLevel('year');
    else if (zoomLevel === 'year') setZoomLevel('multi-year');
    else setZoomLevel('day');
  };

  const handlePrev = (): void => {
    if (zoomLevel === 'day') {
      setCurrentDate((prev) => prev.subtract(1, viewMode));
    } else if (zoomLevel === 'month') {
      setCurrentDate((prev) => prev.subtract(1, 'year'));
    } else if (zoomLevel === 'year') {
      setCurrentDate((prev) => prev.subtract(10, 'year'));
    } else if (zoomLevel === 'multi-year') {
      setCurrentDate((prev) => prev.subtract(300, 'year'));
    }
  };

  const handleNext = (): void => {
    if (zoomLevel === 'day') {
      setCurrentDate((prev) => prev.add(1, viewMode));
    } else if (zoomLevel === 'month') {
      setCurrentDate((prev) => prev.add(1, 'year'));
    } else if (zoomLevel === 'year') {
      setCurrentDate((prev) => prev.add(10, 'year'));
    } else if (zoomLevel === 'multi-year') {
      setCurrentDate((prev) => prev.add(300, 'year'));
    }
  };

  const handleToday = (): void => {
    setCurrentDate(dayjs());
    setZoomLevel('day');
  };

  const handleDateClick = (date: Dayjs) => {
    if (zoomLevel === 'day') {
      onDateSelect?.(date);
    }
  };

  const handleMonthSelect = (month: number) => {
    setCurrentDate(currentDate.year(currentDate.year()).month(month - 1));
    setZoomLevel('day');
  };

  const handleYearSelect = (year: number) => {
    setCurrentDate(currentDate.year(year));
    setZoomLevel('month');
  };

  const handleMultiYearSelect = (year: number) => {
    setCurrentDate(currentDate.year(year));
    setZoomLevel('year');
  };

  const getHeaderLabel = (): string => {
    if (zoomLevel === 'day') return currentDate.format('YYYY-MM');
    if (zoomLevel === 'month') return currentDate.format('YYYY');
    if (zoomLevel === 'year') {
      const startDecade = Math.floor(currentDate.year() / 10) * 10;
      return `${startDecade}-${startDecade + 9}`;
    }
    const base = currentDate.year() - (currentDate.year() % 300);
    return `${base}-${base + 299}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          onClick={handlePrev}
        >
          <span className="material-icons">
            <MdArrowBackIosNew />
          </span>
        </button>
        <span
          className="text-lg font-semibold cursor-pointer"
          onClick={handleHeaderClick}
        >
          {getHeaderLabel()}
        </span>
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          onClick={handleNext}
        >
          <span className="material-icons">
            <MdArrowForwardIos />
          </span>
        </button>
      </div>

      <div className="flex justify-center items-center mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${primaryColor} text-white shadow-sm hover:opacity-90 transition-colors duration-200 cursor-pointer`}
          onClick={handleToday}
        >
          Today
        </button>
      </div>

      {zoomLevel === 'day' && (
        <div className="flex justify-center items-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer ${
              viewMode === 'month'
                ? `${primaryColor} text-white shadow-sm`
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setViewMode('month')}
          >
            Month
          </button>
          <button
            className={`px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer ${
              viewMode === 'week'
                ? `${primaryColor} text-white shadow-sm`
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setViewMode('week')}
          >
            Week
          </button>
        </div>
      )}

      {zoomLevel === 'day' && (
        <>
          <div className="grid grid-cols-7 text-sm font-medium text-gray-600 mb-4">
            {weekdays.map((day) => (
              <div key={day} className="text-center py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {displayDays.map((day) => (
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
        </>
      )}

      {zoomLevel === 'month' && (
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <div
              key={m}
              onClick={() => handleMonthSelect(m)}
              className={`py-2 text-center rounded-lg cursor-pointer transition-colors duration-200
                ${
                  m === currentDate.month() + 1
                    ? `${primaryColor} text-white font-medium`
                    : 'hover:bg-gray-100'
                }`}
            >
              {m} 月
            </div>
          ))}
        </div>
      )}

      {zoomLevel === 'year' && (
        <div className="grid grid-cols-5 gap-4">
          {(() => {
            const startDecade = Math.floor(currentDate.year() / 10) * 10;
            return Array.from({ length: 10 }, (_, i) => startDecade + i);
          })().map((yr) => (
            <div
              key={yr}
              onClick={() => handleYearSelect(yr)}
              className={`py-2 text-center rounded-lg cursor-pointer transition-colors duration-200
                ${
                  yr === currentDate.year()
                    ? `${primaryColor} text-white font-medium`
                    : 'hover:bg-gray-100'
                }`}
            >
              {yr}
            </div>
          ))}
        </div>
      )}

      {zoomLevel === 'multi-year' && (
        <div className="grid grid-cols-6 gap-2 max-h-[400px] overflow-auto">
          {(() => {
            const base = currentDate.year() - (currentDate.year() % 300);
            return Array.from({ length: 300 }, (_, i) => base + i);
          })().map((yr) => (
            <div
              key={yr}
              onClick={() => handleMultiYearSelect(yr)}
              className={`py-1 text-center rounded cursor-pointer transition-colors duration-200
                ${
                  yr === currentDate.year()
                    ? `${primaryColor} text-white font-medium`
                    : 'hover:bg-gray-100'
                }`}
            >
              {yr}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
