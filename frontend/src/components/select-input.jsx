import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function SelectInput({
  placeholder = "Select a value",
  selectLabel,
  options = [],
  value = "", // <-- Add this
  onChange, // <-- Add this
  ...props
}) {
  return (
    <Select value={value} onValueChange={onChange} {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectLabel ? <SelectLabel>{selectLabel}</SelectLabel> : null}
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
