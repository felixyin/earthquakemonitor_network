<template>
  <div class="amap-wrapper">

    <el-row>

      <el-col :span="4">
        <!-- 左侧部署点列表 -->
        <deploy-point-sidebar :menus="menus"
                              v-on:menuClick="listenMenuClick"
                              v-on:menuOver="listenMenuOver"
                              v-on:menuOut="listenMenuOut"
                              v-on:menuSearch="listenMenuSearch"
                              :style="{height:clientHeight+'px'}">
        </deploy-point-sidebar>
      </el-col>

      <el-col :span="20" class="main-view" :style="{height:clientHeight+'px'}">

        <!-- 地图上的下拉选择框 -->
        <div id="tip">
          省：<select id='province' style="width:100px" v-on:change='search'></select>
          市：<select id='city' style="width:100px" v-on:change='search'></select>
          区：<select id='district' style="width:100px" v-on:change='search'></select>
          <span style="display: none;">街道：<select id='street' style="width:100px" v-on:change='setCenter'></select></span>
        </div>

        <!-- 地图标签 -->
        <el-amap vid="deployPonit"
                 :zoom="zoom"
                 :map-manager="amapManager"
                 :plugin="plugin"
                 :events="events">

          <!-- 显示烈度 -->
          <!--<el-amap-circle v-for="circle in circles" v-if="circle.checked"-->
          <!--:center="circle.center"-->
          <!--:radius="circle.radius"-->
          <!--:zIndex="circle.zIndex"-->
          <!--:strokeColor="circle.strokeColor"-->
          <!--:strokeWeight="circle.strokeWeight"-->
          <!--:fillOpacity="circle.fillOpacity"-->
          <!--:fillColor="circle.fillColor"-->
          <!--:events="circle.events">-->
          <!--</el-amap-circle>-->

          <!-- 显示点坐标 -->
          <el-amap-marker v-for="marker in markers"
                          :content="marker.content"
                          :title="marker.title"
                          :position="marker.position"
                          :events="marker.events"
                          :visible="marker.visible"
                          :draggable="marker.draggable">
          </el-amap-marker>

          <!-- 显示信息窗体 -->
          <el-amap-info-window v-for="window in windows"
                               :position="window.position"
                               :content="window.content"
                               :visible="window.visible"
                               :open="window.open"
                               :events="window.events">
          </el-amap-info-window>

        </el-amap>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 6px;">图例</span>
          </div>

          <!--<div v-for="explain in circles" class="text item">-->
          <div class="text item">
            <img :src="host" style="width:16px;height:24px;line-height:20px;display: inline-block;"/>
            <span style="display: inline-block;line-height: 20px;">部署点</span>
          </div>
          <div class="text item">
            <span>
            <img :src="host" style="z-index:1;width:16px;height:24px;line-height:20px;display: inline-block;"/>
              <span style="position:absolute;float: left;z-index: 2;margin-left: -16px;">5</span>
            </span>
            <span style="display: inline-block;line-height: 20px;">加速度值</span>
          </div>

        </el-card>

      </el-col>

    </el-row>

  </div>
</template>


<script>

  import config from '../../utils/config'
  import { mapState } from 'vuex';
  import store from '../../store'
  import { AMapManager } from 'vue-amap';
  import SockJS from 'sockjs-client';
  import Stomp from 'stompjs';
  import * as deployPointService from '../../services/deploy-point'
  import DeployPointSidebar from '../../components/DeployPointSidebar'

  // map 管理对象
  let amapManager = new AMapManager();

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
   //                alert('click polygon');
   }
   }
   } */

  //
  //  setInterval(function () {
  //    zhenBoEffect.radius += 100;
  //    if (zhenBoEffect.radius >= 10000) {
  //      zhenBoEffect.radius = 200;
  //    }
  //  }, 10);

  export default {
    name: 'deployPonit',
    components: {
      DeployPointSidebar
    },
    mounted() {
      let self = this;
      setTimeout(function () {
        self.showCascadeSelect()
      })
      setTimeout(function () {
        self.showDeployPointRealTime()
      })
      setTimeout(function () {
        self.showAllDeployPoints()
      })
    },
    data () {
      return {
        host: config.server + '/img/lightgray.png',
        // 所有的部署点坐标
        deployPointMarkerList: {},
        // 所有的部署点原始数据
        deployPointList: undefined,
        // 城市行政区划的级联下拉框数据
        district: undefined,
        polygons: [],
        citycode: undefined,
        // 地图管理器对象
        amapManager: amapManager,
        // 地图插件
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
        // 地图的缩放级别
        zoom: 11,
        // 地图显示的聚焦位置
        // center: [120.4307550000, 36.1651000000],
        // 规则的预警烈度区域
        circles: [
          {
            color: '#FF0008',
            desc: '烈度 ≧ 8',
            checked: true,
            center: [120.4307550000, 36.1651000000],
            radius: 3000,
            zIndex: 100,
            strokeColor: '#FF0008',
            // strokeWeight: 0,
            fillOpacity: 0.3,
            fillColor: '#FF0008',
            events: {
              click: () => {
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
            fillOpacity: 0.3,
            fillColor: '#FF9000',
            events: {
              click: () => {
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
            fillOpacity: 0.3,
            fillColor: '#FFF600',
            events: {
              click: () => {
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
            fillOpacity: 0.3,
            fillColor: '#1400FF',
            events: {
              click: () => {
              }
            }
          }/*,
           zhenBoEffect */
        ],
        // 地图上的点坐标
        markers: [
//                    {
//                        content: '',
//                        title: '震源',
//                        position: [120.4307550000, 36.1651000000],
//                        events: {
//                            click: () => {
//                            },
//                            dragend: (e) => {
//                                this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
//                            }
//                        },
//                        visible: true,
//                        draggable: false
//                    }
        ],
        // 地图上点坐标，点击后显示的信息窗体
        windows: [],
        // map地图的事件
        events: {
          /**
           * 地图随鼠标移动事件
           */
          'moveend': () => {
            let mapCenter = this.amapManager.getMap().getCenter();
            this.center = [mapCenter.getLng(), mapCenter.getLat()];
          },
          /**
           * 地图缩放事件
           */
          'zoomchange': () => {
            this.zoom = this.amapManager.getMap().getZoom();
          },
          'click': (e) => {
          }
        },
        // 左侧部署点列表
        menus: []
      }
    },
    methods: {

      /**
       * 获取map对象
       */
      getMap(){
        if (!this._map) {
          this._map = this.amapManager.getMap();
        }
        return this._map;
      },

      /**
       * 地图行政区划级联下拉菜单，查询select option数据
       */
      getData (data) {
        let bounds = data.boundaries;
        if (bounds) {
          for (let i = 0, l = bounds.length; i < l; i++) {
            let polygon = new AMap.Polygon({
              map: this.getMap(),
              strokeWeight: 1,
              strokeColor: '#CC66CC',
              fillColor: '#CCF3FF',
              fillOpacity: 0.5,
              path: bounds[i]
            });
            this.polygons.push(polygon);
          }
          this.getMap().setFitView();// 地图自适应
        }

        let subList = data.districtList;
        let level = data.level;

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
          let contentSub = new Option('--请选择--');
          for (let i = 0, l = subList.length; i < l; i++) {
            let name = subList[i].name;
            let levelSub = subList[i].level;
//              let cityCode = subList[i].citycode;
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

      /**
       * 地图行政区划级联下拉框，点击选项后的查询下一级select的数据
       */
      search (evt) {
        let obj = evt.target;

        // 清除地图上所有覆盖物
        for (let i = 0, l = this.polygons.length; i < l; i++) {
          this.polygons[i].setMap(null);
        }
        let option = obj[obj.options.selectedIndex];
//          let keyword = option.text; // 关键字
        let adcode = option.adcode;
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

        this.getMap().setCenter(obj[obj.options.selectedIndex].center)
      },

      /**
       * 地图行政区划级联下拉框，点击选项后，地图聚焦事件
       */
      setCenter (evt) {
        let obj = evt.target;
        this.getMap().setCenter(obj[obj.options.selectedIndex].center)
      },

      /**
       * 行政区划查询
       */
      showCascadeSelect () {
        let opts = {
          subdistrict: 1,   // 返回下一级行政区
          level: 'city',
          showbiz: false  // 查询行政级别为 市
        };
        this.citySelect = document.getElementById('city');
        this.districtSelect = document.getElementById('district');
        this.areaSelect = document.getElementById('street');
        this.district = new AMap.DistrictSearch(opts);// 注意：需要使用插件同步下发功能才能这样直接使用
        this.district.search('中国', function (status, result) {
          if (status === 'complete') {
            this.getData(result.districtList[0]);
          }
        }.bind(this));
      },

      /**
       * 实时部署点显示
       */
      showDeployPointRealTime () {
        let self = this;
        let map = this.getMap();
        AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
          let stompClient = null;
          let socket = new SockJS(config.server + '/earthquake-monitor-websocket');
          stompClient = Stomp.over(socket);
          stompClient.connect({}, function (frame) {
            stompClient.subscribe('/topic/deployPoint', function (greeting) {
              let n = JSON.parse(greeting.body);

              // 在地图上显示点坐标
              new SimpleMarker({
                // 添加自定义的class
                containerClassNames: 'my_color',
                // 使用内置的iconStyle
                iconStyle: {
                  src: config.server + '/img/' + n.lightColor + '.png',
                  style: {
                    width: '35px',
                    height: '45px'
                  }
                },
                // 图标文字
                iconLabel: {
                  innerHTML: n.labelText,
                  style: {
                    // 颜色, #333, red等等，这里仅作示例，取iconStyle中首尾相对的颜色
                    color: '#333'
                  }
                },
                // 显示定位点
                // showPositionPoint:true,
                map: map,
                position: [n.longitude, n.latitude]
              })

              // 在左侧部署点列表显示
              self.menus = self._menus.unshift({name: n.companyName, en: n.en, longitude: n.longitude, latitude: n.latitude, id: n.id + ''})
            })
          })
        })
      },

      /**
       * 一次显示所有部署点
       */
      showAllDeployPoints () {
        let self = this;
//          let map = this.getMap();
        AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
          deployPointService.findAllDeployPoint().then(deployPointList => {
            // 在地图上显示点坐标
            deployPointList.forEach((n, i) => {

              let label = ''
              if (i < 6) {
                label = Math.round(Math.random() * 9)
              }

              let marker = new SimpleMarker({
                id: n.id,
                // 添加自定义的class
                containerClassNames: 'depoly-point-color',
                // 使用内置的iconStyle
                iconStyle: {
                  src: config.server + '/img/' + n.lightColor + '.png',
                  style: {
                    width: '25px',
                    height: '35px'
                  }
                },

                // 图标文字
                iconLabel: {
//                                    innerHTML: n.labelText,
                  innerHTML: label,
                  style: {
                    // 颜色, #333, red等等，这里仅作示例，取iconStyle中首尾相对的颜色
                    color: '#333',
                    fontWeight: 900,
                    fontSize: 'larger',
                    marginTop: '-36px',
                    marginLeft: '7px'
                  }
                },
                // 显示定位点
                showPositionPoint: false,
                map: self.amapManager.getMap(),
                position: [n.longitude, n.latitude]
              })

              self.deployPointMarkerList[n.id] = marker

              // marker 点击时打开
              AMap.event.addListener(marker, 'click', function () {
                self.openInfoWin(n.id, self)
              });
            })

            // 显示地震部署点列表
            self.menus = self._menus = deployPointList.map((n, i) => {
              return {name: n.companyName, en: n.en, longitude: n.longitude, latitude: n.latitude, id: n.id + ''}
            })

            // 显示点坐标的信息窗体
            self.deployPointList = deployPointList;
          })
        });
      },

      /**
       * 点击打开信息窗体
       */
      openInfoWin: function (id) {
        let self = this
        this.deployPointList.forEach((n, i) => {
          if (n.id === parseInt(id)) {
            let obj = {
              id: n.id,
              position: [n.longitude, n.latitude],
//            最近加速度值：${Math.round(Math.random() * 9)}<br>
//            最近震动时间：${(new Date()).toLocaleDateString()}<br>
              content: `
                            <span style="font-size:18px;">${n.companyName}</span><br>

                            <!--<span style="font-size:15px;color:#F00;">震级: 3级</span><br>-->
                            <span style="font-size:15px;color:#F00;">坐标:${n.longitude}, ${n.latitude}</span><br>
                            <!--<img src="http://tpc.googlesyndication.com/simgad/5843493769827749134"/><br>-->
                            安装时间：${n.createTime}<br>
                            点位名称：${n.pointName}<br>
                            报警烈度阈值：${n.audioWavIntensity}度<br>
                            报警声播放次数：${n.audioWavCount}次<br>
                            是否播放倒计时：${n.playCountDown ? '播放' : '不播放'}<br>
                            报警灯光是否开启：${n.showLight ? '开启' : '不开启'}<br>
                            <a href="javascript:alert('近期上线')" target="_blank">更多信息</a>
                            `,
              visible: true,
              open: true,
              events: {
                close: function () {
                  self.windows = []
                }
              }
            }
            self.windows = [obj];
          }
        })
      },

      /**
       *  鼠标经过侧边栏点坐标列表，地图点坐标高亮效果
       */
      listenMenuOver: function (index) {
        let simpleMarker = this.deployPointMarkerList[index]

        let il = simpleMarker.get('iconLabel')
        il.style.color = 'white';
        simpleMarker.setIconLabel(il)

        let is = simpleMarker.get('iconStyle')
        this._hover_src = is.src;
        is.src = config.server + '/img/hover.png'
        simpleMarker.setIconStyle(is)
      },

      /**
       *  鼠标经过侧边栏点坐标列表，地图点坐标高亮效果
       */
      listenMenuOut: function (index) {
        let simpleMarker = this.deployPointMarkerList[index]

        let il = simpleMarker.get('iconLabel')
        il.style.color = '#333';
        simpleMarker.setIconLabel(il)

        let is = simpleMarker.get('iconStyle')
        is.src = this._hover_src;
        simpleMarker.setIconStyle(is)
      },

      /**
       * 点击侧边栏某个部署点，地图聚焦
       */
      listenMenuClick: function (index) {
        this.openInfoWin(index)
        this.menus.forEach(i => {
          if (i.id === index) { // 判断去掉
            store.dispatch('setWorksationName', i.name)
//                        this.getMap().setZoomAndCenter(11, [i.longitude, i.latitude]);
            this.getMap().setCenter([i.longitude, i.latitude]);
          }
        })
      },
      /**
       * 侧边栏搜索事件
       * @param searchTExt
       */
      listenMenuSearch: function (searchTExt) {
        if (searchTExt) {
          this.menus = this._menus.filter(i => {
            return i.name.indexOf(searchTExt) !== -1
          })
        } else {
          this.menus = this._menus;
        }
      }
    },
    computed: mapState([
      'clientHeight'
    ])
  }

</script>

<style scoped>
  .main-view {
    padding: 3px 3px 3px 3px;
    border: 1px solid #f4f8ef;
    box-shadow: -2px 0px 2px rgba(0, 0, 0, .3);
  }

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
    width: 140px;
  }

  .explain {
    width: 20px;
    height: 20px;
    display: inline-block;
    line-height: 20px;
    float: left;
    margin-right: 5px;
  }

  /*滚动条样式定制*/
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-track-piece {
    background-color: #eee;
    margin: -2px;
  }

  ::-webkit-scrollbar-thumb {
    background: #82BAAE;
    min-height: 150px;
    min-width: 150px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:vertical:hover {
    background: #555555
  }

  ::-webkit-scrollbar-thumb:horizontal:hover {
    background: #555555
  }

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

  .depoly-point-color {
    font-weight: 900;
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
