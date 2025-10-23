<template>
  <Card></Card>
  <a-button class="back-btn" v-show="showBackBtn" @click="goBack">返回</a-button>
  <div ref="chartContainer" class="chartContainer"></div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';
  import * as echarts from 'echarts';
  import Card from '@/views/jxcmanage/barData/Card.vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  // 引入获取下一层级数据的接口（需根据实际后端接口调整）
  import { getAllStyleCategory, getNextLevelData } from './BarData.api';

  const { hasPermission } = usePermission();

  // 图表相关引用
  const chartContainer = ref(null);
  const myChart = ref(null);
  const currentOption = ref(null); // 当前层级配置
  const optionStack = ref([]); // 存储历史层级配置
  // 响应式计算是否显示返回按钮（依赖optionStack的长度）
  const showBackBtn = computed(() => {
    return optionStack.value.length > 0;
  });

  // 生成图表配置的函数（保持不变，适配动态数据）
  const generateOption = (data, parentId) => {
    const optionId = parentId || 'style_category';
    return {
      id: optionId,
      xAxis: { type: 'category' },
      yAxis: { minInterval: 1 },
      animationDurationUpdate: 500,
      series: {
        type: 'bar',
        dimensions: ['x', 'y', 'groupId', 'childGroupId'], // 固定数据结构：名称、值、当前组ID、子组ID（用于下钻）
        encode: {
          x: 'x',
          y: 'y',
          tooltip: ['x', 'y'], // ✅ 新增这一行
          itemGroupId: 'groupId',
          itemChildGroupId: 'childGroupId',
        },
        data: data,
        universalTransition: { enabled: true, divideShape: 'clone' },
      },
      // 网格：确保图表填满容器（左右边距0，预留右侧滚动空间）
      grid: {
        borderColor: '#8a1212',
        left: '6%',
        right: '6%',
        bottom: '16%',
        top: '3%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'item',
        axisPointer: { type: 'shadow' },
        formatter: (params) => {
          const data = params.data;
          if (!data) return '';
          // 支持数组或对象两种数据格式
          const name = data.x ?? data[0];
          const value = data.y ?? data[1];
          return `<div style="padding:6px 8px"><b>${name}</b><br/>货品数量：${value}</div>`;
        },
      },
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          left: '8%',
          right: '8%',
          bottom: '3%',
          height: 60,
          handleStyle: {
            color: '#3b82f6',
            borderColor: '#93c5fd',
            width: 12,
            height: 14,
            borderRadius: 8,
          },
          selectedRegionStyle: { backgroundColor: '#dbeafe' },
          selectedDataBackground: {
            lineStyle: {
              color: 'rgba(235, 32, 32, 1)',
            },
          },
          dataBackground: {
            areaStyle: {
              shadowOffsetX: 12,
              shadowOffsetY: 5,
              opacity: 0.7,
            },
          },
          brushStyle: {
            color: 'rgba(15, 242, 49, 1)',
            borderColor: 'rgba(15, 79, 241, 1)',
          },
        },
        { type: 'inside', xAxisIndex: 0, zoomOnMouseWheel: true, moveOnMouseMove: true },
      ],
    };
  };

  // 动态加载下一层级数据
  const fetchNextLevel = async (childGroupId, level) => {
    console.log('childGroupId:', childGroupId);
    try {
      let p1 = hasPermission('jxc:manage:bar:zongcang');
      let p2 = hasPermission('jxc:manage:bar:zicang');
      // 调用后端接口，传入当前子组ID获取下一层数据
      // 接口返回格式应与generateOption的dimensions匹配：[[名称, 值, 当前组ID, 子组ID], ...]
      const res = await getNextLevelData({
        permission: p1 ? 'jxc:manage:bar:zongcang' : p2 ? 'jxc:manage:bar:zicang' : '',
        groupId: childGroupId,
        level: level,
      });

      // 验证接口返回数据格式
      if (!Array.isArray(res) || res.length === 0) {
        throw new Error('后端返回数据格式不正确');
      }
      return res;
    } catch (error) {
      console.error('获取下一层数据失败:', error.message);
      // 接口出错时返回null，保持当前层级
      return null;
    }
  };

  // 下钻逻辑（动态加载数据）
  const goForward = async (childGroupId, level) => {
    if (!childGroupId) return;

    // 加载下一层数据
    const nextLevelData = await fetchNextLevel(childGroupId, level);
    if (!nextLevelData) {
      // 数据加载失败，保持当前层级
      return;
    }

    // 生成下一层配置并切换
    const nextOption = generateOption(nextLevelData, childGroupId);
    optionStack.value.push(currentOption.value); // 保存当前配置到历史栈
    currentOption.value = nextOption;

    // 延迟更新图表，避免主进程冲突
    nextTick(() => {
      myChart.value.setOption(nextOption);
    });
  };

  // 返回上一层
  const goBack = () => {
    if (optionStack.value.length === 0) return;

    // 从历史栈中恢复上一层配置
    currentOption.value = optionStack.value.pop();
    nextTick(() => {
      myChart.value.setOption(currentOption.value);
    });
  };

  // 初始化根层级数据（从后端加载）
  const initRootData = async () => {
    try {
      let p1 = hasPermission('jxc:manage:bar:zongcang');
      let p2 = hasPermission('jxc:manage:bar:zicang');
      const res = await getAllStyleCategory({ permission: p1 ? 'jxc:manage:bar:zongcang' : p2 ? 'jxc:manage:bar:zicang' : '' });
      if (!Array.isArray(res) || res.length === 0) {
        throw new Error('根层级数据为空');
      }
      // 生成根层级配置
      const rootOption = generateOption(res, 'root');
      currentOption.value = rootOption;
      return rootOption;
    } catch (error) {
      console.error('初始化根数据失败:', error.message);
      // 根数据加载失败时显示默认空配置
      return generateOption([], 'root');
    }
  };

  // 初始化图表
  const initChart = async () => {
    if (!chartContainer.value) return;

    myChart.value = echarts.init(chartContainer.value);

    // 加载根层级数据并初始化图表
    const rootOption = await initRootData();
    myChart.value.setOption(rootOption);

    // 绑定点击事件（动态下钻）
    myChart.value.on('click', 'series', (params) => {
      const dataItem = params.data;
      console.log('点击数据项:', dataItem);
      // 只有存在子组ID时才触发下钻（dataItem[3]对应childGroupId）
      if (dataItem?.[3]) {
        goForward(dataItem[3], dataItem[4]);
      }
    });

    // 窗口resize监听
    window.addEventListener('resize', handleResize);
  };

  // 处理窗口大小变化
  const handleResize = () => {
    if (myChart.value) {
      myChart.value.resize();
    }
  };

  // 清理函数
  const cleanup = () => {
    if (myChart.value) {
      window.removeEventListener('resize', handleResize);
      myChart.value.dispose();
      myChart.value = null;
    }
  };

  // 生命周期钩子
  onMounted(() => {
    initChart();
  });

  onUnmounted(() => {
    cleanup();
  });

  nextTick(() => {
    test_permission();
  });
</script>

<style scoped>
  /* 美化返回按钮并设置左边距 */
  .back-btn {
    margin-left: 100px; /* 距离左边100px */
    font-size: 14px; /* 调整字体大小 */
    border-radius: 4px; /* 圆角边框 */
    background-color: #1890ff; /* 主色调背景（可根据主题调整） */
    color: #fff; /* 文字白色 */
    transition: all 0.2s; /* 过渡动画，提升交互感 */
  }

  /* 鼠标悬停效果 */
  .back-btn:hover {
    background-color: #096dd9; /* 加深背景色 */
    transform: translateY(-1px); /* 轻微上浮，增强反馈 */
  }

  .chartContainer {
    width: 100%;
    height: 700px;
    min-height: 400px;
  }
</style>
