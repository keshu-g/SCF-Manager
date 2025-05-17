import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import FormSheet from "@/components/form-sheet";
import { useGetClientsQuery } from "../features/client/clientApi";
import { useGetProductsByClientIdQuery } from "../features/product/productApi";
import { useManufactureProductMutation } from "../features/transaction/transactionApi";
import { toast } from "sonner";

const Transaction = () => {
  const { data: clients } = useGetClientsQuery();
  const [createTransaction] = useManufactureProductMutation();
  const [clientId, setClientId] = useState(null);

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
        console.log("new transaction : ", newTransaction);

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

  return (
    <div className="container mx-auto h-full p-4 flex flex-col gap-4">
      <div className="flex gap-4 justify-evenly sm:justify-end">
        <FormSheet
          title="Add Material"
          description="Add new material details here."
          fields={[
            {
              label: "Client",
              name: "client",
              type: "select",
              // selectLabel: "Select Unit",
              placeholder: "Select Client",
              options: clients?.data.map((client) => ({
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

        <Button>Manage Materials</Button>
      </div>

      <div className="h-full border rounded-sm p-4"></div>
    </div>
  );
};

export default Transaction;
