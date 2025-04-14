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
import TooltipPop from "@/components/tooltip-pop";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
  
  const handleAddProductClick = useCallback(
    (client) => {
      navigate(`/client/${clientId}/product/add`);
    },
    [navigate]
  );

  if (isLoading) return <LoadingScreen />;

  if (isError) {
    toast.error("Material Fetch Error", {
      description: error?.data?.message,
      duration: 2000,
    });
  }

  return (
    <div className="p-4 w-full">
      <div className="flex items-center justify-between gap-2 w-full">
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
          content="Add Material"
          trigger={
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                handleAddProductClick();
              }}
            >
              <Plus />
            </Button>
          }
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center md:justify-normal w-full">
        {/* content here */}
      </div>
    </div>
  );
};

export default Products;
