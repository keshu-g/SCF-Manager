import React from "react";
import { ProductCard } from "@/components/product-card";

const Dashboard = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4 w-full">
      <ProductCard
        productName="Cool Product"
        materials={[
          { name: "Steel", price: 50, quantity: 10 },
          { name: "Plastic", price: 20, quantity: 5 },
        ]}
        otherCosts={[
          { name: "Transport", amount: 100 },
          { name: "Packaging", amount: 50 },
        ]}
        sellingPrice={4000}
      />

      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};

export default Dashboard;
