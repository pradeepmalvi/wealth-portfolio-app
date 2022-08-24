import { setDate } from "date-fns/esm";
import React, { useState } from "react";
import { Popover } from "react-tiny-popover";
import DateRangePicker from "./DateRangePicker";
import moment from "moment";

export default function DatePopover({
  isPopoverOpen,
  onSelectDate,
  dates,
  setIsPopoverOpen
}) {
  const [dateData, setDatesData] = useState({
    startDate: new Date(new Date().getFullYear(), 0, 1),
    endDate: new Date(new Date().getFullYear(), 11, 31)
  });

  const onChangeDate = dates => {
    setDatesData(dates[0]);
  };

  const onSelect = () => {
    const startDate = new Date(dateData.startDate);
    const endDate = new Date(dateData.endDate);
    const date = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };

    onSelectDate(date);
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["bottom"]} // preferred positions by priority
      content={
        <div class="block flex flex-col p-2 max-w-sm bg-white rounded-sm border border-white-200 shadow-sm">
          <DateRangePicker onChangeDate={onChangeDate}></DateRangePicker>
          <button
            disabled={dates ? false : true}
            type="submit"
            class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2 disabled:bg-gray-300"
            onClick={() => {
              setIsPopoverOpen(!isPopoverOpen);
              onSelect();
            }}
          >
            Select
          </button>
        </div>
      }
    >
      <a
        class="block px-5 text-center py-2 max-w-sm bg-white rounded-sm border border-white-200 shadow-sm cursor-pointer min-w-[400px]"
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      >
        <h5 class="text-2xl font-bold tracking-tight text-gray-900">
          {moment(dates.startDate).format("DD MMM YYYY")} -{" "}
          {moment(dates.endDate).format("DD MMM YYYY")}
        </h5>
        <p class="font-normal text-gray-400">Select Dates</p>
      </a>
    </Popover>
  );
}
