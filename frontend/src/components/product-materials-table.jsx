import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

const ProductMaterialsTable = ({
  materials = [
    { name: "Material 1", price: 10, quantity: 100 },
    { name: "Material 2", price: 20, quantity: 50 },
  ],
  totalQuantity = 150,
  totalCost = 2000,
}) => {
  return (
    <div className="rounded-2xl border shadow-sm p-3 basis-[calc(50%-1rem)] flex-1 min-w-[300px]">
      <div className="w-full overflow-x-auto">
        <Table className="min-w-max">
          <TableHeader>
            <TableRow className="w-full">
              <TableHead className="w-1/4 sm:w-1/3">Material</TableHead>
              <TableHead className="w-1/4 sm:w-1/3">Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className="text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-transparent">
            <TableRow>
              <TableCell colSpan={2} className="font-semibold">
                Total
              </TableCell>
              <TableCell className="font-semibold">
                {totalQuantity} kg
              </TableCell>
              <TableCell className="text-right font-semibold">
                ${totalCost.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default ProductMaterialsTable;
