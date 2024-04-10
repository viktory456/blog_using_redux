// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// const initialState = []

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//     const response = await axios.get(USERS_URL);
//     return response.data
// })

// const usersSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers: {},
//     extraReducers(builder) {
//         builder.addCase(fetchUsers.fulfilled, (state, action) => {
//             return action.payload;
//         })
//     }
// })

// export const selectAllUsers = (state) => state.users;

// export const selectUserById = (state, userId) =>
//     state.users.find(user => user.id === userId)

// export default usersSlice.reducer;

import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            transformResponse: responseData => {
                return usersAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'User', id: "LIST" },
                ...result.ids.map(id => ({ type: 'User', id }))
            ]
        })
    })
})

export const {
    useGetUsersQuery
} = usersApiSlice