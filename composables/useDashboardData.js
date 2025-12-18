export async function useDashboardData($axios, updateCallback) {
	const cacheKey = 'dashboard-data'

	const cached = localStorage.getItem(cacheKey)
	if (cached) {
		try {
			const parsed = JSON.parse(cached)

			if (typeof updateCallback === 'function') {
				updateCallback(parsed)
			}

			$axios.get('/api/v1/wefi/dashboard/').then(res => {
				const fresh = res.data.data
				localStorage.setItem(cacheKey, JSON.stringify(fresh))
				updateCallback(fresh)
			})

			return parsed
		} catch (e) {
			console.error('Ошибка чтения кеша:', e)
			localStorage.removeItem(cacheKey)
		}
	}

	const res = await $axios.get('/api/v1/wefi/dashboard/')
	const data = res.data.data
	localStorage.setItem(cacheKey, JSON.stringify(data))
	return data
}
