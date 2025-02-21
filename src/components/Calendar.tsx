import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import { ViewMode, ZoomLevel } from '../types/calendar';
import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';
import CalendarViewButtons from './CalendarViewButtons';

interface CalendarProps {
  onDateSelect?: (date: Dayjs) => void;
  selectedDate?: Dayjs;
  primaryColor?: string;
  secondaryColor?: string;
}

const Calendar = ({
  onDateSelect,
  selectedDate,
  primaryColor = 'bg-mint-500',
  secondaryColor = 'bg-mint-50',
}: CalendarProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Month);
  const [currentDate, setCurrentDate] = useState<Dayjs>(
    selectedDate || dayjs(),
  );
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>(ZoomLevel.Day);

  const displayDays = useMemo(() => {
    if (zoomLevel !== ZoomLevel.Day) return [];
    if (viewMode === ViewMode.Month) {
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
    if (zoomLevel === ZoomLevel.Day) setZoomLevel(ZoomLevel.Month);
    else if (zoomLevel === ZoomLevel.Month) setZoomLevel(ZoomLevel.Year);
    else if (zoomLevel === ZoomLevel.Year) setZoomLevel(ZoomLevel.MultiYear);
    else setZoomLevel(ZoomLevel.Day);
  };

  const handlePrev = () => {
    if (zoomLevel === ZoomLevel.Day) {
      setCurrentDate((prev) => prev.subtract(1, viewMode));
    } else if (zoomLevel === ZoomLevel.Month) {
      setCurrentDate((prev) => prev.subtract(1, 'year'));
    } else if (zoomLevel === ZoomLevel.Year) {
      setCurrentDate((prev) => prev.subtract(10, 'year'));
    } else if (zoomLevel === ZoomLevel.MultiYear) {
      setCurrentDate((prev) => prev.subtract(300, 'year'));
    }
  };

  const handleNext = () => {
    if (zoomLevel === ZoomLevel.Day) {
      setCurrentDate((prev) => prev.add(1, viewMode));
    } else if (zoomLevel === ZoomLevel.Month) {
      setCurrentDate((prev) => prev.add(1, 'year'));
    } else if (zoomLevel === ZoomLevel.Year) {
      setCurrentDate((prev) => prev.add(10, 'year'));
    } else if (zoomLevel === ZoomLevel.MultiYear) {
      setCurrentDate((prev) => prev.add(300, 'year'));
    }
  };

  const handleToday = () => {
    setCurrentDate(dayjs());
    setZoomLevel(ZoomLevel.Day);
  };

  const handleDayClick = (date: Dayjs) => {
    if (zoomLevel === ZoomLevel.Day) onDateSelect?.(date);
  };

  const handleMonthSelect = (month: number) => {
    setCurrentDate(currentDate.year(currentDate.year()).month(month - 1));
    setZoomLevel(ZoomLevel.Day);
  };

  const handleYearSelect = (year: number) => {
    setCurrentDate(currentDate.year(year));
    setZoomLevel(ZoomLevel.Month);
  };

  const handleMultiYearSelect = (year: number) => {
    setCurrentDate(currentDate.year(year));
    setZoomLevel(ZoomLevel.Year);
  };

  const getHeaderLabel = () => {
    if (zoomLevel === ZoomLevel.Day) return currentDate.format('YYYY-MM');
    if (zoomLevel === ZoomLevel.Month) return currentDate.format('YYYY');
    if (zoomLevel === ZoomLevel.Year) {
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

      {zoomLevel === ZoomLevel.Day && (
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
