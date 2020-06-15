<template>
    <div class="my-title-bar" @mousedown="handleMove" @mouseup="unHandleMove" @mouseout="unHandleMove">
        <div class="my-title-info">
            <!--<span>{{workstationName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-->
            <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
        &nbsp;操作员：{{getUsername()}}
        </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="quit">返回登录</el-dropdown-item>
                    <!--<el-dropdown-item command="sysMsg" divided>系统消息</el-dropdown-item>-->
                    <!--<el-dropdown-item command="optLog">操作日志</el-dropdown-item>-->
                    <!--<el-dropdown-item command="setting">个人设置</el-dropdown-item>-->
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-button-group class="my-title-btn-group">
            <el-button class="my-title-btn" type="primary" icon="caret-bottom" @click="hide"></el-button>
            <el-button class="my-title-btn" type="primary" icon="d-caret" @click="minMax"></el-button>
            <el-button class="my-title-btn" type="primary" icon="circle-close" title="关闭应用" @click="close"></el-button>
        </el-button-group>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default{
      name: 'home-titler',
      computed: mapState([
        'workstationName'
      ]),
      data () {
        return {
          _win: null
        }
      },
      methods: {
        getWin(){
          if (this._win) return this._win;
          this._win = this.$electron.remote.BrowserWindow.getFocusedWindow();
//                this.$message('注意：请慢一点拖动，效果会更好！');
          return this._win;
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
        },
        getUsername(){
          return window.localStorage.getItem('username');
        },
        handleCommand(command) {
          switch (command) {
            case 'quit':
              this.$store.dispatch('logout')
              this.$router.push('/login')
              break;
            default:
          }
//                this.$message('你点击了（TODO）：' + command + '');
        },
        moveWin(ev){
          ev = ev || window.event;
          this.getWin().setPosition(ev.screenX - this.pageX, ev.screenY - this.pageY, false)
          let ele = ev.target || ev.srcElement;
          ele.style.cursor = 'move!important';
        },
        handleMove(ev){
          ev = ev || window.event;
          let ele = ev.target || ev.srcElement;
          this.pageX = ev.pageX;
          this.pageY = ev.pageY;
          ele.addEventListener('mousemove', this.moveWin, false)
        },
        unHandleMove(ev){
          ev = ev || window.event;
          let ele = ev.target || ev.srcElement;
          ele.removeEventListener('mousemove', this.moveWin, false)
          ele.style.cursor = 'default!important';
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
        background-color: #17AEA5;
        width: 400px;
        height: 51px;
        border-bottom-right-radius: 45px;
        border-bottom-left-radius: 45px;
        box-shadow: 3px 3px 3px #178780;
        cursor: default;
    }

    .my-title-info {
        display: inline-block;
        margin-top: 23px;
        margin-left: 50px;
        color: whitesmoke;
        font-size: 14px;
    }

    .el-dropdown-link {
        color: whitesmoke;
        cursor: default;
        font-size: 14px;
    }

    .el-dropdown-link:hover {
        color: red;
        cursor: pointer;
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
        background-color: #17AEA5;
        border-color: #17AEA5;
    }

    .my-title-btn:hover {
        background-color: #03928A;
        border-color: #03928A;
    }

    .my-title-btn:active {
        /*background-color: #035551;*/
        /*border-color: #035551;*/
    }

    .my-title-btn:focus {
        /*background-color: #03bab2;*/
        /*border-color: #03bab2;*/
    }

</style>
