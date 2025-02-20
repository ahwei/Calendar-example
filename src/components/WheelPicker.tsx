import { FC } from 'react';

interface WheelPickerProps {
  items: number[];
  selected: number;
  onSelect: (value: number) => void;
  primaryColor?: string; // 新增 primaryColor prop
}

const WheelPicker: FC<WheelPickerProps> = ({
  items,
  selected,
  onSelect,
  primaryColor,
}) => {
  return (
    <div
      className="relative h-32 snap-y snap-mandatory overflow-auto"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <ul className="list-none p-0 m-0">
        {items.map((item) => (
          <li
            key={item}
            className={`h-8 flex items-center justify-center snap-start cursor-pointer`}
            style={
              selected === item
                ? { color: primaryColor, fontWeight: 'bold' }
                : {}
            }
            onClick={() => onSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WheelPicker;
