import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	getUserWalletAsync,
	selectUserInfo,
	selectUserWallet,
	selectWalletStatus,
} from '../redux/Slices/User/userSlice'
import { ArrowRight } from 'lucide-react'

const MembershipPage = () => {
	const dispatch = useDispatch()
	const userInfo = useSelector(selectUserInfo)
	const wallet = useSelector(selectUserWallet)
	const walletStatus = useSelector(selectWalletStatus)

	useEffect(() => {
		if (userInfo?.data?.user_id) {
			dispatch(getUserWalletAsync(userInfo.data.user_id))
		}
	}, [userInfo, dispatch])

	const balance = parseFloat(wallet?.balance || 0)
	const maxBalance = 500000
	const progress = Math.min((balance / maxBalance) * 100, 100).toFixed(2)
	const isCVip = balance >= maxBalance

	return (
		<div className="text-white">
			<h1 className="text-2xl font-bold mb-4 uppercase">Thông tin Ví</h1>

			<div className="text-sm mb-2 text-right text-red-400">
				{walletStatus === 'loading'
					? 'Đang tải...'
					: `${balance.toLocaleString()} / ${maxBalance.toLocaleString()}đ`}
			</div>

			<div className="w-full h-3 bg-gray-600 rounded-full mb-6">
				<div
					className="h-full bg-yellow-400 rounded-full transition-all duration-300"
					style={{ width: `${progress}%` }}
				></div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-6 items-center relative">
				{/* C'FRIEND */}
				<div className="bg-[#1f1f3b] p-4 rounded relative z-10">
					<img src="/images/member1.jpg" alt="CFriend" className="mb-3 w-full rounded" />
					<h2 className="text-lg font-bold text-yellow-400">C'FRIEND</h2>
					<ul className="list-disc pl-5 text-sm mt-2">
						<li>Giảm 10% khi mua bắp nước</li>
						<li>Tặng 1 vé 2D mỗi tuần sinh nhật</li>
						<li>Tích điểm với mỗi 500đ</li>
					</ul>
				</div>

				{/* Mũi tên ở giữa */}
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
					<ArrowRight className="w-10 h-10 text-yellow-200" />
				</div>

				{/* C'VIP */}
				<div
					className={`bg-[#1f1f3b] p-4 rounded relative z-10 transition-opacity ${
						isCVip ? 'opacity-100' : 'opacity-50 pointer-events-none'
					}`}
				>
					<img src="/images/member2.jpg" alt="CVIP" className="mb-3 w-full rounded" />
					<h2 className="text-lg font-bold text-yellow-400">C'VIP</h2>
					<ul className="list-disc pl-5 text-sm mt-2">
						<li>Giảm 15% khi mua bắp nước</li>
						<li>Nhận quà dịp lễ / sinh nhật</li>
						<li>Ưu đãi sự kiện đặc biệt</li>
					</ul>
					{!isCVip && (
						<p className="mt-3 text-xs text-red-400 italic">
							Tích lũy đủ {maxBalance.toLocaleString()}đ để mở khóa C'VIP
						</p>
					)}
				</div>
			</div>

			<button className="bg-gray-200 text-black px-4 py-2 font-semibold rounded mb-6">
				BẠN ĐÃ LÀ THÀNH VIÊN C'FRIEND
			</button>
		</div>
	)
}

export default MembershipPage
