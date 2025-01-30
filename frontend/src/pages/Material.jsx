import React, { useState } from "react";
import { AddEditModal, Table } from "../components";

const Material = () => {
  const [materials, setMaterials] = useState([
    {
      name: "Wood Plank",
      price: 250,
      quantity: 50,
    },
    {
      name: "Steel Rod",
      price: 500,
      quantity: 30,
    },
    {
      name: "Cement Bag",
      price: 350,
      quantity: 100,
    },
    {
      name: "Bricks",
      price: 5,
      quantity: 1000,
    },
    {
      name: "Paint Bucket",
      price: 1200,
      quantity: 20,
    },
    {
      name: "PVC Pipe",
      price: 150,
      quantity: 60,
    },
    {
      name: "Glass Sheet",
      price: 800,
      quantity: 10,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const materialFields = [
    {
      name: "name",
      label: "Material Name",
      type: "text",
      placeholder: "Enter material name",
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "Enter material price",
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      placeholder: "Enter quantity",
    },
  ];

  const handleAddMaterial = (material) => {
    setMaterials([...materials, material]);
    setIsModalOpen(false);
  };

  const handleEditMaterial = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (editedMaterial) => {
    const updatedMaterials = [...materials];
    updatedMaterials[editIndex] = editedMaterial;
    setMaterials(updatedMaterials);
    setIsModalOpen(false);
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleDeleteMaterial = (index) => {
    const updatedMaterials = materials.filter((_, i) => i !== index);
    setMaterials(updatedMaterials);
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "test", label: "test" },
    { key: "test", label: "test" },
    { key: "test", label: "test" },
    { key: "quantity", label: "Quantity" },
  ];

  const actions = [
    {
      label: "Edit",
      className: "text-blue-500 hover:text-blue-700",
      onClick: handleEditMaterial,
    },
    {
      label: "Delete",
      className: "text-red-500 hover:text-red-700",
      onClick: handleDeleteMaterial,
    },
  ];
  return (
    <div className="p-4 space-y-6 bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text">
      <button
        onClick={() => {
          setIsEditing(false);
          setIsModalOpen(true);
        }}
        className="py-2 px-4 bg-accent-color text-white rounded-lg"
      >
        Add Material
      </button>
      <div className="scrollbar-custom">
        <Table columns={columns} data={materials} actions={actions} />
      </div>

      <AddEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={isEditing ? handleSaveEdit : handleAddMaterial}
        initialData={isEditing ? materials[editIndex] : null}
        entityFields={materialFields}
        entityName="Material"
      />
    </div>
  );
};

export default Material;
