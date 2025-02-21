import { Dayjs } from 'dayjs';
import { ViewMode, ZoomLevel } from '../types/calendar';

interface CalendarGridProps {
  zoomLevel: ZoomLevel;
  viewMode: ViewMode;
  currentDate: Dayjs;
  selectedDate?: Dayjs;
  primaryColor: string;
  secondaryColor: string;
  displayDays: Dayjs[]; // 僅用於 zoomLevel === ZoomLevel.Day
  onDayClick: (date: Dayjs) => void;
  onMonthSelect: (month: number) => void;
  onYearSelect: (year: number) => void;
  onMultiYearSelect: (year: number) => void;
}

const CalendarGrid = ({
  zoomLevel,
  currentDate,
  selectedDate,
  primaryColor,
  secondaryColor,
  displayDays,
  onDayClick,
  onMonthSelect,
  onYearSelect,
  onMultiYearSelect,
}: CalendarGridProps) => {
  if (zoomLevel === ZoomLevel.Day) {
    return (
      <>
        <div className="grid grid-cols-7 text-sm font-medium text-gray-600 mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {displayDays.map((day) => (
            <div
              key={day.format('YYYY-MM-DD')}
              onClick={() => onDayClick(day)}
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
    );
  }

  if (zoomLevel === ZoomLevel.Month) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return (
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
          <div
            key={m}
            onClick={() => onMonthSelect(m)}
            className={`py-2 text-center rounded-lg cursor-pointer transition-colors duration-200 ${
              m === currentDate.month() + 1
                ? `${primaryColor} text-white font-medium`
                : 'hover:bg-gray-100'
            }`}
          >
            {monthNames[m - 1]}
          </div>
        ))}
      </div>
    );
  }

  if (zoomLevel === ZoomLevel.Year) {
    const startDecade = Math.floor(currentDate.year() / 10) * 10;
    return (
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 10 }, (_, i) => startDecade + i).map((yr) => (
          <div
            key={yr}
            onClick={() => onYearSelect(yr)}
            className={`py-2 text-center rounded-lg cursor-pointer transition-colors duration-200 ${
              yr === currentDate.year()
                ? `${primaryColor} text-white font-medium`
                : 'hover:bg-gray-100'
            }`}
          >
            {yr}
          </div>
        ))}
      </div>
    );
  }

  if (zoomLevel === ZoomLevel.MultiYear) {
    const base = currentDate.year() - (currentDate.year() % 300);
    return (
      <div className="grid grid-cols-6 gap-2 max-h-[400px] overflow-auto">
        {Array.from({ length: 300 }, (_, i) => base + i).map((yr) => (
          <div
            key={yr}
            onClick={() => onMultiYearSelect(yr)}
            className={`py-1 text-center rounded cursor-pointer transition-colors duration-200 ${
              yr === currentDate.year()
                ? `${primaryColor} text-white font-medium`
                : 'hover:bg-gray-100'
            }`}
          >
            {yr}
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default CalendarGrid;

// 注意：需在此檔案中引入 dayjs 以供 isSame 等比較使用
import dayjs from 'dayjs';
