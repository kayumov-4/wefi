<template>
	<div class="bg-[#F4F7FA] my-32 py-16 flex flex-col items-center gap-10">
		<div class="text-center">
			<!-- <p class="text-xl text-gray-400">{{ $t('usefulLinks') }}</p> -->
			<p class="text-4xl font-bold mt-2">{{ $t('ourPartners') }}</p>
		</div>

		<div class="flex items-center justify-center gap-12">
			<!-- Partner 1 -->
			<div class="flex flex-col items-center">
				<img class="h-28" src="@/assets/icons/partner1.svg" alt="" />
			</div>

			<!-- Partner 2 -->
			<div class="flex flex-col items-center">
				<img
					class="h-28 object-contain"
					src="@/assets/icons/partner2.svg"
					alt=""
				/>
			</div>

			<!-- Partner 3 -->
			<div class="flex flex-col items-center">
				<img
					class="h-28 object-contain"
					src="@/assets/icons/partner4.png
        "
					alt=""
				/>
			</div>

			<!-- Partner 4 -->
			<div class="flex flex-col items-center">
				<img
					class="h-28 object-contain"
					src="@/assets/icons/parnter3.svg"
					alt=""
				/>
			</div>
		</div>
	</div>
</template>
