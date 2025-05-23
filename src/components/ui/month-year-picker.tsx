"use client";

import * as React from "react";
import { CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { format, parse, setMonth, setYear } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MonthYearPickerProps {
  value?: string; // Format: MMYYYY (e.g., "022022")
  onChange?: (value: string) => void;
}

export function MonthYearPicker({ value, onChange }: MonthYearPickerProps) {
  const [date, setDate] = React.useState<Date | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [yearRange, setYearRange] = React.useState(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 9 }, (_, i) => currentYear - 4 + i);
  });

  React.useEffect(() => {
    if (value) {
      setDate(parse(value, "MMyyyy", new Date()));
    } else {
      setDate(null);
    }
  }, [value]);

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

  const handleMonthSelect = (monthIndex: string) => {
    const newDate = date
      ? setMonth(date, Number.parseInt(monthIndex))
      : setMonth(new Date(), Number.parseInt(monthIndex));
    setDate(newDate);
    onChange?.(format(newDate, "MMyyyy"));
  };

  const handleYearSelect = (year: number) => {
    const newDate = date ? setYear(date, year) : setYear(new Date(), year);
    setDate(newDate);
    onChange?.(format(newDate, "MMyyyy"));
  };

  const moveYearRange = (direction: "forward" | "backward") => {
    setYearRange((prevRange) => {
      const step = direction === "forward" ? 9 : -9;
      return prevRange.map((year) => year + step);
    });
  };

  const handleClear = () => {
    setDate(null);
    onChange?.(""); // Pass empty string to clear the value
    setIsOpen(false); // Close the popover after clearing
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "MMMM yyyy") : <span>Pick a month/year</span>}
          {date && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-6 w-6 -mr-2"
              onClick={(e) => {
                e.stopPropagation(); // Prevent opening the popover
                handleClear();
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50" align="start">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={() => moveYearRange("backward")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="grid grid-cols-3 gap-2">
              {yearRange.map((year) => (
                <Button
                  key={year}
                  variant="outline"
                  className={cn(
                    "h-9 w-full",
                    date &&
                      date.getFullYear() === year &&
                      "bg-primary text-primary-foreground"
                  )}
                  onClick={() => handleYearSelect(year)}
                >
                  {year}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => moveYearRange("forward")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Select
            value={date ? date.getMonth().toString() : undefined}
            onValueChange={handleMonthSelect}
          >
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
