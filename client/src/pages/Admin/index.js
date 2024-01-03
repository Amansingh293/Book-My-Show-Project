import React, { useState } from "react";
import { Tabs } from "antd";
import TheatreApplications from "./TheatreApplications";
import MoviesList from "./MoviesList";

const items = [
  {
    key: "1",
    label: "Movies",
    children: <MoviesList/> ,
  },
  {
    key: "2",
    label: "All Theatres",
    children: <TheatreApplications />,
  },
];

const Admin = () => {
  return (
    <div className=" p-4 box-border">
      <div className="text-xl font-medium">Admin</div>
      <hr/>
      <Tabs defaultActiveKey={1} items={items} className="text-xl"/>
    </div>
  );
};

export default Admin;
