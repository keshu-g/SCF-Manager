import { useMemo, useCallback } from "react";
import { useGetMaterialsQuery } from "../features/material/materialApi";
import DataTable from "../components/data-table";
import { MoreHorizontal, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DataTableColumnHeader from "@/components/data-table-column-header";
import LoadingScreen from "@/components/loading-screen";
import { toast } from "sonner";

const Material = () => {
  const { data: materials, isLoading, isError, error } = useGetMaterialsQuery();

  // Memoized function for copying Material ID
  const handleCopyID = useCallback((id) => {
    navigator.clipboard.writeText(id);
  }, []);

  // Memoized function for handling delete
  const handleDelete = useCallback((material) => {
    console.log(material);
  }, []);

  // Memoized table columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => <div className="pl-3">{row.getValue("name")}</div>,
      },
      {
        accessorKey: "quantity",
        header: ({ column }) => (
          <div className="flex justify-end">
            <DataTableColumnHeader column={column} title="Quantity" />
          </div>
        ),
        cell: ({ row }) => {
          const quantity = parseInt(row.getValue("quantity"), 10);
          const formatted = new Intl.NumberFormat("en-US", {
            style: "unit",
            unit: "kilogram",
          }).format(quantity);

          return <div className="pr-4 text-right font-medium">{formatted}</div>;
        },
      },
      {
        accessorKey: "updatedAt",
        header: ({ column }) => (
          <div className="flex justify-end">
            <DataTableColumnHeader column={column} title="Updated" />
          </div>
        ),
        cell: ({ row }) => {
          const updatedAt = row.getValue("updatedAt");
          return (
            <div className="pr-4 text-right font-medium">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(updatedAt))}
            </div>
          );
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const material = row.original;

          return (
            <div className="flex justify-end -ml-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-6" />
                  </TooltipTrigger>
                  <TooltipContent>{material.description}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-6 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleCopyID(material._id)}>
                    Copy Material ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Edit material</DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => handleDelete(material)}
                  >
                    Delete material
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [handleCopyID, handleDelete]
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    toast.error("Material Featch Error", {
      description: error?.data?.message,
      duration: 2000,
    });
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={materials?.data || []} />
    </div>
  );
};

export default Material;
