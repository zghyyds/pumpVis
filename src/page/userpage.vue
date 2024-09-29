<template>
  <div class="user">
    <!-- <div class="user_top"> -->
      <EChartComponent :options="chartOptions2" width="100%" height="200px" />
      <EChartComponent :options="chartOptions3" width="100%" height="200px" />
    <!-- </div> -->
    <EChartComponent :options="chartOptions" width="100%" height="400px" />
  </div>
</template>


<script setup>
import { reactive, ref, onMounted } from 'vue'
import { statisticsUser } from '../api/index'
import EChartComponent from '../components/echarts.vue'
import { statisticslogin, deviceStatistics, statisticsPage } from '../api/index'
import * as echarts from 'echarts' // 引入 ECharts
const config = reactive({
  header: ['设备信息', ' IP地址'],
  data: [],
  index: true,
  columnWidth: [50],
  align: ['center']
})

const tableData = ref([])
const clickList = ref([])
onMounted(() => {
  initData()
  deviceList()
  clickdata()
})

const initData = async () => {
  let res = await statisticsUser()
  tableData.value = res
  res.forEach((v) => {
    let list = [v.device_info, v.offline_address]
    config.data.push(list)
  })
}

const deviceList = async () => {
  let res = await deviceStatistics()
  console.log(res, '0909')
  let datalist = []
  res.forEach((v) => {
    let data = {
      name: '',
      value: null
    }
    if (v.DeviceType === 'Mac') {
      data.name = 'Mac'
      data.value = v.Count
    }
    if (v.DeviceType === 'Windows') {
      data.name = 'Windows'
      data.value = v.Count
    }
    if (v.DeviceType === 'Android') {
      data.name = 'Android'
      data.value = v.Count
    }
    if (v.DeviceType === 'IOS') {
      data.name = 'IOS'
      data.value = v.Count
    }
    datalist.push(data)
  })
  console.log(datalist)
  chartOptions2.value.series[0].data = datalist
}

const clickdata = async () => {
  let res = await statisticsPage()
  let { banner_coin_click, newest_coin_click, lucky_package_click, start_newcoin_click, normal_coin_click, create_newcoin_click, search_input } = res
  clickList.value.push(banner_coin_click, newest_coin_click, lucky_package_click, start_newcoin_click, normal_coin_click, create_newcoin_click, search_input)
  console.log(clickList.value, '%%%$$$$')
}

const chartOptions2 = ref({
  backgroundColor: '#fff',
  tooltip: {
    trigger: 'item'
  },
  title: {
    text: '设备信息',

    top: '45%',
    left: 'center',
    textStyle: {
      color: '#222',
      fontSize: 15,
      fontWeight: 400
    }
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      padAngle: 10,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      data: []
    }
  ]
})

const chartOptions3 = ref({
  backgroundColor: '#fff',
  tooltip: {
    trigger: 'item'
  },
  title: {
    text: '网络信息',

    top: '45%',
    left: 'center',
    textStyle: {
      color: '#222',
      fontSize: 15,
      fontWeight: 400
    }
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      padAngle: 10,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      data: [
        { value: 1048, name: '4g' },
        { value: 735, name: 'wifi' },
        { value: 580, name: '5g' }
      ]
    }
  ]
})
// let myDate = ['profile_click', 'newest_coin_click', 'lucky_package_click', 'start_newcoin_click', 'normal_coin_click', 'create_newcoin_click', 'search_input'];

const chartOptions = ref({
  tooltip: {
    trigger: 'axis',
    formatter: '{a1}<br/>{b1}：{c1}'
  },
  legend: {
    data: ['首页信息']
  },
  xAxis: {
    data: ['点击Profile', '点击NewestCoin', '点击luckyPackage', '点击start Newcoin', '点击普通Coin', '创建Newcoin', '用户查找'],
    axisLabel: {
      interval: 0,
      rotate: 40
    }
  },
  color: ['#ccc', 'red'],
  yAxis: {
    axisLabel: {
      formatter: '{value}'
    }
  },
  title: {
    text: '单位:次',
    top: 20,
    left: 0,
    textStyle: {
      color: '#000',
      fontSize: 14
    }
  },
  series: [
    // 流光效果
    {
      name: '',
      type: 'bar',
      barGap: '-100%',
      // 这里不要超出实际数据
      data: clickList.value,
      itemStyle: {
        // 颜色渐变
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#b1cae640'
          },
          {
            offset: 1,
            color: '#2f88e778'
          }
        ])
      }
    },
    // 背景，要显示的数据
    {
      name: '首页信息',
      type: 'bar',
      // 充当背景
      z: '-1',
      // 真实数据
      data: clickList.value,
      itemStyle: {
        color: '#2f88e7'
      }
    }
  ]
})
</script>


<style lang="scss" scoped>
.user {
  height: 100%;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .user_top {
    display: flex;
    width: 100%;
    height: 50%;
  }
}
</style>