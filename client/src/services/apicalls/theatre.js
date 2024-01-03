import { instance } from ".";

export const addTheatre = async (payload) => {
  try {
    const response = await instance.post("/api/theatre/add-theatre", payload);

    return response.data;
  } catch (err) {
    return err;
  }
};

export const getTheatresByOwnerId = async (payload) => {
  try {
    const response = await instance.post(
      "/api/theatre/get-theatres-by-owner-id",
      payload
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const editTheatre = async (payload) => {
  try {
    const response = await instance.put("/api/theatre/edit-theatre", payload);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const deleteTheatre = async (payload) => {
  try {
    const response = await instance.delete(
      `/api/theatre/delete-theatre?theatreId=${payload}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllTheatres = async () => {
  try {
    const response = await instance.get(`/api/theatre/get-all-theatres`);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const changeTheatreStatus = async (payload) => {
  try {
    const response = await instance.put(
      `/api/theatre/change-theatre-status`,
      payload
    );
    return response.data;
  } catch (err) {
    return err;
  }
};
