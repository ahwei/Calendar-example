import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';
import CalendarViewButtons from './CalendarViewButtons';

interface CalendarProps {
  onDateSelect?: (date: Dayjs) => void;
  selectedDate?: Dayjs;
  primaryColor?: string;
  secondaryColor?: string;
}

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
      let day = startOfMonth;
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

  const handleHeaderClick = () => {
    if (zoomLevel === 'day') setZoomLevel('month');
    else if (zoomLevel === 'month') setZoomLevel('year');
    else if (zoomLevel === 'year') setZoomLevel('multi-year');
    else setZoomLevel('day');
  };

  const handlePrev = () => {
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

  const handleNext = () => {
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

  const handleToday = () => {
    setCurrentDate(dayjs());
    setZoomLevel('day');
  };

  const handleDayClick = (date: Dayjs) => {
    if (zoomLevel === 'day') onDateSelect?.(date);
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

  const getHeaderLabel = () => {
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
      <CalendarHeader
        headerLabel={getHeaderLabel()}
        onPrev={handlePrev}
        onNext={handleNext}
        onHeaderClick={handleHeaderClick}
      />

      <div className="flex justify-center items-center mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${primaryColor} text-white shadow-sm hover:opacity-90 transition-colors duration-200 cursor-pointer`}
          onClick={handleToday}
        >
          Today
        </button>
      </div>

      {zoomLevel === 'day' && (
        <CalendarViewButtons
          viewMode={viewMode}
          onChange={setViewMode}
          primaryColor={primaryColor}
        />
      )}

      <CalendarGrid
        zoomLevel={zoomLevel}
        viewMode={viewMode}
        currentDate={currentDate}
        selectedDate={selectedDate}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        displayDays={displayDays}
        onDayClick={handleDayClick}
        onMonthSelect={handleMonthSelect}
        onYearSelect={handleYearSelect}
        onMultiYearSelect={handleMultiYearSelect}
      />
    </div>
  );
};

export default Calendar;
