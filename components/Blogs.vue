<template>
	<div class="f-container mx-auto px-4">
		<div class="flex mb-16 items-center justify-between">
			<p class="text-4xl font-bold">
				{{ $t('storiesTitle') }}
			</p>
			<!-- Стрелки -->
			<div class="flex gap-3">
				<button
					class="swiper-button-prev-custom text-primary flex items-center justify-center !w-10 !h-10 hover:bg-primary/10 rounded-full transition-all"
				>
					<Icon name="mdi:chevron-left" class="!w-7 !h-7" />
				</button>
				<button
					class="swiper-button-next-custom text-primary flex items-center justify-center !w-10 !h-10 hover:bg-primary/10 rounded-full transition-all"
				>
					<Icon name="mdi:chevron-right" class="!w-7 !h-7" />
				</button>
			</div>
		</div>

		<Swiper
			:modules="[Navigation]"
			:space-between="30"
			:slides-per-view="3"
			:navigation="{
				nextEl: '.swiper-button-next-custom',
				prevEl: '.swiper-button-prev-custom',
			}"
		>
			<!-- Слайд 1 -->
			<SwiperSlide>
				<div class="flex flex-col gap-5 max-w-[450px] h-[455px] w-full">
					<iframe
						class="rounded-[10px] h-[250px] w-full"
						src="https://www.youtube.com/embed/jcR8RrL7FcE?si=uo8hMaiEal3ZIXi6&amp;start=1"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen
					/>
					<p class="text-lg font-bold">{{ $t('businesswomen') }}</p>
					<p class="flex items-center gap-2 text-sm">
						{{ $t('businesswomenDesc') }}
					</p>
					<div class="flex items-center mt-auto justify-between">
						<div class="flex items-center gap-2">
							<Icon name="mdi:eye-outline" class="w-5 h-5" />
							<p class="font-medium text-sm">{{ $t('viewed') }}</p>
						</div>
						<div class="flex items-center gap-2">
							<Icon name="mdi:heart-outline" class="w-5 h-5" />
							<p class="font-medium text-sm">{{ $t('liked') }}</p>
						</div>
					</div>
				</div>
			</SwiperSlide>

			<!-- Слайд 2 -->

			<SwiperSlide>
				<div class="flex flex-col gap-5 max-w-[450px] h-[450px] w-full">
					<iframe
						class="rounded-[10px] h-[250px] w-full"
						src="https://www.youtube.com/embed/Qq4h7yRjLo4?si=jJDRVZ7dJjCDDdl1"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen
					></iframe>
					<p class="text-lg font-bold">{{ $t('bank_support') }}</p>
					<p class="flex items-center gap-2 text-sm">
						{{ $t('bank_support_desc') }}
					</p>
					<div class="flex items-center mt-auto justify-between">
						<div class="flex items-center gap-2">
							<Icon name="mdi:eye-outline" class="w-5 h-5" />
							<p class="font-medium text-sm">{{ $t('viewed') }}</p>
						</div>
						<div class="flex items-center gap-2">
							<Icon name="mdi:heart-outline" class="w-5 h-5" />
							<p class="font-medium text-sm">{{ $t('liked') }}</p>
						</div>
					</div>
				</div>
			</SwiperSlide>

			<SwiperSlide>
				<div class="flex flex-col gap-5 max-w-[450px] h-[450px] w-full">
					<iframe
						class="rounded-[10px] h-[250px] w-full"
						src="https://www.youtube.com/embed/EOmYIXKx3NQ?si=VnoiD_qfmxmZ45ic"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen
					></iframe>
					<p class="text-lg font-bold">{{ $t('turning_trees') }}</p>
					<p class="flex items-center gap-2 text-sm">
						{{ $t('turning_trees_desc') }}
					</p>
					<div class="flex items-center mt-auto justify-between">
						<div class="flex items-center gap-2">
							<Icon name="mdi:eye-outline" class="w-5 h-5" />
							<p class="font-medium text-sm">{{ $t('viewed') }}</p>
						</div>
						<div class="flex items-center gap-2">
							<Icon name="mdi:heart-outline" class="w-5 h-5" />
							<p class="font-medium text-sm">{{ $t('liked') }}</p>
						</div>
					</div>
				</div>
			</SwiperSlide>

			<SwiperSlide>
				<div class="flex flex-col gap-5 max-w-[450px] h-[450px] w-full">
					<iframe
						class="rounded-[10px] h-[250px] w-full"
						src="https://www.youtube.com/embed/AVyBIPIulpo?si=0KfXsLOHZCmC6mIN&amp;start=1"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen
					/>
					<p class="text-lg font-bold">{{ $t('successStoryOne') }}</p>
					<p class="flex items-center gap-2 text-sm">
						{{ $t('successStoryOneDesc') }}
					</p>
					<div class="flex items-center mt-auto justify-between">
						<div class="flex items-center gap-2">
							<Icon name="mdi:eye-outline" class="w-5 h-5" />
							<p class="font-medium text-sm">{{ $t('viewed') }}</p>
						</div>
						<div class="flex items-center gap-2">
							<Icon name="mdi:heart-outline" class="w-5 h-5" />
							<p class="font-medium text-sm">{{ $t('liked') }}</p>
						</div>
					</div>
				</div>
			</SwiperSlide>

			<!-- Слайд 3 -->
			<SwiperSlide>
				<div class="flex flex-col gap-5 max-w-[450px] h-[450px] w-full">
					<iframe
						class="rounded-[10px] h-[250px] w-full"
						src="https://www.youtube.com/embed/3u_OHyuZ1AI?si=hYXYYpwljO_6vrLC&amp;start=1"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen
					/>
					<p class="text-lg font-bold">{{ $t('wsmeNewJobs') }}</p>
					<p class="flex items-center gap-2 text-sm">
						{{ $t('wsmeNewJobsDesc') }}
					</p>
					<div class="flex items-center mt-auto justify-between">
						<div class="flex items-center gap-2">
							<Icon name="mdi:eye-outline" class="w-5 h-5" />
							<p class="font-medium text-sm">{{ $t('viewed') }}</p>
						</div>
						<div class="flex items-center gap-2">
							<Icon name="mdi:heart-outline" class="w-5 h-5" />
							<p class="font-medium text-sm">{{ $t('liked') }}</p>
						</div>
					</div>
				</div>
			</SwiperSlide>
		</Swiper>
	</div>
</template>

<script setup>
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
</script>
