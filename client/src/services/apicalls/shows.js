import { instance } from ".";

export const addShow = async (payload) => {
  try {
    const response = await instance.post("/api/show/add-show", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "bookmyshowprojecttoken"
        )}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getShowsByMovieId = async (payload) => {
  try {
    const response = await instance.post(
      `/api/show/get-shows-by-movie-id-date`,
      payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "bookmyshowprojecttoken"
          )}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getShowById = async (payload) => {
  try {
    const response = await instance.get(
      `/api/show/get-show-by-id?showId=${payload}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "bookmyshowprojecttoken"
          )}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
