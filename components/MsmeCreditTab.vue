<template>
	<div class="flex items-stretch gap-4">
		<div class="bg-white rounded-xl shadow p-8 w-[350px] h-fit space-y-6">
			<div class='flex items-center justify-between w-full'>
				<p class="font-bold text-2xl">{{ $t('filters') }}</p>
				<p class='text-sm'>{{ $t('filters_desc') }}</p>	
			</div>
			

			<!-- Period -->
			<div>
				<p class="text-sm font-medium text-[#013F21] mb-2">
					{{ $t('selectPeriod') }}
				</p>
				<el-select
				disabled
					clearable
					v-model="filtersStore.period"
					:placeholder="$t('year')"
					size="small"
				>
					<el-option
						v-for="item in yearOptions"
						:key="item"
						:label="item"
						:value="item"
					/>
				</el-select>
			</div>

			<!-- Business Type -->
			<div>
				<p class="text-sm font-medium text-[#013F21] mb-2">
					{{ $t('selectBusinessType') }}
				</p>
				<el-checkbox-group
					:model-value="filtersStore.businessTypes ?? allBusinessTypes"
					@change="onBusinessTypeChange"
					class="flex flex-col gap-1"
				>
					<el-checkbox :label="1">{{
						$t('individualEntrepreneurs')
					}}</el-checkbox>
					<el-checkbox :label="2">{{ $t('legalEntities') }}</el-checkbox>
				</el-checkbox-group>
			</div>

			<!-- Business Size -->
			<div>
				<p class="text-sm font-medium text-[#013F21] mb-2">
					{{ $t('selectBusinessSize') }}
				</p>
				<el-checkbox-group
					:model-value="filtersStore.businessSizes ?? allBusinessSizes"
					@change="onBusinessSizeChange"
					class="flex flex-col gap-1"
				>
					<el-checkbox :label="1">{{ $t('microBusiness') }}</el-checkbox>
					<el-checkbox :label="2">{{ $t('smallBusiness') }}</el-checkbox>
					<el-checkbox :label="3">{{ $t('mediumBusiness') }}</el-checkbox>
				</el-checkbox-group>
			</div>

			<!-- Sectors -->
			<div>
				<p class="text-sm font-medium text-[#013F21] mb-2">
					{{ $t('selectSector') }}
				</p>
				<el-radio-group
					:model-value="filtersStore.sector ?? 'all'"
					@change="onSectorChange"
					class="flex flex-col gap-1"
				>
					<el-radio label="all">{{ $t('allSectors') }}</el-radio>
					<el-radio :label="1">{{ $t('other') }}</el-radio>
					<el-radio :label="3">{{ $t('services') }}</el-radio>
					<el-radio :label="5">{{ $t('construction') }}</el-radio>
					<el-radio :label="4">{{ $t('manufacturing') }}</el-radio>
					<el-radio :label="6">{{ $t('agriculture') }}</el-radio>
				</el-radio-group>
			</div>

			<!-- Regions -->
			<div>
				<p class="text-sm font-medium text-[#013F21] mb-2">
					{{ $t('selectRegion') }}
				</p>
				<el-radio-group
					:model-value="filtersStore.region ?? 'all'"
					@change="onRegionChange"
					class="flex flex-col gap-1"
				>
					<el-radio label="all">{{ $t('allRegions') }}</el-radio>
					<el-radio
						v-for="region in regions"
						:key="region.id"
						:label="region.id"
					>
						{{ region.full_name }}
					</el-radio>
				</el-radio-group>
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<ValueIssuedBank />
			<NumberIssuedBank />
			<div id="bottom" class="bg-white p-6 rounded-lg shadow">
				<div
					class="border-b pb-2 border-[#E5E5EF] flex items-center justify-between"
				>
					<div>
						<p class="text-sm text-gray-500">{{ $t('statistics') }}</p>
						<p class="font-medium text-black text-lg">{{ $t('byNpl') }}</p>
					</div>
					<div class="flex items-end flex-col">
						<p class="text-sm text-gray-500">{{ $t('total') }}</p>
						<p class="font-bold text-left text-black text-xl">
							{{ npl?.total_percent || 0 }}%
						</p>
					</div>
				</div>

				<div class="flex items-center justify-between">
					<div>
						<div class="flex items-center justify-between mt-4 -mb-4">
							<p class="text-gray-400">{{ $t('micro') }}</p>
							<p class="font-bold text-xl mr-8">{{ npl?.micro_percent }}%</p>
						</div>
						<VChart :option="microChart" class="!w-[310px] !h-[110px] z-50" />
						<div class="flex items-center gap-2 -mt-8">
							<div
								class="flex items-center justify-between w-[135px] gap-2 rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#F29F67] rounded-full"></div>
									<p class="text-sm text-[#615E83]">{{ $t('women') }}</p>
								</div>
								<p class="text-sm text-[#615E83]">
									{{ npl?.micro_women_percent }} %
								</p>
							</div>

							<div
								class="flex items-center gap-2 w-[135px] justify-between rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#3B8FF3] rounded-full"></div>
									<p class="text-sm text-[#615E83]">{{ $t('men') }}</p>
								</div>
								<p class="text-sm text-[#615E83]">
									{{ npl?.micro_men_percent }} %
								</p>
							</div>
						</div>
					</div>

					<div>
						<div class="flex items-center justify-between mt-4 -mb-4">
							<p class="text-gray-400">{{ $t('small') }}</p>
							<p class="font-bold text-xl mr-8">{{ npl?.small_percent }}%</p>
						</div>
						<VChart :option="smallChart" class="!w-[310px] !h-[110px] z-50" />
						<div class="flex items-center gap-2 -mt-8">
							<div
								class="flex items-center w-[135px] justify-between gap-2 rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#F29F67] rounded-full"></div>
									<p class="text-sm text-[#615E83]">{{ $t('women') }}</p>
								</div>
								<p class="text-sm text-[#615E83]">
									{{ npl?.small_women_percent }} %
								</p>
							</div>

							<div
								class="flex items-center gap-2 w-[135px] justify-between rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#3B8FF3] rounded-full"></div>
									<p class="text-sm text-[#615E83]">{{ $t('men') }}</p>
								</div>
								<p class="text-sm text-[#615E83]">
									{{ npl?.small_men_percent }} %
								</p>
							</div>
						</div>
					</div>
					<div>
						<div class="flex items-center justify-between mt-4 -mb-4">
							<p class="text-gray-400">{{ $t('medium') }}</p>
							<p class="font-bold text-xl mr-8">{{ npl?.medium_percent }}%</p>
						</div>
						<VChart :option="mediumChart" class="!w-[310px] !h-[110px] z-50" />
						<div class="flex items-center gap-2 -mt-8">
							<div
								class="flex items-center w-[135px] justify-between gap-2 rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#F29F67] rounded-full"></div>
									<p class="text-sm text-[#615E83]">{{ $t('women') }}</p>
								</div>
								<p class="text-sm text-[#615E83]">
									{{ npl?.medium_women_percent }} %
								</p>
							</div>

							<div
								class="flex items-center gap-2 w-[135px] justify-between rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#3B8FF3] rounded-full"></div>
									<p class="text-sm text-[#615E83]">{{ $t('men') }}</p>
								</div>
								<p class="text-sm text-[#615E83]">
									{{ npl?.medium_men_percent }} %
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useFiltersStore } from '@/store/filterStore.js'
const { generate } = useStackedChart()
const { t, locale } = useI18n()
const filtersStore = useFiltersStore()
const $axios = useAxios()
const emit = defineEmits(['filterChanged'])
const props = defineProps({
	npl: {
		type: Object,
		default: () => [],
	},
})

const allBusinessTypes = [1, 2]
const allBusinessSizes = [1, 2, 3]

const onBusinessTypeChange = val => {
	filtersStore.setBusinessTypes(val)
}

const onBusinessSizeChange = val => {
	filtersStore.setBusinessSizes(val)
}

const onSectorChange = val => {
	filtersStore.setSector(val)
}

const onRegionChange = val => {
	filtersStore.setRegion(val)
}

const regions = ref([])

const currentYear = new Date().getFullYear()
const yearOptions = [currentYear]

// MOUNTED
onMounted(() => {
	getData()
})

function getData() {
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

// Total NPL sum
const microSum = props.npl?.micro_sum ?? 0
const smallSum = props.npl?.small_sum ?? 0
const mediumSum = props.npl?.medium_sum ?? 0
const totalNplSum = microSum + smallSum + mediumSum

const microChart = computed(() =>
	generate({
		totalsPercent: [props.npl?.micro_percent.toFixed(0) ?? 0],
		seriesData: [
			{
					name: t('women'),
				data: [
					{
						value: props.npl?.micro_women_percent ?? 0,
						sum: props.npl?.micro_women_sum ?? 0,
						name: t('micro'),
					},
				],
				style: { color: '#F29F67', borderRadius: [8, 0, 0, 8] },
			},
			{
					name: t('men'),
				data: [
					{
						value: props.npl?.micro_men_percent ?? 0,
						sum: props.npl?.micro_men_sum ?? 0,
						name: t('micro'),
					},
				],
				style: { color: '#3B8FF3' },
			},
		],
		barWidth: 40,
		addGraphic: false,
		hideYAxisLabels: true,
	})
)

const smallChart = computed(() =>
	generate({
		totalsPercent: [props.npl?.small_percent ?? 0],
		seriesData: [
			{
				name: t('women'),
				data: [
					{
						value: props.npl?.small_women_percent ?? 0,
						sum: props.npl?.small_women_sum ?? 0,
						name: t('small'),
					},
				],
				style: { color: '#F29F67', borderRadius: [8, 0, 0, 8] },
			},
			{
			name: t('men'),
				data: [
					{
						value: props.npl?.small_men_percent ?? 0,
						sum: props.npl?.small_men_sum ?? 0,
						name: t('small'),
					},
				],
				style: { color: '#3B8FF3' },
			},
		],
		barWidth: 40,
		addGraphic: false,
		hideYAxisLabels: true,
	})
)

const mediumChart = computed(() =>
	generate({
		totalsPercent: [props.npl?.small_percent ?? 0],
		seriesData: [
			{
				name: t('women'),
				data: [
					{
						value: props.npl?.medium_women_percent ?? 0,
						sum: props.npl?.medium_women_sum ?? 0,
						name: t('medium'),
					},
				],
				style: { color: '#F29F67', borderRadius: [8, 0, 0, 8] },
			},
			{
				name: t('men'),
				data: [
					{
						value: props.npl?.medium_men_percent ?? 0,
						sum: props.npl?.medium_men_sum ?? 0,
						name: t('medium'),
					},
				],
				style: { color: '#3B8FF3' },
			},
		],
		barWidth: 40,
		addGraphic: false,
		hideYAxisLabels: true,
	})
)
</script>
