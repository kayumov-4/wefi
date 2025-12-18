<script setup>
const route = useRoute()
const isDashboard = computed(() => route.path === '/dashboard')
</script>

<template>
	<div :class="['w-full', isDashboard ? 'bg-[#F4F7FA] min-h-screen' : '']">
		<Header class="absolute top-0 left-0 w-full z-30" />
		<NuxtPage />
	</div>
</template>