<template>
	<div class="w-full">
		<div class="f-container p-4 mx-auto flex items-center justify-between">
			<a href="/" class="font-bold text-2xl max-w-80" :class="textColor">
				{{ $t('title') }}
			</a>

			<nav v-if="!isAbout">
				<ul class="flex items-center gap-5" :class="navTextColor">
					<li class="text-3xl font-bold">
						<a href="#overview">{{ $t('overview') }}</a>
					</li>
					<!-- <li class="text-sm font-bold">
						<NuxtLink :to="localePath('about')">{{ $t('about') }}</NuxtLink>
					</li> -->
					<li class="text-3xl font-bold">
						<a href="#blog">{{ $t('blog') }}</a>
					</li>
					<!-- <li class="text-sm font-bold">
						<a href="#faq">{{ $t('faq') }}</a>
					</li> -->
				</ul>
			</nav>

			<div class="flex items-center gap-4">
				<div ref="root" class="relative">
					<button
						@click="toggle"
						:class="buttonClasses"
						aria-haspopup="listbox"
						:aria-expanded="open"
					>
						{{ currentLocaleName }}
						<svg
							class="w-4 h-4"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>

					<transition name="fade">
						<div
							v-show="open"
							@click.stop
							:class="dropdownClasses"
							role="listbox"
						>
							<ul>
								<li
									v-for="l in locales"
									:key="l.code"
									@click="changeLocale(l.code)"
									:class="[
										'px-3 py-2 cursor-pointer rounded-lg text-sm select-none',
										itemHoverClass,
									]"
								>
									{{ l.name }}
								</li>
							</ul>
						</div>
					</transition>
				</div>

				<!-- Dashboard / Main (через localePath) -->
				<NuxtLink
					v-if="!isDashboard"
					:to="localePath('/dashboard')"
					class="bg-primary text-white max-w-[150px] w-full text-center rounded-lg text-lg py-2 px-3"
				>
					Dashboard
				</NuxtLink>

				<NuxtLink
					v-else
					:to="localePath('index')"
					class="bg-primary text-white text-center rounded-lg max-w-[150px] w-full text-lg py-2 px-3"
				>
					Main
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup>
const route = useRoute()
const localePath = useLocalePath()

const isAbout = computed(() =>
	Boolean(route.name && String(route.name).toLowerCase().includes('about'))
)
const isDashboard = computed(() =>
	Boolean(route.name && String(route.name).toLowerCase().includes('dashboard'))
)

const textColor = computed(() =>
	isAbout.value ? '!text-black' : '!text-white'
)
const navTextColor = computed(() =>
	isAbout.value ? 'text-black' : 'text-white'
)

// i18n
const { locale, setLocale } = useI18n()

const open = ref(false)
const root = ref(null)

const locales = [
	{ code: 'en', name: 'EN' },
	{ code: 'la', name: 'UZ' },
]

const currentLocaleName = computed(
	() => locales.find(l => l.code === locale.value)?.name || 'Lang'
)

// adaptive classes
const buttonClasses = computed(() =>
	[
		'px-3 py-1.5 rounded-xl backdrop-blur-md border text-sm flex items-center gap-2',
		isAbout.value
			? 'bg-white/80 border-black/10 text-black'
			: 'bg-white/15 border-white/20 text-white',
	].join(' ')
)

const dropdownClasses = computed(() =>
	[
		'absolute mt-2 min-w-[64px] rounded-xl backdrop-blur-md border shadow-lg z-50 overflow-hidden',
		isAbout.value
			? 'bg-white/95 border-black/10 text-black'
			: 'bg-white/8 border-white/20 text-white',
	].join(' ')
)

const itemHoverClass = computed(() =>
	isAbout.value ? 'hover:bg-black/5' : 'hover:bg-white/20'
)

function toggle() {
	open.value = !open.value
}

function changeLocale(code) {
	setLocale(code)
	open.value = false
}

// click outside & Esc
function onClickOutside(e) {
	if (!root.value) return
	if (!root.value.contains(e.target)) open.value = false
}
function onKeydown(e) {
	if (e.key === 'Escape') open.value = false
}

onMounted(() => {
	document.addEventListener('click', onClickOutside)
	document.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
	document.removeEventListener('click', onClickOutside)
	document.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateY(-6px);
}
</style>
