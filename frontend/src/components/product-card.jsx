import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductMaterialsTable from "./product-materials-table";

export function ProductCard() {
  return (
    <Card className="gap-4 w-full">
      <CardHeader className="flex items-start justify-between space-y-2">
        <CardTitle className="text-l">Good Product Name</CardTitle>
        <div className="flex gap-5">
          <CardTitle className="text-l">Edit</CardTitle>
          <CardTitle className="text-l">Delete</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 w-full justify-evenly sm:justify-center">
        <ProductMaterialsTable />
      </CardContent>
    </Card>
  );
}
