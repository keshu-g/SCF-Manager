import { TrendingUp } from "lucide-react";
import { Bar, BarChart, LabelList, Line, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function BarChartMixed({
  xAxisDataKey = "",
  yAxisDataKey = "",
  title,
  description,
  data,
  config,
  footer,
} = {}) {
  return (
    <Card className="gap-4 w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            barCategoryGap={0}
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey={yAxisDataKey}
              type="category"
              tickLine={false}
              tickMargin={3}
              scale={"auto"}
              axisLine={false}
              width={60}
              tickFormatter={(label) =>
                label.charAt(0).toUpperCase() + label.slice(1)
              }
            />
            <XAxis
              dataKey={xAxisDataKey}
              type="number"
              domain={[0, "dataMax + 20"]}
              hide
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey={xAxisDataKey}
              layout="vertical"
              radius={5}
              barSize={24}
            >
              <LabelList
                dataKey={xAxisDataKey}
                position="right"
                // offset={0}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
}
