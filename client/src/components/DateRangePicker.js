import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

export default function DateRangePicker({ state, onChangeDate }) {
  return (
    <DateRange
      editableDateInputs={false}
      onChange={item => {
        onChangeDate([item.selection]);
      }}
      moveRangeOnFirstSelection={false}
      ranges={state}
    />
  );
}
