import { MouseEvent } from 'react';
import WheelPicker from './WheelPicker';

interface DatePickerPopupProps {
  selectedYear: number;
  selectedMonth: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onConfirm: () => void;
  onCancel: () => void;
  primaryColor: string;
}

const DatePickerPopup = ({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
  onConfirm,
  onCancel,
  primaryColor,
}: DatePickerPopupProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-center mb-4">
          <div className="mx-2">
            <label className="block text-sm mb-1 text-center">Year</label>
            <WheelPicker
              items={years}
              selected={selectedYear}
              onSelect={onYearChange}
              primaryColor={primaryColor}
            />
          </div>
          <div className="mx-2">
            <label className="block text-sm mb-1 text-center">Month</label>
            <WheelPicker
              items={months}
              selected={selectedMonth}
              onSelect={onMonthChange}
              primaryColor={primaryColor}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={onCancel} className="px-3 py-1 bg-gray-200 rounded">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerPopup;
