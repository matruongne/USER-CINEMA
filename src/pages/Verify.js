import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'
import VerifyImg from '../assets/VerifyImg.jpeg'
import {
	resendVerificationCodeAsync,
	selectLoggedInUser,
	verifyAccountAsync,
} from '../redux/Slices/Auth/authSlice'

const Verify = () => {
	const user = useSelector(selectLoggedInUser)

	const [code, setCode] = useState(Array(6).fill(''))
	const inputRefs = useRef([])
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleChange = (index, value) => {
		if (!/^\d*$/.test(value)) return
		const newCode = [...code]
		newCode[index] = value
		setCode(newCode)

		if (value !== '' && index < 5) {
			inputRefs.current[index + 1].focus()
		}
	}

	const handleKeyDown = (index, event) => {
		if (event.key === 'Backspace' && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus()
		}
	}

	const handleVerify = async () => {
		const fullCode = code.join('')
		if (fullCode.length !== 6) {
			toast.error('Mã xác thực không hợp lệ!')
			return
		}

		const email = localStorage.getItem('registeredEmail')
		if (!email) {
			toast.error('Không tìm thấy email đăng ký!')
			return
		}

		try {
			const result = await dispatch(verifyAccountAsync({ email, verifyCode: fullCode }))

			if (result.type === 'auth/verifyAccount/fulfilled') {
				toast.success('Xác thực thành công!')
				localStorage.removeItem('registeredEmail')
				navigate('/', { replace: true })
			} else {
				toast.error('Xác thực thất bại! Vui lòng kiểm tra lại mã.')
			}
		} catch (error) {
			toast.error('Có lỗi xảy ra: ' + error.message)
		}
	}

	const handleResendVerificationCode = async () => {
		const email = localStorage.getItem('registeredEmail')
		if (!email) {
			toast.error('Không tìm thấy email. Vui lòng đăng ký lại!')
			return
		}
		try {
			const result = await dispatch(resendVerificationCodeAsync({ email }))
			if (result.type === 'auth/resendVerificationCode/fulfilled') {
				toast.success('Mã xác thực đã được gửi lại!')
			} else {
				toast.error('Gửi lại mã xác thực thất bại! Vui lòng thử lại.')
			}
		} catch (error) {
			toast.error('Có lỗi xảy ra: ' + error.message)
		}
	}

	useEffect(() => {
		if (inputRefs.current[0]) inputRefs.current[0].focus()
	}, [])

	return (
		<>
			{user && (
				<>
					<Navigate to="/" replace={true} />
				</>
			)}
			<div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
				<div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
					<div className="relative">
						<img
							src={VerifyImg}
							alt="Verify Account"
							className="w-[400px] h-full hidden rounded-l-2xl md:block object-cover"
						/>
						<div className="absolute hidden top-64 right-6 left-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
							<span className="text-white text-xl">
								Xác thực tài khoản của bạn để có trải nghiệm đầy đủ.
							</span>
						</div>
					</div>
					<div className="flex flex-col justify-center p-8 md:p-14">
						<span className="mb-3 text-4xl font-bold">Xác Thực Tài Khoản</span>
						<span className="font-light text-gray-400 mb-8">Nhập mã xác thực gồm 6 số.</span>

						<div className="flex justify-center gap-2">
							{code.map((digit, index) => (
								<input
									key={index}
									ref={el => (inputRefs.current[index] = el)}
									type="text"
									value={digit}
									onChange={e => handleChange(index, e.target.value)}
									onKeyDown={e => handleKeyDown(index, e)}
									maxLength="1"
									className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:border-black"
								/>
							))}
						</div>

						<button
							onClick={handleVerify}
							className="w-full bg-black text-white mt-6 p-3 rounded-lg border hover:bg-white hover:text-black hover:border-gray-300 transition duration-200"
						>
							Xác Thực
						</button>

						<div className="text-center text-gray-400 mt-4">
							<span>Không nhận được mã? </span>
							<button className="font-bold text-black" onClick={handleResendVerificationCode}>
								Gửi lại mã
							</button>
						</div>

						{/* Nút quay lại trang đăng ký/đăng nhập */}
						<button
							onClick={() => navigate('/signin')}
							className="w-full bg-gray-200 text-gray-800 mt-4 p-3 rounded-lg border hover:bg-gray-300 transition duration-200"
						>
							← Quay lại đăng nhập
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Verify
