import React from "react";

import {
  Form,
  Modal,
  Input,
  message,
  Button,
  Row,
  Col,
  Popconfirm,
} from "antd";
import {
  addMovie,
  deleteMovie,
  editMovie,
} from "../../services/apicalls/movie";
import { FaTrash } from "react-icons/fa";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

const MovieForm = ({
  formType,
  setFormType,
  showFormModal,
  setShowFormModal,
  editMovieData,
  setTriggerRender,
  triggerRender,
}) => {
  const handleAddMovie = async (payload) => {
    ShowLoading();
    try {
      const response = await addMovie(payload);

      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      HideLoading();
    } catch (error) {
      console.log(error.message);
      message.error(error.message);
    }
    HideLoading();
    setTriggerRender(!triggerRender);
    setShowFormModal(!showFormModal);
  };

  const handleEditMovie = async (payload) => {
    ShowLoading();
    try {
      payload = { ...payload, _id: editMovieData._id };
      const response = await editMovie(payload);

      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.error);
      }
    } catch (error) {
      message.error(error.message);
    }
    HideLoading();
    setShowFormModal(!showFormModal);
    setTriggerRender(!triggerRender);
  };

  const handelDeleteMovie = async (payload) => {
    try {
      const response = await deleteMovie(payload);

      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    HideLoading();
    setTriggerRender(!triggerRender);
    setShowFormModal(!showFormModal);
  };

  return (
    <div className="flex justify-center items-center h-fit w-fit overflow-auto">
      <Modal
        title={formType}
        open={showFormModal}
        footer={null}
        onCancel={() => setShowFormModal(!showFormModal)}
        width={"70rem"}
        className="h-fit overflow-auto"
      >
        <Form
          onFinish={formType === "Add Movie" ? handleAddMovie : handleEditMovie}
          initialValues={editMovieData}
          className=" w-[100%] flex flex-col gap-10 flex-nowrap justify-evenly p-2 box-border"
        >
          <Row gutter={28} align="middle">
            <Col span={12}>
              <Form.Item
                name="name"
                label="Movie Name"
                className="w-[15rem] md:w-auto"
                rules={[
                  {
                    required: true,
                    message: "Enter Movie Name!",
                  },
                ]}
              >
                <Input placeholder="Movie Name" type="text" />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                name="description"
                label="Description"
                className="w-[18rem] md:w-auto"
                rules={[
                  {
                    required: true,
                    message: "Enter Description!",
                  },
                ]}
              >
                <Input.TextArea
                  rows={2}
                  placeholder="Description"
                  autoSize={{ minRows: 2, maxRows: 3 }}
                  className=" overflow-auto"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duration"
                label="Duration"
                rules={[
                  {
                    required: true,
                    message: "Enter Duration!",
                  },
                ]}
              >
                <Input placeholder="Duration in hr" type="text" />
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item
                label="Language"
                name="language"
                rules={[
                  {
                    required: true,
                    message: "Select Language!",
                  },
                ]}
              >
                <select
                  name=""
                  id=""
                  className=" border rounded-lg p-[2%] md:p-1"
                >
                  <option value="">Select Language</option>
                  <option value="Punjabi">Punjabi</option>
                  <option value="Telugu">Telugu</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Tamil">Tamil</option>
                </select>
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item
                label="Release Date"
                name="releaseDate"
                // className="pl-[12px]"
                rules={[
                  {
                    required: true,
                    message: "Enter Release Date!",
                  },
                ]}
              >
                <input
                  type="date"
                  className=" border rounded-lg p-[2%] md:p-1"
                />
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item
                label="Genre"
                name="genre"
                rules={[
                  {
                    required: true,
                    message: "Select Genre!",
                  },
                ]}
              >
                <select
                  name=""
                  id=""
                  className=" border rounded-lg p-[2%] md:p-1"
                >
                  <option value="">Select Genre</option>
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Romance">Romance</option>
                </select>
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item
                label="Poster URL"
                name="poster"
                className="w-[18rem] md:w-auto"
                rules={[
                  {
                    required: true,
                    message: "Enter Poster Url!",
                  },
                ]}
              >
                <input
                  type="text"
                  className=" border rounded-lg w-[80%] p-[1%]"
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex items-center justify-end gap-4">
            <Button
              className="flex justify-center items-center bg-[#474b48] rounded-xl text-white p-4"
              htmlType="submit"
            >
              {formType === "Add Movie" ? "Submit" : "Save"}
            </Button>
            <Button
              className="flex justify-center items-center bg-red-300 rounded-xl  p-4"
              onClick={() => {
                setShowFormModal(!showFormModal);
              }}
            >
              Cancel
            </Button>
            {formType === "Edit Movie" && (
              <Popconfirm
                title="Delete the Movie"
                description="Are you sure to delete this Movie?"
                onConfirm={() => handelDeleteMovie(editMovieData._id)}
                okType="danger"
              >
                <FaTrash className="text-[25px] text-red-700 cursor-pointer" />
              </Popconfirm>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default MovieForm;
