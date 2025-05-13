export const formatCast = jsonString => {
	if (!jsonString || typeof jsonString !== 'string') return []

	try {
		let data = jsonString
		while (typeof data === 'string') {
			data = JSON.parse(data)
		}

		if (Array.isArray(data)) {
			return data
		}

		return []
	} catch (error) {
		console.error('Failed to parse cast_json:', error)
		return []
	}
}
