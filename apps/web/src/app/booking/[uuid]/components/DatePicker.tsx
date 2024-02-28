'use client';

import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DateRangePickerProps {
  onDateChange: (dateRange: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    onDateChange({ startDate: date, endDate });
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    onDateChange({ startDate, endDate: date });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <span
        className="cursor-pointer text-gray-900 underline font-semibold"
        onClick={() => setShowModal(true)}
      >
        Edit
      </span>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg p-3">
            <h5 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-gray-300 pb-2 mb-4">
              Choose your trip
            </h5>
            <div>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="p-2 border rounded-md mb-4"
              />
            </div>
            <div>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="End Date"
                className="p-2 border rounded-md mb-4"
              />
            </div>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
