import { instance } from ".";

export const MakePayment = async (token, amount) => {
  try {
    const response = await instance.post(
      "/api/bookings/make-payment",
      {
        token,
        amount,
      },
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
    return error.response.data;
  }
};

export const BookShowTickets = async (payload) => {
  try {
    const response = await instance.post("/api/bookings/book-show", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "bookmyshowprojecttoken"
        )}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetBookingsOfUser = async () => {
  try {
    const response = await instance.get(`/api/bookings/get-bookings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "bookmyshowprojecttoken"
        )}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
