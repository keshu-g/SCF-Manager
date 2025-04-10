import { useParams } from "react-router-dom";
import {
  useGetProductsByClientIdQuery,
  useDeleteProductMutation,
} from "../features/product/productApi";
import LoadingScreen from "@/components/loading-screen";
import { LucideEdit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ConfirmDialog from "@/components/confirm-dialog";
import { useCallback, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";

const Products = () => {
  const { clientId } = useParams();
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductsByClientIdQuery(clientId);
  const [deleteProduct] = useDeleteProductMutation();
  const [globalFilter, setGlobalFilter] = useState("");

  const filteredProducts = useMemo(() => {
    if (!products?.data) return [];

    return products.data.filter((product) => {
      const search = globalFilter.toLowerCase();

      const matchProductName = product.name.toLowerCase().includes(search);

      const matchMaterialName = product.formula?.some((f) =>
        f.material.name.toLowerCase().includes(search)
      );

      return matchProductName || matchMaterialName;
    });
  }, [products, globalFilter]);

  const handleDelete = useCallback(
    async (productId) => {
      try {
        const response = await deleteProduct(productId).unwrap();
        toast.success(response?.message || "Product deleted successfully");
      } catch (error) {
        toast.error(error?.data?.message || "Failed to delete product");
      }
    },
    [deleteProduct, refetch]
  );

  if (isLoading) return <LoadingScreen />;

  if (isError) {
    toast.error("Material Fetch Error", {
      description: error?.data?.message,
      duration: 2000,
    });
  }

  return (
    <div className="flex flex-wrap gap-4 p-4 justify-center md:justify-normal">
      <div className="w-full flex justify-center md:justify-start">
        <Input
          placeholder="Search products..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm border-border "
          autoComplete="search"
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center md:justify-normal"></div>
    </div>
  );
};

export default Products;
