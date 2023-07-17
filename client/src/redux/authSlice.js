import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state, action) {
            localStorage.clear()
            state.user = action.payload.user
            state.token = action.payload.token
        },
        register(state, action) {
            localStorage.clear()
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logout(state) {
            state.user = null
            state.token = null
            localStorage.clear()
        }
    }
})

export const { register, login, logout } = authSlice.actions

export default authSlice.reducer

// Slice này giúp quản lý trạng thái liên quan đến xác thực và quyền truy cập người dùng trong ứng dụng. 
// variables and function that change the variables, and they are both available in the all components