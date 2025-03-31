import { useParams } from "react-router-dom";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsByClientIdQuery,
} from "../features/product/productApi";
import LoadingScreen from "@/components/loading-screen";

const Products = () => {
  const { clientId } = useParams();
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useGetProductsByClientIdQuery(clientId);

  if (isLoading) return <LoadingScreen />;

  if (isError) {
    toast.error("Material Fetch Error", {
      description: error?.data?.message,
      duration: 2000,
    });
  }

  return (
    <div className="container mx-auto h-full px-4">
      <h1 className="text-2xl font-bold">Products for Client ID: {clientId}</h1>
      <p>
        This is a placeholder page for displaying products of a client.{" "}
      </p>
      <p>{JSON.stringify(products) || "No products found"}</p>

    </div>
  );
};

export default Products;
