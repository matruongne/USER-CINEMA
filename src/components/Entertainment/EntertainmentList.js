import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
	getEntertainments,
	selectEntertainments,
} from '../../redux/Slices/Entertainment/entertainmentSlice'
import { useDispatch, useSelector } from 'react-redux'

const EntertainmentList = () => {
	const dispatch = useDispatch()
	const entertainments = useSelector(selectEntertainments)

	useEffect(() => {
		dispatch(getEntertainments({}))
	}, [dispatch])

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">TẤT CẢ CÁC GIẢI TRÍ</h1>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{entertainments.map(entertain => (
					<div key={entertain.entertainment_id} className="bg-gray-900 p-4 rounded-lg shadow-lg">
						<img
							src={entertain.image_url}
							alt={entertain.title}
							className="w-full h-48 object-cover rounded-md"
						/>
						<h2 className="text-lg text-white font-semibold mt-4">{entertain.title}</h2>
						<p className="text-gray-400 mt-2">{entertain.description}</p>
						<Link
							to={`/entertainment/${entertain.entertainment_id}`}
							className="block mt-4 text-yellow-400 hover:text-yellow-300 transition font-semibold"
						>
							Xem chi tiết →
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}

export default EntertainmentList
