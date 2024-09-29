<template>
  <div class="login">
    <EChartComponent :options="chartOptions" width="100%" height="200px" />
    <EChartComponent :options="chartOption2" width="100%" height="300px" />
    <EChartComponent :options="chartOptions3" width="100%" height="300px" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { luckyPackagePopup, statisticlottery,statisticslogin } from '../api/index'
import EChartComponent from '../components/echarts.vue'
import * as echarts from 'echarts'
const title = ['关闭', '开启', '离开']
const title2 = ['登录前离开', '登录前分享', '进入登录首页']

const colorList = ['#4450BB', '#5F6CE6', '#58C9F7']
const dataList = ref([])
onMounted(() => {
  initData()
  getlottery()
  logindata()
})

const initData = async () => {
  let res = await luckyPackagePopup()
  console.log(res, 'iiiiiii')
  dataList.value = title.map((v, index) => {
    return {
      name: v,
      value: index == 0 ? res.close : index == 1 ? res.open : res.leave
    }
  })

  console.log(dataList.value)
  chartOptions.value.series[0].data = dataList.value
}

const logindata = async () => {
  let res = await statisticslogin()
  let {statistics} = res
  let list = []
  list = title2.map((v,index)=>{
    return {
      name:v,
      value:index ==0 ? statistics.login_leave : index ==1 ?statistics.login_share:statistics.login_start
    }
  })
  console.log(list,'list');
  chartOptions3.value.series[0].data =list
  chartOptions3.value.series[1].data =list
}

const getlottery = async () => {
  let res = await statisticlottery()
  console.log(res, '66666')
  let { star_draw, star_pay, ton_draw, ton_pay } = res
  chartOption2.value.series[1].data = [star_draw, star_pay, ton_draw, ton_pay]
  chartOption2.value.series[0].data = [star_draw, star_pay, ton_draw, ton_pay]
}

const chartOptions = ref({
  backgroundColor: '#fff',
  tooltip: {
    trigger: 'item'
  },
  title: {
      text: 'lucky弹窗',

      top: '45%',
      left: 'center',
      textStyle: {
         color: '#222',
         fontSize: 15,
         fontWeight: 400
      },
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

const chartOption2 = ref({
  tooltip: {
    trigger: 'axis',
    formatter: '{a1}<br/>{b1}：{c1}'
  },
  legend: {
    data: ['抽奖事件']
  },
  xAxis: {
    data: ['star_draw', 'star_pay', 'ton_draw', 'ton_pay']
  },
  color: ['#ccc', 'red'],
  yAxis: {
    axisLabel: {
      formatter: '{value}'
    }
  },
  title: {
      text: "单位:次",
      top: 20,
      left: 0,
      textStyle: {
         color: "#000",
         fontSize: 14
      },
   },
  series: [
    // 流光效果
    {
      name: '',
      type: 'bar',
      barGap: '-100%',
      // 这里不要超出实际数据
      data: [],
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
      name: '抽奖事件',
      type: 'bar',
      // 充当背景
      z: '-1',
      // 真实数据
      data: [],
      itemStyle: {
        color: '#2f88e7'
      }
    }
  ]
})

const chartOptions3 = ref({
  tooltip: {
    trigger: 'axis',
    formatter: '{a1}<br/>{b1}：{c1}'
  },
  legend: {
    data: ['登录信息']
  },
  xAxis: {
    data: ['登录前离开', '登录前分享', '进入登录首页']
  },
  color: ['#ccc', 'red'],
  yAxis: {
    axisLabel: {
      formatter: '{value}'
    }
  },
  title: {
      text: "单位:次",
      top: 20,
      left: 0,
      textStyle: {
         color: "#000",
         fontSize: 14
      },
   },
  series: [
    // 流光效果
    {
      name: '',
      type: 'bar',
      barGap: '-100%',
      // 这里不要超出实际数据
      data: [],
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
      name: '登录信息',
      type: 'bar',
      // 充当背景
      z: '-1',
      // 真实数据
      data: [],
      itemStyle: {
        color: '#2f88e7'
      }
    }
  ]
})

</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>