import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TooltipPop = ({
  content = "",
  trigger,
  className = "",
  delayDuration = 0,
  ...props
}) => {
  return (
    <TooltipProvider delayDuration={delayDuration} {...props}>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent className={className}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipPop;
