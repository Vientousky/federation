"use client";

import { Suspense } from "react";
import TableSkeleton from "@/app/ui/skeleton/SkeletonTable";
import RenderBoxingList from "./RenderBoxingList";

export default function PageBoxer() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <RenderBoxingList/>
    </Suspense>
  );
}
