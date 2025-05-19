import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaUser, FaStar, FaClock, FaSignOutAlt, FaBars } from 'react-icons/fa'
import MembershipPage from './MembershipPage'
import Breadcrumb from '../components/Breadcrumb'
import { signOutAsync } from '../redux/Slices/Auth/authSlice'
import {
	getLoggedInUserAsync,
	selectUserInfo,
	updatePasswordAsync,
	updateUserAddressAsync,
	updateUserAsync,
} from '../redux/Slices/User/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import ImagetoBase64 from '../utils/ImagetoBase64'
import { UploadImage } from '../components/UploadImage'

const ProfilePage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const userInfo = useSelector(selectUserInfo)?.data

	useEffect(() => {
		dispatch(getLoggedInUserAsync())
	}, [dispatch])

	const [editMode, setEditMode] = useState(false)
	const [isShowUpdatePasswForm, setIsShowUpdatePasswForm] = useState(false)

	const [isCollapsed, setIsCollapsed] = useState(() => {
		const saved = localStorage.getItem('sidebarCollapsed')
		return saved ? JSON.parse(saved) : false
	})

	// Lấy tham số tab từ URL
	const queryParams = new URLSearchParams(location.search)
	const tabParam = queryParams.get('tab')

	const resetFormFromUserInfo = useCallback(() => {
		setFormData({
			username: userInfo?.username || '',
			email: userInfo?.email || '',
			phone: userInfo?.phone || '',
			addressType: userInfo?.Addresses?.[0]?.UserAddress?.address_type || '',
			address: userInfo?.Addresses?.[0] || '',
			role: userInfo?.Role?.role_name || '',
			password: '',
			newPassword: '',
			confirmPassword: '',
		})
	}, [
		userInfo?.Addresses,
		userInfo?.Role?.role_name,
		userInfo?.email,
		userInfo?.phone,
		userInfo?.username,
	])

	const [selectedTab, setSelectedTab] = useState(tabParam || 'info')
	const [formData, setFormData] = useState({
		username: userInfo?.username || '',
		email: userInfo?.email || '',
		phone: userInfo?.phone || '',
		addressType: userInfo?.Addresses?.[0]?.UserAddress?.address_type || '',
		address: userInfo?.Addresses?.[0]?.formatted || '',
		role: userInfo?.Role?.role_name || '',
		password: '',
		newPassword: '',
		confirmPassword: '',
	})

	useEffect(() => {
		if (userInfo) {
			resetFormFromUserInfo()
		}
	}, [resetFormFromUserInfo, userInfo])

	const handleUseCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async position => {
					const { latitude, longitude } = position.coords
					try {
						// Gọi API reverse geocoding
						const response = await fetch(
							`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
						)
						const data = await response.json()
						const formattedAddress = {
							formatted: data.display_name || '',
							lat: data.lat,
							lon: data.lon,
							country: data.address.country,
							country_code: data.address.country_code,
							county: data.address.country,
							state: data.address.state,
							village: data.address.village,
						}
						setFormData(prev => ({ ...prev, address: formattedAddress }))
					} catch (error) {
						console.error('Lỗi khi lấy địa chỉ:', error)
					}
				},
				error => {
					console.error('Không thể lấy vị trí:', error)
				}
			)
		} else {
			alert('Trình duyệt không hỗ trợ lấy vị trí.')
		}
	}

	const [avatarPreview, setAvatarPreview] = useState(null)
	const fileInputRef = useRef(null)

	useEffect(() => {
		localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed))
	}, [isCollapsed])

	// Cập nhật selectedTab khi tham số URL thay đổi
	useEffect(() => {
		if (tabParam) {
			setSelectedTab(tabParam)
		}
	}, [tabParam])

	const handleSignOut = () => {
		dispatch(signOutAsync())
		navigate('/')
	}

	const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

	const handleEditToggle = () => {
		if (editMode) {
			resetFormFromUserInfo()
		}
		setEditMode(v => !v)
	}

	const handlePasswToggle = () => {
		if (editMode) {
			resetFormFromUserInfo()
		}
		setIsShowUpdatePasswForm(v => !v)
	}

	const handleUpdate = async () => {
		try {
			await dispatch(
				updateUserAsync({
					username: formData.username,
					email: formData.email,
					phone: formData.phone,
				})
			).then(result => {
				if (formData.address) {
					dispatch(
						updateUserAddressAsync({
							updateData: formData.address,
						})
					)
				}
			})
			toast.success('Thông tin đã được cập nhật.')
			setEditMode(false)
			dispatch(getLoggedInUserAsync())
		} catch (error) {
			toast.error('Lỗi trong quá trình cập nhật.')
		}
	}

	const handleChangePassword = () => {
		if (!formData.password || !formData.newPassword || !formData.confirmPassword) {
			toast.error('Vui lòng nhập đầy đủ thông tin.')
			return
		}

		if (formData.newPassword !== formData.confirmPassword) {
			toast.error('Xác thực mật khẩu không khớp.')
			return
		}

		dispatch(
			updatePasswordAsync({
				oldPassword: formData.password,
				newPassword: formData.newPassword,
			})
		)
			.then(result => {
				console.log(result)
				if (result?.payload?.data) toast.success('Đổi mật khẩu thành công.')
				else if (result?.payload?.response?.data)
					toast.error(result?.payload?.response?.data?.message)
				setFormData({ password: '', newPassword: '', confirmPassword: '' })
			})
			.catch(e => {
				console.log(e)
			})
	}

	const handleAvatarChange = e => {
		e.preventDefault()

		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => setAvatarPreview(reader.result)
			reader.readAsDataURL(file)

			ImagetoBase64(file).then(async result => {
				const data = await UploadImage(result)

				if (data.data.secure_url) {
					await dispatch(
						updateUserAsync({
							avatarUrl: data.data.secure_url,
						})
					)
						.unwrap()
						.then(_ => {
							toast.success('Cập nhật ảnh đại diện thành công')
						})
						.catch(_ => {
							toast.error('Cập nhật ảnh đại diện thất bại')
						})
				}
			})
		}
	}

	const handleAvatarClick = () => fileInputRef.current.click()

	// Hàm xử lý chuyển tab
	const handleTabChange = tab => {
		setSelectedTab(tab)
		if (tab === 'info') {
			navigate('/profile')
		} else if (tab === 'member') {
			navigate('/profile?tab=member')
		}
	}

	const breadcrumbItems = [
		{ label: 'Tài khoản', path: '/profile' },
		{
			label: selectedTab === 'info' ? 'Thông tin khách hàng' : 'Ví',
			path: selectedTab === 'info' ? '/profile' : '/profile?tab=member',
		},
	]

	return (
		<div className="flex min-h-screen bg-[#0e1133] text-white">
			{/* Sidebar */}
			<aside
				className={`${
					isCollapsed ? 'w-24' : 'w-64'
				} m-4 rounded-xl bg-gradient-to-b from-[#4d4fac] to-[#3459ad] p-4 flex flex-col justify-between shadow-xl transition-all duration-300 h-[calc(100vh-6rem)]`}
			>
				<div>
					<button
						onClick={() => setIsCollapsed(!isCollapsed)}
						className="text-white mb-6"
						title="Thu gọn/Mở rộng"
					>
						<FaBars />
					</button>

					<div className="flex flex-col items-center text-center mb-6">
						<div
							className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow cursor-pointer"
							onClick={handleAvatarClick}
						>
							{avatarPreview || userInfo?.avatarUrl ? (
								<img
									src={avatarPreview || userInfo?.avatarUrl}
									alt="Avatar"
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center bg-gray-300 text-black text-sm">
									<FaUser className="text-2xl" />
								</div>
							)}
						</div>
						<input
							type="file"
							ref={fileInputRef}
							onChange={handleAvatarChange}
							accept="image/*"
							className="hidden"
						/>
						{!isCollapsed && (
							<>
								<div className="mt-2 font-semibold">{userInfo?.username || ''}</div>
								<button
									className="text-xs text-yellow-400 underline hover:text-yellow-300"
									onClick={handleAvatarClick}
								>
									Thay đổi ảnh đại diện
								</button>
							</>
						)}
					</div>

					<nav className="space-y-4 mt-4">
						<button
							className={`flex items-center w-full ${
								isCollapsed ? 'justify-center' : 'space-x-2'
							} hover:text-yellow-300 ${
								selectedTab === 'info' ? 'text-yellow-400 font-semibold' : ''
							}`}
							title="Thông tin khách hàng"
							onClick={() => handleTabChange('info')}
						>
							<FaUser className={isCollapsed ? 'mx-auto' : ''} />
							{!isCollapsed && <span>Thông tin khách hàng</span>}
						</button>
						<button
							className={`flex items-center w-full ${
								isCollapsed ? 'justify-center' : 'space-x-2'
							} hover:text-yellow-300 ${
								selectedTab === 'member' ? 'text-yellow-400 font-semibold' : ''
							}`}
							title="Ví"
							onClick={() => handleTabChange('member')}
						>
							<FaStar className={isCollapsed ? 'mx-auto' : ''} />
							{!isCollapsed && <span>Ví</span>}
						</button>
						<button
							className={`flex items-center w-full ${
								isCollapsed ? 'justify-center' : 'space-x-2'
							} hover:text-yellow-300`}
							title="Lịch sử mua hàng"
							onClick={() => navigate('/profile/history')}
						>
							<FaClock className={isCollapsed ? 'mx-auto' : ''} />
							{!isCollapsed && <span>Lịch sử mua hàng</span>}
						</button>
					</nav>
				</div>

				<button
					className={`flex items-center w-full ${
						isCollapsed ? 'justify-center' : 'space-x-2'
					} mt-6 hover:text-yellow-300`}
					title="Đăng xuất"
					onClick={handleSignOut}
				>
					<FaSignOutAlt className={isCollapsed ? 'mx-auto' : ''} />
					{!isCollapsed && <span>Đăng xuất</span>}
				</button>
			</aside>

			{/* Main Content */}
			<main className="flex-1 p-8">
				<Breadcrumb items={breadcrumbItems} />

				{selectedTab === 'info' ? (
					<>
						<div className="flex justify-between items-center mb-6">
							<h1 className="text-2xl font-bold text-white">THÔNG TIN KHÁCH HÀNG</h1>
							<button
								onClick={handleEditToggle}
								className="px-4 py-2 bg-[#ffcc00] text-black font-bold rounded"
							>
								{editMode ? 'Hủy' : 'Chỉnh sửa'}
							</button>
						</div>

						<section className="bg-white text-black p-6 mb-6 rounded shadow-md">
							<h2 className="text-lg font-bold mb-4">Thông tin cá nhân</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-semibold mb-1">Họ và tên</label>
									<input
										type="text"
										name="username"
										value={formData.username}
										onChange={handleChange}
										disabled={!editMode}
										className="w-full border p-2 bg-gray-100 disabled:opacity-50"
									/>
								</div>
								<div className="flex items-center justify-between w-full">
									<div className="w-full  pr-4">
										<label className="block text-sm font-semibold mb-1">Địa chỉ</label>
										<input
											name="address"
											value={formData.address?.formatted}
											onChange={handleChange}
											disabled
											readOnly
											className="w-full border p-2 bg-gray-100"
										/>
										{editMode && (
											<button
												onClick={handleUseCurrentLocation}
												className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded"
											>
												Lấy vị trí hiện tại
											</button>
										)}
									</div>
									<div>
										<label className="block text-sm font-semibold mb-1 text-center">Loại</label>
										<select
											name="addressType"
											value={formData.addressType}
											onChange={handleChange}
											disabled={!editMode}
											className="w-28 border p-2 bg-gray-100 disabled:opacity-50"
										>
											<option value="Home">Home</option>
											<option value="Work">Work</option>
											<option value="Other">Other</option>
										</select>
										{editMode && (
											<div className="mt-2 px-3 pt-4 pb-3  text-white text-sm rounded"></div>
										)}
									</div>
								</div>
								<div>
									<label className="block text-sm font-semibold mb-1">Số điện thoại</label>
									<input
										type="text"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
										disabled={!editMode}
										className="w-full border p-2 bg-gray-100 disabled:opacity-50"
									/>
								</div>
								<div>
									<label className="block text-sm font-semibold mb-1">Email</label>
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										disabled={!editMode}
										className="w-full border p-2 bg-gray-100 disabled:opacity-50"
									/>
								</div>
							</div>
							{editMode && (
								<button
									onClick={handleUpdate}
									className="mt-4 px-4 py-2 bg-[#ffcc00] text-black font-bold rounded"
								>
									LƯU THÔNG TIN
								</button>
							)}
						</section>
						<button
							onClick={handlePasswToggle}
							className="px-4 py-2 mb-6 bg-[#9e6010] text-white font-bold rounded"
						>
							{isShowUpdatePasswForm ? 'Ẩn' : 'Đổi mật khẩu'}
						</button>
						{isShowUpdatePasswForm && (
							<section className="bg-white text-black p-6 rounded shadow-md">
								<h2 className="text-lg font-bold mb-4">Đổi mật khẩu</h2>
								<div className="space-y-4">
									<div>
										<label className="block text-sm font-semibold mb-1">Mật khẩu cũ *</label>
										<input
											type="password"
											name="password"
											value={formData.password}
											onChange={handleChange}
											className="w-full border p-2 bg-gray-100 disabled:opacity-50"
										/>
									</div>
									<div>
										<label className="block text-sm font-semibold mb-1">Mật khẩu mới *</label>
										<input
											type="password"
											name="newPassword"
											value={formData.newPassword}
											onChange={handleChange}
											className="w-full border p-2 bg-gray-100 disabled:opacity-50"
										/>
									</div>
									<div>
										<label className="block text-sm font-semibold mb-1">Xác thực mật khẩu *</label>
										<input
											type="password"
											name="confirmPassword"
											value={formData.confirmPassword}
											onChange={handleChange}
											className="w-full border p-2 bg-gray-100 disabled:opacity-50"
										/>
									</div>
								</div>
								{
									<button
										onClick={handleChangePassword}
										className="mt-4 px-4 py-2 bg-[#ffcc00] text-black font-bold rounded"
									>
										ĐỔI MẬT KHẨU
									</button>
								}
							</section>
						)}
					</>
				) : (
					<MembershipPage />
				)}
			</main>
		</div>
	)
}

export default ProfilePage
