import React, { useEffect } from 'react'
import MovieList from '../components/MovieList/MovieList'
import EntertainmentList from '../components/Entertainment/EntertainmentList'
import Contact from '../components/contact/contact'
import PromotionsList from '../components/Promotion/PromotionsList'

import AOS from 'aos'
import 'aos/dist/aos.css'

const Home = () => {
	useEffect(() => {
		AOS.init()
	}, [])

	return (
		<div className="bg-gray-900 text-white">
			<div className="container mx-auto px-4 py-8">
				<MovieList />

				{/* Khuyến mãi */}
				<section className="mb-12" data-aos="fade-up">
					<h2 className="text-3xl font-bold mb-6">Khuyến Mãi</h2>
					<PromotionsList />
				</section>

				{/* Giải trí */}
				<section className="mb-12" data-aos="fade-up">
					<h2 className="text-3xl font-bold mb-6">Giải Trí</h2>
					<EntertainmentList />
				</section>

				{/* Liên hệ */}
				<section data-aos="fade-up">
					<h2 className="text-3xl font-bold mb-6">Liên Hệ</h2>
					<Contact />
				</section>
			</div>
		</div>
	)
}

export default Home
