<!--* 侧栏导航组件-->

<template>
    <div class="container">

        <el-menu
            :default-active="defaultActive"
            @select="onSelected">

            <el-input class="my-search"
                      placeholder="中文或拼音首字母搜索"
                      icon="search"
                      v-model="searchText"
                      :on-icon-click="handleIconClick"
                      @change="handleIconClick">
            </el-input>

            <hr>

            <div v-for="menu in menus">
                <div
                    @mouseover="onMouseover(menu.id)"
                    @mouseout="onMouseout(menu.id)"
                    :index="menu.id">

                    <el-menu-item v-bind:index="menu.id"><i class="el-icon-arrow-right"></i>{{menu.name}}</el-menu-item>
                </div>
                <hr>
            </div>

        </el-menu>
        <br>
        <br>
        <br>
        <br>
        <br>

    </div>
</template>

<script>

    export default {
      data () {
        let active = window.sessionStorage.defaultActive || ''

        return {
                // 列表项上绑定的数据库id
          index: '',
                // 点击后的高亮样式
          defaultActive: active,
                // 搜索文本
          searchText: ''
        }
      },
      props: ['menus'],
      methods: {
        onSelected (index, array, comp) {
          window.sessionStorage.defaultActive = comp.$props.index
          this.$emit('menuClick', comp.$props.index);
        },
        onMouseover(index){
          this.$emit('menuOver', index)
        },
        onMouseout(index){
          this.$emit('menuOut', index)
        },
        handleIconClick(ev) {
          this.$emit('menuSearch', this.searchText)
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
