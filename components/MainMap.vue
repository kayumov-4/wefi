<template>
  <div class="f-container my-32 px-4 mx-auto">
    <p class="text-2xl font-bold mb-6 text-center">
      {{ $t("regionalOverview") }}
    </p>
    <div class="w-full justify-between flex items-start gap-16">
      <VChart :option="option" class="!w-[915px] !h-[600px]" />
      <div class="flex flex-col max-w-[400px] w-full gap-4">
        <div class="rounded-lg shadow-lg p-4">
          <div class="flex items-center justify-between">
            <p class="text-[#013F21] text-2xl">{{ $t("population") }}</p>
            <p class="text-primary font-bold text-xl">
              {{ formatNumber(37657647) }}
            </p>
          </div>
        </div>

        <div class="rounded-lg flex flex-col gap-2 shadow-lg p-4">
          <div
            class="flex items-center justify-between bg-[#EDF8EE] p-3 rounded-lg"
          >
            <div class="flex items-center gap-4">
              <img src="@/assets/icons/regions-num.svg" alt="" />
              <p class="font-bold text-sm">{{ $t("numberOfRegions") }}</p>
            </div>
            <p class="text-primary font-bold text-2xl">14</p>
          </div>

          <div
            class="flex items-center justify-between bg-[#EDF8EE] p-3 rounded-lg"
          >
            <div class="flex items-center gap-4">
              <img src="@/assets/icons/districts-num.svg" alt="" />
              <p class="font-bold text-sm">{{ $t("numberOfDistricts") }}</p>
            </div>
            <p class="text-primary font-bold text-2xl">208</p>
          </div>

          <div
            class="flex items-center justify-between bg-[#EDF8EE] p-3 rounded-lg"
          >
            <div class="flex items-center gap-4">
              <img src="@/assets/icons/communities-num.svg" alt="" />
              <p class="font-bold text-sm">{{ $t("numberOfCommunities") }}</p>
            </div>
            <p class="text-primary font-bold text-2xl">
              {{ formatNumber(9008) }}
            </p>
          </div>
        </div>

        <div class="p-4 rounded-lg shadow-lg flex flex-col gap-4">
          <p class="text-primary text-xl">MSME</p>
          <NuxtLink
            to="/dashboard?tab=first"
            class="flex items-center justify-between hover:bg-primary/5 p-2 rounded-lg transition-all"
          >
            <p>W MSME ({{ $t("number") }})</p>
            <p class="text-primary font-bold text-xl">
              {{ formatNumber(223318) }}
            </p>
          </NuxtLink>
          <NuxtLink
            to="/dashboard?tab=second"
            class="flex items-center justify-between hover:bg-primary/5 p-2 rounded-lg transition-all"
          >
            <p>{{ $t("credit") }} (trln {{ $t("uzs") }})</p>
            <p class="text-primary font-bold text-xl">65,6</p>
          </NuxtLink>
          <NuxtLink
            to="/dashboard?tab=third"
            class="flex items-center justify-between hover:bg-primary/5 p-2 rounded-lg transition-all"
          >
            <p>{{ $t("deposit") }} ({{ $t("number") }})</p>
            <p class="text-primary font-bold text-xl">
              {{ formatNumber(577281) }}
            </p>
          </NuxtLink>
          <NuxtLink
            to="/dashboard?tab=second&scroll=bottom"
            class="flex items-center justify-between hover:bg-primary/5 p-2 rounded-lg transition-all"
          >
            <p>NPL (%)</p>
            <p class="text-primary font-bold text-xl">6,3</p>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="w-full mt-4">
      <p class="text-sm text-gray-600 mb-2">{{ $t("enterprises") }}</p>
      <div class="relative w-full h-4 overflow-hidden bg-gray-200">
        <div
          class="absolute inset-0"
          style="
            background: linear-gradient(
              to right,
              #a90000 0%,
              #915006 10%,
              #ffbb00 30%,
              #35c20a 50%,
              #0dc900 70%,
              #009e0a 90%,
              #008029 100%
            );
          "
        ></div>
        <div class="absolute inset-0 flex justify-between">
          <span
            v-for="i in 11"
            :key="i"
            class="w-[1px] h-full bg-white opacity-60"
          ></span>
        </div>
      </div>
      <div class="flex justify-between text-xs text-gray-500 mt-1">
        <span v-for="i in 11" :key="i">{{ (i - 1) * 10 }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import uzGeo from "../assets/data/uzbekistan.json";
const { formatNumber } = useFormatNumber();
const { t, locale } = useI18n();
const props = defineProps({
  orgRegion: {
    type: Array,
    default: () => [],
  },
  msme: {
    type: Array,
    default: () => [],
  },
});

const option = ref({});
const currentDate = ref(new Date());

watch(
  () => props.orgRegion,
  (newVal) => {
    if (!option.value.series) return;

    option.value.series[0].data = newVal.map((region) => ({
      name: region.name,
      value: region.cc,
      msme: region.msme,
      area: region.area,
      mahalla: region.mahalla,
      percent: region.percent,
    }));
  },
  { immediate: true }
);

onMounted(() => {
  echarts.registerMap("uzbekistan", uzGeo);

  const regions = props.orgRegion.map((region) => ({
    name: region.name,
    value: region.cc,
  }));
  const monthTranslations = {
    january: { en: "January", la: "Yanvar" },
    february: { en: "February", la: "Fevral" },
    march: { en: "March", la: "Mart" },
    april: { en: "April", la: "Aprel" },
    may: { en: "May", la: "May" },
    june: { en: "June", la: "Iyun" },
    july: { en: "July", la: "Iyul" },
    august: { en: "August", la: "Avgust" },
    september: { en: "September", la: "Sentabr" },
    october: { en: "October", la: "Oktabr" },
    november: { en: "November", la: "Noyabr" },
    december: { en: "December", la: "Dekabr" },
  };

  option.value = {
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        const data = params.data || {};

        const date = new Date(currentDate.value);
        const year = date.getFullYear();

        const monthIndex = date.getMonth();
        const monthKeys = [
          "january",
          "february",
          "march",
          "april",
          "may",
          "june",
          "july",
          "august",
          "september",
          "october",
          "november",
          "december",
        ];

        const currentLocale = locale.value === "en" ? "en" : "la";

        const monthName =
          monthTranslations[monthKeys[monthIndex]][currentLocale];

        return `
			<div style="font-size:16px; line-height:1.4">
			<b>${data.name} ${t("region")} – ${monthName} ${year}</b><br/>
			<div style="margin: 10px 0;">
				${t("districts")} – ${(data.area ?? 0).toLocaleString()}<br/>
				${t("communities")} – ${(data.mahalla ?? 0).toLocaleString()}<br/>
				${t("msme")} – ${(data.msme ?? 0).toLocaleString()} ${t("enterprises")}
			</div>
			<div style="font-weight:bold; color:#000">
				${t("women_owned")} – ${(data.value ?? 0).toLocaleString()}
				${t("enterprises")} (${data.percent ?? 0}%)
			</div>
			</div>
		`;
      },
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "top",
      feature: {
        dataView: { readOnly: true },
        restore: {},
        saveAsImage: {},
      },
    },
    visualMap: {
      show: false,
      min: 0,
      max: 50000,
      text: [t("number_of_entrepreneurs_by_gods")],
      orient: "horizontal",
      left: 80,
      bottom: 20,
      calculable: true,
      inRange: {
        color: [
          "#A90000",
          "#915006",
          "#FFBB00",
          "#35C20A",
          "#0DC900",
          "#009E0A",
          "#008029",
        ],
      },
    },
    series: [
      {
        name: "Uzbekistan",
        type: "map",
        map: "uzbekistan",
        roam: false,
        emphasis: { label: { show: true } },
        data: regions,
      },
    ],
  };
});
</script>
