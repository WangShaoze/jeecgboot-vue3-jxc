<template>
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <!-- 当日大盘：双卡片样式 -->
    <div class="mb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- 黄金卡片 -->
        <div
          class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-amber-500 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <i class="fa fa-diamond text-amber-500 text-xl"></i>
              <span class="text-lg font-medium text-gray-700">黄金999</span>
            </div>
            <span class="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-full">
              <Icon icon="ant-design:sync-outlined" @click="flushMarketPrice"></Icon>
            </span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-bold text-gray-800">{{ marketPriceData.goldPrice }}</span>
            <span class="text-gray-500">元/克</span>
          </div>
          <div class="mt-3 text-xs text-gray-500">
            <span>更新时间：{{ currentTime }}</span>
          </div>
        </div>

        <!-- 白银卡片 -->
        <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-[#74df0fff] hover:-translate-y-1">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <i class="fa fa-balance-scale text-gray-400 text-xl"></i>
              <span class="text-lg font-medium text-gray-700">白银</span>
            </div>
            <span class="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">
              <Icon icon="ant-design:sync-outlined" @click="flushMarketPrice"></Icon>
            </span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-bold text-gray-800">{{ marketPriceData.sliverPrice }}</span>
            <span class="text-gray-500">元/克</span>
          </div>
          <div class="mt-3 text-xs text-gray-500">
            <span>更新时间：{{ currentTime }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-[#ffffffff] hover:shadow-lg">
      <div ref="chartRef" class="chart-container rounded-lg border border-gray-100" style="width: 100%; height: 500px"></div>
    </div>

    <div class="scroll-indicator flex items-center justify-center gap-4 mt-3">
      <a-button type="primary" preIcon="ant-design:sync-outlined" @click="flushBarData"> 刷新 </a-button>
      <button class="data-desc-btn" @click="dataDescBtnCallback"> <Icon icon="gg:loadbar-doc"></Icon>&nbsp;&nbsp;数据说明 </button>
      <span class="text-sm text-secondary italic"> <i class="fa fa-hand-o-right mr-1"></i>提示：拖动横坐标可查看更多数据，或使用滚轮缩放 </span>
    </div>
  </div>

  <!-- 数据说明 -->
  <div v-if="showUsingDesc" class="bg-white rounded-xl shadow-sm p-5 text-sm text-gray-600 mb-4">
    <h3 class="font-semibold text-gray-700 mb-3 flex items-center"><i class="fa fa-info-circle mr-2 text-primary"></i>数据说明 </h3>
    <p class="mb-2">本图表展示了超过<span class="text-red-500 font-bold text-lg">30</span>个项目的数值对比，当数据点较多时，可通过以下方式操作： </p>
    <ul class="list-disc pl-5 space-y-1">
      <li>按住鼠标左键在横坐标上左右拖动，切换查看范围</li>
      <li>使用鼠标滚轮在图表区域缩放，聚焦特定数据</li>
      <li>点击底部缩放条两端按钮，快速切换数据区间</li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted, onUnmounted, watchEffect, computed, nextTick /*defineComponent*/ } from 'vue';
  import { Icon } from '/@/components/Icon';
  import * as echarts from 'echarts'; // 确保已安装 echarts 依赖
  import { usePermission } from '/@/hooks/web/usePermission';

  const { hasPermission } = usePermission();
  import { getBarDataApi, getMarketPriceApi } from './TBGoods.api';

  const marketPriceData = reactive({
    goldPrice: 859.9,
    sliverPrice: 10.34,
  });

  function flushMarketPrice() {
    getMarketPriceApi().then((res) => {
      marketPriceData.goldPrice = res.goldPrice;
      marketPriceData.sliverPrice = res.sliverPrice;
    });
  }

  // 1. 数据说明折叠控制
  const showUsingDesc = ref(false);
  // 2. 当前时间（实时更新）
  const currentTime = computed(() => {
    return new Date().toLocaleTimeString('zh-CN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  });
  // 3. 图表容器引用
  const chartRef = ref(null);
  // 4. 图表实例
  let myChart = null;

  // 数据说明按钮回调
  function dataDescBtnCallback() {
    showUsingDesc.value = !showUsingDesc.value;
  }

  // 刷新表格数据
  function flushBarData() {
    barDataController();
  }

  // // 生成模拟数据（30个数据点，确保数据正常）
  // const generateData = () => {
  //   const categories = [];
  //   const valuesA = []; // 数量数据（范围 50-200）
  //   const valuesB = []; // 成本数据（范围 100-400）
  //   for (let i = 1; i <= 130; i++) {
  //     categories.push(`项目 ${i}`);
  //     valuesA.push(Math.floor(Math.random() * 150) + 50);
  //     valuesB.push(Math.floor(Math.random() * 300) + 100);
  //   }
  //   return { categories, valuesA, valuesB };
  // };
  //
  // const { categories, valuesA, valuesB } = generateData();

  // 图表数据
  const barData = reactive({
    title: '款式数量及成本',
    legend: {
      show: true,
      type: 'scroll',
      right: 20,
      top: 10,
      bottom: 20,
    },
    toolTip: {
      trigger: 'axis',
      // 鼠标悬停时显示：项目名 + 数量（带单位） + 成本（带货币符号）
      formatter: function (params) {
        // 获取项目名称（如“项目1”）
        const projectName = params[0].axisValue;
        // 初始化结果（加粗显示项目名）
        let tooltipHtml = `<div style="color: #333; font-weight: 600; margin-bottom: 4px;">${projectName}</div>`;

        // 遍历两个系列（数量、成本）
        params.forEach((item) => {
          let valueStr, unit;
          if (item.seriesName === '数量') {
            // 数量：整数显示，单位“个”
            valueStr = Math.round(item.value).toString();
            unit = '件';
          } else {
            // 成本：保留2位小数，添加“¥”符号
            valueStr = item.value.toFixed(2);
            unit = '元';
          }
          // 拼接一行（系列名 + 数值 + 单位）
          tooltipHtml += `<div style="margin: 2px 0;">${item.seriesName}：${unit === '元' ? '￥' : ''}${valueStr} ${unit}</div>`;
        });

        return tooltipHtml;
      },
    },
    xAxisData: [],
    yAxisData: [
      {
        type: 'value',
        name: '数量',
        axisLine: { lineStyle: { color: '#5070DD' } }, // 与“数量”系列颜色一致
        splitLine: { lineStyle: { color: '#f8fafc' } },
      },
      {
        type: 'value',
        name: '成本',
        axisLine: { lineStyle: { color: '#B6D634' } }, // 与“成本”系列颜色一致
        splitLine: { show: false }, // 隐藏成本轴的网格线，避免重复
        position: 'right', // 右侧显示
      },
    ],
    seriesData: [
      {
        name: '数量',
        type: 'bar',
        data: [],
        yAxisIndex: 0, // 绑定左侧Y轴
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#5070DD',
            },
            { offset: 1, color: '#5070DD' },
          ]),
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: '35%',
        barCategoryGap: '40%',
      },
      {
        name: '成本',
        type: 'bar',
        data: [],
        yAxisIndex: 1, // 绑定右侧Y轴
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#B6D634',
            },
            { offset: 1, color: '#B6D634' },
          ]),
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: '35%', // 与第一个系列保持一致
        barCategoryGap: '40%', // 与第一个系列保持一致
      },
    ],
  });

  // 初始化图表（核心逻辑：用 nextTick 确保DOM完全挂载）
  const initChart = async () => {
    try {
      // 等待DOM完全挂载（解决 onMounted 可能的延迟问题）
      await nextTick();
      await barDataController();
      barDataByPermission();
      if (!chartRef.value) {
        console.error('图表容器不存在！');
        return;
      }

      // 销毁旧实例，避免重复渲染
      if (myChart) {
        myChart.dispose();
        myChart = null;
      }

      // 初始化ECharts实例（打印日志：确认初始化执行）
      myChart = echarts.init(chartRef.value);

      // ECharts配置项（简化冗余，确保语法正确）
      const option = {
        title: {
          text: barData.title,
          left: 'center',
          textStyle: { fontSize: 16, color: '#333' },
          top: 6,
        },
        tooltip: barData.toolTip,
        // 网格：确保图表填满容器（左右边距0，预留右侧滚动空间）
        grid: {
          borderColor: '#8a1212',
          left: '3%',
          right: 20,
          bottom: '15%',
          top: '12%',
          containLabel: true,
        },
        legend: barData.legend,
        xAxis: {
          type: 'category',
          data: barData.xAxisData,
          axisLabel: { interval: 0, rotate: 45, fontSize: 10, color: '#64748b' },
          axisLine: { lineStyle: { color: '#e2e8f0' } },
          axisTick: {
            interval: 6,
            alignWithLabel: true,
          },
        },
        yAxis: barData.yAxisData,
        series: barData.seriesData,
        // 数据缩放：确保横向滚动正常
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            left: '2%',
            right: '12%',
            bottom: '5%',
            height: 30,
            handleStyle: {
              color: '#3b82f6',
              borderColor: '#93c5fd',
              width: 12,
              height: 16,
              borderRadius: 8,
            },
            selectedRegionStyle: { backgroundColor: '#dbeafe' },
          },
          { type: 'inside', xAxisIndex: 0, zoomOnMouseWheel: true, moveOnMouseMove: true },
        ],
      };

      // 设置配置项并渲染（打印日志：确认配置项应用）
      myChart.setOption(option);
      console.log('ECharts渲染完成');
    } catch (error) {
      // 捕获异常：方便定位问题
      console.error('图表初始化失败：', error);
    }
  };

  // 窗口 resize 处理
  const handleResize = () => {
    if (myChart) {
      myChart.resize();
      console.log('图表已自适应窗口大小');
    }
  };

  async function barDataController() {
    await getBarDataApi({
      hasIncludeCostPermission: hasPermission('jxc:manage:include_cost'),
    }).then((res) => {
      barData.xAxisData = res['xaxisData'];
      for (let i = 0; i < barData.seriesData.length; i++) {
        if (barData.seriesData[i].name === '成本') {
          barData.seriesData[i].data = res['goodsCostList'];
        } else if (barData.seriesData[i].name === '数量') {
          barData.seriesData[i].data = res['goodsCountList'];
        }
      }
    });
  }

  function barDataByPermission() {
    if (!hasPermission('jxc:manage:include_cost')) {
      // 不能显示和成本有关系数据
      barData.title = '款式数量';
      barData.legend.show = false;
      barData.yAxisData = barData.yAxisData.filter((item) => {
        return item.name === '数量';
      });
      barData.seriesData = barData.seriesData.filter((item) => {
        return item.name === '数量';
      });
      barData.toolTip = {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        textStyle: { color: '#333' },
        formatter: (params) => `${params[0].name}: ${params[0].value} 件`,
      };
    }
  }

  // 组件挂载：用nextTick确保DOM完全就绪
  onMounted(() => {
    console.log('组件已挂载，准备初始化图表');
    flushMarketPrice();
    initChart(); // 执行初始化
    window.addEventListener('resize', handleResize);
    // 定时更新时间（每秒刷新）
    const timer = setInterval(() => currentTime.value, 1000);
    // 组件卸载时清理定时器
    onUnmounted(() => clearInterval(timer));
  });

  // 组件卸载：清理ECharts实例和事件
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    if (myChart) {
      myChart.dispose();
      myChart = null;
      console.log('ECharts实例已销毁');
    }
  });

  // 监听容器变化：确保图表尺寸实时适配
  watchEffect(() => {
    if (myChart && chartRef.value) {
      myChart.resize();
    }
  });
</script>

<style scoped>
  /* 图表容器：强化样式，确保尺寸生效（即使内联样式失效也有备份） */
  .chart-container {
    width: 100% !important;
    height: 600px !important;
    min-width: 300px; /* 最小宽度，避免小屏挤压 */
  }

  /* 数据说明按钮：原生按钮样式，匹配整体风格 */
  .data-desc-btn {
    background-color: #f1a65d;
    color: #321965;
    border: none;
    font-size: 15px;
    padding: 4px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .data-desc-btn:hover {
    background-color: #f1f5f9; /*  hover效果，提升交互感 */
  }

  /* 交互提示：适配原生按钮，调整间距 */
  .scroll-indicator {
    @apply text-sm text-secondary flex flex-wrap items-center justify-center mt-3 gap-2;
  }

  /* Tailwind工具类 */
  @layer utilities {
    .content-auto {
      content-visibility: auto;
    }
  }
</style>
