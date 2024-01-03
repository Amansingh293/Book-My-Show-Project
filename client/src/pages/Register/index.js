import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/apicalls/user";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await registerUser(values);

      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
      console.log(err.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    const errMessage =
      errorInfo.errorFields[0].errors[0] || "Internal Server Error";
    message.error(errMessage);
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
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name",
            },
          ]}
        >
          <Input placeholder="Please input your name" type="text"/>
        </Form.Item>
        <Form.Item
          className=" text-lg"
          name="email"
          type="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button bg-slate-600 mr-5"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
