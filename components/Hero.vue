<template>
	<section class="relative h-screen w-full overflow-hidden">
		<div
			class="rellax absolute inset-0 h-full w-full z-0"
			data-rellax-speed="-5"
			:style="`
  will-change: transform; 
  background-image: url(${heroBg}); 
  width: 100%; 
  height: 100%; 
  background-size: cover; 
  background-repeat: no-repeat; 
  background-position: center;
`"
		></div>
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
			class="relative z-20 h-full flex items-center justify-center text-white px-4"
		>
			<div class="w-full max-w-[980px] text-left">
				<h1 class="text-7xl font-bold mb-6 leading-tight">
					{{ $t('womenEntrepreneursFinance') }}
				</h1>
				<p class="text-2xl max-w-[487px]">
					{{ $t('platformDescription') }}
				</p>
				<p class="text-2xl mt-6 max-w-[600px]">
					{{ $t('hero_desc') }}
				</p>
			</div>
		</div>
	</section>
</template>

<script setup>
import heroBg from '@/assets/images/hero-bg.jpg'
import Rellax from 'rellax'
import { onMounted } from 'vue'

onMounted(() => {
	new Rellax('.rellax')
})
</script>
