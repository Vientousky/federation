"use client";

import { Suspense } from "react";
import Loader from "../admin/components/loader/Loader";
import RenderBoxingList from "./RenderBoxingList";

export default function PageBoxer() {
  return (
    <Suspense fallback={<Loader />}>
      <RenderBoxingList/>
    </Suspense>
  );
}
