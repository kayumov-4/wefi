import { useFiltersStore } from "@/store/filterStore.js";
import { useI18n } from "vue-i18n";

export function useStackedChart() {
  const { t, locale } = useI18n();

  function generate({
    seriesData,
    totalsPercent = [],
    addRemaining = true,
    addGraphic = true,
    barWidth = 20,
    hideYAxisLabels = false,
    fixedMonth = "july",
  }) {
    const categories = seriesData[0]?.data.map((d) => d.name) || [];
    const reversedTotals = [...totalsPercent];

    // словарь переводов
    const monthTranslations = {
      june: { ru: "Июнь", en: "June", la: "Iyun" },
      july: { ru: "Июль", en: "July", la: "Iyul" },
      august: { ru: "Август", en: "August", la: "Avgust" },
      september: { ru: "Сентябрь", en: "September", la: "Sentyabr" },
      october: { ru: "Октябрь", en: "October", la: "Oktyabr" },
      november: { ru: "Ноябрь", en: "November", la: "Noyabr" },
      december: { ru: "Декабрь", en: "December", la: "Dekabr" },
      january: { ru: "Январь", en: "January", la: "Yanvar" },
      february: { ru: "Февраль", en: "February", la: "Fevral" },
      march: { ru: "Март", en: "March", la: "Mart" },
      april: { ru: "Апрель", en: "April", la: "Aprel" },
      may: { ru: "Май", en: "May", la: "May" },
    };

    const monthKey = fixedMonth.toLowerCase();
    const translations = monthTranslations[monthKey] || monthTranslations.june;

    const percentByCategory = {};
    categories.forEach((cat, i) => {
      percentByCategory[cat] = reversedTotals[i];
    });

    const MIN_VISIBLE_PERCENT = 1.5;

    if (totalsPercent.length > 0) {
      seriesData.forEach((s) => {
        s.data = s.data.map((item, i) => {
          const totalPercent = reversedTotals[i] || 0;
          const scale = totalPercent / 100;

          const rawScaled = item.value * scale;
          let value = rawScaled;
          if (rawScaled > 0 && rawScaled < MIN_VISIBLE_PERCENT) {
            value = MIN_VISIBLE_PERCENT;
          }

          return {
            ...item,
            __original: item.value,
            value,
            __scaled: rawScaled,
          };
        });
      });
    }

    if (addRemaining) {
      const remaining = categories.map((_, i) => {
        const sum = seriesData.reduce(
          (acc, s) => acc + (s.data[i]?.value || 0),
          0
        );

        return {
          name: categories[i],
          value: Math.max(0, 100 - sum),
        };
      });

      seriesData.push({
        name: t("remaining"),
        data: remaining,
        style: {
          color: "rgba(0, 0, 0, 0.05)",
          borderRadius: [0, 8, 8, 0],
        },
        tooltip: false,
      });
    }

    const graphicTexts = addGraphic
      ? categories.map((cat, i) => ({
          type: "text",
          top: i * 47,
          style: {
            text: `${(percentByCategory[cat] || 0).toFixed(1)}%`,
            fill: "#013F21",
            font: "12px sans-serif",
            width: 40,
            overflow: "truncate",
          },
        }))
      : [];

    return {
      grid: {
        left: 10,
        top: 20,
        bottom: 20,
        containLabel: true,
      },
      tooltip: {
        trigger: "item",
        formatter: (params) => {
          const filtersStore = useFiltersStore();
          const color = params.color;
          const label = params.seriesName;
          const now = new Date();
          const yearValue = filtersStore.period || now.getFullYear();

          const currentLocale = locale.value == "en" ? "en" : "la";

          const formattedDate = `${translations[currentLocale]} ${yearValue}`;

          const value =
            typeof params.data?.__original === "number"
              ? params.data.__original
              : params.value;

          const extraFields = Object.entries(params.data || {})
            .filter(
              ([key]) =>
                !["value", "name", "__original", "__scaled"].includes(key)
            )
            .map(([key, val]) => {
              const formatted =
                typeof val === "number" ? val.toLocaleString() : val;

              const translatedKey =
                t(key) !== key ? t(key) : key[0].toUpperCase() + key.slice(1);

              return `
      <div style="margin-bottom: 2px;">
        • ${translatedKey}: <span style="font-weight: bold;">${formatted}</span>
      </div>
    `;
            })
            .join("");

          return `
      <div style="background: #fff; color: #111827; font-size: 13px;">
        <div style="font-size: 14px; font-weight: bold; margin-bottom: 10px;">
          ${formattedDate}
        </div>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
          <div style="width: 10px; height: 10px; background: ${color}; border-radius: 50%;"></div>
          <span style="font-weight: 600;">${label}</span>
        </div>
        <div style="margin-left: 18px;">
          <div style="margin-bottom: 4px;">
            • ${t(
              "percentage"
            )}: <span style="font-weight: bold;">${value.toFixed(1)}%</span>
          </div>
          ${extraFields}
        </div>
      </div>
    `;
        },
      },

      xAxis: {
        type: "value",
        show: false,
        max: 100,
      },
      yAxis: {
        type: "category",
        data: categories,
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: hideYAxisLabels
          ? { show: false }
          : {
              fontSize: 13,
              color: "#374151",
              fontWeight: 500,
            },
      },
      series: seriesData.map((s) => ({
        name: s.name,
        type: "bar",
        stack: "total",
        barWidth,
        tooltip: { show: s.tooltip !== false },
        itemStyle: {
          color: s.style?.color || "#000",
          borderRadius: s.style?.borderRadius || [0, 5, 5, 0],
        },
        data: s.data,
      })),
      graphic: addGraphic
        ? [
            {
              type: "group",
              left: "91%",
              top: 38,
              children: graphicTexts,
            },
          ]
        : [],
    };
  }

  return { generate };
}
