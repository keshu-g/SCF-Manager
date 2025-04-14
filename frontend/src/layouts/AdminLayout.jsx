import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const pageNames = {
  dashboard: "Dashboard",
  client: "Clients",
  material: "Materials",
  products: "Products",
  orders: "Orders",
};

const generateBreadcrumbs = (pathname) => {
  const segments = pathname.split("/").filter(Boolean);
  let accumulatedPath = "";
  const breadcrumbs = [];

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];

    // Skip IDs (basic 24-char Mongo-style)
    if (/^[a-f0-9]{24}$/.test(segment)) {
      accumulatedPath += `/${segment}`;
      continue;
    }

    accumulatedPath += `/${segment}`;
    const rawName = pageNames[segment] || segment;
    const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);

    breadcrumbs.push({ name, path: accumulatedPath });
  }

  return [{ name: "Master Data", path: "/" }, ...breadcrumbs];
};

export default function Page() {
  const location = useLocation();
  const breadcrumbs = React.useMemo(
    () => generateBreadcrumbs(location.pathname),
    [location.pathname]
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-1 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b top-0 sticky z-10 bg-background">
          <div className="flex items-center gap-2 px-4 h-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList className="flex items-center">
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={breadcrumb.path}>
                    <BreadcrumbItem>
                      {index < breadcrumbs.length - 1 ? (
                        <Link to={breadcrumb.path}>{breadcrumb.name}</Link>
                      ) : (
                        <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-2 md:px-4">
            <ModeToggle />
          </div>
        </header>
        <div className="flex gap-4 rounded-md">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
