<!--* 侧栏导航组件-->

<template>
    <div class="container">
        <el-menu :default-active="defaultActive" :router="true" @select="onSelected">
            <!--<el-input class="my-search"-->
                      <!--placeholder="中文或拼音首字母搜索"-->
                      <!--icon="search"-->
                      <!--v-model="input2"-->
                      <!--:on-icon-click="handleIconClick"-->
                      <!--@input="handleIconClick">-->
            <!--</el-input>-->
            <hr>

            <!--<div>-->
            <!--<ul>-->
            <!--<li>-->
            <!--<router-link to="/deployPonit">/parent</router-link>-->
            <!--</li>-->
            <!--<li>-->
            <!--<router-link to="/main/setting/user">/parent/bar</router-link>-->
            <!--</li>-->
            <!--<li>-->
            <!--<router-link to="/settingUser">/parent/qux</router-link>-->
            <!--</li>-->
            <!--<li>-->
            <!--<router-link :to="{name: 'settingUser'}">/parent/zap</router-link>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</div>-->

            <div v-for="menu in menus">
                <el-menu-item v-bind:index="menu.index"><i class="el-icon-arrow-right"></i>{{menu.name}}</el-menu-item>
                <hr>
            </div>

        </el-menu>
    </div>
</template>

<script>
    import store from '../store'

    const _menus = [
        {name: '用户管理', index: 'settingUser'},
        {name: '操作日志', index: 'settingLog'}
    ]

    export default {
      data () {
        let active = window.sessionStorage.defaultActive || ''

        return {
          defaultActive: active,
          input2: '',
          menus: _menus
        }
      },
      mounted(){

      },
      methods: {
        onSelected (index) {
          window.sessionStorage.defaultActive = index
          _menus.forEach((n, i) => {
            if (n.index === index) {
              store.dispatch('setWorksationName', n.name)
            }
          })
          return true;
//                this.$store.dispatch('substationNav', index).then(route => {
//                    this.$router.push(route)
//                }).catch(err => {
//                    this.$message(err)
//                })
        },
        handleIconClick(ev) {
          if (this.input2) {
            this.menus = _menus.filter(i => {
              return i.name.indexOf(this.input2) !== -1 || i.en.indexOf(this.input2) !== -1;
            })
          } else {
            this.menus = _menus;
          }
        }
      }
    }
</script>

<style scoped>
    .container {
        height: 2000px;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
        border: 1px solid #f4f8ef;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, .3);
        margin-right: 6px;
        background: #eef1f6;

    }

    /*.my-search {*/
    /*line-height: 50px;*/
    /*height: 50px;*/
    /*}*/

    /*.my-search input {*/
    /*line-height: 50px;*/
    /*height: 50px !important;*/
    /*}*/

    /*input {*/
    /*line-height: 50px !important;*/
    /*height: 50px !important;*/
    /*}*/

    .el-menu hr {
        margin: 0px;
    }

    .el-menu-item {
        height: 50px;
        line-height: 50px;
    }

    .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
        background-color: #1EB5AD;
        color: white;
        font-weight: bold;
    }
</style>

<style>
    .my-search {
        line-height: 50px;
        height: 50px;
    }

    .my-search input {
        line-height: 50px;
        height: 50px !important;
    }
</style>
