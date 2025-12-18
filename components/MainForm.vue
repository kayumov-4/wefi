<template>
	<div class="relative py-32 my-32">
		<img
			class="absolute top-0 left-0 w-full h-full object-cover z-10"
			src="@/assets/images/form-bg.png"
			alt="Background"
		/>

		<div
			class="relative z-20 max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-40"
		>
			<div class="flex flex-col gap-4 max-w-xl">
				<div
					class="bg-white/20 p-7 rounded-full w-fit flex items-center justify-center"
				>
					<img src="@/assets/icons/message.svg" alt="icon" />
				</div>
				<p class="text-white font-medium text-4xl leading-snug">
					{{ $t('letsConnect') }}
				</p>
				<p class="text-gray-300 text-xl">
					{{ $t('suggestionsText') }}
				</p>
			</div>

			<el-form
				data-aos="fade-up"
				class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
				label-position="top"
				:model="form"
			>
				<el-form-item :label="$t('formName')">
					<el-input
						v-model="form.name"
						:placeholder="$t('formNamePlaceholder')"
					/>
				</el-form-item>

				<el-form-item :label="$t('formEmail')">
					<el-input
						v-model="form.email"
						:placeholder="$t('formEmailPlaceholder')"
					/>
				</el-form-item>

				<el-form-item :label="$t('formPhone')">
					<el-input
						v-model="form.phone"
						:placeholder="$t('formPhonePlaceholder')"
					/>
				</el-form-item>

				<el-form-item :label="$t('formInquiry')">
					<el-input
						type="textarea"
						:rows="3"
						v-model="form.message"
						:placeholder="$t('formMessagePlaceholder')"
					/>
				</el-form-item>

				<el-form-item>
					<button class="w-full text-white py-4 rounded-lg bg-primary text-lg">
						{{ $t('contactUs') }}
					</button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script setup>
const form = ref({
	name: '',
	email: '',
	phone: '',
	message: '',
})
</script>
