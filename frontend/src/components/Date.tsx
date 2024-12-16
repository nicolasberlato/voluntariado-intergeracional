import React, { useState } from "react";

interface DateProps {
  selectedDate: string;
  onChange: (date: string) => void;
}

const Date: React.FC<DateProps> = ({ selectedDate, onChange }) => {
  return (
    <div>
      <label htmlFor="datePicker">Select Date:</label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Date;
