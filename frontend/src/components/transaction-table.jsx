import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductOtherTable from "./product-other-table";
import { cn } from "@/lib/utils";
import TransactionProductMaterialTable from "./transaction-product-material-table";

const TransactionProductCard = ({
  productName = "Good Product Name",
  clientName = "Client Name",
  quantityManufactured = 0,
  materials = [],
  otherCosts = [],
  sellingPrice = 0,
  cashDiscount = 0,
  //   handleEdit,
  //   handleDelete,
}) => {
  const totalMaterialCost = materials.reduce(
    (acc, item) => acc + item?.price * item.quantity,
    0
  );
  const totalCashDiscount = totalMaterialCost * (cashDiscount / 100);
  const totalOtherCost = otherCosts.reduce((acc, item) => acc + item.amount, 0);
  const totalCost = totalMaterialCost + totalOtherCost + totalCashDiscount;
  const profit = sellingPrice - totalCost;

  return (
    <Card className="gap-4 w-full">
      <CardHeader className="flex items-center justify-between ">
        <CardTitle className="text-lg">
          {productName} x {quantityManufactured}
        </CardTitle>
        <CardTitle className="text-lg">{clientName}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 w-full justify-evenly sm:justify-center">
        <TransactionProductMaterialTable materials={materials} />
        <ProductOtherTable otherCosts={otherCosts} />
        <div className="border rounded-xl p-4 shadow-sm min-w-[300px] w-full">
          <p className="text-lg font-semibold mb-2 text-muted-foreground">
            Summary
          </p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Selling Price</span>
              <span>₹{sellingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Material Cost</span>
              <span>₹{totalMaterialCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Cash Discount</span>
              <span>₹{totalCashDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Other Cost</span>
              <span>₹{totalOtherCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-foreground border-t pt-2">
              <span>Total Cost</span>
              <span>₹{totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-foreground">
              <span className="font-medium">Profit</span>
              <span
                className={cn(
                  "font-semibold",
                  profit < 0 ? "text-red-600" : "text-green-600"
                )}
              >
                ₹{profit.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TransactionTable = ({ transactions }) => {
  return (
    <div className="flex flex-col gap-4">
      {transactions?.map((transaction) => (
        <TransactionProductCard
          productName={transaction?.product?.product?.name}
          clientName={transaction?.product?.client?.name}
          quantityManufactured={transaction?.product?.quantity}
          materials={transaction?.product?.summery?.material}
        />
      ))}
    </div>
  );
};

export default TransactionTable;
