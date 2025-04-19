import React, { useEffect } from "react";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";
import { useGetMaterialsQuery } from "../features/material/materialApi";
import { useGetClientQuery } from "@/features/client/clientApi";
import {
  useGetProductQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
} from "@/features/product/productApi";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { XIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const parseSafeFloat = (val) => {
  const num = parseFloat(val);
  return isNaN(num) ? 0 : num;
};

const AddProduct = ({ isEdit = false }) => {
  const { clientId, productId } = useParams();
  if (productId) isEdit = true;

  const navigate = useNavigate();
  const {
    data: materials = [],
    isLoading: isMaterialsLoading,
    isError,
    error,
  } = useGetMaterialsQuery();
  const { data: client } = useGetClientQuery(clientId);
  const { data: product, isLoading: isProductLoading } = useGetProductQuery(
    productId,
    { skip: !isEdit }
  );
  const [updateProduct] = useUpdateProductMutation();
  const [createProduct] = useCreateProductMutation();

  const [selectedMaterials, setSelectedMaterials] = React.useState([]);
  const [quantities, setQuantities] = React.useState({});
  const [otherCosts, setOtherCosts] = React.useState([
    { name: "", amount: "" },
  ]);
  const [productState, setProductState] = React.useState({
    name: "",
    price: "",
    cashDiscount: "",
  });

  useEffect(() => {
    if (isEdit && product?.data) {
      setProductState({
        name: product.data.name,
        price: product.data.price,
        cashDiscount: product.data.cashDiscount || "",
      });
      setSelectedMaterials(product.data.formula.map((m) => m.material._id));
      setQuantities(
        product.data.formula.reduce(
          (acc, m) => ({ ...acc, [m.material._id]: m.quantity }),
          {}
        )
      );
      setOtherCosts(product.data.otherCosts || []);
    }
  }, [isEdit, product]);

  const handleSave = async () => {
    const payload = {
      name: productState.name,
      price: parseSafeFloat(productState.price),
      formula: selectedMaterials.map((id) => ({
        material: id,
        quantity: parseSafeFloat(quantities[id]),
      })),
      otherCosts,
      cashDiscount: parseSafeFloat(productState.cashDiscount),
      client: clientId,
    };

    try {
      let response;
      if (isEdit) {
        payload.id = productId;
        response = await updateProduct(payload).unwrap();
      } else {
        response = await createProduct(payload).unwrap();
      }

      toast.success(
        response.message ||
          (isEdit
            ? "Product updated successfully"
            : "Product created successfully")
      );
      navigate(`/client/${clientId}/product`);
    } catch (error) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  const toggleMaterial = (id) => {
    setSelectedMaterials((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleQtyChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: parseSafeFloat(value) }));
  };

  const handleOtherCostChange = (index, key, value) => {
    setOtherCosts((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const addOtherCost = () =>
    setOtherCosts([...otherCosts, { name: "", amount: "" }]);
  const removeOtherCost = (index) => {
    const updated = [...otherCosts];
    updated.splice(index, 1);
    setOtherCosts(updated);
  };

  if (isMaterialsLoading || isProductLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading materials: {error.message}</p>;
  if (isEdit && !product?.data) return <p>Product not found.</p>;

  const getMaterialTotal = () =>
    selectedMaterials.reduce((sum, id) => {
      const mat = materials.data.find((m) => m._id === id);
      const qty = quantities[id] || 0;
      return sum + qty * (mat?.price || 0);
    }, 0);

  const getOtherCostTotal = () =>
    otherCosts.reduce((sum, cost) => sum + parseSafeFloat(cost.amount), 0);

  const totalMaterialCost = getMaterialTotal();
  const totalCashDiscount =
    (totalMaterialCost * parseSafeFloat(productState.cashDiscount)) / 100;
  const totalOtherCost = getOtherCostTotal();
  const totalCost = totalMaterialCost + totalCashDiscount + totalOtherCost;
  const profit = parseSafeFloat(productState.price) - totalCost;

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">{client?.data?.name}</h1>

      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <Input
          type="text"
          placeholder="Product Name"
          value={productState.name}
          onChange={(e) =>
            setProductState({ ...productState, name: e.target.value })
          }
          className="md:w-1/2"
        />
        <Input
          type="number"
          placeholder="Selling Price"
          value={productState.price}
          onChange={(e) =>
            setProductState({ ...productState, price: e.target.value })
          }
          className="md:w-1/2"
        />
      </div>

      {/* Material Selection */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[280px] border rounded-xl p-5 bg-muted/20 shadow-sm">
          <p className="text-lg font-semibold mb-3 text-muted-foreground">
            All Materials
          </p>
          <div className="flex flex-wrap gap-2">
            {materials.data.map((material) =>
              !selectedMaterials.includes(material._id) ? (
                <Badge
                  key={material._id}
                  variant="secondary"
                  onClick={() => toggleMaterial(material._id)}
                  className="cursor-pointer"
                >
                  {material.name}
                </Badge>
              ) : null
            )}
          </div>
        </div>

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

      {/* Cost Formula */}
      <div className="border rounded-xl p-4 bg-muted/20 shadow-sm mt-4">
        <p className="text-lg font-semibold mb-4 text-muted-foreground">
          Formula
        </p>
        <div className="space-y-3">
          {selectedMaterials.map((_id) => {
            const mat = materials.data.find((m) => m._id === _id);
            const qty = quantities[_id] || "";
            const price = mat?.price || 0;
            const total = qty * price;

            return (
              <div
                key={_id}
                className="flex justify-between items-center border rounded-lg px-4 py-3 bg-background"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {mat?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ₹{price.toFixed(2)} per kg
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={qty}
                    onChange={(e) => handleQtyChange(_id, e.target.value)}
                    className="w-20 md:w-28"
                  />
                  <span className="text-sm text-muted-foreground w-16 md:w-28 text-right">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between font-semibold mt-4 border-t pt-2">
          <span>Total Weight</span>
          <span>
            {selectedMaterials
              .reduce((sum, id) => sum + (quantities[id] || 0), 0)
              .toFixed(2)}{" "}
            kg
          </span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total Material Cost</span>
          <span>₹{totalMaterialCost.toFixed(2)}</span>
        </div>
      </div>

      {/* Other Costs */}
      <div className="border rounded-xl p-4 bg-muted/20 shadow-sm mt-4">
        <p className="text-lg font-semibold mb-4 text-muted-foreground">
          Other Costs
        </p>
        <div className="space-y-3">
          <div className="flex justify-between items-center gap-3 border rounded-lg px-4 py-3 bg-background">
            <Input
              type="text"
              value="Cash Discount"
              disabled
              className="w-1/2"
            />
            <Input
              type="number"
              placeholder="0.00"
              value={productState.cashDiscount}
              onChange={(e) =>
                setProductState({
                  ...productState,
                  cashDiscount: e.target.value,
                })
              }
              className="w-20 md:w-28"
            />
          </div>

          {otherCosts.map((cost, index) => (
            <div
              key={index}
              className="flex justify-between items-center gap-3 border rounded-lg px-4 py-3 bg-background"
            >
              <Input
                type="text"
                placeholder="Name"
                value={cost.name}
                onChange={(e) =>
                  handleOtherCostChange(index, "name", e.target.value)
                }
                className="w-1/2"
              />
              <Input
                type="number"
                placeholder="0.00"
                value={cost.amount}
                onChange={(e) =>
                  handleOtherCostChange(index, "amount", e.target.value)
                }
                className="w-20 md:w-28"
                min={0}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeOtherCost(index)}
                className="text-destructive"
              >
                <XIcon />
              </Button>
            </div>
          ))}

          <Button variant="outline" size="sm" onClick={addOtherCost}>
            <Plus /> Add Cost
          </Button>
        </div>

        <div className="flex justify-between font-semibold mt-4 border-t pt-2">
          <span>Total Other Costs</span>
          <span>₹{totalOtherCost.toFixed(2)}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="border rounded-xl p-4 bg-muted/20 shadow-sm mt-4">
        <p className="text-lg font-semibold mb-2 text-muted-foreground">
          Summary
        </p>
        <div className="flex flex-col gap-2 text-base text-foreground">
          <div className="flex justify-between">
            <span>Selling Price</span>
            <span>₹{parseSafeFloat(productState?.price).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Material Cost</span>
            <span>₹{totalMaterialCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Cash Discount</span>
            <span>₹{totalCashDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Other Cost</span>
            <span>₹{totalOtherCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span>Total Cost</span>
            <span>₹{totalCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Profit</span>
            <span
              className={cn(
                "font-semibold",
                profit < 0 ? "text-red-600" : "text-green-600"
              )}
            >
              ₹{profit.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Button variant="default" onClick={handleSave}>
          {isEdit ? "Save Changes" : "Save Product"}
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;
