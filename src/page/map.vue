<template>
  <!-- <div> -->
    <div id="map" style="width: 100%; height: 100%" ref="chart"></div>
  <!-- </div> -->
</template>

<script setup>
import { onMounted,ref,onBeforeUnmount } from 'vue' // Vue 3 钩子函数
import * as echarts from 'echarts' // 引入 ECharts
import axios from 'axios' // 用来请求 GeoJSON 文件
import {geoCoordMap} from '../util/index'
import { statisticsIp } from "../api/index"

const chart = ref(null)
let echartInstance = null
const geoJson = ref()
const data_tmp = ref([])

// 在组件挂载时执行
onMounted(async () => {
  echartInstance = echarts.init(chart.value)
  // 窗口大小变化时，自动调整图表
  window.addEventListener('resize', resizeChart)
  await loadGeoJson() // 加载并注册 GeoJSON 数据
  getIplist()
})


onBeforeUnmount(() => {
  // 组件销毁前移除监听器
  window.removeEventListener('resize', resizeChart)
  if (echartInstance) {
    echartInstance.dispose()
  }
})

// 图表的响应式调整
function resizeChart() {
  if (echartInstance) {
    echartInstance.resize()
  }
}

// 加载并注册自定义地图
const loadGeoJson = async () => {
  try {
    const response = await axios.get('/custom.geo.json') // 加载 GeoJSON
    geoJson.value = response.data

    // 注册自定义地图
    echarts.registerMap('world', geoJson.value)

    // 初始化图表
    initChart()
  } catch (error) {
    console.error('加载 GeoJSON 数据失败:', error)
  }
}

const getIplist = async () =>{
  let res = await statisticsIp()
  console.log(res,'UUUU');
  data_tmp.value = res.map((v)=>{
    let data = {
      name:v.country,
      value:v.count
    }
    return data
  })
  initChart()
}


var convertData = function (data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}

// 初始化 ECharts 图表
const initChart = () => {
  var chart = echarts.init(document.getElementById('map'))

  var option = {
    backgroundColor: '#fff',
    title: {
      top: 10,
      text: 'ip地址统计',
      subtext: '',
      x: 'center',
      textStyle: {
        color: '#000'
      }
    },

    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        if (typeof params.value[2] == 'undefined') {
          return params.name + ' : ' + params.value
        } else {
          return params.name + ' : ' + params.value[2]
        }
      }
    },
    legend: {
      orient: 'vertical',
      y: 'bottom',
      x: 'right',
      data: ['流量'],
      textStyle: {
        color: '#fff'
      }
    },
    visualMap: {
      show: false,
      min: 0,
      max: 500,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: true,
      seriesIndex: [1],
      inRange: {}
    },
    geo: {
      map: 'world',
      zoom: 1,
      show: true,
      roam: true,
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#3a7fd5',
          borderColor: '#0a53e9', //线
          shadowColor: '#092f8f', //外发光
          shadowBlur: 20
        },
        emphasis: {
          areaColor: '#0a2dae' //悬浮区背景
        }
      }
    },
    series: [
      {
        symbolSize: 5,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: false //是否显示地名
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#fff'
          }
        },
        name: 'light',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: data_tmp.value
      },
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75, //长宽比
        showLegendSymbol: false, // 存在legend时显示
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false,
            textStyle: {
              color: '#fff'
            }
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#031525',
            borderColor: '#FFFFFF'
          },
          emphasis: {
            areaColor: '#2B91B7'
          }
        },
        animation: false,
        data: convertData(data_tmp.value)
      },
      {
        name: 'Top 5',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin',
        symbolSize: [50, 50],
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 9
            },
            formatter(value) {
              return value.data.value[2]
            }
          }
        },
        itemStyle: {
          normal: {
            color: '#dfae10' //标志颜色
          }
        },
        data: convertData(
          data_tmp.value
            .sort(function (a, b) {
              return b.value - a.value
            })
            .slice(0, 11)
        ), // 流量最大的前
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        zlevel: 1
      }
    ]
  }
  chart.setOption(option)
}
</script>

<style scoped>
/* 适配不同屏幕大小的地图样式 */
#map {
  width: 100%;
  height: 500px;
}
</style>