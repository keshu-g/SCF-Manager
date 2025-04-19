import { useParams, useNavigate } from "react-router-dom";
import {
  useGetProductsByClientIdQuery,
  useDeleteProductMutation,
} from "../features/product/productApi";
import { useGetClientQuery } from "../features/client/clientApi";
import LoadingScreen from "@/components/loading-screen";
import { LucideEdit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ConfirmDialog from "@/components/confirm-dialog";
import { useCallback, useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import TooltipPop from "@/components/tooltip-pop";
import { ProductCard } from "@/components/product-card";

const Products = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductsByClientIdQuery(clientId);

  const { data: client } = useGetClientQuery(clientId);
  const [deleteProduct] = useDeleteProductMutation();
  const [globalFilter, setGlobalFilter] = useState("");

  const filteredProducts = useMemo(() => {
    if (!products?.data) return [];

    const search = globalFilter.toLowerCase();

    return products.data.filter((product) => {
      const matchProductName = product.name.toLowerCase().includes(search);
      const matchMaterialName = product.formula?.some((f) =>
        f.material.name.toLowerCase().includes(search)
      );

      return matchProductName || matchMaterialName;
    });
  }, [products, globalFilter]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDelete = useCallback(
    async (productId) => {
      try {
        const response = await deleteProduct(productId).unwrap();
        toast.success(response?.message || "Product deleted successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || "Failed to delete product");
      }
    },
    [deleteProduct, refetch]
  );

  const handleEditClick = useCallback(
    (productId) => {
      navigate(`/client/${clientId}/product/${productId}/edit`);
    },
    [navigate, clientId]
  );

  const handleAddProductClick = useCallback(() => {
    navigate(`/client/${clientId}/product/add`);
  }, [navigate, clientId]);

  if (isLoading) return <LoadingScreen />;

  if (isError) {
    toast.error("Material Fetch Error", {
      description: error?.data?.message,
      duration: 2000,
    });
  }

  return (
    <div className="px-4 pb-4 w-full">
      <h1 className="text-2xl font-bold my-4">{client?.data?.name}</h1>

      <div className="flex items-center justify-between gap-2 w-full pb-4">
        <div className="flex-1">
          <Input
            placeholder="Search products..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm border-border"
            autoComplete="search"
          />
        </div>
        <TooltipPop
          content="Add Product"
          trigger={
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddProductClick}
            >
              <Plus />
            </Button>
          }
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center md:justify-normal w-full">
        {filteredProducts.length === 0 ? (
          <p className="text-muted-foreground mt-4">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              productName={product.name}
              materials={product.formula}
              otherCosts={product.otherCosts}
              sellingPrice={product.price}
              cashDiscount={product.cashDiscount}
              handleEdit={
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditClick(product._id)}
                >
                  <LucideEdit />
                </Button>
              }
              handleDelete={
                <ConfirmDialog
                  renderTrigger={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:text-red-500"
                    >
                      <Trash2 />
                    </Button>
                  }
                  title="Delete Product"
                  description={
                    <>
                      Are you sure you want to delete{" "}
                      <strong>{product.name}</strong>?
                    </>
                  }
                  onConfirm={() => handleDelete(product._id)}
                  confirmText="Delete"
                />
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
