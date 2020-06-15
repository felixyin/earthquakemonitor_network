<!-- 顶栏导航组件-->
<template>
  <div class="header">
    <home-titler></home-titler>
    <div class="menu">
      <el-row type="flex" justify="space-between">
        <el-col :span="10">
          <!--<img class="logo" src="../assets/img/header/header-logo.png" alt="logo">-->
          <div style="font-size: 38px;font-weight: 900;color:white;padding-left: 30px;padding-top: 40px;text-overflow: ellipsis;min-width: 340px;">
            地震预警信息发布平台
          </div>

        </el-col>
        <el-col :span="14">
          <!--<el-button class="my-menu-setting"></el-button>-->
          <!--<img src="../assets/img/header/menu/menu-setting.png" class="my-menu-setting"/>-->

          <el-menu class="my-menu-warp" mode="horizontal" :router=true @select="handleSelect" defaultActive="activeMenu">
            <div v-for="type in types">
              <el-menu-item v-bind:index="type.index" class="my-menu-item "
                            :class="['mmi-' + type.index,{'my-menu-item-seleted': type.active}]"></el-menu-item>
            </div>
            <el-menu-item index="shipin" class="my-menu-item mmi-shipin"></el-menu-item>
            <!--<el-menu-item index="xiaofang" class="my-menu-item mmi-xiaofang"></el-menu-item>-->
            <!--<el-menu-item index="huanjing" class="my-menu-item mmi-huanjing"></el-menu-item>-->
            <!--<el-menu-item index="anfang" class="my-menu-item mmi-anfang"></el-menu-item>-->
            <!--<el-menu-item index="dongli" class="my-menu-item mmi-dongli"></el-menu-item>-->
            <!--<el-menu-item index="setting" class="my-menu-item mmi-setting"></el-menu-item>-->
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import store from '../store'
  import { mapState } from 'vuex';
  import HomeTitler from '../components/HomeTitler'

  const _types = [
    {index: 'home', active: true},
    {index: 'deployPonit', active: false},
    {index: 'earlyWarningIntensity', active: false},
    {index: 'settingUser', active: false}

//        {index: 'huanjing', active: false},
//        {index: 'anfang', active: false},
//        {index: 'dongli', active: false}
  ]

  let _t = _types;
  export default {
    components: {
      HomeTitler
    },
    data () {
      return {
        types: _t
      }
    },
    methods: {
      handleSelect (name) {
//                菜单高亮效果
        this.types = _t.map(i => {
          if (i.index === name) {
            i.active = true;
          } else {
            i.active = false;
          }
          return i;
        })
//  TODO 已废弃
//                this.$store.dispatch('menuNav', name).then(route => {
//                    this.$router.push(route)
//                }).catch(err => {
//                    this.$message(err)
//                })
      },
      hoverMenu(){
        this.handleSelect(this.activeMenu)
      }
    },
    computed: mapState([
      'activeMenu'
    ]),
    watch: {
      'activeMenu': {
        handler: 'hoverMenu',
        deep: false
      }
    }
  }
</script>

<style scoped>
  .header {
    height: 8rem;
  }

  .menu {
    position: fixed;
    z-index: 2;
    width: 100%;
    height: 8rem;
    top: 0;
    left: 0;
    background-color: #25B5AB;
    /*padding-top: 10px;*/
    overflow: hidden;
  }

  .logo {
    height: 6rem;
    vertical-align: middle;
    margin-top: 20px;
  }

  .my-menu-warp {
    margin-top: 32px;
    height: 6rem;
    background-color: #25B5AB;
  }

  .my-menu-item {
    width: 7em;
    height: 6rem;
    margin: 0 6px 0 0;
    padding: 1px;
    background-size: 6em !important;
    border: 4px solid #25B5AB;
  }

  .my-menu-item-seleted, .my-menu-item:hover {
    opacity: 0.8;
    /*margin-top: -5px;*/
    /*border: 2px solid #cde6d3;*/
    border-bottom: 4px solid #ff0500 !important;
  }

  .my-menu-item:active {
    opacity: 0.5;
    /*margin-top: -5px;*/
    /*border: 2px solid #cde6d3;*/
    border-bottom: 4px solid #ff19d9 !important;
  }

  .mmi-home {
    background: #25B5AB url("../assets/img/header/menu/menu-home.png") no-repeat center bottom;
  }

  .mmi-settingUser {
    background: #25B5AB url("../assets/img/header/menu/menu-setting.png") no-repeat center bottom;
  }

  .mmi-anfang {
    background: #25B5AB url("../assets/img/header/menu/menu-anfang.png") no-repeat center bottom;
  }

  .mmi-dongli {
    background: #25B5AB url("../assets/img/header/menu/menu-dongli.png") no-repeat center bottom;
  }

  .mmi-huanjing {
    background: #25B5AB url("../assets/img/header/menu/menu-huanjing.png") no-repeat center bottom;
  }

  .mmi-deployPonit {
    background: #25B5AB url("../assets/img/header/menu/menu-shipin.png") no-repeat center bottom;
  }

  .mmi-earlyWarningIntensity {
    background: #25B5AB url("../assets/img/header/menu/menu-xiaofang.png") no-repeat center bottom;
  }

  .el-menu--horizontal .el-menu-item:hover {
    background-color: #25B5AB;
  }


</style>
