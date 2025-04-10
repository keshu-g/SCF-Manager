import { useParams } from "react-router-dom";
import {
  useGetProductsByClientIdQuery,
  useDeleteProductMutation,
} from "../features/product/productApi";
import LoadingScreen from "@/components/loading-screen";
import { ProductChart } from "@/components/product-chart";
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

      <div className="flex flex-wrap gap-4 justify-center md:justify-normal">
        {filteredProducts.length === 0 ? (
          <p className="text-xl p-4 w-full text-center">No products found.</p>
        ) : (
          filteredProducts.map((product) => {
            const chartData = (product.formula || []).map((item) => ({
              material: item.material.name,
              quantity: item.quantity,
              fill: `var(--color-${item.material.name
                .toLowerCase()
                .replace(/\s/g, "")})`,
            }));

            const chartColors = Array.from(
              { length: 10 },
              (_, i) => i + 1
            ).sort(() => 0.5 - Math.random());

            const chartConfig = {
              quantity: { label: "Quantity" },
            };

            chartData.forEach((item, i) => {
              const colorIndex = chartColors[i % chartColors.length];
              chartConfig[item.material.toLowerCase().replace(/\s/g, "")] = {
                label: item.material,
                color: `var(--chart-${colorIndex})`,
              };
            });

            return (
              <ProductChart
                key={product._id}
                xAxisDataKey="quantity"
                yAxisDataKey="material"
                title={
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xl font-semibold">{product.name}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-blue-500"
                      >
                        <LucideEdit />
                      </Button>
                      <ConfirmDialog
                        renderTrigger={
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500"
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
                        confirmText="Delete"
                        confirmTextClassName="bg-red-600 text-white hover:bg-red-600/50"
                        cancelText="Cancel"
                        onConfirm={() => handleDelete(product._id)}
                      />
                    </div>
                  </div>
                }
                data={chartData}
                config={chartConfig}
                footer={
                  <div className="flex justify-evenly items-center w-full">
                    <Button variant="ghost">Weight 50Kg</Button>
                    <Button variant="ghost">Price: ₹{product.price}</Button>
                  </div>
                }
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Products;
