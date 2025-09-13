"use client";

import { Suspense } from "react";
import TableSkeleton from "@/app/ui/skeleton/SkeletonTable";
import RenderTrainersList from "./RenderTrainersList";

export default function PageBoxer() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <RenderTrainersList/>
    </Suspense>
  );
}
