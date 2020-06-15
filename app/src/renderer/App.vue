<template>
    <div id="app" v-bind:class="{ mybody: isLoginPageShow }">
        <c-pageprogress :progress="pageProgress"></c-pageprogress>
        <transition name="fade" mode="out-in">
            <router-view class="page"></router-view>
        </transition>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import CPageprogress from 'components/PageProgress'

    // 引入重置样式
    //    import 'normalize.css'

    // 引入全局通用样式

    // 引入组件库
    import 'components/UIComponents'

    export default {
      name: 'app',
      computed: mapState([
        'pageProgress',
        'isLoginPageShow'
      ]),
      components: {
        CPageprogress
      }
    }
</script>

<style>
    [v-cloak] {
        display: none;
    }

    html, body {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f9fafc;
        height: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .textspan {
        color: #99a9bf;
        padding: 10px 15px;
        float: right;
        font-size: 14px;
    }

    .queryinput {
        width: 90%;
    }

    .mybody {
        height: 100%;
        padding: 0;
        margin: 0;
        background: #1EB5AB url('assets/img/login/login-bg.png') no-repeat center bottom;
        background-size: cover;
    }
</style>
