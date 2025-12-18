<template>
	<div class="">
		<p class="text-4xl font-bold text-center mt-42 mb-16">
			{{ $t('questionsAnswers') }}
		</p>
		<div class="max-w-[1074px] w-full mx-auto mb-32">
			<el-collapse accordion>
				<el-collapse-item name="1">
					<template #title>
						<span class="text-xl font-medium">{{
							$t('whatIsWeFinanceCodePlatform')
						}}</span>
					</template>
					<div class="text-lg">
						{{ $t('whatIsWeFinanceCodePlatformDesc') }}
					</div>
				</el-collapse-item>

				<el-collapse-item name="2">
					<template #title>
						<span class="text-xl font-medium">{{
							$t('whoCanUseThePlatform')
						}}</span>
					</template>
					<div class="text-lg">
						{{ $t('whoCanUseThePlatformDesc') }}
					</div>
				</el-collapse-item>

				<el-collapse-item name="3">
					<template #title>
						<span class="text-xl font-medium">{{
							$t('howIsTheDataOnThePlatformUpdated')
						}}</span>
					</template>
					<div class="text-lg">
						{{ $t('howIsTheDataOnThePlatformUpdatedDesc') }}
					</div>
				</el-collapse-item>

				<el-collapse-item name="4">
					<template #title>
						<span class="text-xl font-medium">{{
							$t('howCanIParticipateInTheWeFinanceCodeInitiative')
						}}</span>
					</template>
					<div class="text-lg">
						{{ $t('howCanIParticipateInTheWeFinanceCodeInitiativeDesc') }}
					</div>
				</el-collapse-item>

				<el-collapse-item name="5">
					<template #title>
						<span class="text-xl font-medium">{{
							$t('howCanIUseThePlatformToImproveMyBusiness')
						}}</span>
					</template>
					<div class="text-lg">
						{{ $t('howCanIUseThePlatformToImproveMyBusinessDesc') }}
					</div>
				</el-collapse-item>

				<el-collapse-item name="6">
					<template #title>
						<span class="text-xl font-medium">{{
							$t('howCanISubmitSuggestionsOrProvideFeedbackAboutThePlatform')
						}}</span>
					</template>
					<div class="text-lg">
						{{
							$t(
								'howCanISubmitSuggestionsOrProvideFeedbackAboutThePlatformDesc'
							)
						}}
					</div>
				</el-collapse-item>
			</el-collapse>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
