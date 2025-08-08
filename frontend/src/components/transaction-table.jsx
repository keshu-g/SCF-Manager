import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductOtherTable from "./product-other-table";
import { cn } from "@/lib/utils";
import TransactionProductMaterialTable from "./transaction-product-material-table";
import TransactionMaterialTable from "./transaction-material-table";
import { Badge } from "./ui/badge";

const TransactionProductCard = ({
  productName = "Not Found",
  clientName = "Not Found",
  quantityManufactured = 0,
  materials = [],
  otherCosts = [],
  sellingPrice = 0,
  cashDiscount = 0,
  createdAt = "Not Found",
  description = "",
  //   handleEdit,
  //   handleDelete,
}) => {
  const totalMaterialCost = materials.reduce(
    (acc, item) => acc + item?.totalPrice,
    0
  );
  const totalCashDiscount = totalMaterialCost * (cashDiscount / 100);
  const totalOtherCost = otherCosts.reduce((acc, item) => acc + item.amount, 0);
  const totalCost = totalMaterialCost + totalOtherCost + totalCashDiscount;
  const profit = sellingPrice * quantityManufactured - totalCost;

  return (
    <Card className="gap-4 w-full">
      <CardHeader className="flex items-center justify-between px-4 sm:px-6 w-full">
        <CardTitle className="p-4 border-b flex flex-col gap-3 border rounded-xl shadow-sm w-full">
          <div className="flex gap-2 flex-wrap sm:justify-between justify-center">
            <h2 className="text-xl font-bold">Product Transaction</h2>
            <Badge className="text-xs sm:text-sm px-2">
              {new Date(createdAt)
                .toLocaleString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
                .replace(",", " at")}
            </Badge>
          </div>

          <h2>{productName}</h2>
          {/* Second row: details */}
          <div className="flex flex-wrap text-xm sm:flex-row  gap-2 sm:flex-wrap">
            <Badge>{quantityManufactured} Manufactured</Badge>
            <Badge>Client: {clientName}</Badge>
            <Badge>Price: ₹{sellingPrice}</Badge>
          </div>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 w-full justify-evenly sm:justify-center px-4 sm:px-6">
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

const TransactionMaterialCard = ({
  materials = [],
  createdAt = "Not Found",
}) => {
  return (
    <Card className="gap-4 w-full">
      <CardHeader className="flex items-center justify-between px-4 sm:px-6 w-full">
        <CardTitle className="p-4 border-b flex flex-col gap-3 border rounded-xl shadow-sm w-full">
          <div className="flex gap-2 flex-wrap sm:justify-between justify-center">
            <h2 className="text-xl font-bold">Material Transaction</h2>
            <Badge className="text-xs sm:text-sm px-2">
              {new Date(createdAt)
                .toLocaleString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
                .replace(",", " at")}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 w-full justify-evenly sm:justify-center px-4 sm:px-6">
        <TransactionMaterialTable materials={materials} />
      </CardContent>
    </Card>
  );
};

const TransactionTable = ({ transactions }) => {
  return (
    <div className="flex flex-col gap-4">
      {transactions?.map((transaction) => {
        if (transaction.type === "PRODUCT") {
          return (
            <TransactionProductCard
              key={transaction?._id}
              productName={transaction?.product?.product?.name}
              clientName={transaction?.product?.client?.name}
              quantityManufactured={transaction?.product?.quantity}
              materials={transaction?.product?.summery?.material}
              otherCosts={transaction?.product?.summery?.otherCosts}
              sellingPrice={transaction?.product?.summery?.sellingPrice}
              cashDiscount={transaction?.product?.summery?.cashDiscount}
              createdAt={transaction?.createdAt}
              description={transaction?.description}
            />
          );
        } else {
          return (
            <TransactionMaterialCard
              key={transaction?._id}
              materials={transaction?.materials}
              createdAt={transaction?.createdAt}
            />
          );
        }
      })}
    </div>
  );
};

export default TransactionTable;
