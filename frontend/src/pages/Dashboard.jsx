import React from "react";
import { ProductChart } from "@/components/product-chart";
import { LucideEdit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";

const Dashboard = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4 w-full">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};

export default Dashboard;
