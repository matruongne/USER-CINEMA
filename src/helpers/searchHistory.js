const HISTORY_KEY = 'search_history'

export const getSearchHistory = () => {
	return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
}

export const addSearchHistory = keyword => {
	let history = getSearchHistory()
	history = history.filter(item => item !== keyword)
	history.unshift(keyword)
	if (history.length > 5) history = history.slice(0, 5)
	localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export const removeHistoryItem = keyword => {
	let history = getSearchHistory().filter(item => item !== keyword)
	localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}
