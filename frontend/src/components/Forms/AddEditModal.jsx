import React, { useState, useEffect } from "react";
import { InputField } from ".";

const AddEditModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  entityFields,
  entityName,
}) => {
  const [formData, setFormData] = useState(
    initialData || entityFields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(entityFields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));
    }
  }, [initialData, entityFields]);

  if (!isOpen) return null; // Hide modal when not open

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal container */}
      <div className="bg-white dark:bg-dark-primary-bg p-6 rounded-lg shadow-lg max-w-md w-full mx-4 space-y-4">
        <h2 className="text-xl font-bold text-center">
          {initialData ? `Edit ${entityName}` : `Add ${entityName}`}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {entityFields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <InputField
                id={field.name}
                label={field.label}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
              />
            </div>
          ))}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-dark-secondary-bg text-gray-700 dark:text-dark-primary-text rounded-lg hover:bg-gray-400 dark:hover:bg-dark-border-color"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-accent-color text-white rounded-lg hover:bg-pink-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditModal;
