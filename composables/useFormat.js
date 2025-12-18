export const useFormatNumber = () => {
	const formatNumber = value => {
		const num = Number(value)
		if (isNaN(num)) return '0'
		return num.toLocaleString()
	}

	return {
		formatNumber,
	}
}
