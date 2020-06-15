<template>
    <div id="earthquakeDemo3" class="amap-wrapper" :style="{height:clientHeight+'px'}">
    </div>
</template>

<script>

    import { mapState } from 'vuex';

    export default {
      name: 'earthquakeDemo3',
      components: {},
      mounted(){
        var map = new AMap.Map('earthquakeDemo3', {
          resizeEnable: true,
          zoom: 11,
          layers: [new AMap.TileLayer.RoadNet(),
            new AMap.TileLayer.Satellite()],
          center: [116.39, 39.9]
        });
        var marker = new AMap.Marker({
          position: [116.480983, 39.989628]
        });
        marker.setMap(map);
//        var circle = new AMap.Circle({
//          radius: 3000,
//          center: map.getCenter(),
//          strokeColor: '#006600',
//          strokeWeight: 1,
//          fillColor: 'rgba(0,0,255,0.6)',
//          fillOpacity: 0.9,
//          map: map
//
//        })
        map.setCenter(marker.getPosition())
//      map.addControl(new AMap.ToolBar())
        map.setFitView()
      },
      methods: {
        amapInitComponent(){
        }
      },
      data () {
        return {
          zoom: 11,
          center: [120.4307550000, 36.1651000000]
        }
      },
      computed: mapState([
        'clientHeight'
      ])
    }

</script>

<style scoped>
    .amap-wrapper {
        width: 100%;
    }

    .text {
        font-size: 15px;
        font-weight: 400;
    }

    .item {
        padding: 2px 0;
        line-height: 20px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        position: fixed;
        right: 10px;
        bottom: 10px;
        width: 180px;
    }

    .explain {
        width: 20px;
        height: 20px;
        display: inline-block;
        line-height: 20px;
        float: left;
        margin-right: 5px;
    }

    .ld-8 {
        background-image: url("../../assets/img/main/liedu/ld-8.png");
    }
</style>
