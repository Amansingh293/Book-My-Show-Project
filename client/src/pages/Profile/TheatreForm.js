import React, { useState } from "react";
import { Form, Modal, Input, message, Button } from "antd";

import { addTheatre, editTheatre } from "../../services/apicalls/theatre";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { useDispatch } from "react-redux";

const TheatreForm = ({
  userId,
  showTheatreForm,
  setShowTheatreForm,
  formType,
  editModalData,
  setTriggerRender,
  triggerRender
}) => {
  //  adding and editting functions
  const dispatch = useDispatch();
  const handleAddTheatre = async (payload) => {
    payload = { ...payload, owner: userId };
    dispatch(ShowLoading());
    try {
      const response = await addTheatre(payload);

      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      console.log(error.message);
    }
    setShowTheatreForm(!showTheatreForm);
    setTriggerRender(!triggerRender);
  };

  const handleEditTheatre = async (payload) => {
    dispatch(ShowLoading());
    try {
      payload = { ...payload, _id: editModalData._id };
      const response = await editTheatre(payload);

      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.error);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
    setShowTheatreForm(!showTheatreForm);
    setTriggerRender(!triggerRender);
  };

  return (
    <div
      className="flex justify-center items-center h-fit w-fit
    "
    >
      <Modal title={formType} open={showTheatreForm} footer={null} onCancel={()=>setShowTheatreForm(!showTheatreForm)}>
        <Form
          onFinish={
            formType === "Add Details" ? handleAddTheatre : handleEditTheatre
          }
          initialValues={editModalData}
        >
          <Form.Item
            name="name"
            label="Theatre Name"
            rules={[
              {
                required: true,
                message: "Enter Theatre Name!",
              },
            ]}
          >
            <Input placeholder="Theatre Name" type="text" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: "Enter Location!",
              },
            ]}
          >
            <Input placeholder="Location" type="text" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Enter Phone Number!",
              },
            ]}
          >
            <Input placeholder="Phone Number" type="number" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Enter Email!",
              },
            ]}
          >
            <Input placeholder="Email" type="email" />
          </Form.Item>
          <div className="flex items-center justify-end gap-4">
            <Button
              className="flex justify-center items-center bg-[#474b48] rounded-xl text-white p-2.5"
              htmlType="submit"
            >
              Submit
            </Button>
            <Button
              className="flex justify-center items-center bg-red-300 rounded-xl  p-2.5"
              onClick={() => {
                setShowTheatreForm(!showTheatreForm);
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default TheatreForm;
