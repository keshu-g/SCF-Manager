import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

const ProductMaterialsTable = () => {
  return (
    <div className="rounded-2xl border shadow-sm p-4 ">
      <Table>
        <TableHeader>
          <TableRow className="w-full">
            <TableHead className="w-[150px]">Material</TableHead>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead className="w-[100px]">Quantity</TableHead>
            <TableHead className="w-[100px] text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Material 1</TableCell>
            <TableCell>$10.00</TableCell>
            <TableCell>100</TableCell>
            <TableCell className="text-right">$1,000.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Material 2</TableCell>
            <TableCell>$10.00</TableCell>
            <TableCell>100</TableCell>
            <TableCell className="text-right">$1,000.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Material 3</TableCell>
            <TableCell>$10.00</TableCell>
            <TableCell>100</TableCell>
            <TableCell className="text-right">$1,000.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="font-semibold">
              Total
            </TableCell>
            <TableCell className=" font-semibold">200 kg</TableCell>
            <TableCell className="text-right font-semibold">
              $2,000.00
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ProductMaterialsTable;
