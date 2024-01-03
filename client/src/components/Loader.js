import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { useSelector } from "react-redux";

const Loader = () => {

  // const loading = useSelector((state)=>state.loaders);

  return (
    <Spin fullscreen
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 24,
          }}
          spin
        />
      }
    />
  );
};
export default Loader;
