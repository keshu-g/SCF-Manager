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
      <CardHeader>
        <CardTitle>Good Product Name</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 w-full justify-evenly">
        <ProductMaterialsTable />
        <ProductMaterialsTable />
      </CardContent>
    </Card>
  );
}
