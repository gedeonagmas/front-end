import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2200" }),
  tagTypes: [
    "acceptedProjects",
    "newProjects",
    "applyRequest",
    "applyAccepted",
    "allUsers",
    "allGroups",
    "requestBlogs",
    "acceptBlogs",
    "adminAuth",
    'feedback',
  ],
  endpoints: (builder) => ({
    getAllAcceptedProjects: builder.query({
      query: () => "/get/all/accepted/projects",
      transformResponse: (res) => res.sort((a, b) => b.times - a.times),
      providesTags: ["acceptedProjects", "newProjects"],
    }),
    getAllNewRequestedProjects: builder.query({
      query: () => "/get/all/new/requested/projects",
      transformResponse: (res) => res.sort((a, b) => b.times - a.times),
      providesTags: ["newProjects", "acceptedProjects"],
    }),
    acceptNewProjectRequest: builder.mutation({
      query: (ids) => ({
        url: `/accept/new/project/request?ids=${ids}`,
        method: "PATCH",
      }),
      invalidatesTags: ["acceptedProjects", "newProjects"],
    }),
    deleteNewProjectRequest: builder.mutation({
      query: (ids) => ({
        url: `/delete/new/project/request?ids=${ids}`,
        method: "DELETE",
      }),
      invalidatesTags: ["acceptedProjects", "newProjects"],
    }),
    previousProjectDelete: builder.mutation({
      query: (ids) => ({
        url: `/delete/new/project/request?ids=${ids}`,
        method: "DELETE",
      }),
      invalidatesTags: ["acceptedProjects", "newProjects"],
    }),
    newProjectPost: builder.mutation({
      query: (data) => ({
        url: "/projects/post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["acceptedProjects", "newProjects"],
    }),
    materialPost: builder.mutation({
      query: (data) => ({
        url: "/materials/post",
        method: "POST",
        body: data,
      }),
    }),
    feuturePost: builder.mutation({
      query: (data) => ({
        url: "/feutures/post",
        method: "POST",
        body: data,
      }),
    }),
    teamPost: builder.mutation({
      query: (data) => ({
        url: "/teams/post",
        method: "POST",
        body: data,
      }),
    }),
    applyPost: builder.mutation({
      query: (data) => ({
        url: "/apply/post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["applyAccepted", "applyRequest"],
    }),
    applyGetRequest: builder.query({
      query: () => "/apply/request/get",
      providesTags: ["applyAccepted", "applyRequest"],
    }),
    applyAcceptStudents: builder.mutation({
      query: (val) => ({
        url: `/apply/accept/patch?ids=${val.ids}&emails=${val.emails}&texts=${val.texts}`,
        method: "PATCH",
      }),
      invalidatesTags: ["applyAccepted", "applyRequest"],
    }),
    applyGetAcceptedStudents: builder.query({
      query: () => "/apply/accepted/get",
      providesTags: ["applyAccepted", "applyRequest"],
    }),
    applyDeleteStudents: builder.mutation({
      query: (val) => ({
        url: `/apply/user/delete?ids=${val.ids}&email=${val.emails}&texts=${val.texts}`,
        method: "DELETE",
      }),
      invalidatesTags: ["applyAccepted", "applyRequest"],
    }),
    chatGetAllUsers: builder.query({
      query: () => "/get/all/users",
      providesTags: ["allUsers"],
    }),
    chatGetAllGroups: builder.query({
      query: () => "/get/group/data",
      providesTags: ["allGroups"],
    }),
    chatDeleteUsers: builder.mutation({
      query: (id) => ({
        url: `/delete/single/users?ids=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allUsers"],
    }),
    chatDeleteGroups: builder.mutation({
      query: (id) => ({
        url: `/delete/groups?ids=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allGroups"],
    }),
    chatCreateGroup: builder.mutation({
      query: (data) => ({
        url: "/post/group",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["allGroups"],
    }),
    blogsPost: builder.mutation({
      query: (data) => ({
        url: "/post/blogs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["requestBlogs"],
    }),
    blogsGetAcceptedData: builder.query({
      query: () => "/get/blogs/accepted",
      providesTags: ["acceptBlogs"],
    }),
    blogsGetRequestData: builder.query({
      query: () => "/get/blogs/request",
      providesTags: ["requestBlogs"],
    }),
    blogsAcceptRequest: builder.mutation({
      query: (id) => ({
        url: `/accept/new/blogs?ids=${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["requestBlogs", "acceptBlogs"],
    }),
    blogsDelete: builder.mutation({
      query: (id,email) => ({
        url: `/delete/blogs?ids=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["requestBlogs", "acceptBlogs"],
    }),
    createUserAccount: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["allUsers"],
    }),
    adminAuthCreate: builder.mutation({
      query: (data) => ({
        url: "/admin/auth/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["adminAuth"],
    }),
    adminAuthUpdate: builder.mutation({
      query: (data) => ({
        url: "/admin/auth/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["adminAuth"],
    }),
    adminAuthGet: builder.query({
      query: () => "/admin/auth/get",
      providesTags: ["adminAuth"],
    }),
    feedbackPost:builder.mutation({
      query:(data)=>({
        url:'/feedback/post',
        method:'POST',
        body:data,
      }),
     invalidatesTags:['feedback'],
    }),
    feedbackGet:builder.query({
      query:()=>'/feedback/get',
      providesTags:['feedback'],
    })
  }),
});

export const {
  useGetAllAcceptedProjectsQuery,
  useGetAllNewRequestedProjectsQuery,
  useAcceptNewProjectRequestMutation,
  useDeleteNewProjectRequestMutation,
  usePreviousProjectDeleteMutation,
  useNewProjectPostMutation,
  useFeuturePostMutation,
  useMaterialPostMutation,
  useTeamPostMutation,
  useApplyPostMutation,
  useApplyGetRequestQuery,
  useApplyGetAcceptedStudentsQuery,
  useApplyAcceptStudentsMutation,
  useApplyDeleteStudentsMutation,
  useChatGetAllUsersQuery,
  useChatGetAllGroupsQuery,
  useChatDeleteUsersMutation,
  useChatDeleteGroupsMutation,
  useChatCreateGroupMutation,
  useBlogsAcceptRequestMutation,
  useBlogsGetRequestDataQuery,
  useBlogsDeleteMutation,
  useBlogsGetAcceptedDataQuery,
  useBlogsPostMutation,
  useCreateUserAccountMutation,
  useAdminAuthCreateMutation,
  useAdminAuthGetQuery,
  useAdminAuthUpdateMutation,
  useFeedbackPostMutation,
  useFeedbackGetQuery,
} = apiSlice;
