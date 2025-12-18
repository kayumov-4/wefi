<template>
	<Hero />
	<MainStats :data="data.msme" />
	<MainMap id='overview' :orgRegion="data.org_region" :msme="data.msme" />
	<GenderStats  id='gender' />
	<MainForm />
	<Blogs id='blog' />
	<Questionary id='faq' />
	<Partners />
	<Footer />
</template>

<script setup>
const $axios = useAxios()
const {locale} = useI18n()
const data = ref([]) 

onMounted(() => {
	$axios.get(`/api/v1/wefi/dashboard/`).then(res => {
		data.value = res.data.data
	})
})
</script>
