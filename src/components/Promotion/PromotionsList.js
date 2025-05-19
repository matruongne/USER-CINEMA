import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPromotions, selectPromotions } from '../../redux/Slices/Promotion/promotionSlice'
import { useDispatch, useSelector } from 'react-redux'

const PromotionsList = () => {
	const dispatch = useDispatch()
	const promotions = useSelector(selectPromotions)

	useEffect(() => {
		dispatch(getPromotions({}))
	}, [dispatch])

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
				CHƯƠNG TRÌNH KHUYẾN MÃI
			</h1>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{promotions.map(promo => (
					<div key={promo.promotion_id} className="bg-gray-900 p-4 rounded-lg shadow-lg">
						<img
							src={promo.image_url}
							alt={promo.title}
							className="w-full h-48 object-cover rounded-md"
						/>
						<h2 className="text-lg text-white font-semibold mt-4">{promo.title}</h2>
						<p className="text-gray-400 mt-2">{promo.description}</p>
						<Link
							to={`/promotion/${promo.promotion_id}`}
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

export default PromotionsList
