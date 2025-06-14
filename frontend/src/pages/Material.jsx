import { useMemo, useCallback } from "react";
import {
  useGetMaterialsQuery,
  useDeleteMaterialMutation,
  useUpdateMaterialMutation,
  useCreateMaterialMutation,
} from "../features/material/materialApi";
import DataTable from "../components/data-table";
import { MoreHorizontal, InfoIcon, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DataTableColumnHeader from "@/components/data-table-column-header";
import LoadingScreen from "@/components/loading-screen";
import { toast } from "sonner";
import ConfirmDialog from "@/components/confirm-dialog";
import FormSheet from "@/components/form-sheet";
import TooltipPop from "@/components/tooltip-pop";
import { formatValue } from "@/lib/utils";

const Material = () => {
  const {
    data: materials,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMaterialsQuery();
  const [deleteMaterial] = useDeleteMaterialMutation();
  const [updateMaterial] = useUpdateMaterialMutation();
  const [createMaterial] = useCreateMaterialMutation();

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

  const handleUpdate = useCallback(
    async (updatedMaterial) => {
      try {
        let updatedData = {
          id: updatedMaterial._id,
          name: updatedMaterial.name,
          quantity: updatedMaterial.quantity,
          description: updatedMaterial.description,
          price: updatedMaterial.price,
          unit: updatedMaterial.unit
        };
        const response = await updateMaterial(updatedData).unwrap();
        toast.success(response.message || "Material updated successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || "Failed to update material");
      }
    },
    [updateMaterial, refetch]
  );

  const handleCreate = useCallback(
    async (newMaterial) => {
      try {
        const response = await createMaterial(newMaterial).unwrap();
        toast.success(response.message || "Material created successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || "Failed to create material");
      }
    },
    [createMaterial, refetch]
  );

  const columns = useMemo(() => {
    return [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => <div className="pl-1">{row.getValue("name")}</div>,
      },
      {
        accessorFn: (row) => {
          const quantity = parseInt(row.quantity, 10);
          return formatValue({ quantity, type: "unit", unit: row.unit });
        },
        id: "quantity",
        header: ({ column }) => (
          <div className="flex justify-end">
            <DataTableColumnHeader column={column} title="Quantity" />
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="text-right font-medium">
              {row.getValue("quantity")}
            </div>
          );
        },
      },
      {
        accessorFn: (row) => {
          const price = parseInt(row.price);
          return formatValue({
            quantity: price,
            type: "currency",
            currency: "INR",
          });
        },
        id: "price",
        header: ({ column }) => (
          <div className="flex justify-end">
            <DataTableColumnHeader column={column} title="Price" />
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="text-right font-medium">
              {row.getValue("price")}
            </div>
          );
        },
      },
      {
        accessorFn: (row) =>
          new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(new Date(row.updatedAt)),
        id: "updatedAt",
        header: ({ column }) => (
          <div className="flex justify-end">
            <DataTableColumnHeader column={column} title="Updated" />
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className=" text-right font-medium">
              {row.getValue("updatedAt")}
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
            <TooltipPop
              content={material.description}
              className="min-w-min max-w-xs"
              trigger={
                <Button variant="ghost" className="h-6 w-8 p-0">
                  <InfoIcon className="h-4 w-4" />
                </Button>
              }
            />
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
                <div className="focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground">
                  <FormSheet
                    title="Edit Material"
                    description="Update material details here."
                    fields={[
                      { label: "ID", name: "_id", type: "hidden" }, // Ensure ID is passed
                      {
                        label: "Name",
                        name: "name",
                        type: "text",
                        required: true,
                        autoComplete: "name",
                      },
                      {
                        label: "Quantity",
                        name: "quantity",
                        type: "number",
                        required: true,
                        autoComplete: "off",
                      },
                      {
                        label: "Price",
                        name: "price",
                        type: "number",
                        required: true,
                        autoComplete: "off",
                      },
                      {
                        label: "Unit",
                        name: "unit",
                        type: "select",
                        // selectLabel: "Select Unit",
                        placeholder: "Select Unit",
                        options: [
                          { value: "kilogram", label: "⚖️ Kilogram" },
                          { value: "gram", label: "📏 Gram" },
                          { value: "liter", label: "🧴 Liter" },
                          { value: "milliliter", label: "💧 Milliliter" },
                          { value: "piece", label: "📦 Pieces" },
                        ],
                        required: true,
                        autoComplete: "off",
                      },
                      {
                        label: "Description",
                        name: "description",
                        type: "textarea",
                        autoComplete: "off",
                      },
                    ]}
                    data={material}
                    onSubmit={handleUpdate}
                    trigger="Edit Material"
                  />
                </div>
                <ConfirmDialog
                  renderTrigger={
                    <DropdownMenuItem
                      className="text-red-600"
                      onSelect={(e) => e.preventDefault()}
                    >
                      Delete Material
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
  }, [handleCopyID, handleDelete, handleUpdate]);

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
    <div className="container mx-auto h-full px-4">
      <DataTable
        columns={finalColumns}
        data={memoizedMaterials}
        additionalActions={
          <FormSheet
            title="Add Material"
            description="Add new material details here."
            fields={[
              {
                label: "Name",
                name: "name",
                type: "text",
                required: true,
                autoComplete: "name",
              },
              {
                label: "Quantity",
                name: "quantity",
                type: "number",
                required: true,
                autoComplete: "off",
              },
              {
                label: "Price",
                name: "price",
                type: "number",
                required: true,
                autoComplete: "off",
              },
              {
                label: "Unit",
                name: "unit",
                type: "select",
                // selectLabel: "Select Unit",
                placeholder: "Select Unit",
                options: [
                  { value: "kilogram", label: "⚖️ Kilogram" },
                  { value: "gram", label: "📏 Gram" },
                  { value: "liter", label: "🧴 Liter" },
                  { value: "milliliter", label: "💧 Milliliter" },
                  { value: "piece", label: "📦 Pieces" },
                ],
                required: true,
                autoComplete: "off",
              },
              {
                label: "Description",
                name: "description",
                type: "textarea",
                autoComplete: "off",
              },
            ]}
            onSubmit={handleCreate}
            trigger={
              <TooltipPop
                content="Add Material"
                trigger={
                  <Button variant="outline" size="icon"> 
                    <Plus />
                  </Button>
                }
              />
            }
          />
        }
      />
    </div>
  );
};

export default Material;
