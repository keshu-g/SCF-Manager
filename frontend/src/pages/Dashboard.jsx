import React from "react";
import { ProductChart } from "@/components/product-chart";
import { LucideEdit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";

const Dashboard = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center p-4">
      <ProductCard />
    </div>
  );
};

export default Dashboard;
