<template>
    <div class="amap-wrapper" :style="{height:clientHeight+'px'}">
        <!--<button v-on:click="getMap">get map</button>-->
        <!--<button type="button" name="button" v-on:click="addZoom">zoom++</button>-->
        <!--<button type="button" name="button" v-on:click="subZoom">zoom&#45;&#45;</button>-->
        <!--<button type="button" name="button" v-on:click="changeCenter">change center</button>-->

        <div id="tip">
            省：<select id='province' style="width:100px" v-on:change='search'></select>
            市：<select id='city' style="width:100px" v-on:change='search'></select>
            区：<select id='district' style="width:100px" v-on:change='search'></select>
            <span style="display: none;">街道：<select id='street' style="width:100px" v-on:change='setCenter'></select></span>
        </div>

        <el-amap vid="amap" :zoom="zoom" :center="center" :map-manager="amapManager" :plugin="plugin" :events="events">
            <el-amap-circle v-for="circle in circles" v-if="circle.checked"
                            :center="circle.center"
                            :radius="circle.radius"
                            :zIndex="circle.zIndex"
                            :strokeColor="circle.strokeColor"
                            :strokeWeight="circle.strokeWeight"
                            :fillOpacity="circle.fillOpacity"
                            :fillColor="circle.fillColor"
                            :events="circle.events">
            </el-amap-circle>
            <el-amap-marker v-for="marker in markers"
                            :content="marker.content"
                            :title="marker.title"
                            :position="marker.position"
                            :events="marker.events"
                            :visible="marker.visible"
                            :draggable="marker.draggable">
            </el-amap-marker>
            <el-amap-info-window v-for="window in windows"
                                 :position="window.position"
                                 :content="window.content"
                                 :open="window.open"
                                 :events="window.events">
            </el-amap-info-window>
        </el-amap>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="line-height: 6px;">颜色烈度对照</span>
            </div>
            <div v-for="explain in circles" class="text item">
                <div class="explain" :style="{backgroundColor: explain.color, opacity:0.4}"></div>
                {{explain.desc}}
            </div>
        </el-card>
    </div>
</template>

<script>

    import { mapState } from 'vuex';
    import { AMapManager } from 'vue-amap';
    let amapManager = new AMapManager();
    window.amapManager = amapManager;

    /* let zhenBoEffect = {
      center: [120.4307550000, 36.1651000000],
      radius: 200,
      zIndex: 60,
      strokeColor: '#000000',
//            strokeWeight: 0,
      fillOpacity: 0,
//    fillColor: '#1400FF',
      events: {
        click: () => {
          alert('click polygon');
        }
      }
    }; */
    //
    //  setInterval(function () {
    //    zhenBoEffect.radius += 100;
    //    if (zhenBoEffect.radius >= 10000) {
    //      zhenBoEffect.radius = 200;
    //    }
    //  }, 10);
    window.myMapReady = function (map) {
      alert(1)
    }

    export default {
      name: 'amap',
      components: {},
      mounted() {
        let self = this;

        setTimeout(function () {
          let map = self.amapManager.getMap();

                // 添加点标记，并使用自己的icon

//        var marker = new AMap.Marker({
//          position: map.getCenter()
//        });
//        marker.setMap(map);
//        // 设置鼠标划过点标记显示的文字提示
//        marker.setTitle('我是marker的title');
//
//        // 设置label标签
//        marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
//          offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
//          content: "我是marker的label标签"
//        });

//        AMap.plugin('AMap.Driving',function(){
//          var drving = new AMap.Driving({
//            map:map
//          })
//          drving.search([
//            {keyword:'北京西站',city:'北京'},
//            {keyword:'高德地图',city:'北京'}
//          ]);
//        })

//        var marker = new AMap.Marker({ //添加自定义点标记
//          map: map,
//          position: map.getCenter(),
//          offset: new AMap.Pixel(17, 42), //相对于基点的偏移位置
// //          content:'出来了'
//          content: '<div class="marker-route marker-marker-bus-from"></div>'   //自定义点标记覆盖物内容
// //          content: '<img src="../../assets/img/main/liedu/ld-4.png"/>'
//        });

                // 行政区划查询
          var opts = {
            subdistrict: 1,   // 返回下一级行政区
            level: 'city',
            showbiz: false  // 查询行政级别为 市
          };

          self.map = map;
          self.citySelect = document.getElementById('city');
          self.districtSelect = document.getElementById('district');
          self.areaSelect = document.getElementById('street');
          self.district = new AMap.DistrictSearch(opts);// 注意：需要使用插件同步下发功能才能这样直接使用
          self.district.search('中国', function (status, result) {
            if (status == 'complete') {
              self.getData(result.districtList[0]);
            }
          });

          AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
            let array = [
//                        {bgColor: 'red', intensity: 8, lon: 120.4307550000, lat: 36.2651000000},
                        {bgColor: 'red', intensity: 8, lat: 36.1695492796, lon: 120.4483399474},
                        {bgColor: 'red', intensity: 8, lat: 36.1496921050, lon: 120.4171633585},
                        {bgColor: 'orange', intensity: 7, lat: 36.1699255855, lon: 120.3734531905},
                        {bgColor: 'orange', intensity: 7, lat: 36.1949887124, lon: 120.4918014848},
                        {bgColor: 'orange', intensity: 7, lat: 36.1614228526, lon: 120.4973814559},
                        {bgColor: 'orange', intensity: 6, lat: 36.0963537162, lon: 120.4956691155},
                        {bgColor: 'beige', intensity: 5, lat: 36.0639594369, lon: 120.3391231153},
                        {bgColor: 'beige', intensity: 4, lat: 36.2091701827, lon: 120.2831634844},
                        {bgColor: 'beige', intensity: 4, lat: 36.0984082871, lon: 120.3851167897},
                        {bgColor: 'beige', intensity: 4, lat: 36.3294788137, lon: 120.4254554752},
                        {bgColor: 'darkblue', intensity: 3, lat: 36.3193847019, lon: 120.3962968109},
                        {bgColor: 'darkblue', intensity: 2, lat: 36.4039054070, lon: 120.3936576372},
                        {bgColor: 'darkblue', intensity: 1, lat: 36.3657254225, lon: 120.6867845829},
                        {bgColor: 'lightgray', intensity: '震', lat: 35.9257795096, lon: 120.1108258031},
                        {bgColor: 'lightgray', intensity: '震', lat: 36.2803599528, lon: 120.0103677244}
            ]

            array.forEach((n, i) => {
              new SimpleMarker({
                            // 添加自定义的class
                containerClassNames: 'my_color',
                            // 使用内置的iconStyle
                iconStyle: n.bgColor,
                            // 图标文字
                iconLabel: {
                                // A,B,C.....
                  innerHTML: n.intensity,
                  style: {
                                    // 颜色, #333, red等等，这里仅作示例，取iconStyle中首尾相对的颜色
                    color: '#333'
                  }
                },
                            // 显示定位点
                            // showPositionPoint:true,
                map: map,
                position: [n.lon, n.lat]
              })
            })

//                    // 内置的样式
//            var iconStyles = SimpleMarker.getBuiltInIconStyles();
//
//            if (typeof (console) !== 'undefined') {
//              console.log(iconStyles.join(', '));
//            }
          });
        });
      },
      data () {
        return {
          map: undefined,
          district: undefined,
          polygons: [],
          citycode: undefined,
          amapManager: amapManager,
          plugin: [
            {
              pName: 'MapType',
              events: {
                init(instance) {
                }
              }
            },
            {
              pName: 'Scale',
              position: 'LT',
              offset: [10, 10],
              events: {
                init(instance) {
                }
              }
            }, {
              pName: 'ToolBar',
              position: 'LT',
              offset: [10, 50],
              locate: true,
              noIpLocate: true,
              events: {
                init(instance) {
                }
              }
            }, {
              pName: 'OverView',
              isOpen: false,
              visible: false,
              events: {
                init(instance) {
                }
              }
            }, {
              pName: 'MouseTool',
              events: {
                init(instance) {
                }
              }
            }],
          zoom: 11,
          center: [120.4307550000, 36.1651000000],
          circles: [
            {
              color: '#FF0008',
              desc: '烈度 ≧ 8',
              checked: true,
              center: [120.4307550000, 36.1651000000],
              radius: 3000,
              zIndex: 100,
              strokeColor: '#FF0008',
//            strokeWeight: 0,
              fillOpacity: 0.3,
              fillColor: '#FF0008',
              events: {
                click: () => {
                  alert('click polygon');
                }
              }
            },
            {
              color: '#FF9000',
              desc: '6 ≦ 烈度 < 8',
              checked: true,
              center: [120.4307550000, 36.1651000000],
              radius: 9000,
              zIndex: 90,
              strokeColor: '#FF9000',
//            strokeWeight: 0,
              fillOpacity: 0.3,
              fillColor: '#FF9000',
              events: {
                click: () => {
                  alert('click polygon');
                }
              }
            },
            {
              color: '#FFF600',
              desc: '4 ≦ 烈度 < 6',
              checked: true,
              center: [120.4307550000, 36.1651000000],
              radius: 18000,
              zIndex: 80,
              strokeColor: '#FFF600',
//            strokeWeight: 0,
              fillOpacity: 0.3,
              fillColor: '#FFF600',
              events: {
                click: () => {
                  alert('click polygon');
                }
              }
            },
            {
              color: '#1400FF',
              desc: '烈度 < 4',
              checked: true,
              center: [120.4307550000, 36.1651000000],
              radius: 33000,
              zIndex: 70,
              strokeColor: '#1400FF',
//            strokeWeight: 0,
              fillOpacity: 0.3,
              fillColor: '#1400FF',
              events: {
                click: () => {
                  alert('click polygon');
                }
              }
            }/*,
                     zhenBoEffect */
          ],
          markers: [
            {
              content: '',
              title: '震源',
              position: [120.4307550000, 36.1651000000],
              events: {
                click: () => {
                  alert('click marker');
                },
                dragend: (e) => {
                  this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
                }
              },
              visible: false,
              draggable: false
            }
          ],
          windows: [
            {
              position: [120.4307550000, 36.1651000000],
              content: `
            <span style="font-size:18px;">万达广场</span><br>
            <span style="font-size:15px;color:#F00;">震级: 8级别</span><br>
            <span style="font-size:15px;color:#F00;">坐标:120.4307550000, 36.1651000000</span><br>
            <img src="http://tpc.googlesyndication.com/simgad/5843493769827749134"/><br>
            地址：山东省青岛市李沧区李村万达广场<br>
            电话：010 12345678<br>
            <a href="http://ditu.amap.com/detail/B000A8URXB?citycode=110105" target="_blank">详细信息</a>
            `,
              open: true,
              events: {
                close() {
                }
              }
            }
          ],
          events: {
            'moveend': () => {
              let mapCenter = this.amapManager.getMap().getCenter();
              this.center = [mapCenter.getLng(), mapCenter.getLat()];
            },
            'zoomchange': () => {
              this.zoom = this.amapManager.getMap().getZoom();
            },
            'click': (e) => {
              alert('map clicked');
            }
          }
        }
      },
      methods: {
        getMap: function () {
//          console.log(this.amapManager.getMap());
//          console.log(this.center);
        },
        addMarker: function () {
          let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
          let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
          this.markers.push([lng, lat]);
        },
        addZoom() {
          this.zoom++;
        },
        subZoom() {
          this.zoom--;
        },
        changeCenter() {
          this.center = [this.center[0] + 0.1, this.center[1] + 0.1];
        },
        getData (data) {
          var bounds = data.boundaries;
          if (bounds) {
            for (var i = 0, l = bounds.length; i < l; i++) {
              var polygon = new AMap.Polygon({
                map: this.map,
                strokeWeight: 1,
                strokeColor: '#CC66CC',
                fillColor: '#CCF3FF',
                fillOpacity: 0.5,
                path: bounds[i]
              });
              this.polygons.push(polygon);
            }
            this.map.setFitView();// 地图自适应
          }

          var subList = data.districtList;
          var level = data.level;

                // 清空下一级别的下拉列表
          if (level === 'province') {
            level = 'city';
            this.citySelect.innerHTML = '';
            this.districtSelect.innerHTML = '';
            this.areaSelect.innerHTML = '';
          } else if (level === 'city') {
            level = 'district';
            this.districtSelect.innerHTML = '';
            this.areaSelect.innerHTML = '';
          } else if (level === 'district') {
            level = 'street';
            this.areaSelect.innerHTML = '';
          }
          if (subList) {
            var contentSub = new Option('--请选择--');
            for (let i = 0, l = subList.length; i < l; i++) {
              var name = subList[i].name;
              var levelSub = subList[i].level;
//              var cityCode = subList[i].citycode;
              if (i === 0) {
                document.querySelector('#' + levelSub).add(contentSub);
              }
              contentSub = new Option(name);
              contentSub.setAttribute('value', levelSub);
              contentSub.center = subList[i].center;
              contentSub.adcode = subList[i].adcode;
              document.querySelector('#' + levelSub).add(contentSub);
            }
          }
        },
        search (evt) {
          let obj = evt.target;

                // 清除地图上所有覆盖物
          for (var i = 0, l = this.polygons.length; i < l; i++) {
            this.polygons[i].setMap(null);
          }
          var option = obj[obj.options.selectedIndex];
//          var keyword = option.text; // 关键字
          var adcode = option.adcode;
          this.district.setLevel(option.value); // 行政区级别
          this.district.setExtensions('all');
                // 行政区查询
                // 按照adcode进行查询可以保证数据返回的唯一性
          let self = this;
          this.district.search(adcode, function (status, result) {
            if (status === 'complete') {
              self.getData(result.districtList[0]);
            }
          });
        },
        setCenter (evt) {
          let obj = evt.target;
          this.map.setCenter(obj[obj.options.selectedIndex].center)
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

</style>
<style>

    .amap-marker .marker-route {
        position: absolute;
        width: 40px;
        height: 44px;
        color: #e90000;
        background: url(http://webapi.amap.com/theme/v1.3/images/newpc/poi-1.png) no-repeat;
        cursor: pointer;
    }

    .amap-marker .marker-marker-bus-from {
        background-position: -334px -180px;
    }

    .amap-marker-label {
        font-size: 13px;
        border: 1px solid orange;
        background: #fff;
        border-radius: 10px 0 0 0;
        color: #690441;
    }

    .color_bar {
        width: 30px;
        height: 18px;
    }

    /**
     * 替换内置样式的图片
     */

    /*.amap-simple-marker-def-style.my_color .amap-simple-marker-icon {*/
    /*background-image: url('../assets/mbg_v2-fs8.png');*/
    /*}*/

    /*@media (min--moz-device-pixel-ratio: 1.5),*/
    /*(-o-min-device-pixel-ratio: 3/2),*/
    /*(-webkit-min-device-pixel-ratio: 1.5),*/
    /*(min-device-pixel-ratio: 1.5),*/
    /*(min-resolution: 1.5dppx) {*/
    /*.amap-simple-marker-def-style.my_color .amap-simple-marker-icon {*/
    /*background-image: url('../assets/mbg_v2@2x-fs8.png');*/
    /*}*/
    /*}*/

    #tip {
        background-color: #fff;
        padding: 0 10px;
        border: 1px solid silver;
        box-shadow: 3px 4px 3px 0px silver;
        position: absolute;
        font-size: 12px;
        right: 100px;
        top: 17px;
        border-radius: 3px;
        line-height: 36px;
        z-index: 10000000;
    }

</style>
