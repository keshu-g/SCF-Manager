import React from "react";
import { BarChartMultiple } from "@/components/dashboard/bar-chat";
import { BarChartMixed } from "@/components/dashboard/bar-chat-mixed";
import { PieChartInteractive } from "@/components/dashboard/pie-chart-interavtive";

const Dashboard = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4 items-start">
      <BarChartMultiple />
      <BarChartMixed />
      <BarChartMultiple />
    </div>
  );
};

export default Dashboard;
