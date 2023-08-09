"use client";

import * as React from "react";
import { ActiveModifiers } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
