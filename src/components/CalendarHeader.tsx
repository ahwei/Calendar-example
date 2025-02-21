import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

interface CalendarHeaderProps {
  headerLabel: string;
  onPrev: () => void;
  onNext: () => void;
  onHeaderClick: () => void;
}

const CalendarHeader = ({
  headerLabel,
  onPrev,
  onNext,
  onHeaderClick,
}: CalendarHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <button
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
        onClick={onPrev}
      >
        <span className="material-icons">
          <MdArrowBackIosNew />
        </span>
      </button>
      <span
        className="text-lg font-semibold cursor-pointer"
        onClick={onHeaderClick}
      >
        {headerLabel}
      </span>
      <button
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
        onClick={onNext}
      >
        <span className="material-icons">
          <MdArrowForwardIos />
        </span>
      </button>
    </div>
  );
};

export default CalendarHeader;
