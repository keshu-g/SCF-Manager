import { useMemo, useCallback } from "react";
import {
  useGetMaterialsQuery,
  useDeleteMaterialMutation,
} from "../features/material/materialApi";
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
import ConfirmDialog from "@/components/confirm-dialog";

const Material = () => {
  const {
    data: materials,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMaterialsQuery();
  const [deleteMaterial] = useDeleteMaterialMutation();

  const handleCopyID = useCallback((id) => {
    navigator.clipboard.writeText(id);
  }, []);

  const handleDelete = useCallback(
    async (material) => {
      try {
        const response = await deleteMaterial(material._id).unwrap(); // Ensure we get API response
        toast.success(response.message || "Material deleted successfully"); // Show API message
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || "Failed to delete material"); // Show API error message
      }
    },
    [deleteMaterial, refetch]
  );

  const columns = useMemo(() => {
    return [
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
    ];
  }, []);

  const actionColumn = useMemo(() => {
    return {
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
                <ConfirmDialog
                  renderTrigger={
                    <DropdownMenuItem
                      className="text-red-600"
                      onSelect={(e) => e.preventDefault()}
                    >
                      Delete
                    </DropdownMenuItem>
                  }
                  title="Delete Material"
                  description={
                    <>
                      Are you sure you want to delete{" "}
                      <strong>{material.name}</strong>?
                    </>
                  }
                  confirmText="Delete"
                  confirmTextClassName="bg-red-600 text-white hover:bg-red-600/50"
                  cancelText="Cancel"
                  onConfirm={() => handleDelete(material)}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    };
  }, [handleCopyID, handleDelete]);

  const finalColumns = useMemo(
    () => [...columns, actionColumn],
    [columns, actionColumn]
  );
  const memoizedMaterials = useMemo(() => materials?.data || [], [materials]);

  if (isLoading) return <LoadingScreen />;

  if (isError) {
    toast.error("Material Fetch Error", {
      description: error?.data?.message,
      duration: 2000,
    });
  }

  return (
    <div className="container mx-auto">
      <DataTable columns={finalColumns} data={memoizedMaterials} />
    </div>
  );
};

export default Material;
