import { useParams } from "react-router-dom";

const Products = () => {
  const { clientId } = useParams();

  return (
    <div className="container mx-auto h-full px-4">
      <h1 className="text-2xl font-bold">Products for Client ID: {clientId}</h1>
      <p>This is a placeholder page for displaying products of a client.</p>
    </div>
  );
};

export default Products;
