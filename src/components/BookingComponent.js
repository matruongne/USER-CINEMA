import { useState, useEffect } from 'react'

const BookingComponent = ({ selectedSeats, setSelectedSeats }) => {
	const [timeLeft, setTimeLeft] = useState(330) // Thời gian giữ vé mặc định là 5 phút 30 giây (330 giây)
	const [intervalId, setIntervalId] = useState(null)

	// Giảm thời gian mỗi giây
	useEffect(() => {
		// Nếu có ghế được chọn, bắt đầu đếm ngược
		if (selectedSeats.length > 0 && !intervalId) {
			const id = setInterval(() => {
				setTimeLeft(prevTime => {
					if (prevTime > 0) return prevTime - 1
					clearInterval(id) // Dừng đếm ngược khi thời gian hết
					setSelectedSeats([]) // Reset ghế đã chọn
					return 0
				})
			}, 1000)
			setIntervalId(id)
		}

		// Nếu không còn ghế chọn, dừng đếm ngược
		return () => {
			if (intervalId) clearInterval(intervalId)
		}
	}, [selectedSeats, intervalId, setSelectedSeats])

	// Reset thời gian khi người dùng chọn thêm ghế
	useEffect(() => {
		if (selectedSeats.length > 0) {
			setTimeLeft(330) // Reset lại thời gian giữ vé (5 phút 30 giây)
			if (intervalId) clearInterval(intervalId) // Xóa interval cũ
			setIntervalId(null) // Reset lại intervalId để tạo một interval mới
		}
	}, [selectedSeats])

	// Định dạng hiển thị thời gian (mm:ss)
	const formatTime = time => {
		const minutes = Math.floor(time / 60)
		const seconds = time % 60
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
	}

	return (
		<div>
			<p className="text-gray-400 text-sm">Thời gian giữ vé</p>
			<p className="text-yellow-400 text-xl font-bold">{formatTime(timeLeft)}</p>
		</div>
	)
}

export default BookingComponent
