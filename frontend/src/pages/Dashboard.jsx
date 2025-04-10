import React from "react";
import { ProductChart } from "@/components/product-chart";
import { LucideEdit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const chartData = [
    { material: "Iron", quantity: 40, fill: "var(--color-Iron)" },
    { material: "steel", quantity: 50, fill: "var(--color-steel)" },
    { material: "copper", quantity: 90, fill: "var(--color-copper)" },
    { material: "aluminium", quantity: 100, fill: "var(--color-aluminium)" },
    { material: "other", quantity: 20, fill: "var(--color-other)" },
  ];

  const chartConfig = {
    quantity: {
      label: "Quantity",
    },
    Iron: {
      label: "Iron",
      color: "var(--chart-1)",
    },
    steel: {
      label: "Steel",
      color: "var(--chart-2)",
    },
    copper: {
      label: "Copper",
      color: "var(--chart-3)",
    },
    aluminium: {
      label: "Aluminium",
      color: "var(--chart-4)",
    },
    other: {
      label: "Other",
      color: "var(--chart-5)",
    },
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center p-4">
      <ProductChart
        xAxisDataKey="quantity"
        yAxisDataKey="material"
        title={
          <div className="flex items-center justify-between gap-2">
            <p className="text-xl font-semibold">Browser Usage</p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="text-blue-500">
                <LucideEdit />
              </Button>
              <Button variant="outline" size="icon" className="text-red-500">
                <Trash2 />
              </Button>
            </div>
          </div>
        }
        data={chartData}
        config={chartConfig}
        footer={
          <div className="flex justify-evenly items-center w-full">
            <Button variant="ghost">Weight 50Kg </Button>
            <Button variant="ghost">Price 50Kg </Button>
          </div>
        }
      />
    </div>
  );
};

export default Dashboard;
