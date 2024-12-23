"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MobileSidebar } from "@/components/Sidebar";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BreadcrumbHeader = () => {
  const pathName = usePathname();
  const paths = pathName === "/" ? ["Home"] : pathName?.split("/");

  const hasDropdown = paths.length > 3;
  const visiblePaths = hasDropdown ? paths.slice(0, 2) : paths;
  const dropdownPaths = hasDropdown ? paths.slice(2) : [];

  return (
    <div className="flex items-center">
      <MobileSidebar />
      <Breadcrumb>
        <BreadcrumbList>
          {visiblePaths.map((path, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="capitalize"
                  href={`${path === "Home" ? "" : `/${path}`}`}
                >
                  {path === "" ? "Home" : path}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < visiblePaths.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}

          {hasDropdown && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {dropdownPaths.map((path, index) => (
                      <DropdownMenuItem key={index} className="capitalize">
                        <BreadcrumbLink href={`/${path}`}>
                          {path}
                        </BreadcrumbLink>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            </>
          )}

          {paths.length > 0 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize">
                  {paths[paths.length - 1]}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbHeader;
