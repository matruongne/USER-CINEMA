import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import SignInImage from '../assets/SignInImage.jpg'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserAsync, selectError, selectLoggedInUser } from '../redux/Slices/Auth/authSlice'

const Signin = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectLoggedInUser)
	const error = useSelector(selectError)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loginAttempt, setLoginAttempt] = useState(0)

	const usernameInput = useRef()
	const passwordInput = useRef()

	const handleSubmit = useCallback(async () => {
		dispatch(loginUserAsync({ username, password }))
			.unwrap()
			.catch(() => {
				setLoginAttempt(prev => prev + 1)
			})
	}, [username, dispatch, password])

	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			handleSubmit()
		}
	}

	useEffect(() => {
		if (error && loginAttempt > 0) {
			toast.error('Đăng nhập thất bại: Sai Username hoặc mật khẩu!')
			usernameInput.current.className += ' border-red-500'
			passwordInput.current.className += ' border-red-500'
		}
	}, [error, loginAttempt])

	return (
		<>
			{user && (
				<>
					{toast.success('Đăng nhập thành công!')}
					<Navigate to="/" replace={true} />
				</>
			)}
			<div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
				<div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
					<div className="flex flex-col justify-center p-8 md:p-14">
						<span className="mb-3 text-4xl font-bold">Welcome back</span>
						<span className="font-light text-gray-400 mb-8">
							Welcom back! Please enter your details
						</span>
						<div className="py-4">
							<span className="mb-2 text-md">Username</span>
							<input
								ref={usernameInput}
								type="text"
								className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
								name="username"
								id="username"
								value={username}
								onChange={e => setUsername(e.target.value)}
								required
							/>
						</div>
						<div className="py-4">
							<span className="mb-2 text-md">Password</span>
							<input
								ref={passwordInput}
								type="password"
								name="pass"
								id="pass"
								className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
								onKeyDown={handleKeyDown}
							/>
						</div>
						<div className="flex justify-between w-full py-4">
							<div className="mr-24">
								<input type="checkbox" name="ch" id="ch" className="mr-2" />
								<span className="text-md">Remember for 30 days</span>
							</div>
							<span className="font-bold text-md">Forgot password</span>
						</div>
						<button
							onClick={() => handleSubmit()}
							className="w-full bg-black text-white p-2 rounded-lg mb-6 border hover:bg-white hover:text-black hover:border hover:border-gray-300"
						>
							Sign in
						</button>
						<div className="text-center text-gray-400">
							Dont'have an account?
							<Link className="font-bold text-black" to="/signup">
								{' '}
								Sign up for free
							</Link>
						</div>
					</div>
					<div className="relative">
						<img
							src={SignInImage}
							alt="img"
							className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
						/>
						<div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
							<span className="text-white text-xl">
								We've been uesing Untitle to kick"
								<br />
								start every new project and can't <br />
								imagine working without it."
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Signin
