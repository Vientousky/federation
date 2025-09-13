"use client";

import { Suspense } from "react";
import TableSkeleton from "@/app/ui/skeleton/SkeletonTable";
import BoxeadorPageAdmin from "./BoxeadorPageAdmin";

export default function PageBoxer () {
  return(
    <Suspense fallback={<TableSkeleton/>}>
      <BoxeadorPageAdmin/>
    </Suspense>
  )
}