"use client";

import { Suspense } from "react";
import Loader from "../admin/components/loader/Loader";
import RenderTrainersList from "./RenderTrainersList";

export default function PageBoxer() {
  return (
    <Suspense fallback={<Loader/>}>
      <RenderTrainersList/>
    </Suspense>
  );
}
