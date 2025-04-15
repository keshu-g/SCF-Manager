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

const ProductOtherTable = ({ otherCosts = [] }) => {
  const totalOtherCost = otherCosts.reduce((acc, item) => acc + item.amount, 0);
  return (
    <div className="rounded-2xl border shadow-sm p-3 basis-[calc(20%-1rem)] flex-1 min-w-[300px]">
      <div className="w-full overflow-x-auto">
        <Table className="min-w-max">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Other Cost Name</TableHead>
              <TableHead className="w-1/2 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {otherCosts.length > 0 ? (
              otherCosts.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">
                    ₹{item.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  No other costs available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter className="bg-transparent">
            <TableRow>
              <TableCell colSpan={1} className="font-semibold" >
                Total
              </TableCell>
              <TableCell className="text-right font-semibold">
                ₹{totalOtherCost}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default ProductOtherTable;
