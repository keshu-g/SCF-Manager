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
      <CardContent>
        <ProductMaterialsTable />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">

      </CardFooter>
    </Card>
  );
}
