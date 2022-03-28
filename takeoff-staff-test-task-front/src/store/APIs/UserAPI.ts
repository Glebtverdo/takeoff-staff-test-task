import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { userType, userTypeNoId} from "../../types";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_SERVER}),
    tagTypes: ['user'],
    endpoints: (build) => ({
        fetchAllUsersArray: build.query<userType[], null>({
            query: () => ({
                url: `/users`,
            }),
            providesTags: [{ type: 'user', id: 'LIST' }]
        }),
        fetchAllUsersMap: build.query<{[key: string]:string}, null>({
            query: () => ({
                url: `/users`
            }),
            transformResponse: (res: userType[]) => {
                const newRes : {[key: string]:string} = {};
                for (const index in res) {
                    newRes[res[index].id] = res[index].name
                }
                return {...newRes}
            },
            providesTags: [{ type: 'user', id: 'LIST' }]
        }),
        fetchOneUser: build.query<userType, string>({
            query: (id : string) => ({
                url: `/users/${id}`,
            }),
            providesTags: [{ type: 'user', id: 'LIST' }]
        }),
        registerNewUser: build.mutation<userType, userTypeNoId>({
            query: (body: userTypeNoId) => ({
                url: `/users`,
                body: body,
                method: "Post"
            }),
            invalidatesTags: [{ type: 'user', id: 'LIST' }]
        }),
        updateUserContacts: build.mutation<userType, userType>({
            query: (body: userType) => ({
                url: `/users/${body.id}`,
                body: body,
                method: "Put"
            }),
            invalidatesTags: [{ type: 'user', id: 'LIST' }]
        })
    })
})