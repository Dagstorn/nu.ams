import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type RegisterRequest = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<void, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation<
      { token: string; userRole: string },
      { email: string; password: string }
    >({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = apiSlice;
