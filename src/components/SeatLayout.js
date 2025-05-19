import React from 'react'

const SeatLayout = ({
	layoutType = 'bowshape',
	selectedSeats = [],
	seatLayout,
	onSeatClick,
	seats,
	isLoading,
}) => {
	const handleSeatClick = (seatId, seatNumber, row) => {
		if (onSeatClick) {
			onSeatClick(seatId, seatNumber, row)
		}
	}
	console.log(selectedSeats)
	const renderThreeZonesLayout = () => {
		const rows = seatLayout?.rows?.filter(row => !seatLayout?.coupleSeats.includes(row)) || []

		const chunkSize = Math.ceil(rows.length / 3)
		const rowChunks = [
			rows.slice(0, chunkSize),
			rows.slice(chunkSize, chunkSize * 2),
			rows.slice(chunkSize * 2),
		]

		return (
			<div className="border p-4">
				{/* --- 3 Zones (thường) --- */}
				<div className="grid grid-cols-3 gap-4 mb-4 max-w-6xl mx-auto">
					{rowChunks.map((chunk, zoneIndex) => (
						<div key={zoneIndex} className="flex flex-col gap-4">
							{chunk.map(row => (
								<div key={row} className="flex items-center gap-2 border p-2">
									<span className="w-6 text-center font-bold text-white">{row}</span>
									<div
										className="grid gap-1 flex-1"
										style={{
											gridTemplateColumns: `repeat(${
												seatLayout?.rowCols?.[row] || 0
											}, minmax(1rem, auto))`,
										}}
									>
										{Array.from({ length: seatLayout?.rowCols?.[row] || 0 }, (_, i) => {
											const seatNumber = (i + 1).toString().padStart(2, '0')
											const seat = `${row}${seatNumber}`
											const seatId = seats?.find(
												seat => seat.seat_row === row && seat.seat_number === parseInt(seatNumber)
											)?.seat_id
											const isBooked = seatLayout?.booked.includes(seat)
											const isHeld = seatLayout?.held.includes(seat)
											const isSelected = selectedSeats?.some(s => s.seat_id === seatId)

											const isDisabled = isBooked || (isHeld && !isSelected)
											return (
												<button
													key={seat}
													disabled={isDisabled}
													onClick={() => handleSeatClick(seatId, seatNumber, row)}
													className={`w-7 h-7 text-[10px] font-medium rounded ${
														isBooked
															? 'bg-gray-600 cursor-not-allowed'
															: isSelected
															? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
															: isHeld
															? 'bg-purple-400 cursor-wait text-white'
															: 'bg-white hover:bg-gray-200 text-gray-900'
													}`}
												>
													{seatNumber}
												</button>
											)
										})}
									</div>
									<span className="w-6 text-center font-bold text-white">{row}</span>
								</div>
							))}
						</div>
					))}
				</div>

				{/* --- Couple Seats --- */}
				{seatLayout?.coupleSeats?.length > 0 && (
					<div className="flex justify-center gap-8">
						<div className="mt-2">
							{seatLayout?.coupleSeats.map(row => (
								<div key={row} className="flex items-center gap-2 border p-2">
									<span className="w-6 text-center font-bold text-white">{row}</span>
									<div className="flex justify-center gap-4 flex-1">
										{Array.from({ length: seatLayout?.coupleRowCols?.[row] || 0 }, (_, i) => {
											if ((i + 1) % 2 === 0) return null

											const seatNumber = (i + 1).toString().padStart(2, '0')
											const seat = `${row}${seatNumber}`
											const seatId = seats?.find(
												seat => seat.seat_row === row && seat.seat_number === parseInt(seatNumber)
											)?.seat_id
											const isBooked = seatLayout?.booked.includes(seat)
											const isHeld = seatLayout?.held.includes(seat)
											const isSelected = selectedSeats?.some(s => s.seat_id === seatId)

											const isDisabled = isBooked || (isHeld && !isSelected)

											return (
												<button
													key={seat}
													disabled={isDisabled}
													onClick={() => handleSeatClick(seatId, seatNumber, row)}
													className={`w-14 h-7 text-[10px] font-medium rounded ${
														isBooked
															? 'bg-gray-600 cursor-not-allowed'
															: isSelected
															? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
															: isHeld
															? 'bg-purple-400 cursor-wait text-white'
															: 'bg-white hover:bg-gray-200 text-gray-900'
													}`}
												>
													{seatNumber}
												</button>
											)
										})}
									</div>
									<span className="w-6 text-center font-bold text-white">{row}</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		)
	}

	// const renderBowShapeLayout = () => {
	// 	const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
	// 	const containerWidth = 900 // Chiều rộng cố định của container
	// 	const seatWidth = 28 // Chiều rộng của mỗi ghế + khoảng cách

	// 	return (
	// 		<div className="grid gap-4 mb-6 max-w-[900px] mx-auto px-8">
	// 			{rows.map((row, rowIndex) => {
	// 				const seatCount = 10 + rowIndex * 2
	// 				const totalWidth = seatCount * seatWidth
	// 				const marginLeft = (containerWidth - totalWidth) / 2

	// 				return (
	// 					<div key={row} className="flex items-center gap-2">
	// 						<span className="w-6 text-center font-bold text-white">{row}</span>
	// 						<div className="relative flex-1 h-8">
	// 							{Array.from({ length: seatCount }, (_, i) => {
	// 								const seatNumber = (i + 1).toString().padStart(2, '0')
	// 								const seat = `${row}${seatNumber}`
	// 								const isBooked = seatLayout?.booked.includes(seat)
	// 								const isSelected = selectedSeats.includes(seat)

	// 								return (
	// 									<button
	// 										key={seat}
	// 										disabled={isBooked}
	// 										onClick={() => handleSeatClick(seat)}
	// 										style={{
	// 											position: 'absolute',
	// 											left: `${marginLeft + i * seatWidth}px`,
	// 										}}
	// 										className={`w-6 h-6 text-[10px] font-medium rounded ${
	// 											isBooked
	// 												? 'bg-gray-600 cursor-not-allowed'
	// 												: isSelected
	// 												? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
	// 												: 'bg-white hover:bg-gray-200 text-gray-900'
	// 										}`}
	// 									>
	// 										{seatNumber}
	// 									</button>
	// 								)
	// 							})}
	// 						</div>
	// 						<span className="w-6 text-center font-bold text-white">{row}</span>
	// 					</div>
	// 				)
	// 			})}

	// 			{/* Dãy I - ghế đôi trên cùng */}
	// 			<div className="mt-8">
	// 				<div className="flex items-center gap-2">
	// 					<span className="w-6 text-center font-bold text-white">I</span>
	// 					<div className="flex justify-center gap-8 flex-1">
	// 						{Array.from({ length: 5 }, (_, i) => {
	// 							const seatNumber = (i + 1).toString().padStart(2, '0')
	// 							const seat = `I${seatNumber}`
	// 							const isBooked = seatLayout?.booked.includes(seat)
	// 							const isSelected = selectedSeats.includes(seat)

	// 							return (
	// 								<button
	// 									key={seat}
	// 									disabled={isBooked}
	// 									onClick={() => handleSeatClick(seat)}
	// 									className={`w-14 h-7 text-[10px] font-medium rounded ${
	// 										isBooked
	// 											? 'bg-gray-600 cursor-not-allowed'
	// 											: isSelected
	// 											? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
	// 											: 'bg-white hover:bg-gray-200 text-gray-900'
	// 									}`}
	// 								>
	// 									{seatNumber}
	// 								</button>
	// 							)
	// 						})}
	// 					</div>
	// 					<span className="w-6 text-center font-bold text-white">I</span>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	)
	// }

	// const renderTrapezoidalLayout = () => {
	// 	const rows = seatLayout?.rows?.filter(row => !seatLayout?.coupleSeats.includes(row)) || []

	// 	const chunkSize = Math.ceil(rows.length / 3)
	// 	const rowChunks = [
	// 		rows.slice(0, chunkSize),
	// 		rows.slice(chunkSize, chunkSize * 2),
	// 		rows.slice(chunkSize * 2),
	// 	]

	// 	return (
	// 		<div className="border p-4">
	// 			{/* --- Trapezoidal Layout --- */}
	// 			<div className="grid grid-cols-3 gap-4 mb-4 max-w-6xl mx-auto">
	// 				{rowChunks.map((chunk, zoneIndex) => (
	// 					<div key={zoneIndex} className="flex flex-col gap-4">
	// 						{chunk.map(row => (
	// 							<div key={row} className="flex items-center gap-2 border p-2">
	// 								<span className="w-6 text-center font-bold text-white">{row}</span>
	// 								<div
	// 									className="grid gap-1 flex-1"
	// 									style={{
	// 										gridTemplateColumns: `repeat(${
	// 											seatLayout?.rowCols?.[row] || 0
	// 										}, minmax(1rem, auto))`,
	// 									}}
	// 								>
	// 									{Array.from({ length: seatLayout?.rowCols?.[row] || 0 }, (_, i) => {
	// 										const seatNumber = (i + 1).toString().padStart(2, '0')
	// 										const seat = `${row}${seatNumber}`
	// 										const seatId = seats?.find(
	// 											seat => seat.seat_row === row && seat.seat_number === parseInt(seatNumber)
	// 										)?.seat_id
	// 										const isBooked = seatLayout?.booked.includes(seat)
	// 										const isHeld = seatLayout?.held.includes(seat)
	// 										const isSelected = selectedSeats?.some(s => s.seat_id === seatId)

	// 										const isDisabled = isBooked || (isHeld && !isSelected)

	// 										return (
	// 											<button
	// 												key={seat}
	// 												disabled={isDisabled}
	// 												onClick={() => handleSeatClick(seatId, seatNumber, row)}
	// 												className={`w-7 h-7 text-[10px] font-medium rounded ${
	// 													isBooked
	// 														? 'bg-gray-600 cursor-not-allowed'
	// 														: isSelected
	// 														? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
	// 														: isHeld
	// 														? 'bg-purple-400 cursor-wait text-white'
	// 														: 'bg-white hover:bg-gray-200 text-gray-900'
	// 												}`}
	// 											>
	// 												{seatNumber}
	// 											</button>
	// 										)
	// 									})}
	// 								</div>
	// 								<span className="w-6 text-center font-bold text-white">{row}</span>
	// 							</div>
	// 						))}
	// 					</div>
	// 				))}
	// 			</div>
	// 			{/* --- Couple Seats --- */}
	// 			{seatLayout?.coupleSeats?.length > 0 && (
	// 				<div className="flex justify-center gap-8">
	// 					<div className="mt-2">
	// 						{seatLayout?.coupleSeats.map(row => (
	// 							<div key={row} className="flex items-center gap-2 border p-2">
	// 								<span className="w-6 text-center font-bold text-white">{row}</span>
	// 								<div className="flex justify-center gap-4 flex-1">
	// 									{Array.from({ length: seatLayout?.coupleRowCols?.[row] || 0 }, (_, i) => {
	// 										if ((i + 1) % 2 === 0) return null

	// 										const seatNumber = (i + 1).toString().padStart(2, '0')
	// 										const seat = `${row}${seatNumber}`
	// 										const seatId = seats?.find(
	// 											seat => seat.seat_row === row && seat.seat_number === parseInt(seatNumber)
	// 										)?.seat_id
	// 										const isBooked = seatLayout?.booked.includes(seat)
	// 										const isHeld = seatLayout?.held.includes(seat)
	// 										const isSelected = selectedSeats?.some(s => s.seat_id === seatId)

	// 										const isDisabled = isBooked || (isHeld && !isSelected)

	// 										return (
	// 											<button
	// 												key={seat}
	// 												disabled={isDisabled}
	// 												onClick={() => handleSeatClick(seatId, seatNumber, row)}
	// 												className={`w-14 h-7 text-[10px] font-medium rounded ${
	// 													isBooked
	// 														? 'bg-gray-600 cursor-not-allowed'
	// 														: isSelected
	// 														? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
	// 														: isHeld
	// 														? 'bg-purple-400 cursor-wait text-white'
	// 														: 'bg-white hover:bg-gray-200 text-gray-900'
	// 												}`}
	// 											>
	// 												{seatNumber}
	// 											</button>
	// 										)
	// 									})}
	// 								</div>
	// 								<span className="w-6 text-center font-bold text-white">{row}</span>
	// 							</div>
	// 						))}
	// 					</div>
	// 				</div>
	// 			)}
	// 		</div>
	// 	)
	// }

	const renderLayout = () => {
		switch (layoutType) {
			case '3-zones':
				return renderThreeZonesLayout()
			// case 'bowshape':
			// 	return renderBowShapeLayout()
			// case 'trapezoidal':
			// 	return renderTrapezoidalLayout()
			default:
				return renderThreeZonesLayout()
		}
	}

	return (
		<div className="relative bg-[#1a1f37] rounded-lg p-8">
			<div className="relative mb-12">
				<div className="w-full flex justify-center">
					<div className="relative w-3/4">
						<div className="absolute w-full h-6 bg-gradient-to-b from-white/20 to-transparent -top-6"></div>
						<div className="text-center text-white text-xl font-semibold mb-8">Màn hình</div>
						<div className="w-full h-0.5 bg-white/50"></div>
					</div>
				</div>
			</div>
			{isLoading && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
				</div>
			)}
			{renderLayout()}

			<div className="flex justify-center gap-8 mt-8 flex-wrap">
				<div className="flex items-center gap-2">
					<div className="w-7 h-7 bg-white rounded border border-gray-300"></div>
					<span className="text-white">Ghế Thường</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-14 h-7 bg-white rounded border border-gray-300"></div>
					<span className="text-white">Ghế Đôi (2 Người)</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-7 h-7 bg-yellow-400 rounded"></div>
					<span className="text-white">Ghế đã chọn</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-7 h-7 bg-gray-600 rounded"></div>
					<span className="text-white">Ghế đã đặt</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-7 h-7 bg-purple-400 rounded"></div>
					<span className="text-white">Ghế đang có người giữ</span>
				</div>
			</div>
		</div>
	)
}

export default SeatLayout
