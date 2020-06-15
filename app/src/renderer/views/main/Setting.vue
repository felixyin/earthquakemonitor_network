<template>
    <div class="home">
        <div class="content">
            <el-row>
                <el-col :span="4">
                    <setting-sidebar></setting-sidebar>
                </el-col>
                <el-col :span="20" class="main-view">
                    <router-view></router-view>
                    <!--<transition name="slide-left" mode="out-in">-->
                    <!--</transition>-->
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
    import CHeader from '../../components/Header'
    import SettingSidebar from '../../components/SettingSidebar'
    import store from '../../store';

    export default {
      name: 'home',
      components: {
        CHeader,
        SettingSidebar
      },
      data () {
        return {
          clientHeight: document.body.clientHeight
        }
      },
      mounted () {
        const that = this
        window.onresize = () => {
          return (() => {
            that.clientHeight = document.body.clientHeight
          })()
        }
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
            }, 400)
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
