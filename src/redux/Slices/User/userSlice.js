import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	updateUser,
	getLoggedInUser,
	getlistUsers,
	updateUserRole,
	getAllRoles,
	updatePassword,
	updateUserAddress,
	getUserWallet,
	updateUserWallet,
} from './userAPI'

const initialState = {
	status: 'idle',
	userInfo: null,
	wallet: null,
	walletStatus: 'idle',
	listUsers: [],
	roles: [],
}

export const getLoggedInUserAsync = createAsyncThunk('user/getLoggedInUser', async () => {
	const response = await getLoggedInUser()

	return response
})

export const updateUserAsync = createAsyncThunk('user/updateUser', async update => {
	const response = await updateUser(update)

	return response.data
})
export const updateUserAddressAsync = createAsyncThunk(
	'user/updateUser',
	async ({ updateData }, { rejectWithValue }) => {
		try {
			const response = await updateUserAddress(updateData)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)
export const updatePasswordAsync = createAsyncThunk(
	'user/updatePassword',
	async ({ oldPassword, newPassword }, { rejectWithValue }) => {
		try {
			const success = await updatePassword({ oldPassword, newPassword })
			return success
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message)
		}
	}
)

export const getlistUsersAsync = createAsyncThunk('user/getlistUsers', async () => {
	const response = await getlistUsers()

	return response.data
})

export const getUserWalletAsync = createAsyncThunk(
	'user/getUserWallet',
	async (userId, { rejectWithValue }) => {
		try {
			const response = await getUserWallet(userId)
			return response.data.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

export const updateUserWalletAsync = createAsyncThunk(
	'user/updateUserWallet',
	async ({ userId, walletUpdate }, { rejectWithValue }) => {
		try {
			const response = await updateUserWallet(userId, walletUpdate)
			return response.data.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

export const getAllRolesAsync = createAsyncThunk(
	'user/getAllRoles',
	async (_, { rejectWithValue }) => {
		const response = await getAllRoles()

		return response.data
	}
)

export const updateUserRoleAsync = createAsyncThunk(
	'user/updateUserRole',
	async ({ targetUserId, roleId }) => {
		const response = await updateUserRole({ targetUserId, roleId })

		return response.data
	}
)

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(updateUserAsync.pending, state => {
				state.status = 'loading'
			})
			.addCase(updateUserAsync.fulfilled, (state, action) => {
				state.status = 'succeeded'

				state.userInfo = action.payload
			})
			.addCase(getLoggedInUserAsync.pending, state => {
				state.status = 'loading'
			})
			.addCase(getLoggedInUserAsync.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.userInfo = action.payload
			})
			.addCase(getlistUsersAsync.pending, state => {
				state.status = 'loading'
			})
			.addCase(getlistUsersAsync.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.listUsers = action.payload
			})
			.addCase(getAllRolesAsync.pending, state => {
				state.status = 'loading'
			})
			.addCase(getAllRolesAsync.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.roles = action.payload.roles || action.payload
			})
			.addCase(updateUserRoleAsync.pending, state => {
				state.status = 'loading'
			})
			.addCase(updateUserRoleAsync.fulfilled, (state, action) => {
				state.status = 'succeeded'

				const { userId, role_id, role_name } = action.payload

				const user = state.listUsers.users.find(user => user.user_id === userId)
				if (user) {
					user.Role.role_id = role_id
					user.Role.role_name = role_name
				}
			})
			.addCase(updatePasswordAsync.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(updatePasswordAsync.fulfilled, (state, action) => {
				state.status = 'succeeded'
			})
			.addCase(updatePasswordAsync.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})
			.addCase(getUserWalletAsync.pending, state => {
				state.walletStatus = 'loading'
			})
			.addCase(getUserWalletAsync.fulfilled, (state, action) => {
				state.walletStatus = 'succeeded'
				state.wallet = action.payload
			})
			.addCase(getUserWalletAsync.rejected, (state, action) => {
				state.walletStatus = 'failed'
				state.error = action.payload
			})
			.addCase(updateUserWalletAsync.pending, state => {
				state.walletStatus = 'loading'
			})
			.addCase(updateUserWalletAsync.fulfilled, (state, action) => {
				state.walletStatus = 'succeeded'
				state.wallet = action.payload
			})
			.addCase(updateUserWalletAsync.rejected, (state, action) => {
				state.walletStatus = 'failed'
				state.error = action.payload
			})
	},
})

export const selectUserInfo = state => state.user.userInfo
export const selectUserInfoStatus = state => state.user.status
export const selectListUsers = state => state.user.listUsers
export const selectRoles = state => state.user.roles
export const selectUserWallet = state => state.user.wallet
export const selectWalletStatus = state => state.user.walletStatus

export default userSlice.reducer
