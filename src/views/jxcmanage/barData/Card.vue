<template>
  <div class="container mx-auto px-4 py-4 max-w-6xl">
    <!-- 当日大盘：双卡片样式 -->
    <div class="mb-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <!-- 黄金卡片 -->
        <div
          class="bg-white rounded-lg shadow-sm p-4 border-l-4 border-amber-500 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center gap-1.5">
              <i class="fa fa-diamond text-amber-500 text-base"></i>
              <span class="text-base font-medium text-gray-700">黄金999</span>
            </div>
            <span class="text-[10px] px-1.5 py-0.5 bg-red-50 text-red-600 rounded-full">
              <Icon icon="ant-design:sync-outlined" @click="flushMarketPrice"></Icon>
            </span>
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-2xl font-bold text-gray-800">{{ marketPriceData.goldPrice }}</span>
            <span class="text-gray-500 text-sm">元/克</span>
          </div>
          <div class="mt-2 text-[12px] text-green-500">
            <span>更新时间：{{ currentTime }}</span>
          </div>
        </div>

        <!-- 白银卡片 -->
        <div class="bg-white rounded-lg shadow-sm p-4 border-l-4 border-[#74df0fff] hover:-translate-y-0.5 transition-all">
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center gap-1.5">
              <i class="fa fa-balance-scale text-gray-400 text-base"></i>
              <span class="text-base font-medium text-gray-700">白银</span>
            </div>
            <span class="text-[10px] px-1.5 py-0.5 bg-green-50 text-green-600 rounded-full">
              <Icon icon="ant-design:sync-outlined" @click="flushMarketPrice"></Icon>
            </span>
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-2xl font-bold text-gray-800">{{ marketPriceData.sliverPrice }}</span>
            <span class="text-gray-500 text-sm">元/克</span>
          </div>
          <div class="mt-2 text-[12px] text-green-500">
            <span>更新时间：{{ currentTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref, onMounted } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { getMarketPriceApi } from '../TBGoods.api';

  // 市场价格数据
  const marketPriceData = reactive({
    goldPrice: 859.9,
    sliverPrice: 10.34,
  });

  // 当前时间
  const currentTime = ref('');

  // 更新时间方法
  function updateTime() {
    const now = new Date();
    currentTime.value = now.toLocaleString('zh-CN', {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  // 刷新市场价格
  function flushMarketPrice() {
    getMarketPriceApi().then((res) => {
      marketPriceData.goldPrice = res.goldPrice;
      marketPriceData.sliverPrice = res.sliverPrice;
      updateTime(); // 刷新价格时同步更新时间
    });
  }

  // 组件挂载时初始化
  onMounted(() => {
    flushMarketPrice();
    updateTime();
    // 每60秒更新一次时间（可根据需求调整）
    setInterval(updateTime, 60000);
  });
</script>

<style scoped></style>
