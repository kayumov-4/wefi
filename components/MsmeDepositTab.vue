<template>
	<div class="flex items-stretch h-full gap-4">
		<!-- Total MSMEs -->
		<div class="flex flex-col min-h-full max-w-[456px] gap-4 w-full">
			<div class="bg-white p-6 rounded-lg shadow">
				<div class="flex items-center justify-between">
					<p class="text-xl font-medium">{{ $t('msmeDeposit') }}</p>
					<p class="text-3xl font-medium">
						{{ formatNumber(deposit.total_count) }}
					</p>
				</div>
				<div class="mt-8">
					<div>
						<div class="flex items-center justify-between mt-4 -mb-4">
							<p class="text-gray-400">{{ $t('byGender') }}</p>
						</div>
						<VChart :option="genderChart" class="!w-[450px] !h-[110px] z-50" />
						<div class="flex items-center gap-2 -mt-8">
							<div
								class="flex items-center w-full justify-between gap-2 rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#F29F67] rounded-full"></div>
									<p class="text-sm text-[#615E83]">{{ $t('women') }}</p>
								</div>
								<p class="text-xl text-[#615E83]">
									{{ deposit.women_percent || 0 }}%
								</p>
							</div>

							<div
								class="flex items-center gap-2 w-full justify-between rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#3B8FF3] rounded-full"></div>
									<p class="text-sm text-[#615E83]">{{ $t('men') }}</p>
								</div>
								<p class="text-xl text-[#615E83]">
									{{ deposit.men_percent || 0 }}%
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Donut Chart -->
			<div class="bg-white h-full text-black p-6 rounded-lg shadow">
				<p class="text-sm text-gray-500">{{ $t('statistics') }}</p>
				<p class="font-medium text-black text-lg">
					{{ $t('deposit_by_business_type') }}
				</p>
				<div>
					<div class="flex items-center justify-between mt-4 -mb-4">
						<p class="text-gray-400">{{ $t('individualEntrepreneurs') }}</p>
						<p class="text-gray-400 text-xl">
							<!-- <span class="text-black">410</span>/740 -->
						</p>
					</div>
					<VChart
						:option="individualChart"
						class="!w-[450px] !h-[110px] z-50"
					/>
					<div class="flex items-center gap-2 -mt-8">
						<div
							class="flex items-center w-full justify-between gap-2 rounded-lg border-[#E5E5EF] border p-2"
						>
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#F29F67] rounded-full"></div>
								<p class="text-sm text-[#615E83]">{{ $t('women') }}</p>
							</div>
							<p class="text-xl text-[#615E83]">
								{{ deposit.individual_women_pct || 0 }}%
							</p>
						</div>

						<div
							class="flex items-center gap-2 w-full justify-between rounded-lg border-[#E5E5EF] border p-2"
						>
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#3B8FF3] rounded-full"></div>
								<p class="text-sm text-[#615E83]">{{ $t('men') }}</p>
							</div>
							<p class="text-xl text-[#615E83]">
								{{ deposit.individual_men_pct || 0 }}%
							</p>
						</div>
					</div>
				</div>

				<div>
					<div class="flex items-center justify-between mt-10 -mb-4">
						<p class="text-gray-400">{{ $t('legalEntities') }}</p>
						<p class="text-gray-400 text-xl">
							<!-- <span class="text-black">410</span>/740 -->
						</p>
					</div>
					<VChart :option="legalChart" class="!w-[450px] !h-[110px] z-50" />
					<div class="flex items-center gap-2 -mt-8">
						<div
							class="flex items-center w-full justify-between gap-2 rounded-lg border-[#E5E5EF] border p-2"
						>
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#F29F67] rounded-full"></div>
								<p class="text-sm text-[#615E83]">{{ $t('women') }}</p>
							</div>
							<p class="text-xl text-[#615E83]">
								{{ deposit.legal_women_pct || 0 }}%
							</p>
						</div>

						<div
							class="flex items-center gap-2 w-full justify-between rounded-lg border-[#E5E5EF] border p-2"
						>
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#3B8FF3] rounded-full"></div>
								<p class="text-sm text-[#615E83]">{{ $t('men') }}</p>
							</div>
							<p class="text-xl text-[#615E83]">
								{{ deposit.legal_men_pct || 0 }}%
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-col flex-1 h-full gap-4">
			<!-- Line Chart -->
			<div class="bg-white rounded-lg shadow">
				<div class="flex items-start p-6 pb-0 justify-between">
					<div>
						<p class="text-sm text-gray-500">{{ $t('statistics') }}</p>
						<p class="font-bold text-black text-lg border-[#E5E5EF]">
							{{ $t('deposit') }}
						</p>
					</div>
					<div class="flex items-center gap-2">
						<el-select
							clearable
							@change="setFilter"
							v-model="selectedRegion"
							:placeholder="$t('region')"
							size="small"
							style="width: 160px"
						>
							<el-option
								v-for="item in regions"
								:key="item.id"
								:label="item.full_name"
								:value="item.id"
							/>
						</el-select>
						<el-select
							clearable
							@change="setFilter"
							v-model="selectedBusiness"
								:placeholder="$t('size')"
							size="small"
							style="width: 160px"
						>
							<el-option
								v-for="item in microOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select>

						<el-select
							clearable
							@change="setFilter"
							v-model="selectedMonth"
							:placeholder="$t('month')"
							size="small"
							style="width: 160px"
						>
							<el-option
								v-for="item in months"
								:key="item.id"
								:label="item.name"
								:value="item.id"
							/>
						</el-select>
					</div>
				</div>
				<VChart :option="statsOption" class="!h-[400px] z-50" />
			</div>

			<div class="flex items-center gap-4 w-full">
				<!-- Micro / Small / Medium business -->
				<div class="flex items-center w-full gap-4">
					<div
						class="bg-white p-6 max-w-[335px] h-[310px] w-full rounded-lg shadow text-center"
					>
						<p class="text-left text-xl font-bold">{{ $t('microBusiness') }}</p>
						<div
							class="flex items-center mt-2 justify-between border-b border-[#E5E5EF]"
						>
							<p class="text-gray-400 text-sm">{{ $t('amount') }}</p>
							<p class="text-2xl font-bold mt-1">
								{{ formatNumber(deposit.micro_count) }}
							</p>
						</div>
						<VChart
							:option="
								gaugeOption(
									deposit.micro_men_pct ?? 0,
									deposit.micro_women_pct ?? 0,
									deposit.micro_sum_pct ?? 0,
									deposit.micro_women_sum ?? 0,
									deposit.micro_men_sum ?? 0
								)
							"
							class="!h-[300px]"
						/>
					</div>
					<div
						class="bg-white p-6 max-w-[335px] h-[310px] w-full rounded-lg shadow text-center"
					>
						<p class="text-left text-xl font-bold">{{ $t('smallBusiness') }}</p>
						<div
							class="flex items-center mt-2 justify-between border-b border-[#E5E5EF]"
						>
							<p class="text-gray-400 text-sm">{{ $t('amount') }}</p>
							<p class="text-2xl font-bold mt-1">
								{{ formatNumber(deposit.small_count) }}
							</p>
						</div>
						<VChart
							:option="
								gaugeOption(
									deposit.small_men_pct ?? 0,
									deposit.small_women_pct ?? 0,
									deposit.small_sum_pct ?? 0,
									deposit.small_women_sum ?? 0,
									deposit.small_men_sum ?? 0
								)
							"
							class="!h-[300px]"
						/>
					</div>
					<div
						class="bg-white p-6 max-w-[335px] h-[310px] w-full rounded-lg shadow text-center"
					>
						<p class="text-left text-xl font-bold">
							{{ $t('mediumBusiness') }}
						</p>
						<div
							class="flex items-center mt-2 justify-between border-b border-[#E5E5EF]"
						>
							<p class="text-gray-400 text-sm">{{ $t('amount') }}</p>
							<p class="text-2xl font-bold mt-1">
								{{ formatNumber(deposit.medium_count) }}
							</p>
						</div>
						<VChart
							:option="
								gaugeOption(
									deposit.medium_men_pct ?? 0,
									deposit.medium_women_pct ?? 0,
									deposit.medium_sum_pct ?? 0,
									deposit.medium_women_sum ?? 0,
									deposit.medium_men_sum ?? 0
								)
							"
							class="!h-[300px]"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import 'echarts'
const { t, locale } = useI18n()
const { generate } = useStackedChart()
const { formatNumber } = useFormatNumber()
const props = defineProps({
	months: {
		type: Array,
		default: () => [],
	},
})
const $axios = useAxios()
const deposit = ref([])
const depositGraph = ref([])
const selectedRegion = ref(null)
const regions = ref([])
const selectedMonth = ref(null)
const selectedBusiness = ref(null)
const microOptions = [
	{ value: 1, label: 'MICRO' },
	{ value: 2, label: 'SMALL' },
	{ value: 3, label: 'MEDIUM' },
]

onMounted(() => {
	getDeposit()
	getDepositGraph()
	getRegions()
})

function setFilter() {
	const params = {
		month: selectedMonth.value,
		region_id: selectedRegion.value,
		business_type: selectedBusiness.value,
	}

	getDeposit(params)
	getDepositGraph(params)
}

function getDeposit(params = {}) {
	$axios
		.get(`api/v1/wefi/dashboard/deposit?lang=${locale.value}`, { params })
		.then(res => {
			deposit.value = res.data.data
		})
		.catch(error => {
			console.error(error)
		})
}

function getDepositGraph(params = {}) {
	$axios
		.get(`api/v1/wefi/dashboard/deposite_graph?lang=${locale.value}`, {
			params,
		})
		.then(res => {
			depositGraph.value = res.data.data
		})
		.catch(error => {
			console.error(error)
		})
}

function getRegions() {
	$axios
		.get(`api/v1/resp/regions_lists?lang=${locale.value}`, {
			headers: {
				Authorization: 'Basic YXV0aF9hcGlfdXNlcjpGQVJFQ21uS3VXTDB4QW8',
			},
		})
		.then(res => {
			regions.value = res.data.data.region
		})
		.catch(error => {
			console.error(error)
		})
}

const statsOption = computed(() => {
	const filtered = Array.isArray(depositGraph.value)
		? depositGraph.value.filter(
				item => item?.months_name !== null && item?.months_name !== undefined
		  )
		: []

	const months = filtered.map(item => item.months_name ?? '')
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
						}: <span style="font-weight: bold;">${p.value.toLocaleString()} sum</span></span>
					</div>
				`
					})
					.join('')

				return `
			<div style="padding: 4px 6px; font-size: 13px;">
				<div style="font-weight: bold; margin-bottom: 8px;">Month: ${params[0].axisValue}</div>
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
			data: months,
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
			left: 60,
			right: 30,
			top: 60,
			bottom: 40,
		},
		series: [
			{
				name: t('women'),
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
				name: t('men'),
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

const gaugeOption = (menPct, womenPct, sumPct, womenSum, menSum) => {
	// нормализация
	menPct = Number(menPct) || 0
	womenPct = Number(womenPct) || 0
	sumPct = Number(sumPct)
	if (!isFinite(sumPct)) sumPct = 0
	sumPct = Math.max(0, Math.min(100, sumPct)) // clamp 0..100

	const totalShare = menPct + womenPct
	const filledAngle = (sumPct / 100) * 180 // сколько градусов заполнено из полукруга
	const menAngle = totalShare > 0 ? (menPct / totalShare) * filledAngle : 0
	const womenAngle = totalShare > 0 ? (womenPct / totalShare) * filledAngle : 0
	const remainderFilledAngle = Math.max(0, filledAngle - menAngle - womenAngle) // на случай погрешностей
	const fillerAngle = Math.max(0, 360 - filledAngle) // прозрачная нижняя половина

	// защитим от маленьких дробей (чтобы сумма = 360)
	const sumAngles = menAngle + womenAngle + remainderFilledAngle + fillerAngle
	const normalizeFactor = sumAngles > 0 ? 360 / sumAngles : 1

	const menVal = menAngle * normalizeFactor
	const womenVal = womenAngle * normalizeFactor
	const remVal = remainderFilledAngle * normalizeFactor
	const fillerVal = fillerAngle * normalizeFactor

	return {
		animationDuration: 1000,
		animationEasing: 'cubicOut',
		tooltip: {
			trigger: 'item',
			formatter: params => {
				if (!params || !params.name) return ''
				if (params.name === 'Filled remainder' || params.name === 'invisible')
					return ''
				const isMen = params.name === 'Men'
				const originalPct = isMen ? menPct : womenPct
				const sumAmount = isMen ? menSum : womenSum
				const color = isMen ? '#3B8FF3' : '#F29F67'

				return `
				 <div style="font-size:13px;line-height:1.6;color:#000;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color};"></span>
              <b>${params.name}</b>
            </div>
            <div style="display:flex;gap:6px;margin-bottom:4px;">
              <span>• ${t('percentage')}:</span>
              <span style="font-weight:bold;">${originalPct.toFixed(1)}%</span>
            </div>
            ${
							sumAmount != null
								? `<div style="display:flex;gap:6px;"><span>• ${t(
										'sum'
								  )}:</span><span style="font-weight:bold;">${Number(
										sumAmount
								  ).toLocaleString()}</span></div>`
								: ''
						}
          </div>
				`
			},
		},
		series: [
			// фон: серый полукруг (чтобы была видна пустая часть сверху)
			{
				type: 'pie',
				startAngle: 180,
				radius: ['72%', '88%'],
				center: ['50%', '62%'],
				hoverAnimation: false,
				silent: true,
				label: { show: false },
				data: [
					{ value: 180, itemStyle: { color: '#E5EAFC' } }, // верхняя половина фон
					{ value: 180, itemStyle: { color: 'transparent' } }, // нижняя прозрачная
				],
			},
			// foreground: men / women / remainderFilled / invisible bottom
			{
				type: 'pie',
				startAngle: 180,
				radius: ['72%', '88%'],
				center: ['50%', '62%'],
				avoidLabelOverlap: false,
				hoverAnimation: true,
				label: { show: false },
				stillShowZeroSum: false,
				data: [
					{
						value: menVal,
						name: t('men'),
						itemStyle: { color: '#3B8FF3' },
						sumAmount: menSum,
					},
					{
						value: womenVal,
						name: t('women'),
						itemStyle: { color: '#F29F67' },
						sumAmount: womenSum,
					},
					{
						value: remVal,
						name: 'Filled remainder',
						itemStyle: { color: '#E5EAFC' },
						tooltip: { show: false },
					},
					{
						value: fillerVal,
						name: 'invisible',
						itemStyle: { color: 'transparent' },
						tooltip: { show: false },
					},
				],
			},
		],
		graphic: [
			{
				type: 'text',
				left: '22%',
				top: '44%',
				style: {
					text: `${sumPct.toFixed(1)}%\n${t('totalParticipants')}`,
					textAlign: 'center',
					fill: '#111827',
					font: '600 18px "Arial"',
					lineHeight: 26,
				},
			},
		],
	}
}

// BUSINES SIZE CHART

const genderChart = computed(() =>
	generate({
		seriesData: [
			{
				name: t('women'),
				data: [
					{
						value: deposit.value.women_percent ?? 0,
						count: deposit.value.women_count ?? 0,
						sum: deposit.value.women_sum ?? 0,
						name: t('women'),
					},
				],
				style: { color: '#F29F67', borderRadius: [8, 0, 0, 8] },
			},
			{
				name: t('men'),
				data: [
					{
						value: deposit.value.men_percent ?? 0,
						count: deposit.value.men_count ?? 0,
						sum: deposit.value.men_sum ?? 0,
						name: t('men'),
					},
				],
				style: { color: '#3B8FF3' },
			},
		],
		barWidth: 40,
		addGraphic: false,
		hideYAxisLabels: true,
		fixedMonth: 'june'
	})
)

const individualChart = computed(() =>
	generate({
		seriesData: [
			{
				name: t('women'),
				data: [
					{
						value: deposit.value.individual_women_pct ?? 0,
						count: deposit.value.individual_women_count ?? 0,
						sum: deposit.value.individual_women_sum ?? 0,
						name: t('women'),
					},
				],
				style: { color: '#F29F67', borderRadius: [8, 0, 0, 8] },
			},
			{
				name: t('men'),
				data: [
					{
						value: deposit.value.individual_men_pct ?? 0,
						count: deposit.value.individual_men_count ?? 0,
						sum: deposit.value.individual_men_sum ?? 0,
						name: t('men'),
					},
				],
				style: { color: '#3B8FF3' },
			},
		],
		barWidth: 40,
		addGraphic: false,
		hideYAxisLabels: true,
		fixedMonth: 'june'
	})
)

const legalChart = computed(() =>
	generate({
		seriesData: [
			{
				name: t('women'),
				data: [
					{
						value: deposit.value.legal_women_pct ?? 0,
						count: deposit.value.legal_women_count ?? 0,
						sum: deposit.value.legal_women_sum ?? 0,
						name: t('women'),
					},
				],
				style: { color: '#F29F67', borderRadius: [8, 0, 0, 8] },
			},
			{
				name: t('men'),
				data: [
					{
						value: deposit.value.legal_men_pct ?? 0,
						count: deposit.value.legal_men_count ?? 0,
						sum: deposit.value.legal_men_sum ?? 0,
						name: t('men'),
					},
				],
				style: { color: '#3B8FF3' },
			},
		],
		barWidth: 40,
		addGraphic: false,
		hideYAxisLabels: true,
		fixedMonth: 'june'
	})
)
</script>

<style scoped>
.gradient-bar {
	background: linear-gradient(90deg, #018e20 0%, #007219 100%);
}
</style>
