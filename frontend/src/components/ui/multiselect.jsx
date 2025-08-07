"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { XIcon } from "lucide-react";
import { Badge } from "./badge";

export const MultiSelectDropdown = React.forwardRef(
  (
    {
      options = [],
      value = [],
      onChange,
      placeholder = "Select options...",
      className,
      disabled,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const triggerRef = React.useRef(null);

    // Handle selection toggle
    const handleSelect = (option, event) => {
      event?.preventDefault();
      event?.stopPropagation();
      const isSelected = value.some((item) => item.value === option.value);
      let newValue;
      if (isSelected) {
        newValue = value.filter((item) => item.value !== option.value);
      } else {
        newValue = [...value, option];
      }
      onChange?.(newValue);
      // Ensure dropdown stays open
    };

    // Handle removing a badge
    const handleUnselect = (option, event) => {
      event.preventDefault();
      event.stopPropagation();
      const newValue = value.filter((item) => item.value !== option.value);
      onChange?.(newValue);
    };

    // Handle clear all
    const handleClearAll = (event) => {
      event.preventDefault();
      event.stopPropagation();
      onChange?.([]);
    };

    // Handle open state
    const handleOpenChange = (isOpen) => {
      setOpen(isOpen);
    };

    // Handle clicks outside to close dropdown
    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(event.target) &&
          open
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open]);

    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between gap-2">
          {/* Dropdown */}
          <DropdownMenu
            ref={triggerRef}
            open={open}
            onOpenChange={handleOpenChange}
          >
            <DropdownMenuTrigger asChild>
              <div className="w-full">
                <Button
                  variant="outline"
                  className={cn(
                    "w-full flex justify-between items-center text-left font-normal px-3 py-2",
                    !value.length && "text-muted-foreground",
                    className
                  )}
                  disabled={disabled}
                  ref={ref}
                >
                  <span>
                    {value.length > 0
                      ? `${value.length} selected`
                      : placeholder}
                  </span>
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
              {options.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={value.some((item) => item.value === option.value)}
                  onSelect={(e) => handleSelect(option, e)}
                  disabled={option.disabled || disabled}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {value.length > 0 && (
            <Button
              variant="destructive"
              size="icon"
              onMouseDown={handleClearAll}
              disabled={disabled}
              aria-label="Clear all"
            >
              <XIcon
                width={14}
                height={14}
                strokeWidth={2}
                aria-hidden="true"
              />
            </Button>
          )}
        </div>
        {/* Badge Container */}
        {value.length > 0 && (
          <div
            className={cn(
              "flex flex-wrap gap-1 p-2 rounded-lg border border-input bg-background w-full",
              className?.includes("border-red-500") ? "" : className
            )}
          >
            {value.map((option) => (
              <Badge className="p-2" key={option.value} variant="outline">
                {option.label}
                <button
                  className="ml-1 hover:text-red-400"
                  onMouseDown={(e) => handleUnselect(option, e)}
                  aria-label={`Remove ${option.label}`}
                >
                  <XIcon
                    width={14}
                    height={14}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    );
  }
);

MultiSelectDropdown.displayName = "MultiSelectDropdown";
export default MultiSelectDropdown;
