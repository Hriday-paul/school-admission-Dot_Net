import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '@/utils/config';
import { RootState } from '../store';
import {
  ApiResponse,
  ClassItem,
  CreateClassPayload,
  HoldItem,
  UpdateClassPayload,
} from '../types';

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['classes', 'holds'],
  baseQuery: fetchBaseQuery({
    baseUrl: config.clientBaseApi,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const birthCertificateId = state.userSlice?.birthCertificateId;

      if (birthCertificateId) {
        // Send both as requested by user prompt ('x-apikey') and backend validation ('X-Student-Id')
        headers.set('x-apikey', birthCertificateId);
        headers.set('X-Student-Id', birthCertificateId);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Classes
    getClasses: builder.query<ClassItem[], void>({
      query: () => '/classes',
      transformResponse: (response: ApiResponse<ClassItem[]>) => response.data || [],
      providesTags: ['classes'],
    }),

    getClassById: builder.query<ClassItem, string>({
      query: (id) => `/classes/${id}`,
      transformResponse: (response: ApiResponse<ClassItem>) => response.data,
      providesTags: (result, error, id) => [{ type: 'classes', id }],
    }),

    createClass: builder.mutation<ClassItem, CreateClassPayload>({
      query: (body) => ({
        url: '/classes',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['classes'],
    }),

    updateClass: builder.mutation<ClassItem, UpdateClassPayload>({
      query: ({ id, ...body }) => ({
        url: `/classes/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['classes'],
    }),

    deleteClass: builder.mutation<void, string>({
      query: (id) => ({
        url: `/classes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['classes', 'holds'],
    }),

    // Holds
    createHold: builder.mutation<HoldItem, string>({
      query: (classId) => ({
        url: `/classes/${classId}/holds`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<HoldItem>) => response.data,
      invalidatesTags: ['classes', 'holds'],
    }),

    getMyHolds: builder.query<HoldItem[], void>({
      query: () => '/me',
      transformResponse: (response: ApiResponse<HoldItem[]>) => response.data || [],
      providesTags: ['holds'],
    }),

    getHoldById: builder.query<HoldItem, string>({
      query: (holdId) => `/holds/${holdId}`,
      transformResponse: (response: ApiResponse<HoldItem>) => response.data,
      providesTags: (result, error, id) => [{ type: 'holds', id }],
    }),

    confirmHold: builder.mutation<HoldItem, string>({
      query: (holdId) => ({
        url: `/holds/${holdId}/confirm`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<HoldItem>) => response.data,
      invalidatesTags: ['classes', 'holds'],
    }),

    deleteHold: builder.mutation<void, string>({
      query: (holdId) => ({
        url: `/holds/${holdId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['classes', 'holds'],
    }),
  }),
});

export const {
  useGetClassesQuery,
  useGetClassByIdQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
  useCreateHoldMutation,
  useGetMyHoldsQuery,
  useGetHoldByIdQuery,
  useConfirmHoldMutation,
  useDeleteHoldMutation,
} = baseApi;

export default baseApi;
