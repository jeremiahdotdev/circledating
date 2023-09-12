"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import dayjs from "dayjs";

export type DatePickerProps = {
  label: string;
  onChange: (date: Date) => void;
  value: Date | undefined;
};

export function DatePicker({
  label,
  onChange: realOnChange,
  value,
}: DatePickerProps) {
  const onChange = React.useCallback(
    (day: Date | undefined) => {
      if (day) {
        realOnChange(day);
      }
    },
    [realOnChange]
  );

  const from = dayjs().add(-99, "year").toDate();
  const to = dayjs().add(-18, "year").toDate();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className=" w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={value}
          onSelect={onChange}
          fromDate={from}
          toDate={to}
        />
      </PopoverContent>
    </Popover>
  );
}
