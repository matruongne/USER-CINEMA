import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Toaster />
			<App />
		</Provider>

		<ToastContainer />
	</React.StrictMode>
)
