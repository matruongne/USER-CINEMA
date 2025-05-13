import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	loginUser,
	createUser,
	signOut,
	checkAuth,
	verifyAccount,
	resendVerificationCode,
} from './authAPI'

const initialState = {
	status: 'idle',
	loggedInUser: null,
	userRegistered: false, // trạng thái đăng ký thành công, chờ xác thực email
	verifyStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
	resendStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
	userChecked: false,
}
export const createUserAsync = createAsyncThunk(
	'auth/createUser',
	async (userData, { rejectWithValue }) => {
		try {
			const response = await createUser(userData)
			return response.success
		} catch (error) {
			console.error(error)
			return rejectWithValue(error)
		}
	}
)

// Async thunk cho xác thực tài khoản
export const verifyAccountAsync = createAsyncThunk(
	'auth/verifyAccount',
	async ({ email, verifyCode }, { rejectWithValue }) => {
		try {
			const response = await verifyAccount({ email, verifyCode })
			return response.success
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

// Async thunk cho gửi lại mã xác thực
export const resendVerificationCodeAsync = createAsyncThunk(
	'auth/resendVerificationCode',
	async ({ email }, { rejectWithValue }) => {
		try {
			const response = await resendVerificationCode({ email })
			return response.success
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const loginUserAsync = createAsyncThunk(
	'auth/loginUser',
	async (loginInfo, { rejectWithValue }) => {
		try {
			const response = await loginUser(loginInfo)
			return response.token
		} catch (error) {
			console.log(error)
			return rejectWithValue(error)
		}
	}
)

export const checkAuthAsync = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
	try {
		const response = await checkAuth()
		return response.data
	} catch (error) {
		console.log(error)
		return rejectWithValue(error)
	}
})

export const signOutAsync = createAsyncThunk('auth/signOut', async (data, { rejectWithValue }) => {
	try {
		const response = await signOut()
		return response
	} catch (error) {
		console.log(error)
		return rejectWithValue(error)
	}
})

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearAuth(state) {
			state.user = null
			state.isAuthenticated = false
		},
	},
	extraReducers: builder => {
		builder
			.addCase(createUserAsync.pending, state => {
				state.status = 'loading'
			})
			.addCase(createUserAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.userRegistered = true // Đánh dấu đăng ký thành công
				state.error = null
			})
			.addCase(createUserAsync.rejected, (state, action) => {
				state.status = 'idle'
				state.error = action.payload
			})
			.addCase(verifyAccountAsync.pending, state => {
				state.status = 'loading'
			})
			.addCase(verifyAccountAsync.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.verifyStatus = action.payload
				state.error = null
			})
			.addCase(verifyAccountAsync.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})
			// Xử lý resendVerificationCodeAsync
			.addCase(resendVerificationCodeAsync.pending, state => {
				state.status = 'loading'
			})
			.addCase(resendVerificationCodeAsync.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.resendStatus = action.payload
				state.error = null
			})
			.addCase(resendVerificationCodeAsync.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})
			.addCase(loginUserAsync.pending, state => {
				state.status = 'loading'
			})
			.addCase(loginUserAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.loggedInUser = action.payload
				state.error = null
			})
			.addCase(loginUserAsync.rejected, (state, action) => {
				state.status = 'idle'
				state.error = action.payload
			})
			.addCase(signOutAsync.pending, state => {
				state.status = 'loading'
			})
			.addCase(signOutAsync.fulfilled, state => {
				state.status = 'idle'
				state.loggedInUser = null
				state.userChecked = false
				state.error = null
			})
			.addCase(signOutAsync.rejected, (state, action) => {
				state.status = 'idle'
				state.error = action.payload
			})
			.addCase(checkAuthAsync.pending, state => {
				state.status = 'loading'
			})
			.addCase(checkAuthAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.loggedInUser = action.payload
				state.userChecked = true
			})
			.addCase(checkAuthAsync.rejected, (state, action) => {
				state.status = 'idle'
				state.userChecked = false
			})
	},
})

export const selectUserRegistered = state => state.auth.userRegistered
export const selectVerifyStatus = state => state.auth.verifyStatus
export const selectResendStatus = state => state.auth.resendStatus
export const selectLoggedInUser = state => state.auth.loggedInUser
export const selectError = state => state.auth.error
export const selectUserChecked = state => state.auth.userChecked

export default authSlice.reducer
