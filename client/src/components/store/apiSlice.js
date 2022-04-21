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
        }),
        addItem:builder.mutation({
            query:({id,...data})=>({
                url:`/api/users/${id}`,
                method:'POST',
                body:data
            }),
            invalidatesTags:["item"]
        }),
        getItems:builder.query({
            query:(id)=>`/api/users/${id}/items`,
            providesTags:["item"],
            
        }),
        getUser:builder.query({
            query:(id)=>`/api/users/${id}` 
        }),
        deleteItem:builder.mutation({
            query:({userId,id})=>({
                url:`/api/${userId}/items/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:["item"]
        })
    })
})

export default apiSlice;