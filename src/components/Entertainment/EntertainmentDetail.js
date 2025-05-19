import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
	getEntertainmentById,
	selectEntertainment,
} from '../../redux/Slices/Entertainment/entertainmentSlice'
import { useDispatch, useSelector } from 'react-redux'

const EntertainmentDetail = () => {
	const { id } = useParams()

	const dispatch = useDispatch()
	const entertainment = useSelector(selectEntertainment)

	useEffect(() => {
		dispatch(getEntertainmentById(id))
	}, [dispatch, id])

	if (!entertainment) {
		return <div className="text-center text-white py-10">Khuyến mãi không tồn tại.</div>
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">{entertainment.title}</h1>

			<div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-md max-w-3xl mx-auto">
				<img
					src={entertainment.image_url}
					alt={entertainment.title}
					className="w-full max-w-xl h-64 object-cover rounded-md"
				/>

				<p className="text-gray-700 text-lg mt-4 text-center">{entertainment.description}</p>

				<div className="mt-6 space-y-2 text-sm text-gray-600 w-full max-w-xl">
					<div>
						<span className="font-semibold text-gray-800">Trạng thái:</span>{' '}
						{entertainment.is_active ? (
							<span className="text-green-600 font-semibold">Đang hoạt động</span>
						) : (
							<span className="text-red-500 font-semibold">Ngừng hoạt động</span>
						)}
					</div>
					{entertainment.link_url && (
						<div>
							<span className="font-semibold text-gray-800">Liên kết:</span>{' '}
							<a
								href={entertainment.link_url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline"
							>
								{entertainment.link_url}
							</a>
						</div>
					)}
				</div>

				<Link
					to="/entertainment"
					className="mt-8 text-yellow-500 hover:text-yellow-400 transition font-semibold"
				>
					← Quay lại danh sách khuyến mãi
				</Link>
			</div>
		</div>
	)
}

export default EntertainmentDetail
