export const formatDate = dateString => {
	if (!dateString) return 'N/A'
	const date = new Date(dateString)
	if (isNaN(date)) return 'N/A'
	const dd = String(date.getDate()).padStart(2, '0')
	const MM = String(date.getMonth() + 1).padStart(2, '0')
	const yyyy = date.getFullYear()
	return `${dd}/${MM}/${yyyy}`
}

export const formatDateForInput = date => {
	if (!date) return ''
	const d = new Date(date)
	return d.toISOString().split('T')[0] // yyyy-MM-dd
}

export const formatTime = timeStr => {
	if (!timeStr) return ''
	const [hour, minute] = timeStr.split(':')
	return `${hour}:${minute}`
}
