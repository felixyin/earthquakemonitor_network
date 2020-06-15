<template>
  <div class="my-title-bar">
    <div class="my-title-info">
      科信地震预警发布平台
    </div>
    <el-button-group class="my-title-btn-group">
      <el-button class="my-title-btn" type="primary" icon="caret-bottom" @click="hide"></el-button>
      <!--<el-button class="my-title-btn" type="primary" icon="d-caret" @click="minMax"></el-button>-->
      <el-button class="my-title-btn" type="primary" icon="circle-close" title="关闭应用" @click="close"></el-button>
    </el-button-group>
  </div>
</template>

<script>
  import ElRow from '../../../node_modules/element-ui/packages/row/src/row'
  export default{
    components: {ElRow},
    name: 'titler',
    methods: {
      getWin(){
        let win = this.$electron.remote.BrowserWindow.getFocusedWindow();
        return win;
      },
      close(){
        this.getWin().close();
      },
      minMax(){
        let win = this.getWin();
        if (win.isMaximized()) {
          win.unmaximize()
        } else if (win.isMinimized()) {
          win.maximize()
        } else {
          win.maximize()
        }
      },
      hide(){
        this.getWin().minimize()
      }
    }
  }
</script>

<style scoped>
  .my-title-bar {
    position: fixed;
    z-index: 1000;
    float: right;
    right: 1px;
    top: -15px;
    background-color: #73A5D5;
    width: 170px;
    height: 51px;
    border-bottom-right-radius: 45px;
    border-bottom-left-radius: 45px;
    box-shadow: 3px 3px 3px #8AB4E5;
  }

  .my-title-info {
    display: none;
    margin-top: 23px;
    margin-left: 50px;
    color: whitesmoke;
    font-size: 16px;
    font-weight: bold;
    text-space: 2px;
    white-space: 2;
    cursor: default;
  }

  .my-title-btn-group {
    position: relative;
    float: right;
    right: 38px;
    margin-top: 15px;
  }

  .my-title-btn-group > * {
    cursor: default;
  }

  .my-title-btn {
    background-color: #607EA0;
    border-color: #607EA0;
  }

  .my-title-btn:hover {
    background-color: #8AB4E5;
    border-color: #8AB4E5;
  }

  .my-title-btn:active {
    background-color: #8AB4E5;
    border-color: #8AB4E5;
  }

  .my-title-btn:focus {
    background-color: #8AB4E5;
    border-color: #8AB4E5;
  }

</style>
