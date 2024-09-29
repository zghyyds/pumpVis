<template>
  <div class="app">
    <h1>pumphub数据分析</h1>
    <dv-decoration5 :dur="2" style="width:300px;height:40px;" />
    <div class="data">
      <div class="box">
        <!-- <dv-border-box1 ref="borderRef" > -->
        <!-- <p>用户模块</p> -->
        <Userpage/>
      <!-- </dv-border-box1> -->
      </div>
      <div class="map">
        <Map/>
      </div>
      <div class="box">
        <LoginPage/>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import EChartComponent from './components/echarts.vue'
import LoginPage from './page/loginpage.vue'
import Userpage from './page/userpage.vue'
import Map from "./page/map.vue"



</script>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  /* /* justify-content: center; */
  align-items: center;
  height: 100vh;
  width: 100vw;
}
.data {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}
.box {
  width: 25%;
  height: 100%;
}
.map{
  width: 50%;
  height: 100%;
}

</style>