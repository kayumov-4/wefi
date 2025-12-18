<template>
	<div class="f-container mx-auto my-56 px-4">
		<div>
			<p class="text-6xl font-bold mb-16 text-center">{{ $t('about_us') }}</p>
			<p class="text-xl text-center w-full">
				{{ $t('about_description') }}
			</p>
		</div>

		<div>
			<img
				src="@/assets/images/about-hero.jpg"
				class="w-full h-full my-32"
				alt=""
			/>
		</div>

		<div class="flex justify-center gap-28">
			<p class="text-5xl font-bold max-w-[450px] w-full">
				{{ $t('mission_title') }}
			</p>
			<div class="flex flex-col gap-6 max-w-[500px] w-full text-xl">
				<p>{{ $t('mission_short') }}</p>
				<p>{{ $t('mission_long') }}</p>
			</div>
		</div>
	</div>
	<div class="bg-[#F4F7FA]">
		<div class="w-full f-container p-14 mx-auto">
			<p class="text-4xl font-bold text-center mb-16">
				{{ $t('team_title') }}
			</p>

			<div class="flex flex-wrap justify-center gap-9 items-stretch">
				<div
					class="max-w-[676px] w-full p-4 rounded-3xl bg-white shadow-lg flex items-center gap-6"
				>
					<img
						src="@/assets/images/suhrob.png"
						class="h-[278px] w-[278px] rounded-xl"
						alt=""
					/>
					<div class="flex flex-col h-[278px]">
						<div class="flex flex-col gap-4">
							<p class="text-2xl font-bold">{{ $t('eshmatov_name') }}</p>
							<p class="text-[15px]">{{ $t('eshmatov_desc') }}</p>
						</div>
						<a
							class="flex items-center gap-2 mt-auto"
							href="mailto:sukhrobjon.eshmatov@cbu.uz"
						>
							<img src="@/assets/icons/email.svg" alt="" />
							sukhrobjon.eshmatov@cbu.uz
						</a>
					</div>
				</div>

				<div
					class="max-w-[676px] w-full p-4 rounded-3xl bg-white shadow-lg flex items-center gap-6"
				>
					<img
						src="@/assets/images/sobir.png"
						class="h-[278px] w-[278px] rounded-xl"
						alt=""
					/>
					<div class="flex flex-col h-[278px]">
						<div class="flex flex-col gap-4">
							<p class="text-2xl font-bold">{{ $t('sobir_name') }}</p>
							<p class="text-[15px]">{{ $t('sobir_desc') }}</p>
						</div>
						<a
							class="flex items-center gap-2 mt-auto"
							href="mailto:s.esanov@cbu.uz"
						>
							<img src="@/assets/icons/email.svg" alt="" />
							s.esanov@cbu.uz
						</a>
					</div>
				</div>

				<div
					class="max-w-[676px] w-full p-4 rounded-3xl bg-white shadow-lg flex items-center gap-6"
				>
					<img
						src="@/assets/images/zayn.png"
						class="h-[278px] min-w-[278px] rounded-xl object-cover"
						alt=""
					/>

					<div class="flex flex-col h-[278px]">
						<div class="flex flex-col gap-4">
							<p class="text-2xl font-bold">{{ $t('zayn_name') }}</p>
							<p class="text-[15px]">{{ $t('zayn_desc') }}</p>
						</div>

						<a
							class="flex items-center gap-2 mt-auto"
							href="mailto:zy.isakovich18@gmail.com"
						>
							<img src="@/assets/icons/email.svg" alt="" />
							zy.isakovich18@gmail.com
						</a>
					</div>
				</div>

				<div
					class="max-w-[676px] w-full p-4 rounded-3xl bg-white shadow-lg flex items-center gap-6"
				>
					<img
						src="@/assets/images/jasur.png"
						class="h-[278px] w-[278px] rounded-xl"
						alt=""
					/>
					<div class="flex flex-col h-[278px]">
						<p class="text-2xl font-bold mb-5">{{ $t('jasur_name') }}</p>
						<p class="text-[15px]">{{ $t('jasur_desc') }}</p>
						<a
							class="flex items-center gap-2 mt-auto"
							href="mailto:j.raxmatullayev@cbu.uz"
						>
							<img src="@/assets/icons/email.svg" alt="" />
							j.raxmatullayev@cbu.uz
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="my-20 py-16 flex flex-col items-center gap-10">
		<div class="text-center">
			<p class="text-xl text-gray-400">{{ $t('useful_links') }}</p>
			<p class="text-4xl font-bold mt-2">{{ $t('our_partners') }}</p>
		</div>

		<div class="flex items-center justify-center gap-12">
			<!-- Partner 1 -->
			<div class="flex flex-col items-center">
				<img class="h-16" src="@/assets/icons/partner1.svg" alt="" />
			</div>

			<!-- Partner 2 -->
			<div class="flex flex-col items-center">
				<img
					class="h-16 object-contain"
					src="@/assets/icons/partner2.svg"
					alt=""
				/>
			</div>

			<!-- Partner 3 -->
			<div class="flex flex-col items-center">
				<img
					class="h-16 object-contain"
					src="@/assets/icons/partner4.png
        "
					alt=""
				/>
			</div>

			<!-- Partner 4 -->
			<div class="flex flex-col items-center">
				<img
					class="h-16 object-contain"
					src="@/assets/icons/parnter3.svg"
					alt=""
				/>
			</div>
		</div>
	</div>

	<div
		class="relative w-full h-[635px] flex flex-col items-center justify-center text-center p-6"
	>
		<img
			src="@/assets/images/partner-bg.png"
			class="absolute inset-0 w-full h-full object-cover"
			alt=""
		/>

		<div class="relative flex flex-col items-center z-10 w-full text-white">
			<p class="text-[#68D585] text-xl font-bold uppercase">
				{{ $t('main_partner') }}
			</p>
			<p class="text-3xl max-w-[1080px] w-full text-center mt-4">
				{{ $t('main_partner_text') }}
			</p>
		</div>

		<img
			src="@/assets/icons/rs-logo.svg"
			class="relative z-10 mt-20 w-[175px] h-[115px]"
			alt="RealSoft Logo"
		/>
	</div>
	<Footer />
</template>

<script setup></script>
