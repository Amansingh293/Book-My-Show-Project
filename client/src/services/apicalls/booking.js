import { instance } from ".";

export const MakePayment = async (token, amount) => {
  try {
    const response = await instance.post("/api/bookings/make-payment", {
      token,
      amount,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const BookShowTickets = async (payload) => {
  try {
    const response = await instance.post("/api/bookings/book-show", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetBookingsOfUser = async (payload) => {
  try {
    console.log(payload);
    const response = await instance.get(`/api/bookings/get-bookings?id=${payload}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
