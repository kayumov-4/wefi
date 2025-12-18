<template>
  <div class="flex items-stretch h-full gap-4">
    <!-- Total MSMEs -->
    <div class="flex flex-col min-h-full max-w-[456px] gap-4 w-full">
      <div class="bg-white p-6 rounded-lg shadow">
        <p class="text-sm text-gray-500">
          {{ $t("totalRegisteredMsmes") }}
        </p>
        <p class="text-3xl font-bold mt-2">
          {{ formatNumber(customers_total) }}
        </p>

        <div class="mt-8">
          <VChart
            :option="businessTypeChart"
            class="!w-[450px] !h-[30px] z-50"
          />
          <!-- <div class="w-full bg-gray-200 h-4 rounded mt-1">
						<div
							class="h-4 rounded gradient-bar"
							:style="`width: ${data?.women_percent || 0}%`"
						></div>
					</div> -->
          <p class="text-sm flex items-center gap-2 text-gray-400">
            <span class="text-3xl text-[#1E1B39] font-bold">
              {{ data?.women_percent || 0 }}%
            </span>
            {{ $t("womenOwnedMsmes") }}
          </p>
        </div>
      </div>

      <!-- Donut Chart -->
      <div class="bg-white h-full w-full text-black p-6 rounded-lg shadow">
        <p class="text-sm text-gray-500">{{ $t("statistics") }}</p>
        <p class="font-medium text-black text-lg">{{ $t("businessType") }}</p>
        <VChart :option="pieOption" class="!h-[320px] mx-auto !w-[370px]" />
        <div class="text-sm mt-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-[#3B8FF3] rounded-full"></div>
              <p class="text-sm text-[#615E83]">
                {{ $t("individualEntrepreneurs") }}
              </p>
            </div>
            <p class="text-xl font-bold">
              {{ formatNumber(data?.individual_count) || 0 }}
            </p>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-[#F29F67] rounded-full"></div>
              <p class="text-sm text-[#615E83]">{{ $t("legalEntities") }}</p>
            </div>
            <p class="text-xl font-bold">
              {{ formatNumber(data?.legal_count) || 0 }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col flex-1 h-full gap-4">
      <!-- Line Chart -->
      <div class="bg-white rounded-lg shadow">
        <div class="flex items-start p-6 pb-0 justify-end">
          <div class="flex items-center justify-between w-full">
            <p class="text-xl font-bold max-w-[300px]">
              {{ $t("msme_title") }}
            </p>
            <div class="flex items-center gap-2">
              <el-select
                clearable
                @change="setFilter"
                v-model="selectedRegion"
                :placeholder="$t('region')"
                size="small"
                style="width: 160px"
              >
                <el-option
                  v-for="item in regions"
                  :key="item.id"
                  :label="item.full_name"
                  :value="item.id"
                />
              </el-select>

              <el-select
                clearable
                @change="setFilter"
                v-model="selectedBusiness"
                :placeholder="$t('size')"
                size="small"
                style="width: 160px"
              >
                <el-option
                  v-for="item in microOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>

              <el-select
                clearable
                @change="setFilter"
                v-model="selectedYear"
                :placeholder="$t('year')"
                size="small"
                style="width: 160px"
              >
                <el-option
                  v-for="item in yearOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>
          </div>
        </div>
        <VChart
          v-if="lineData && lineData.length > 0"
          :option="lineOption"
          class="!h-[334px] !w-[1000px]"
        />
        <div
          v-else
          class="min-h-[334px] flex items-center justify-center text-[#615E83] text-sm"
        >
          {{ lineData === null ? "Loading..." : "No data" }}
        </div>
      </div>

      <div class="flex items-center gap-4 w-full">
        <div class="flex items-center w-full gap-4">
          <div
            class="bg-white p-6 max-w-[335px] h-[310px] w-full rounded-lg shadow text-center"
          >
            <p class="text-left text-xl font-bold">{{ $t("microBusiness") }}</p>
            <div
              class="flex items-center mt-2 justify-between border-b border-[#E5E5EF]"
            >
              <p class="text-gray-400 text-sm">{{ $t("count") }}</p>
              <p class="text-xl font-bold mt-1">
                {{ formatNumber(data.micro) }}
              </p>
            </div>
            <VChart
              :option="
                gaugeOption(
                  data.micro_men_percent ?? 0,
                  data.micro_women_percent ?? 0,
                  data.micro_percent ?? 0,
                  data.micro_women ?? 0,
                  data.micro_men ?? 0
                )
              "
              class="!h-[300px]"
            />
          </div>
          <div
            class="bg-white p-6 max-w-[335px] h-[310px] w-full rounded-lg shadow text-center"
          >
            <p class="text-left text-xl font-bold">{{ $t("smallBusiness") }}</p>
            <div
              class="flex items-center mt-2 justify-between border-b border-[#E5E5EF]"
            >
              <p class="text-gray-400 text-sm">{{ $t("count") }}</p>
              <p class="text-xl font-bold mt-1">
                {{ formatNumber(data.small) }}
              </p>
            </div>
            <VChart
              :option="
                gaugeOption(
                  data.small_men_percent ?? 0,
                  data.small_women_percent ?? 0,
                  data.small_percent ?? 0,
                  data.small_women ?? 0,
                  data.small_men ?? 0
                )
              "
              class="!h-[300px]"
            />
          </div>
          <div
            class="bg-white p-6 max-w-[335px] h-[310px] w-full rounded-lg shadow text-center"
          >
            <p class="text-left text-xl font-bold">
              {{ $t("mediumBusiness") }}
            </p>
            <div
              class="flex items-center mt-2 justify-between border-b border-[#E5E5EF]"
            >
              <p class="text-gray-400 text-sm">{{ $t("count") }}</p>
              <p class="text-xl font-bold mt-1">
                {{ formatNumber(data.medium) }}
              </p>
            </div>
            <VChart
              :option="
                gaugeOption(
                  data.medium_men_percent ?? 0,
                  data.medium_women_percent ?? 0,
                  data.medium_percent ?? 0,
                  data.medium_women ?? 0,
                  data.medium_men ?? 0
                )
              "
              class="!h-[300px]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "echarts";
const { formatNumber } = useFormatNumber();
const { t, locale } = useI18n();
const { generate } = useStackedChart();
// PROPS
const props = defineProps({
  customers: {
    type: Array,
    default: () => [],
  },
  orgMonthly: {
    type: Array,
    default: () => [],
  },
});

// MOUNTED
onMounted(() => {
  getData();
  getLineData();
  getRegions();
});

// DATA
const $axios = useAxios();
const emit = defineEmits(["filter-change"]);
const data = ref([]);
const lineData = ref(null);
const regions = ref([]);
const selectedRegion = ref(null);
const selectedYear = ref(null);
const selectedBusiness = ref(null);

const currentYear = new Date().getFullYear();
const yearOptions = Array.from(
  { length: currentYear - 2019 },
  (_, i) => 2020 + i
);
const microOptions = [
  { value: 1, label: "MICRO" },
  { value: 2, label: "SMALL" },
  { value: 3, label: "MEDIUM" },
];

const businessTypeChart = computed(() =>
  generate({
    seriesData: [
      {
        name: $t("women"),
        data: [
          {
            value: data.value?.women_percent ?? 0,
            count: data.value?.women_count ?? 0,
          },
        ],
        style: { color: "#F29F67", borderRadius: [8, 0, 0, 8] },
      },
      {
        name: $t("men"),
        data: [
          {
            value: data.value?.men_percent ?? 0,
            count: data.value?.men_count ?? 0,
          },
        ],
        style: { color: "#3B8FF3" },
      },
    ],
    addGraphic: false,
    hideYAxisLabels: true,
  })
);

// METHODS
function getRegions() {
  $axios
    .get(`api/v1/resp/regions_lists?lang=${locale.value}`, {
      headers: {
        Authorization: "Basic YXV0aF9hcGlfdXNlcjpGQVJFQ21uS3VXTDB4QW8",
      },
    })
    .then((res) => {
      regions.value = res.data.data.region;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getData(params = {}) {
  $axios
    .get(`api/v1/wefi/dashboard/customers?lang=${locale.value}`, { params })
    .then((res) => {
      data.value = res.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getLineData(params = {}) {
  $axios
    .get(`api/v1/wefi/dashboard/org_monthly?lang=${locale.value}`, { params })
    .then((res) => {
      lineData.value = res.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function setFilter() {
  getData({
    region_id: selectedRegion.value,
    year: selectedYear.value,
  });

  getLineData({
    year: selectedYear.value,
    region_id: selectedRegion.value,
    business_type: selectedBusiness.value,
  });
}

// COMPUTED
const customers_total = computed(() => {
  return data.value?.individual_count + data.value?.legal_count;
});
const pieOption = computed(() => ({
  color: ["#3B8FF3", "#F29F67"],
  title: {
    text: `{value|${formatNumber(
      (data.value?.individual_count ?? 0) + (data.value?.legal_count ?? 0)
    )}}\n{label|${t("total")}}`,
    left: "center",
    top: "center",
    textStyle: {
      rich: {
        value: {
          fontSize: 20,
          fontWeight: "bold",
          color: "#111827",
          align: "center",
        },
        label: {
          fontSize: 14,
          color: "#6B7280",
          align: "center",
        },
      },
    },
  },
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c}",
  },
  series: [
    {
      name: t("businessType"),
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: "outside",
        formatter: (params) => `${Math.round(params.percent)}%`,
        textStyle: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#111827",
        },
      },
      padAngle: 5,
      itemStyle: {
        borderRadius: 10,
      },
      labelLine: {
        show: true,
        smooth: 0.2,
      },
      data: [
        {
          value: data.value?.individual_count ?? 0,
          name: t("individualEntrepreneurs"),
        },
        {
          value: data.value?.legal_count ?? 0,
          name: t("legalEntities"),
        },
      ],
    },
  ],
}));

const lineOption = computed(() => {
  const months = lineData.value.map((item) => item.name);
  const values = lineData.value.map((item) => item.cc);

  return {
    tooltip: { trigger: "axis" },
    grid: {
      left: "3%",
      right: "6%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: months,
    },
    yAxis: {
      type: "value",
      position: "right",
      axisLabel: { formatter: "{value}" },
    },
    series: [
      {
        data: values,
        type: "line",
        smooth: true,
        lineStyle: { color: "#22c55e", width: 3 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#bbf7d0" },
              { offset: 1, color: "#ffffff" },
            ],
          },
        },
      },
    ],
  };
});

const gaugeOption = (menPct, womenPct, sumPct, womenSum, menSum) => {
  menPct = Number(menPct) || 0;
  womenPct = Number(womenPct) || 0;
  sumPct = Number(sumPct);
  if (!isFinite(sumPct)) sumPct = 0;
  sumPct = Math.max(0, Math.min(100, sumPct));

  const totalShare = menPct + womenPct;
  const filledAngle = (sumPct / 100) * 180;
  const menAngle = totalShare > 0 ? (menPct / totalShare) * filledAngle : 0;
  const womenAngle = totalShare > 0 ? (womenPct / totalShare) * filledAngle : 0;
  const remainderFilledAngle = Math.max(0, filledAngle - menAngle - womenAngle);
  const fillerAngle = Math.max(0, 360 - filledAngle);

  const sumAngles = menAngle + womenAngle + remainderFilledAngle + fillerAngle;
  const normalizeFactor = sumAngles > 0 ? 360 / sumAngles : 1;

  const menVal = menAngle * normalizeFactor;
  const womenVal = womenAngle * normalizeFactor;
  const remVal = remainderFilledAngle * normalizeFactor;
  const fillerVal = fillerAngle * normalizeFactor;

  return {
    animationDuration: 1000,
    animationEasing: "cubicOut",
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        if (!params || !params.name) return "";
        if (
          params.name === t("filledRemainder") ||
          params.name === t("invisible")
        )
          return "";

        const isMen = params.name === t("men");
        const originalPct = isMen ? menPct : womenPct;
        const sumAmount = isMen ? menSum : womenSum;
        const color = isMen ? "#3B8FF3" : "#F29F67";

        return `
          <div style="font-size:13px;line-height:1.6;color:#000;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color};"></span>
              <b>${params.name}</b>
            </div>
            <div style="display:flex;gap:6px;margin-bottom:4px;">
              <span>• ${t("percentage")}:</span>
              <span style="font-weight:bold;">${originalPct.toFixed(1)}%</span>
            </div>
            ${
              sumAmount != null
                ? `<div style="display:flex;gap:6px;"><span>• ${t(
                    "sum"
                  )}:</span><span style="font-weight:bold;">${Number(
                    sumAmount
                  ).toLocaleString()}</span></div>`
                : ""
            }
          </div>
        `;
      },
    },
    series: [
      {
        type: "pie",
        startAngle: 180,
        radius: ["72%", "88%"],
        center: ["50%", "62%"],
        hoverAnimation: false,
        silent: true,
        label: { show: false },
        data: [
          { value: 180, itemStyle: { color: "#E5EAFC" } },
          { value: 180, itemStyle: { color: "transparent" } },
        ],
      },
      {
        type: "pie",
        startAngle: 180,
        radius: ["72%", "88%"],
        center: ["50%", "62%"],
        avoidLabelOverlap: false,
        hoverAnimation: true,
        label: { show: false },
        stillShowZeroSum: false,
        data: [
          {
            value: menVal,
            name: t("men"),
            itemStyle: { color: "#3B8FF3" },
            sumAmount: menSum,
          },
          {
            value: womenVal,
            name: t("women"),
            itemStyle: { color: "#F29F67" },
            sumAmount: womenSum,
          },
          {
            value: remVal,
            name: t("filledRemainder"),
            itemStyle: { color: "#E5EAFC" },
            tooltip: { show: false },
          },
          {
            value: fillerVal,
            name: t("invisible"),
            itemStyle: { color: "transparent" },
            tooltip: { show: false },
          },
        ],
      },
    ],
    graphic: [
      {
        type: "text",
        left: "21%",
        top: "45%",
        style: {
          text: `${sumPct.toFixed(1)}%\n${t("totalParticipants")}`,
          textAlign: "center",
          fill: "#111827",
          font: '600 19px "Arial"',
          lineHeight: 26,
        },
      },
    ],
  };
};
</script>

<style scoped>
.gradient-bar {
  background: linear-gradient(90deg, #018e20 0%, #007219 100%);
}
</style>
