<template>
  <div class="home">
    <c-header></c-header>
    <div class="content">

      <transition name="slide-left" mode="out-in">
        <router-view></router-view>
      </transition>

      <!--<el-row>-->
      <!--<el-col :span="4">-->
      <!--<c-sidebar></c-sidebar>-->
      <!--</el-col>-->
      <!--<el-col :span="20" class="main-view">-->
      <!--</el-col>-->
      <!--</el-row>-->

    </div>
    <!--<vue-audio file="../assets/warning.mp3" :autoPlay="autoPlay"></vue-audio>-->
    <!--<audio-player :sources="audioSources" :loop="loop" :autoplay="true"></audio-player>-->
    <audio :src="audioSource" controls="controls" autoplay="autoplay" loop="" style="display: none;"></audio>
  </div>
</template>

<script>
  import Vue from 'vue'
  import CHeader from '../components/Header'
  import CSidebar from '../components/Sidebar'
  import store from '../store'
  import config from '../utils/config'
  import SockJS from 'sockjs-client'
  import Stomp from 'stompjs'
  //  import VueAudio from 'vue-audio'
  //  import VueHowler from 'vue-howler'
  //  import AudioPlayer from '../components/AudioPlayer'

  let mp3 = require('file-loader!../assets/warning.mp3')

  export default {
    name: 'home',
    components: {
      CHeader,
      CSidebar
    },
    data () {
      return {
        clientHeight: document.body.clientHeight,
        audioSource: '',
        loop: true
      }
    },
    mounted () {

      const that = this
      window.onresize = () => {
        return (() => {
          that.clientHeight = document.body.clientHeight
          store.dispatch('setClientHeight', that.clientHeight)
        })()
      }

      // 实时监控地震的发生
      let stompClient = null;
      let socket = new SockJS(config.server + '/earthquake-monitor-websocket');
      stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/earlyWarning', function (greeting) {
          // 存储数据
          window.localStorage.setItem('earlyWarningIntensity', greeting.body)
          // 路由跳转
          that.$router.push({name: 'earlyWarningIntensity'})
          Vue.nextTick(function () {
            // 显示地震预警烈度图
            that.$store.dispatch('setRealTimeEarlyWarning', greeting.body)
            // 高亮菜单
            that.$store.dispatch('setActiveMenu', 'earlyWarningIntensity')
            // 播放报警音
            that.audioSource = mp3
          })
        })
      })

    },
    watch: {
      clientHeight (val) {
        if (!this.timer) {
          this.clientHeight = val
          this.timer = true
          let that = this
          setTimeout(function () {
            // that.screenWidth = that.$store.state.canvasWidth
            that.timer = false
            store.dispatch('setClientHeight', that.clientHeight)
          }, 1000)
        }
      }
    },
    created(){
      store.dispatch('setLoginPageShow', false)
    },
    methods: {
      getWin(){
        return this.$electron.remote.BrowserWindow.getFocusedWindow()
      }
    }
  }
</script>

<style scoped>
  .content {
    z-index: 1;
    overflow-x: hidden;
  }


</style>
