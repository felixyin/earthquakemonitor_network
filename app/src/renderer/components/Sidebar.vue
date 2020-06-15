<!--* 侧栏导航组件-->

<template>
    <div class="container">
        <el-menu :default-active="defaultActive" @select="onSelected">
            <el-input class="my-search"
                      placeholder="中文或拼音首字母搜索"
                      icon="search"
                      v-model="input2"
                      :on-icon-click="handleIconClick"
                      @input="handleIconClick">
            </el-input>
            <hr>
            <div v-for="menu in menus">
                <el-menu-item v-bind:index="menu.substation"><i class="el-icon-arrow-right"></i>{{menu.name}}</el-menu-item>
                <hr>
            </div>
            <!--<el-submenu index="1">-->
            <!--<template slot="title"><i class="el-icon-menu"></i>机构</template>-->
            <!--<el-menu-item index="/campus-manage">校区管理</el-menu-item>-->
            <!--<el-menu-item index="/classroom-manage">教室管理</el-menu-item>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="2">-->
            <!--<template slot="title"><i class="el-icon-edit"></i>教师</template>-->
            <!--<el-menu-item index="/role-manage">角色管理</el-menu-item>-->
            <!--<el-menu-item index="/teacher-manage">教师管理</el-menu-item>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="3">-->
            <!--<template slot="title"><i class="el-icon-date"></i>班级</template>-->
            <!--<el-menu-item index="/schedule-manage">排课管理</el-menu-item>-->
            <!--<el-menu-item index="/classtype-manage">班型管理</el-menu-item>-->
            <!--<el-menu-item index="/class-manage">班级管理</el-menu-item>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="4">-->
            <!--<template slot="title"><i class="el-icon-document"></i>科目</template>-->
            <!--<el-menu-item index="/subject-manage">科目管理</el-menu-item>-->
            <!--<el-menu-item index="/course-manage">课程管理</el-menu-item>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="5">-->
            <!--<template slot="title"><i class="el-icon-more"></i>学生</template>-->
            <!--<el-menu-item index="/student-manage">学生管理</el-menu-item>-->
            <!--<el-menu-item index="/purchase-manage">购课记录</el-menu-item>-->
            <!--</el-submenu>-->
        </el-menu>
    </div>
</template>

<script>
    import store from '../store'

    const _menus = [
        {name: '8级（2017-04-16，山东青岛市李沧区...）', en: '8j2017416sdqdslcq', substation: '1'},
        {name: '6级（2017-03-09，福建漳州一中）', en: '6j20170309fjzzyz', substation: '2'},
        {name: '4级（2016-12-20，内蒙海拉尔西二旗...）', en: '4j20161220nmhlexeq', substation: '3'},
        {name: '5级（2016-10-26，云南省xxx县）', en: '5j20161026ynsxxxx', substation: '4'}
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
      methods: {
        onSelected (index) {
          window.sessionStorage.defaultActive = index
          _menus.forEach(i => {
            if (i.substation === index) {
              store.dispatch('setWorksationName', i.name)
            }
          })
          this.$store.dispatch('substationNav', index).then(route => {
            this.$router.push(route)
          }).catch(err => {
            this.$message(err)
          })
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
