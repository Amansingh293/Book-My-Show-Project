import { instance } from ".";

export const registerUser = async (payload) => {
  try {
    const response = await instance.post("/api/user/register", payload);

    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await instance.post("/api/user/login", payload);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getCurrentuser = async () => {
  try {
    const response = await instance.get("/api/user/get-current-user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "bookmyshowprojecttoken"
        )}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};
