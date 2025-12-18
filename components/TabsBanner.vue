<template>
	<section class="relative h-[430px] w-full">
		<transition name="fade" mode="out-in">
			<img
				:key="bannerImage"
				:src="bannerImage"
				alt="Banner"
				class="absolute inset-0 h-full w-full object-cover z-0 transition-opacity duration-500"
			/>
		</transition>

		<div
			class="absolute inset-0 z-10 pointer-events-none"
			style="
				background: linear-gradient(
					270deg,
					rgba(0, 0, 0, 0.0001) 0%,
					#000 99.9%
				);
				background-blend-mode: multiply;
			"
		></div>

		<div
			class="relative f-container mx-auto z-20 h-full flex flex-col items-start justify-center text-white px-4"
		>
			<div class="max-w-[800px] w-full">
				<p class="text-white text-4xl mb-10">Dashboard</p>
			</div>
		</div>
	</section>
	<div
		class="relative f-container mx-auto z-20 h-full -mt-40 pb-10 w-full px-4 max-w-full"
	>
		<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
			<el-tab-pane :label="$t('marketSizeAndShare')" name="first" lazy>
				<MarketTab @filter-change="onFilterChange" :customers='data.customers' />
			</el-tab-pane>

			<el-tab-pane :label="$t('msmeCredit')" name="second" lazy>
				<MsmeCreditTab
					:creditDebit="data.credit_debit"
					:npl="data.npl"
					:creditLoan="data.credit_loan"
					:outstandingLoan="data.outstanding_loans"
					:loanGraph="data.loan_graph"
					:outstandingGraphSum="data.outstanding_graph_sum"
					:countGraph="data.count_graph"
					:outstandingGraphCount="data.outstanding_graph_count"
				/>
			</el-tab-pane>

			<el-tab-pane :label="$t('msmeDeposit')" name="third" lazy>
				<MsmeDepositTab :months="data.months" />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
import banner1 from '@/assets/images/banner1.png'
import banner2 from '@/assets/images/banner2.png'
import banner3 from '@/assets/images/banner3.png'
const route = useRoute()
const $axios = useAxios()

const data = ref({})
const activeName = ref('first')

// Загружаем кеш и параллельно обновляем
onMounted(async () => {
	data.value = await useDashboardData($axios, updated => {
		data.value = updated
	})

	// Чтение tab-параметра из URL
	const tabParam = route.query.tab
	if (tabParam === 'first' || tabParam === 'second' || tabParam === 'third') {
		activeName.value = tabParam
	}
})

const bannerImage = computed(() => {
	switch (activeName.value) {
		case 'second':
			return banner2
		case 'third':
			return banner3
		default:
			return banner1
	}
})

function onFilterChange({ year, region, business_type }) {
	const params = {}
	if (year) params.year = year
	if (region) params.region = region
	if (business_type) params.business_type = business_type

	$axios.get('/api/v1/wefi/dashboard/', { params }).then(res => {
		data.value = res.data.data
	})
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0.2;
}
</style>
