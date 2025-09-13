"use client";

import { Suspense } from "react"
import TableSkeleton from "@/app/ui/skeleton/SkeletonTable"
import EntrenadorPageAdmin from "./EntrenadorPageAdmin"

export default function Page() {
  return (
    <Suspense fallback={<TableSkeleton/>}>
      <EntrenadorPageAdmin/>
    </Suspense>
  )
}