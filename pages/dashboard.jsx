import React from "react";
import { DahboardRight, DashboardLeft } from "../components/Dashboard";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";

const dashboard = () => {
  return (
    <DefaultLayout>
      <Navbar />
      <div className="grid md:grid-cols-2 grid-cols-1 mx-[20px] my-[20px] w-full h-screen">
        <DahboardRight />
        <div className="my-[809px]">
          <DashboardLeft />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default dashboard;
