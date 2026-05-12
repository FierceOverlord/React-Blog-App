import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminControl from "../appwrite/adminControl";

export const fetchPendingUsers = createAsyncThunk(
    'admin/fetchPendingUsers',
    async (_, {rejectWithValue}) => {
        try{
            const users = await adminControl.getPendingUsers();
            return users;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
) 

export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async (_, {rejectWithValue}) => {
        try {
            const users = await adminControl.getAllUsers();
            console.log(users);
            return users;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const approveUserAction = createAsyncThunk(
    'admin/approveUser',
    async (documentId, {rejectWithValue}) => {
        try {
            await adminControl.approveUser(documentId)
            return documentId
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (documentId, {rejectWithValue}) => {
        try {
            await adminControl.deleteUser(documentId)
            return documentId
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    pendingRequests: [],
    allusers: [],
    rejectedRequests: [],
    stats: {
        totalUsers: 0,
        pendingUsers: 0,
        approvedUsers: 0,
        rejectedUsers: 0
    },
    loading: false,
    error: null,
    successMessage: null
}


const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.error = null
            state.successMessage = null
        }
    },
    // extraReducers: handle async actions
    extraReducers: (builder) => {
        builder
            // When fetching pending users
            .addCase(fetchPendingUsers.pending, (state) => {
                state.loading = true
                state.error = null
            })

            .addCase(fetchPendingUsers.fulfilled, (state, action) => {
                state.loading = false,
                state.pendingRequests = action.payload
                state.stats.pendingUsers = action.payload.length
            })

            .addCase(fetchPendingUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // When fetch all users
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true
            })

            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false
                state.allusers = action.payload
                state.stats.totalUsers = action.payload.length
                state.stats.approvedUsers = action.payload.filter(u => u.isApproved).length
            })

            .addCase(fetchAllUsers.rejected, (state) => {
                state.loading = false
                state.error = action.payload
            })

            // When approving user
            .addCase(approveUserAction.pending, (state) => {
                state.loading = true
            })

            .addCase(approveUserAction.fulfilled, (state, action) => {
                state.loading = false
                state.successMessage = "User approved successfully!"

                state.pendingRequests = state.pendingRequests.filter(u => u.$id !== action.payload)
                state.stats.pendingUsers = state.pendingRequests.length
            })

            .addCase(approveUserAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // When deleting user 
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
            })

            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false
                state.successMessage = "User deleted successfully"

                state.pendingRequests = action.payload.filter(u => u.$id !== action.payload)
                state.stats.pendingUsers = state.pendingRequests.length
            })

            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const {clearMessage} = adminSlice.actions
export default adminSlice.reducer