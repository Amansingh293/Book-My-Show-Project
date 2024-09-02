import { instance } from "./index";

export const addMovie = async (payload) => {
  try {
    const response = await instance.post("/api/movie/add-movie", payload, {
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

export const getAllMovies = async () => {
  try {
    const response = await instance.get("/api/movie/get-all-movies", {
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

export const editMovie = async (payload) => {
  try {
    const response = await instance.post("/api/movie/edit-movie", payload, {
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

export const deleteMovie = async (payload) => {
  try {
    const response = await instance.delete(
      `/api/movie/delete-movie/?movie_id=${payload}`,
      {
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

export const getMovieById = async (payload) => {
  try {
    const response = await instance.get(
      `/api/movie/get-movie-by-id?movieId=${payload}`,
      {
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

export const getMovieBySearch = async (payload) => {
  try {
    const response = await instance.get(
      `/api/movie/get-by-search?search=${payload}`,
      {
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
