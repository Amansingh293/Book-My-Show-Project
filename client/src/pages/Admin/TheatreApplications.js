import { Popconfirm, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  changeTheatreStatus,
  deleteTheatre,
  getAllTheatres,
} from "../../services/apicalls/theatre";
import { FaCheck, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { ImBlocked } from "react-icons/im";
// import { useSelector } from "react-redux";

const TheatreApplications = () => {
  //   const user = useSelector((state) => state.users?.user);

  const [theatres, setTheatres] = useState([]);

  const [fetchTrigger, setFetchTrigger] = useState(false);

  const handleStatus = async (payload, checkBlocked) => {
    ShowLoading();
    try {
      if (!checkBlocked) {
        let currentIsActive = payload.isActive;

        payload = { ...payload, isActive: !currentIsActive };
      }
      const response = await changeTheatreStatus(payload);

      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
    HideLoading();
    setFetchTrigger(!fetchTrigger);
  };

  const handelDeleteTheatre = async (payload) => {
    ShowLoading();
    try {
      const response = await deleteTheatre(payload);

      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }

      HideLoading();
    } catch (error) {
      message.error(error.message);
      HideLoading();
    }
    setFetchTrigger(!fetchTrigger);
  };

  const getTheatres = async () => {
    ShowLoading();
    try {
      const response = await getAllTheatres();

      if (response.success) {
        // message.success(response.message);
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      console.log(err.message);
    }
    HideLoading();
  };

  useEffect(() => {
    getTheatres();
  }, [fetchTrigger]);

  const columns = [
    {
      title: "Theatre Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "isActive",
      render: (_, rowData) =>
        rowData.isBlocked ? (
          <div className="text-red-700 flex justify-start items-center gap-2">
            Blocked <ImBlocked />
          </div>
        ) : rowData.isActive ? (
          <div className="text-green-600 flex justify-start items-center gap-2">
            Approved <FaCheck />
          </div>
        ) : (
          <div className="text-yellow-500">Pending....</div>
        ),
    },
    {
      title: "Edit Status",
      key: "editTheatre",
      render: (_, rowData) => (
        <div className="flex justify-start items-center ml-2.5">
          <Popconfirm
            title={`${!rowData.isActive ? "Approve" : "DeApprove"} Status`}
            description={`${
              !rowData.isActive
                ? "Want to Approve Status"
                : "Make status to Pending ?"
            }`}
            onConfirm={() => {
              handleStatus(rowData);
            }}
            okType="danger"
            okText="Yes"
            cancelText="No"
          >
            {!rowData.isBlocked && (
              <FaEdit className="text-lg cursor-pointer" />
            )}
          </Popconfirm>
        </div>
      ),
    },
    {
      title: "Delete Theatre",
      key: "deleteTheatre",
      render: (_, rowData) => (
        <div className="flex justify-start items-center ml-2">
          <Popconfirm
            title="Delete the Theatre"
            description="Want to delete this Theatre?"
            onConfirm={() => handelDeleteTheatre(rowData._id)}
            okType="danger"
          >
            <FaTrash className="text-lg text-red-700 cursor-pointer" />
          </Popconfirm>
        </div>
      ),
    },
    {
      title: "Block Theatre",
      key: "blockTheatre",
      render: (_, rowData) => (
        <div className="flex justify-start items-center ml-2">
          <Popconfirm
            title={`${rowData.isBlocked ? "unBlock" : "Block"} the Theatre`}
            description={`Want to ${
              rowData.isBlocked ? "unBlock" : "Block"
            } this theatre?`}
            onConfirm={() => {
              const currentBlockedStatus = rowData.isBlocked;
              const payload = {
                ...rowData,
                isBlocked: !currentBlockedStatus,
                isActive: false,
              };
              handleStatus(payload, true);
            }}
            okType="danger"
          >
            <span className="text-green-600 cursor-pointer">unBlock</span>
            <span className="cursor-pointer">/</span>
            <span className="text-red-700 cursor-pointer">Block</span>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center  h-full gap-5">
      <Table
        className=" overflow-auto w-[98%]"
        columns={columns}
        dataSource={theatres}
      />
    </div>
  );
};

export default TheatreApplications;
