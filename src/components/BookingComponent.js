import { useState, useEffect, useRef } from 'react'

const BookingComponent = ({ selectedSeats, setSelectedSeats }) => {
	const [timeLeft, setTimeLeft] = useState(330)
	const intervalRef = useRef(null)
	const prevSeatCount = useRef(0)

	// Khi có ghế được chọn lần đầu
	useEffect(() => {
		if (selectedSeats.length > 0 && prevSeatCount.current === 0) {
			setTimeLeft(330)
			startTimer()
		}
		if (selectedSeats.length === 0 && intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
			setTimeLeft(330)
		}
		prevSeatCount.current = selectedSeats.length
	}, [selectedSeats])

	const startTimer = () => {
		if (intervalRef.current) clearInterval(intervalRef.current)

		intervalRef.current = setInterval(() => {
			setTimeLeft(prev => {
				if (prev <= 1) {
					clearInterval(intervalRef.current)
					intervalRef.current = null
					setSelectedSeats([])
					return 0
				}
				return prev - 1
			})
		}, 1000)
	}

	const formatTime = time => {
		const minutes = Math.floor(time / 60)
		const seconds = time % 60
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
	}

	useEffect(() => {
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current)
		}
	}, [])

	return (
		<div>
			<p className="text-gray-400 text-sm">Thời gian giữ vé</p>
			<p className="text-yellow-400 text-xl font-bold">{formatTime(timeLeft)}</p>
		</div>
	)
}

export default BookingComponent
