<template></template>
<script>
  import registerMixin from '../mixins/register-component';

  export default {
    name: 'el-amap-sample-marker',
    mixins: [registerMixin],
    props: [
      'iconStyle',
      'iconLabel',
      'showPositionPoint',
      'containerClassNames'
    ],
    data() {
      return {};
    },
    methods: {
      initComponent(options) {
        let self = this;

//        var sleep = function () {
//          return new Promise(function (resolve, reject) {
//            AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
//              resolve(SimpleMarker);
//            });
//          })
//        };
//
//        var start = async function () {
//          // 在这里使用起来就像同步代码那样直观
//          console.log('start');
//          let SimpleMarker = await sleep();
//          self.$amapComponent = new SimpleMarker(options);
//          console.log('end');
//        };
//
//        start();

      }
    }
  };
</script>
