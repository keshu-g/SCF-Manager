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

const pageNames = {
  "/dashboard": { parentName: "Master Data Data", name: "Dashboard" },
  "/client": { parentName: "Master Data", name: "Client" },
  "/material": { parentName: "Master Data", name: "Material" },
  "/formula": { parentName: "Master Data", name: "Formula" },
};

export default function Page() {
  const location = useLocation();

  const currentPage = React.useMemo(() => {
    return pageNames[location.pathname] || { parentName: "???", name: "???" };
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
          <div className="flex items-center gap-2 px-4 h-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList className="flex items-center justify-center">
                <BreadcrumbItem className="hidden md:block">
                  {currentPage.parentName}
                </BreadcrumbItem>
                <BreadcrumbSeparator className="pt-1" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentPage.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4">
            <ModeToggle />
          </div>
        </header>
        <div className="flex gap-4 p-4 pt-0 rounded-md">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
