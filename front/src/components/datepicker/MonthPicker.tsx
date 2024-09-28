import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";

// Oyliklar ro'yxati
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Prop interfeysi
interface Props {
  onChange?: (number: number | null, year: number | null) => void;
}

const MonthPicker: React.FC<Props> = ({ onChange }) => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(
    new Date().getFullYear()
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleMonthClick = (month: number) => {
    setSelectedMonth(month);
    setIsOpen(false);
    if (onChange) {
      onChange(month, selectedYear);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value, 10);
    setSelectedYear(isNaN(year) ? null : year);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-40 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 "
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedMonth !== null
            ? `${months[selectedMonth]}, ${selectedYear}`
            : "Select Month"}
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Year
              </label>

              <Input
                type="number"
                value={selectedYear ?? ""}
                onChange={handleYearChange}
                className="!px-2"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {months.map((month, index) => (
                <button
                  key={month}
                  onClick={() => handleMonthClick(index)}
                  className={`p-2  rounded-md text-sm font-medium text-center ${
                    months[selectedMonth ? selectedMonth : 0] === month
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-indigo-200"
                  }`}
                >
                  {month.slice(0, 3)}
                </button>
              ))}
            </div>

            <Button
              onClick={() => {
                setIsOpen(false);
                onChange && onChange(null, null);
                setSelectedMonth(null);
                setSelectedYear(null);
              }}
              className="w-full mt-3"
              colorScheme="red"
            >
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthPicker;
