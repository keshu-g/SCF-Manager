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
import { cn } from "@/lib/utils";

const TransactionMaterialTable = ({
  materials = [
    {
      material: "Material ID 1",
      action: "ADD",
      actionQuantity: 10,
      beforeQuantity: 100,
      afterQuantity: 110,
    },
    {
      material: "Material ID 2",
      action: "REMOVE",
      actionQuantity: 5,
      beforeQuantity: 50,
      afterQuantity: 45,
    },
  ],
}) => {
  const totalAdded = materials
    .filter((m) => m.action === "ADD")
    .reduce((acc, m) => acc + m.actionQuantity, 0);

  const totalRemoved = materials
    .filter((m) => m.action === "REMOVE")
    .reduce((acc, m) => acc + m.actionQuantity, 0);

  return (
    <div className="rounded-2xl border shadow-sm p-3 basis-[calc(50%-1rem)] flex-1 min-w-[300px]">
      <div className="w-full overflow-x-auto">
        <Table className="min-w-max">
          <TableHeader>
            <TableRow className="w-full">
              <TableHead className="w-[40%]">Material</TableHead>
              <TableHead className="w-1/7">Action</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Before</TableHead>
              <TableHead className="text-right">After</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.material.name}</TableCell>
                <TableCell
                  className={cn(
                    "font-medium",
                    item.action === "ADD" ? "text-green-600" : "text-red-600"
                  )}
                >
                  {item.action}
                </TableCell>
                <TableCell className="text-right">
                  {item.actionQuantity}
                </TableCell>
                <TableCell className="text-right">
                  {item.beforeQuantity}
                </TableCell>
                <TableCell className="text-right">
                  {item.afterQuantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionMaterialTable;
