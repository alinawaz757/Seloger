import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl = "http://localhost:8080";
export const apiSlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:builder=>({
        addUser:builder.mutation({
            query:(data)=>({
                url:'/api/users',
                method:'POST',
                body:data
            })
        })
    })
})

export default apiSlice;