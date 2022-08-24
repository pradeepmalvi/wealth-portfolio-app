import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

export default function DateRangePicker({ onChangeDate }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection"
    }
  ]);

  useEffect(() => {
    onChangeDate(state);
  }, [state]);

  return (
    <DateRange
      editableDateInputs={false}
      onChange={item => {
        setState([item.selection]);
      }}
      moveRangeOnFirstSelection={false}
      ranges={state}
    />
  );
}
