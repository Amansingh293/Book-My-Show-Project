import React, { useState } from "react";
import { Tabs } from "antd";
import Bookings from "./Bookings";
import TheatreList from "./TheatreList";

const items = [
  {
    key: "1",
    label: "Bookings",
    children: <Bookings />,
  },
  {
    key: "2",
    label: "Apply For Theatres",
    children: <TheatreList />,
  },
];

const Profile = () => {
  return (
    <div className=" p-4 box-border">
      <div className="text-xl font-medium">Profile</div>
      <hr/>
      <Tabs defaultActiveKey={1} items={items} className="text-xl"/>
    </div>
  );
};

export default Profile;
