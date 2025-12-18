<template>
	<div class="flex flex-col gap-4">
		<div
			class="bg-white text-black p-6 rounded-lg shadow flex items-center justify-between"
		>
			<div class="flex items-center gap-4">
				<p
					:class="[
						'cursor-pointer pb-1 font-bold transition-colors duration-400',
						activeTab === 'number_issued'
							? 'border-b-2 border-black text-black'
							: 'border-b-2 border-b-transparent text-gray-500',
					]"
					@click="activeTab = 'number_issued'"
				>
					{{ $t('numberOfIssuedBankLoans') }}
				</p>

				<p
					:class="[
						'cursor-pointer pb-1 font-bold transition-colors duration-400',
						activeTab === 'number_outstanding'
							? 'border-b-2 border-black text-black'
							: 'border-b-2 border-b-transparent text-gray-500',
					]"
					@click="activeTab = 'number_outstanding'"
				>
					{{ $t('numberOfOutstandingBankLoans') }}
				</p>
			</div>
			<div class="flex items-center gap-2">
				<div
					class="flex items-center gap-2 rounded-lg border-[#E5E5EF] border p-2"
				>
					<div class="w-3 h-3 bg-[#3B8FF3] rounded-full"></div>
					<p class="text-sm text-[#615E83]">{{ $t('men') }}</p>
				</div>
				<div
					class="flex items-center gap-2 rounded-lg border-[#E5E5EF] border p-2"
				>
					<div class="w-3 h-3 bg-[#F29F67] rounded-full"></div>
					<p class="text-sm text-[#615E83]">{{ $t('women') }}</p>
				</div>
			</div>
		</div>
		<div class="flex gap-4 items-stretch">
			<div class="grid grid-cols-1 h-full w-full gap-4">
				<div class="bg-white h-full text-black p-6 rounded-lg shadow">
					<p class="text-sm text-gray-500">{{ $t('statistics') }}</p>
					<p
						class="font-medium text-black text-lg border-b pb-2 border-[#E5E5EF]"
					>
						{{ $t('byGender') }}
					</p>
					<VChart :option="pieOption" class="!h-[350px] mx-auto !w-[400px]" />
					<div class="text-sm mt-4">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#3B8FF3] rounded-full"></div>
								<p class="text-sm text-[#615E83]">{{ $t('men') }}</p>
							</div>
							<p class="text-xl font-bold">
								{{ formatNumber(selectedData.men_count) }}
							</p>
						</div>
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#F29F67] rounded-full"></div>
								<p class="text-sm text-[#615E83]">{{ $t('women') }}</p>
							</div>
							<p class="text-xl font-bold">
								{{ formatNumber(selectedData.women_count) }}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="h-full w-full">
				<div class="p-6 rounded-lg bg-white shadow w-full">
					<p class="text-xl font-medium border-b pb-2 border-[#E5E5EF]">
						{{ $t('byBusinessType') }}
					</p>

					<VChart
						:option="businessTypeChart"
						class="!w-[500px] !h-[150px] z-50"
					/>
				</div>

				<div class="p-6 mt-4 rounded-lg bg-white shadow w-full">
					<p class="text-xl font-medium border-b pb-2 border-[#E5E5EF]">
						{{ $t('byBusinessSize') }}
					</p>
					<VChart
						:option="businessSizeChart"
						class="!w-[500px] !h-[200px] z-50"
					/>
				</div>
			</div>
		</div>
		<div class="flex gap-4">
			<div class="p-6 rounded-lg bg-white shadow">
				<p class="text-sm text-gray-500">{{ $t('statistics') }}</p>
				<p
					class="font-medium text-black text-lg border-b pb-2 border-[#E5E5EF]"
				>
					{{ $t('loans') }}
				</p>
				<VChart :option="statsOption" class="!w-[500px] !h-[300px] z-50" />
			</div>
			<div class="p-6 w-full rounded-lg bg-white shadow">
				<p class="text-xl font-medium">By sectors</p>
				<div
					class="flex items-center justify-between border-b pb-1 border-[#E5E5EF] mt-2 text-xs"
				>
					<p>{{ $t('sectors') }}</p>
					<p>{{ $t('msme_credits') }}</p>
				</div>
				<VChart :option="sectorsChart" class="w-full !h-[300px] z-50" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { useFiltersStore } from '@/store/filterStore.js'
const { generate } = useStackedChart()
const { t, locale } = useI18n()
const { formatNumber } = useFormatNumber()
const $axios = useAxios()
const filtersStore = useFiltersStore()
const activeTab = ref('number_issued')
const creditLoan = ref([])
const outstandingLoan = ref([])
const outstandingGraph = ref([])
const countGraph = ref([])

onMounted(() => {
	getCreditLoan()
	getCountGraph()
})

watch(activeTab, newVal => {
	if (newVal === 'number_issued') {
		getCreditLoan()
		getCountGraph()
	} else {
		outstandingGraphCount()
		getOutstandingLoan()
	}
})

watch(
	() => ({
		period: filtersStore.period,
		businessTypes: filtersStore.businessTypes,
		businessSizes: filtersStore.businessSizes,
		sector: filtersStore.sector,
		region: filtersStore.region,
	}),
	() => {
		if (activeTab.value === 'number_issued') {
			getCreditLoan()
			getCountGraph()
		} else {
			getOutstandingLoan()
			getLoanGraph()
		}
	},
	{ deep: true }
)

function buildParamsFromFilters() {
	const params = {}

	if (filtersStore.period) params.year = filtersStore.period
	if (filtersStore.businessTypes)
		params.buss_type = filtersStore.businessTypes.join(',')
	if (filtersStore.businessSizes)
		params.business_type = filtersStore.businessSizes.join(',')
	if (filtersStore.sector !== null) params.sector = filtersStore.sector
	if (filtersStore.region !== null) params.region_id = filtersStore.region

	return params
}

const selectedData = computed(() => {
	return activeTab.value === 'number_issued'
		? creditLoan.value
		: outstandingLoan.value
})

function getCreditLoan() {
	$axios
		.get('api/v1/wefi/dashboard/credit_loan', {
			params: buildParamsFromFilters(),
		})
		.then(res => {
			creditLoan.value = res.data.data
		})
		.catch(error => {
			console.error(error)
		})
}

function getOutstandingLoan() {
	$axios
		.get('api/v1/wefi/dashboard/outstanding_loans', {
			params: buildParamsFromFilters(),
		})
		.then(res => {
			outstandingLoan.value = res.data.data
		})
		.catch(error => {
			console.error(error)
		})
}
const selectedLine = computed(() => {
	return activeTab.value === 'number_issued'
		? countGraph.value
		: outstandingGraph.value
})

function getCountGraph() {
	$axios
		.get(`api/v1/wefi/dashboard/count_graph?lang=${locale.value}`, {
			params: buildParamsFromFilters(),
		})
		.then(res => {
			countGraph.value = res.data.data
		})
		.catch(error => {
			console.error(error)
		})
}

function outstandingGraphCount() {
	$axios
		.get('api/v1/wefi/dashboard/outstanding_graph_count', {
			params: buildParamsFromFilters(),
		})
		.then(res => {
			outstandingGraph.value = res.data.data
		})
		.catch(error => {
			console.error(error)
		})
}

const pieOption = computed(() => {
	const menName = t('men')
	const womenName = t('women')
	const borrowersLabel = t('borrowers')

	const total =
		(selectedData.value?.women_count ?? 0) +
		(selectedData.value?.men_count ?? 0)

	return {
		color: ['#3B8FF3', '#F29F67'],
		title: {
			text: `{value|${formatNumber(total)}}\n{label|${borrowersLabel}}`,
			left: 'center',
			top: 'center',
			textStyle: {
				rich: {
					value: {
						fontSize: 20,
						fontWeight: 'bold',
						color: '#111827',
						align: 'center',
					},
					label: {
						fontSize: 14,
						color: '#6B7280',
						align: 'center',
					},
				},
			},
		},
		tooltip: {
			trigger: 'item',
			formatter: params => {
				const color = params.color
				const name = params.name
				const value = formatNumber(params.value)
				const percent = Math.round(params.percent)

				return `
        <div style="font-family: sans-serif; color: black; font-size: 13px; line-height: 1.4;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
            <div style="width: 10px; height: 10px; background:${color}; border-radius: 50%;"></div>
            <span style="font-weight: 600;">${t(name.toLowerCase())}</span>
          </div>
          <div style="margin-left: 16px;">
            <span style="font-size: 14px; font-weight: 500;">${value}</span>
            <span style="font-size: 13px; font-weight: 600;">(${percent}%)</span>
          </div>
        </div>
        `
			},
		},
		series: [
			{
				name: 'Business Type',
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				label: {
					show: true,
					position: 'outside',
					formatter: params => `${Math.round(params.percent)}%`,
					textStyle: {
						fontSize: 16,
						fontWeight: 'bold',
						color: '#111827',
					},
				},
				padAngle: 5,
				itemStyle: {
					borderRadius: 10,
				},
				labelLine: {
					show: true,
					smooth: 0.2,
				},
				data: [
					{
						value: Math.round(selectedData.value?.men_count ?? 0),
							name: $t('men'),
					},
					{
						value: Math.round(selectedData.value?.women_count ?? 0),
							name: $t('women'),
					},
				].map(item => ({
					...item,
					name: t(item.name.toLowerCase()), // перевод
				})),
			},
		],
	}
})
// BUSINESS TYPE CHART
const businessTypeChart = computed(() =>
	generate({
		seriesData: [
			{
				name: $t('women'),
				data: [
					{
						value: selectedData.value?.legal_women_count_percent ?? 0,
						count: selectedData.value?.legal_women_count ?? 0,
						name: $t('legal'),
					},
					{
						value: selectedData.value?.individual_women_count_percent ?? 0,
						count: selectedData.value?.individual_women_count ?? 0,
						name: $t('individual'),
					},
				],
				style: { color: '#F29F67', borderRadius: [8, 0, 0, 8] },
			},
			{
					name: $t('men'),
				data: [
					{
						value: selectedData.value?.legal_men_count_percent ?? 0,
						count: selectedData.value?.legal_men_count ?? 0,
						name: $t('legal'),
					},
					{
						value: selectedData.value?.individual_men_count_percent ?? 0,
						count: selectedData.value?.individual_men_count ?? 0,
						name: $t('individual'),
					},
				],
				style: { color: '#3B8FF3' },
			},
		],
		totalsPercent: [
			selectedData.value?.legal_count_percent ?? 0,
			selectedData.value?.individual_count_percent ?? 0,
		],
	})
)

// BY SECTOR CHART
const sectorsChart = computed(() =>
	generate({
		seriesData: [
			{
					name: $t('women'),
				data: [
					{
						value: selectedData.value?.dir_service_women_percent ?? 0,
						count: selectedData.value?.dir_service_women_count ?? 0,
						name: $t('services'),
					},
					{
						value: selectedData.value?.dir_man_women_percent ?? 0,
						count: selectedData.value?.dir_man_women_count ?? 0,
						name: $t('manufacturing'),
					},
					{
						value: selectedData.value?.dir_con_women_percent ?? 0,
						count: selectedData.value?.dir_con_women_count ?? 0,
						name: $t('construction'),
					},
					{
						value: selectedData.value?.dir_agro_women_percent ?? 0,
						count: selectedData.value?.dir_agro_women_count ?? 0,
						name: $t('agriculture'),
					},
					{
						value: selectedData.value?.dir_others_women_percent ?? 0,
						count: selectedData.value?.dir_others_women_count ?? 0,
						name: $t('other'),
					},
				],
				style: { color: '#F29F67', borderRadius: [8, 0, 0, 8] },
			},
			{
					name: $t('men'),
				data: [
					{
						value: selectedData.value?.dir_service_men_percent ?? 0,
						count: selectedData.value?.dir_service_men_count ?? 0,
						name: $t('services'),
					},
					{
						value: selectedData.value?.dir_man_men_percent ?? 0,
						count: selectedData.value?.dir_man_men_count ?? 0,
						name: $t('manufacturing'),
					},
					{
						value: selectedData.value?.dir_con_men_percent ?? 0,
						count: selectedData.value?.dir_con_men_count ?? 0,
						name: $t('construction'),
					},
					{
						value: selectedData.value?.dir_agro_men_percent ?? 0,
						count: selectedData.value?.dir_agro_men_count ?? 0,
						name: $t('agriculture'),
					},
					{
						value: selectedData.value?.dir_others_men_percent ?? 0,
						count: selectedData.value?.dir_others_men_count ?? 0,
						name: $t('other'),
					},
				],
				style: { color: '#3B8FF3' },
			},
		],
		totalsPercent: [
			selectedData.value?.dir_service_percent ?? 0,
			selectedData.value?.dir_man_percent ?? 0,
			selectedData.value?.dir_con_percent ?? 0,
			selectedData.value?.dir_agro_percent ?? 0,
			selectedData.value?.dir_others_percent ?? 0,
		],
	})
)
// BUSINESS SIZE CHART
const businessSizeChart = computed(() =>
	generate({
		seriesData: [
			{
					name: $t('women'),
				data: [
					{
						value: selectedData.value?.micro_women_count_percent ?? 0,
						count: selectedData.value?.micro_women_count ?? 0,
						name: $t('micro'),
					},
					{
						value: selectedData.value?.small_women_count_percent ?? 0,
						count: selectedData.value?.small_women_count ?? 0,
						name: $t('small'),
					},
					{
						value: selectedData.value?.medium_women_count_percent ?? 0,
						count: selectedData.value?.medium_women_count ?? 0,
						name: $t('medium'),
					},
				],
				style: { color: '#F29F67', borderRadius: [8, 0, 0, 8] },
			},
			{
					name: $t('men'),
				data: [
					{
						value: selectedData.value?.micro_men_count_percent ?? 0,
						count: selectedData.value?.micro_men_count ?? 0,
						name: $t('micro'),
					},
					{
						value: selectedData.value?.small_men_count_percent ?? 0,
						count: selectedData.value?.small_men_count ?? 0,
						name: $t('small'),
					},
					{
						value: selectedData.value?.medium_men_count_percent ?? 0,
						count: selectedData.value?.medium_men_count ?? 0,
						name: $t('medium'),
					},
				],
				style: { color: '#3B8FF3' },
			},
		],
		totalsPercent: [
			selectedData.value?.micro_count_percent ?? 0,
			selectedData.value?.small_count_percent ?? 0,
			selectedData.value?.medium_count_percent ?? 0,
		],
	})
)

//CREDIT STATISTICS
const statsOption = computed(() => {
	const filtered = Array.isArray(selectedLine.value)
		? selectedLine.value.filter(
				item => item?.year !== null && item?.year !== undefined
		  )
		: []

	const years = filtered.map(item => item.year?.toString?.() ?? '')
	const womenData = filtered.map(item => item?.women_asum ?? 0)
	const menData = filtered.map(item => item?.men_asum ?? 0)

	return {
		tooltip: {
			trigger: 'axis',
			formatter: params => {
				const lines = params
					.map(p => {
						const color = p.color // возьмёт цвет из `itemStyle`
						return `
					<div style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
						<div style="width: 10px; height: 10px; background: ${color}; border-radius: 50%;"></div>
						<span>${
							p.seriesName
						}: <span style="font-weight: bold;">${p.value.toLocaleString()}</span></span>
					</div>
				`
					})
					.join('')

				return `
			<div style="padding: 4px 6px; font-size: 13px;">
				<div style="font-weight: bold; margin-bottom: 8px;">${$t('month')}: ${params[0].axisValue}</div>
				${lines}
			</div>
		`
			},
			backgroundColor: '#fff', // белый фон
			borderColor: '#E5E7EB',
			borderWidth: 1,
			borderRadius: 6,
			padding: 10,
			textStyle: {
				color: '#111827', // почти черный
				fontSize: 13,
			},
		},
		xAxis: {
			type: 'category',
			data: years,
			axisLine: { show: false },
			axisTick: { show: false },
			axisLabel: {
				color: '#6B7280',
				fontWeight: 500,
			},
		},
		yAxis: {
			type: 'log',
			logBase: 10,
			axisLine: { show: false },
			axisTick: { show: false },
			axisLabel: {
				color: '#6B7280',
				formatter: value => {
					if (value >= 1e12) return `${(value / 1e12).toFixed(0)} T`
					if (value >= 1e9) return `${(value / 1e9).toFixed(0)} B`
					if (value >= 1e6) return `${(value / 1e6).toFixed(0)} M`
					if (value >= 1e3) return `${(value / 1e3).toFixed(0)} K`
					return value
				},
			},
			splitLine: {
				lineStyle: {
					type: 'dashed',
					color: '#E5E7EB',
				},
			},
		},

		grid: {
			left: 50,
			right: 10,
			top: 60,
			bottom: 40,
		},
		series: [
			{
				name: $t('women'),
				type: 'line',
				data: womenData,
				smooth: true,
				lineStyle: {
					color: '#F29F67',
					width: 3,
					type: 'dashed',
				},
				itemStyle: {
					color: '#F29F67',
				},
				symbol: 'circle',
				symbolSize: 6,
				emphasis: {
					scale: true,
				},
			},
			{
					name: $t('men'),
				type: 'line',
				data: menData,
				smooth: true,
				lineStyle: {
					color: '#3B8FF3',
					width: 3,
					type: 'dashed',
				},
				itemStyle: {
					color: '#3B8FF3',
				},
				symbol: 'circle',
				symbolSize: 6,
				emphasis: {
					scale: true,
				},
			},
		],
	}
})
</script>
