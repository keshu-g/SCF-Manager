import React from "react";
import { useParams } from "react-router-dom";
import { useGetMaterialsQuery } from "../features/material/materialApi";
import { Badge } from "@/components/ui/badge";

const AddProduct = () => {
  const { clientId } = useParams();
  const {
    data: materials = [],
    isLoading,
    isError,
    error,
  } = useGetMaterialsQuery();

  const [selectedMaterials, setSelectedMaterials] = React.useState([]);

  const toggleMaterial = (id) => {
    setSelectedMaterials((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  if (isLoading) return <p>Loading materials...</p>;
  if (isError) return <p>Error loading materials: {error.message}</p>;

  return (
    <div className="p-4 w-full">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[280px] border rounded-xl p-5 bg-muted/20 shadow-sm">
          <p className="text-lg font-semibold mb-3 text-muted-foreground">
            All Materials
          </p>
          <div className="flex flex-wrap gap-2">
            {materials.data.map((material) => {
              const isSelected = selectedMaterials.includes(material._id);
              return (
                <Badge
                  key={material._id}
                  variant="secondary"
                  onClick={() => toggleMaterial(material._id)}
                  className={`cursor-pointer ${isSelected ? "hidden" : ""}`}
                >
                  {material.name}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Selected Materials */}
        {selectedMaterials.length > 0 && (
          <div className="flex-1 min-w-[280px] border rounded-xl p-5 bg-muted/10 shadow-sm">
            <p className="text-lg font-semibold mb-3 text-muted-foreground">
              Selected Materials
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedMaterials.map((_id) => {
                const mat = materials.data.find((m) => m._id === _id);
                return (
                  <Badge
                    key={_id}
                    variant="default"
                    onClick={() => toggleMaterial(_id)}
                    className="cursor-pointer"
                  >
                    {mat?.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="border rounded-xl p-5 bg-muted/20 shadow-sm mt-4">
        <p className="text-lg font-semibold mb-3 text-muted-foreground">
          Formula
        </p>
        <div className="flex flex-wrap gap-2"></div>
      </div>
    </div>
  );
};

export default AddProduct;
