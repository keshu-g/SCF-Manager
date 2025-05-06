import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import FormSheet from "@/components/form-sheet";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * The Transaction component is a form that allows the user to create a new material or product

 * The form also has a submit button that calls the handleCreate function when clicked
 * The component also renders a button to manage materials
 * The component is wrapped in a container div with a class of "container" and a style of "mx-auto h-full p-4 flex flex-col gap-4"
 * The component is rendered inside a Sheet component with a title of "Add Material" and a description of "Add new material details here."
 * The component has a trigger prop that renders a button with the text "Manufacture Product" that opens the sheet when clicked
 */

const Transaction = () => {
  const handleCreate = () => {};

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
              label: "Product",
              name: "product",
              type: "select",
              // selectLabel: "Select Unit",
              placeholder: "Select product",
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
