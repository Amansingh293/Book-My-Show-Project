import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { loginUser } from "../../services/apicalls/user";

import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await loginUser(values);
      console.log(values)
      if (response.success) {
        const token = response.data;
        localStorage.setItem("token", token);
        message.success(response.message);
        navigate("/");
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Form
        name="normal_login"
        className="login-form border border-gray-400 p-[50px] rounded-md"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
        className=" text-lg"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item
        className=" text-lg"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item className=" text-lg">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button bg-slate-600 mr-5"
          >
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
