import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import FormSheet from "@/components/form-sheet";
import { useGetClientsQuery } from "../features/client/clientApi";
import { useGetProductsByClientIdQuery } from "../features/product/productApi";
import { useGetMaterialsQuery } from "@/features/material/materialApi";
import {
  useManufactureProductMutation,
  useGetTransactionsQuery,
} from "../features/transaction/transactionApi";
import { toast } from "sonner";
import TransactionTable from "@/components/transaction-table";
import LoadingScreen from "@/components/loading-screen";

const Transaction = () => {
  const { data: clients } = useGetClientsQuery();
  const { data: transactions, isLoading: isTransactionsLoading } =
    useGetTransactionsQuery();
  const { data: materials, isLoading: isMaterialsLoading } =
    useGetMaterialsQuery();
  const [createTransaction] = useManufactureProductMutation();
  const [clientId, setClientId] = useState(null);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [materialQuantities, setMaterialQuantities] = useState({});

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError,
  } = useGetProductsByClientIdQuery(clientId, {
    skip: !clientId,
  });

  const handleClientChange = (clientId) => {
    setClientId(clientId); // this triggers the query
  };

  const handleCreate = useCallback(
    async (newTransaction) => {
      try {
        const response = await createTransaction({
          productId: newTransaction.product,
          quantity: newTransaction.quantity,
          description: newTransaction?.description,
        }).unwrap();
        toast.success(response.message || "Manufactured successfully");
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || "Failed to create material");
      }
    },
    [createTransaction]
  );

  const handleMaterialTransaction = useCallback(
    async (formData) => {
      try {
        const materialList = selectedMaterials.map((mat) => ({
          materialId: mat.value,
          quantity: materialQuantities[mat.value] || 0,
        }));

        const payload = {
          productId: formData.product,
          quantity: formData.quantity,
          description: formData?.description,
          materials: materialList,
        };

        const response = await createTransaction(payload).unwrap();
        toast.success(response.message || "Manufactured successfully");
      } catch (error) {
        console.error(error);
        toast.error(error?.data?.message || "Failed to create transaction");
      }
    },
    [createTransaction, selectedMaterials, materialQuantities]
  );

  if (isTransactionsLoading) return <LoadingScreen />;

  return (
    <div className="container mx-auto h-full p-4 flex flex-col gap-4">
      <div className="flex gap-4 justify-evenly sm:justify-end">
        <FormSheet
          title="Add Transaction"
          description="Transaction details here."
          fields={[
            {
              label: "Client",
              name: "client",
              type: "select",
              // selectLabel: "Select Unit",
              placeholder: "Select Client",
              options: clients?.data?.map((client) => ({
                value: client._id,
                label: client.name,
              })),
              onchange: handleClientChange,
              required: true,
              autoComplete: "off",
            },
            {
              label: "Product",
              name: "product",
              type: "select",
              selectLabel: "Products of selected client",
              placeholder: "Select product",
              options:
                productsData?.data?.map((product) => ({
                  value: product._id,
                  label: product.name,
                })) || [],
              required: true,
              autoComplete: "off",
              isLoading: isProductsLoading,
            },
            {
              label: "Quantity",
              name: "quantity",
              type: "number",
              // selectLabel: "Select Unit",
              placeholder: "Select product",
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
          trigger={<Button>Manufacture Product</Button>}
        />

        <FormSheet
          title="Manage Materials"
          description="Transaction details here."
          fields={[
            {
              name: "material",
              type: "multiselect",
              label: "Materials",
              placeholder: "Select Material",
              description: "Use dropdown to make multiple selection",
              options:
                materials?.data?.map((material) => ({
                  value: material._id,
                  label: material.name,
                  quantity: material.quantity,
                  unit: material.unit,
                })) || [],
              required: true,
              autoComplete: "off",
              isLoading: isMaterialsLoading,
              onchange: (selected) => {
                const selectedArr = selected || [];
                // Reset selected materials
                setSelectedMaterials(selectedArr);
                // Set new materialQuantities from scratch
                setMaterialQuantities(() => {
                  const newQuantities = {};
                  selectedArr.forEach((mat) => {
                    newQuantities[mat.value] = null; // Default quantity
                  });
                  return newQuantities;
                });
              },
            },
            // Material Quantities
            ...selectedMaterials.map((mat) => ({
              label: `${mat.label} Quantity (${mat.quantity} ${mat.unit})`,
              name: `materialQty_${mat.value}`,
              placeholder: "Quantity",
              type: "number",
              value: materialQuantities[mat.value] || null,
              onChange: (e) =>
                setMaterialQuantities((prev) => ({
                  ...prev,
                  [mat.value]: parseInt(e.target.value) || 0,
                })),
            })),
          ]}
          onSubmit={handleMaterialTransaction}
          trigger={<Button>Manage Materials</Button>}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              // Reset selected materials and quantities when the sheet is closed
              setSelectedMaterials([]);
              setMaterialQuantities({});
            }
          }}
        />
      </div>

      <div className="h-full rounded-sm p-0 sm:p-4 sm:border">
        <TransactionTable
          transactions={transactions.data.filter(
            (transaction) => transaction?.type === "PRODUCT"
          )}
        />
      </div>
    </div>
  );
};

export default Transaction;
