import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import FormSheet from "@/components/form-sheet";
import { useGetClientsQuery } from "../features/client/clientApi";
import { useGetProductsByClientIdQuery } from "../features/product/productApi";
import { useGetMaterialsQuery } from "@/features/material/materialApi";
import {
  useManufactureProductMutation,
  useMaterialTransactionMutation,
  useGetTransactionsQuery,
} from "../features/transaction/transactionApi";
import { toast } from "sonner";
import TransactionTable from "@/components/transaction-table";
import LoadingScreen from "@/components/loading-screen";

const Transaction = () => {
  const { data: clients } = useGetClientsQuery();
  const { data: transactions, isLoading: isTransactionsLoading } =
    useGetTransactionsQuery();
  const {
    data: materials,
    isLoading: isMaterialsLoading,
    refetch: refetchMaterials,
  } = useGetMaterialsQuery();
  const [createTransaction] = useManufactureProductMutation();
  const [createMaterialTransaction] = useMaterialTransactionMutation();
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
        refetchMaterials();
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
          action:
            materialQuantities[mat.value].action === "add" ? "ADD" : "REMOVE",
          actionQuantity: materialQuantities[mat.value].quantity,
        }));

        const payload = {
          productId: formData.product,
          quantity: formData.quantity,
          description: formData?.description,
          materials: materialList,
        };
      
        const response = await createMaterialTransaction(payload).unwrap();
        toast.success(response.message || "Material transaction successful");
        refetchMaterials();
      } catch (error) {
        console.error(error);
        toast.error(error.data.message || "Failed to create transaction");
      }
    },
    [createMaterialTransaction, selectedMaterials, materialQuantities]
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
              placeholder: "Enter quantity",
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
                setSelectedMaterials(selectedArr);
                setMaterialQuantities((prev) => {
                  const newQuantities = {};
                  selectedArr.forEach((mat) => {
                    newQuantities[mat.value] = {
                      quantity: prev[mat.value]?.actionQuantity,
                      action: prev[mat.value]?.action || "add",
                    };
                  });
                  return newQuantities;
                });
              },
            },
            ...selectedMaterials.map((mat) => ({
              label: `${mat.label}`,
              description: `Available ${mat.quantity} ${mat.unit}`,
              name: `materialQty_${mat.value}`,
              placeholder: `Enter Quantity to ${
                materialQuantities[mat.value]?.action || "add"
              }`,
              type: "material-transaction",
              value: materialQuantities[mat.value]?.quantity,
              // Default to 1
              action: materialQuantities[mat.value]?.action || "add",
              required: true,
              onChange: (value) => {
                setMaterialQuantities((prev) => ({
                  ...prev,
                  [mat.value]: {
                    ...prev[mat.value],
                    quantity: value,
                  },
                }));
              },
              onActionChange: (isAdd) =>
                setMaterialQuantities((prev) => ({
                  ...prev,
                  [mat.value]: {
                    ...prev[mat.value],
                    action: isAdd ? "add" : "remove",
                  },
                })),
            })),
          ]}
          onSubmit={handleMaterialTransaction}
          trigger={<Button>Manage Materials</Button>}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setSelectedMaterials([]);
              setMaterialQuantities({});
            }
          }}
        />
      </div>

      <div className="h-full rounded-sm p-0 sm:p-4 sm:border">
        <TransactionTable
          transactions={transactions.data}
        />
      </div>
    </div>
  );
};

export default Transaction;
