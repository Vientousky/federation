"use client";

import { Suspense } from "react";
import Loader from "../../components/loader/Loader";
import CreateBoxer from "./CrearBoxers";

export default function PageCreate () {
  return(
    <Suspense fallback={<Loader/>}>
      <CreateBoxer/>
    </Suspense>
  )
}