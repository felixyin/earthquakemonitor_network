<template>
  <div class="amap-wrapper">
    <!--<div >{{realTimeEarlyWarning}}</div>-->
    <el-row>

      <el-col :span="5">
        <!-- 左侧部署点列表 -->
        <early-warning-intensity-sidebar :menus="menus"
                                         v-on:menuClick="listenMenuClick"
                                         v-on:menuOver="listenMenuOver"
                                         v-on:menuOut="listenMenuOut"
                                         v-on:menuSearch="listenMenuSearch"
                                         :style="{height:clientHeight+'px'}">
        </early-warning-intensity-sidebar>
      </el-col>

      <el-col :span="19" class="main-view" :style="{height:clientHeight+'px'}">

        <!-- 地图上的下拉选择框 -->
        <div id="tip">
          省：<select id='province' style="width:100px" v-on:change='search'></select>
          市：<select id='city' style="width:100px" v-on:change='search'></select>
          区：<select id='district' style="width:100px" v-on:change='search'></select>
          <span style="display: none;">街道：<select id='street' style="width:100px" v-on:change='setCenter'></select></span>
        </div>

        <!-- 地图标签 -->
        <el-amap vid="earlyWarningIntensity"
                 :zoom="zoom"
                 :map-manager="amapManager"
                 :plugin="plugin"
                 :events="events">

          <!-- 显示烈度 -->
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

          <!-- 显示点坐标 -->
          <el-amap-marker v-for="marker in markers"
                          :vid="marker.id"
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
                               :events="window.events"

          >
          </el-amap-info-window>

        </el-amap>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 6px;">颜色烈度对照</span>
          </div>

          <div v-for="explain in circles2" class="text item">

            <div class="explain" :style="{backgroundColor: explain.color, opacity:0.4}"></div>

            {{explain.desc}}
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
  import * as earlyWarningIntensityService from '../../services/early-warning-intensity'
  import EarlyWarningIntensitySidebar from '../../components/EarlyWarningIntensitySidebar'

  // map 管理对象
  let amapManager = new AMapManager();

  export default {
    name: 'earlyWarningIntensity',
    components: {
      EarlyWarningIntensitySidebar
    },
    mounted() {
      this.circles2 = [
        {color: '#FF0008', desc: '烈度 ≧ 8', checked: true},
        {color: '#FF9000', desc: '6 ≦ 烈度 < 8', checked: true},
        {color: '#FFF600', desc: '4 ≦ 烈度 < 6', checked: true},
        {color: '#1400FF', desc: '烈度 < 4', checked: true}
      ]

      let self = this;

      setTimeout(function () {
        self.showHypocenter()
      })
      setTimeout(function () {
        self.showCascadeSelect()
      })
      setTimeout(function () {
        self.showYuJingRealTime()
      })
      setTimeout(function () {
        self.showAllDeployPoints()
      })
    },
    data () {
      return {
        // 所有的震源原始收
        earlyWarningIntensityList: [],
        // 震源标记
        earlyWarningIntensityMarkerList: {},

        // 所有的部署点原始数据
        deployPointList: undefined,
        // 部署点坐标标记
        deployPointMarkerList: {},

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
        zoom: 9,
        // 地图显示的聚焦位置
        // center: [120.4307550000, 36.1651000000],
        // 规则的预警烈度区域
        circles: [],
        circles2: [],
        // 地图上的点坐标
        markers: [
//                    {
//                        id: 0,
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
       * 一次显示所有震源
       */
      showHypocenter () {
        let self = this;
//          let map = this.getMap();
        AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
          earlyWarningIntensityService.findAll().then(ewiList => {
            // 在地图上显示点坐标
            ewiList.forEach((n, i) => {
              let marker = new SimpleMarker({
                id: n.id,
                // 添加自定义的class
                containerClassNames: 'depoly-point-color',
                // 使用内置的iconStyle
                iconStyle: {
                  src: config.server + '/img/hypo.png',
                  style: {
                    width: '35px',
                    height: '45px'
                  }
                },
                // 图标文字
                iconLabel: {
                  innerHTML: '',
                  style: {
                    // 颜色, #333, red等等，这里仅作示例，取iconStyle中首尾相对的颜色
                    color: '#333'
                  }
                },
                // 显示定位点
                showPositionPoint: false,
                map: self.amapManager.getMap(),
                position: [n.longitude, n.latitude]
              })

              self.earlyWarningIntensityMarkerList[n.id] = marker

              // marker 点击时打开
              AMap.event.addListener(marker, 'click', function () {
                self.openHypoCenterWin(n.id, self)
              });
            })

            self.menus = self._menus = ewiList.map((n, i) => {
              return {
                name: n.location,
                en: n.en,
                longitude: n.longitude,
                latitude: n.latitude,
                otime: n.otime,
                magitude: n.magitude,
                id: n.id + ''
              }
            })

            // 显示点坐标的信息窗体
//                        console.log(ewiList)
            self.earlyWarningIntensityList = ewiList;
          })
        });
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
      showYuJingRealTime (json, oldJson) {
        let self = this;
        if (!json) { // 在其他模块，先切换过来后，通过本地存储获取数据
          json = window.localStorage.getItem('earlyWarningIntensity')
        } else { // 性能优化
          if (json === oldJson) return;
        }
        if (json) { // 在当前模块通过state获取数据
          let n = JSON.parse(json);
          console.log(n)
          window.localStorage.removeItem('earlyWarningIntensity')

          // 在地图上显示点坐标
          AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
            let marker = new SimpleMarker({
              id: n.id,
              // 添加自定义的class
              containerClassNames: 'depoly-point-color',
              // 使用内置的iconStyle
              iconStyle: {
                src: config.server + '/img/hypo.png',
                style: {
                  width: '35px',
                  height: '45px'
                }
              },
              // 图标文字
              iconLabel: {
                innerHTML: '',
                style: {
                  // 颜色, #333, red等等，这里仅作示例，取iconStyle中首尾相对的颜色
                  color: '#333'
                }
              },
              // 显示定位点
              showPositionPoint: false,
              map: self.amapManager.getMap(),
              position: [n.longitude, n.latitude]
            })

            self.earlyWarningIntensityMarkerList[n.id] = marker

            // marker 点击时打开
            AMap.event.addListener(marker, 'click', function () {
              self.openHypoCenterWin(n.id, self)
            });

            self.menus.unshift({
              name: n.location,
              en: n.en,
              longitude: n.longitude,
              latitude: n.latitude,
              otime: n.otime,
              magitude: n.magitude,
              id: n.id + ''
            })

            // 显示点坐标的信息窗体
            self.earlyWarningIntensityList.unshift(n);

            setTimeout(function () {
              self.openHypoCenterWin(n.id, self)
              self.getMap().setCenter([n.longitude, n.latitude]);
            }, 200)

          })

        }
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
                  style: {
                    // 颜色, #333, red等等，这里仅作示例，取iconStyle中首尾相对的颜色
                    color: '#333'
                  }
                },
                // 显示定位点
                showPositionPoint: true,
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
//                        self.menus = self._menus = deployPointList.map((n, i) => {
//                            return {name: n.companyName, en: n.en, longitude: n.longitude, latitude: n.latitude, id: n.id + ''}
//                        })

            // 显示点坐标的信息窗体
            self.deployPointList = deployPointList;
          })
        });
      },

      /**
       * 点击打开信息窗体
       */
      openInfoWin: function (id) {
        let self = this;
        this.deployPointList.forEach((n, i) => {
          if (n.id == id) {
            let obj = {
              id: n.id,
              position: [n.longitude, n.latitude],
              content: `<span style="font-size:18px;">${n.companyName}</span><br>
                        <!--<span style="font-size:15px;color:#F00;">震级: 3级</span><br>-->
                        <span style="font-size:15px;color:#F00;">坐标:${n.longitude}, ${n.latitude}</span><br>
                        <!--<img src="http://tpc.googlesyndication.com/simgad/5843493769827749134"/><br>-->
                        安装时间：${n.createTime}<br>
                        点位名称：${n.cityName}<br>
                        报警烈度阈值：${n.audioWavIntensity}度<br>
                        报警声播放次数：${n.audioWavCount}次<br>
                        是否播放倒计时：${n.playCountDown ? '播放' : '不播放'}<br>
                        报警灯光是否开启：${n.showLight ? '开启' : '不开启'}<br>
                        <a href="javascript:alert('近期上线')" target="_blank">详细信息</a>
                        `,
              visible: true,
              open: true,
              events: {
                close: function () {
//                  self.windows.shift()
                }
              }
            }
//            self.windows = []
            self.windows.push(obj);
          }
        })
      },

      /**
       * 点击打开预警烈度图
       */
      openHypoCenterWin: function (id) {
        this.earlyWarningIntensityList.forEach((n, i) => {
          if (n.id == id) {
            let obj = {
              id: n.id,
              position: [n.longitude, n.latitude],
              content: `
                            <span style="font-size:18px;">${n.location}</span><br>
                            <span style="font-size:17px;color:#F00;">震级: ${n.magitude}级</span><br>
                            <!--<span style="font-size:15px;color:#F00;">坐标:${n.longitude}, ${n.latitude}</span><br>-->
                            <!--<img src="http://tpc.googlesyndication.com/simgad/5843493769827749134"/><br>-->
                            地震时间：${n.otime}<br>
                            坐标:${n.longitude}, ${n.latitude}<br>
                            <a href="http://ditu.amap.com/detail/B000A8URXB?citycode=110105" target="_blank">详细信息</a>
                            `,
              visible: true,
              open: true,
              events: {
                close: function () {
//                  self.windows.shift()
                }
              }
            }
//            self.windows = []
            this.windows.push(obj);

            this.circles = []
            let magitude = parseInt(n.magitude);
            if (magitude >= 8) {
              let biLv = parseInt((Math.random() * 0.9 + 1).toFixed(2))
              this.circles = [{
                color: '#FF0008',
                desc: '烈度 ≧ 8',
                checked: true,
                center: [n.longitude, n.latitude],
                radius: 20000 * biLv,
                zIndex: 1000,
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
                  center: [n.longitude, n.latitude],
                  radius: 40000 * biLv,
                  zIndex: 900,
                  strokeColor: '#FF9000',
                  fillOpacity: 0.3,
                  fillColor: '#FF9000',
                  events: {
                    click: () => {
                    }
                  }
                }, {
                  color: '#FFF600',
                  desc: '4 ≦ 烈度 < 6',
                  checked: true,
                  center: [n.longitude, n.latitude],
                  radius: 70000 * biLv,
                  zIndex: 800,
                  strokeColor: '#FFF600',
                  fillOpacity: 0.3,
                  fillColor: '#FFF600',
                  events: {
                    click: () => {
                    }
                  }
                }, {
                  color: '#1400FF',
                  desc: '烈度 < 4',
                  checked: true,
                  center: [n.longitude, n.latitude],
                  radius: 120000 * biLv,
                  zIndex: 700,
                  strokeColor: '#1400FF',
                  fillOpacity: 0.3,
                  fillColor: '#1400FF',
                  events: {
                    click: () => {
                    }
                  }
                }]
            }
            if (magitude >= 6 && magitude <= 8) {
              let biLv = parseInt((Math.random() * 0.6 + 1).toFixed(2))

              this.circles = [{
                color: '#FF9000',
                desc: '6 ≦ 烈度 < 8',
                checked: true,
                center: [n.longitude, n.latitude],
                radius: 30000 * biLv,
                zIndex: 190,
                strokeColor: '#FF9000',
                fillOpacity: 0.3,
                fillColor: '#FF9000',
                events: {
                  click: () => {
                  }
                }
              }, {
                color: '#FFF600',
                desc: '4 ≦ 烈度 < 6',
                checked: true,
                center: [n.longitude, n.latitude],
                radius: 60000 * biLv,
                zIndex: 180,
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
                  center: [n.longitude, n.latitude],
                  radius: 100000 * biLv,
                  zIndex: 60,
                  strokeColor: '#1400FF',
                  fillOpacity: 0.3,
                  fillColor: '#1400FF',
                  events: {
                    click: () => {
                    }
                  }
                }]
            }
            if (magitude >= 4 && magitude < 6) {
              let biLv = parseInt((Math.random() * 0.4 + 1).toFixed(2))

              this.circles = [{
                color: '#FFF600',
                desc: '4 ≦ 烈度 < 6',
                checked: true,
                center: [n.longitude, n.latitude],
                radius: 40000 * biLv,
                zIndex: 100,
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
                  center: [n.longitude, n.latitude],
                  radius: 70000 * biLv,
                  zIndex: 70,
                  strokeColor: '#1400FF',
                  fillOpacity: 0.3,
                  fillColor: '#1400FF',
                  events: {
                    click: () => {
                    }
                  }
                }]
            }
            if (magitude < 4) {
              let biLv = parseInt((Math.random() * 0.2 + 1).toFixed(2))

              this.circles = [{
                color: '#1400FF',
                desc: '烈度 < 4',
                checked: true,
                center: [n.longitude, n.latitude],
                radius: 70000 * biLv,
//                zIndex: 70,
                strokeColor: '#1400FF',
                fillOpacity: 0.3,
                fillColor: '#1400FF',
                events: {
                  click: () => {
                  }
                }
              }]
            }

          }
        })
      },

      /**
       *  鼠标经过侧边栏点坐标列表，地图点坐标高亮效果
       */
      listenMenuOver: function (index) {
        let simpleMarker = this.earlyWarningIntensityMarkerList[index]

        let il = simpleMarker.get('iconLabel')
        il.style.color = 'white';
        simpleMarker.setIconLabel(il)

        let is = simpleMarker.get('iconStyle')
        this._hover_src = is.src;
        is.src = config.server + '/img/hypohover.png'
        simpleMarker.setIconStyle(is)
      }
      ,

      /**
       *  鼠标经过侧边栏点坐标列表，地图点坐标高亮效果
       */
      listenMenuOut: function (index) {
        let simpleMarker = this.earlyWarningIntensityMarkerList[index]

        let il = simpleMarker.get('iconLabel')
        il.style.color = '#333';
        simpleMarker.setIconLabel(il)

        let is = simpleMarker.get('iconStyle')
        is.src = this._hover_src;
        simpleMarker.setIconStyle(is)
      }
      ,

      /**
       * 点击侧边栏某个部署点，地图聚焦
       */
      listenMenuClick: function (index) {
        this.openHypoCenterWin(index)
        this.menus.forEach(i => {
          if (i.id === index) { // 判断去掉
            store.dispatch('setWorksationName', i.name)
            this.getMap().setCenter([i.longitude, i.latitude]);
          }
        })
      }
      ,
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
    computed: mapState({
      clientHeight: state => {
        return state.clientHeight
      },
      realTimeEarlyWarning: state => {
        return state.realTimeEarlyWarning
      }
    }),
    watch: {
      'realTimeEarlyWarning': {
        handler: 'showYuJingRealTime',
        deep: false
      }
    }
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

  .el-card__body {
    padding: 10px;
  }

  .el-card__body {
    padding: 10px;
  }
</style>
