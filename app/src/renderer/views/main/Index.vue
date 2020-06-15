<template>
  <div :style="{height:clientHeight+'px',overflowY:'auto',marginLeft: '50px',marginTop:'20px'}">
    <!--<h1>主页</h1>-->
    <!--<p>-->
      <!--显示一些数据统计、分析等图文信息...-->
    <!--</p>-->
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" class="my-panel">
        <e-charts :options="options" ref="polar" auto-resize></e-charts>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" class="my-panel">
        <e-charts :options="options2" ref="polar2" auto-resize></e-charts>
      </el-col>
    </el-row>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
//  import store from '../../store'
//  import ElRow from '../../../../node_modules/element-ui/packages/row/src/row';
  import ECharts from 'vue-echarts'

//  import '../../../../node_modules/echarts/lib/chart/line'
  //    import '../../../../node_modules/echarts/lib/component/title'
  //    import '../../../../node_modules/echarts/lib/component/markPoint'
  //    import '../../../../node_modules/echarts/lib/component/markLine'
  //    import '../../../../node_modules/echarts/lib/component/legend'
  //    import '../../../../node_modules/echarts/lib/component/tooltip'

  var dataMap = {};

  export default {
    components: {
      ECharts
    },
    created(){
      function dataFormatter (obj) {
        var pList = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆'];
        var temp;
        for (var year = 2002; year <= 2011; year++) {
          var max = 0;
          var sum = 0;
          temp = obj[year];
          for (var i = 0, l = temp.length; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = {
              name: pList[i],
              value: temp[i]
            }
          }
          obj[year + 'max'] = Math.floor(max / 100) * 100;
          obj[year + 'sum'] = sum;
        }
        return obj;
      }

      function dataMix (list) {
        var mixData = {};
        for (var i = 0, l = list.length; i < l; i++) {
          for (var key in list[i]) {
            if (list[i][key] instanceof Array) {
              mixData[key] = mixData[key] || [];
              for (var j = 0, k = list[i][key].length; j < k; j++) {
                mixData[key][j] = mixData[key][j] ||
                  {name: list[i][key][j].name, value: []};
                mixData[key][j].value.push(list[i][key][j].value);
              }
            }
          }
        }
        return mixData;
      }

      dataMap.dataGDP = dataFormatter({
        // max : 0,
        2011: [1, 7, 0, 7, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0],
        2010: [3, 4, 4, 0, 2, 7, 7, 0, 0, 5, 2, 0, 7, 0, 0, 2, 7, 7, 0, 0, 4, 0, 5, 2, 4, 0, 0, 0, 0, 0, 7],
        2009: [3, 0, 0, 0, 0, 2, 0, 7, 0, 7, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 4, 0, 0, 2, 0, 0, 0, 7, 0, 0, 7],
        2008: [5, 0, 0, 0, 0, 0, 0, 4, 0, 0, 2, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 3, 0, 1, 2, 0, 4, 0, 0, 0, 3],
        2007: [6, 2, 7, 4, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 2, 0, 0, 7, 0, 4, 0, 2, 4, 2, 0, 7, 0, 0, 1, 3],
        2006: [7, 2, 7, 0, 4, 4, 0, 0, 2, 2, 0, 2, 0, 0, 0, 2, 7, 0, 7, 0, 0, 7, 0, 0, 8, 0, 0, 7, 0, 1, 5],
        2005: [9, 0, 2, 0, 0, 7, 0, 0, 7, 0, 7, 0, 4, 0, 6, 7, 0, 0, 7, 4, 0, 7, 0, 5, 2, 0, 0, 3, 0, 1, 4],
        2004: [3, 0, 7, 0, 1, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 4, 0, 0, 4, 0, 7, 0, 1, 0, 0, 0, 1, 9],
        2003: [7, 0, 0, 0, 0, 2, 2, 7, 4, 2, 0, 0, 3, 7, 0, 7, 7, 0, 4, 0, 1, 0, 0, 0, 6, 0, 7, 0, 0, 1, 6],
        2002: [5, 0, 0, 4, 0, 0, 8, 7, 0, 0, 0, 0, 7, 0, 0, 5, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 1, 2]
      });

      dataMap.dataPI = dataFormatter({
        // max : 0,
        2011: [1, 0, 0, 0, 0, 0, 7, 0, 1, 4, 0, 0, 2, 0, 0, 2, 0, 0, 0, 7, 0, 1, 0, 0, 1, 4, 0, 0, 1, 0, 9],
        2010: [1, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 8, 7, 0, 0, 0, 0, 1, 2, 0, 0, 8, 0, 1, 0, 1, 8],
        2009: [1, 0, 7, 0, 1, 4, 0, 4, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 7, 0, 0, 1, 0, 1, 1],
        2008: [1, 0, 4, 0, 1, 2, 0, 0, 0, 0, 0, 0, 8, 0, 2, 0, 0, 2, 0, 3, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1],
        2007: [1, 0, 4, 0, 1, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 7, 0, 0, 0, 0, 1, 0, 2, 0, 1, 4, 0, 1, 0, 7, 1],
        2006: [8, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 2, 2, 2, 0, 1, 0, 0, 1, 0, 0, 1, 7, 0, 1],
        2005: [8, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 2, 2, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 2, 1],
        2004: [7, 0, 0, 0, 1, 0, 1, 0, 0, 7, 0, 1, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 4, 0, 1, 0, 0, 1],
        2003: [4, 0, 4, 0, 1, 0, 1, 0, 1, 2, 0, 1, 0, 1, 0, 0, 0, 1, 2, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        2002: [2, 4, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 7, 0, 1, 0, 0, 1, 7, 2, 1]
      });

      dataMap.dataSI = dataFormatter({
        // max : 0,
        2011: [2, 0, 0, 0, 7, 2, 0, 2, 7, 0, 0, 0, 9, 0, 7, 7, 0, 0, 7, 0, 0, 0, 0, 4, 0, 0, 0, 7, 0, 0, 2],
        2010: [8, 0, 7, 4, 7, 0, 6, 0, 0, 0, 7, 0, 2, 2, 0, 0, 7, 0, 4, 0, 1, 0, 2, 0, 0, 0, 0, 4, 0, 1, 2],
        2009: [5, 7, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 7, 0, 0, 1, 0, 0, 0, 2, 0, 0, 7, 0, 1, 9],
        2008: [6, 0, 0, 2, 0, 0, 7, 0, 0, 0, 7, 0, 8, 4, 0, 0, 2, 0, 2, 7, 0, 7, 0, 0, 2, 0, 1, 0, 0, 1, 0],
        2007: [9, 2, 0, 4, 0, 4, 0, 5, 0, 1, 4, 0, 0, 0, 7, 2, 0, 7, 4, 0, 0, 0, 8, 4, 0, 8, 0, 0, 0, 1, 7],
        2006: [1, 7, 0, 0, 4, 0, 0, 5, 0, 2, 0, 1, 0, 0, 4, 4, 0, 7, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 1, 9],
        2005: [6, 0, 0, 7, 0, 0, 0, 0, 1, 4, 4, 0, 5, 7, 0, 4, 2, 2, 0, 0, 0, 4, 7, 0, 0, 0, 0, 1, 0, 1, 4],
        2004: [3, 0, 0, 0, 0, 0, 0, 7, 2, 7, 0, 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 1, 0, 1],
        2003: [7, 7, 7, 0, 0, 0, 8, 4, 0, 7, 0, 0, 0, 4, 0, 0, 0, 7, 2, 0, 1, 0, 4, 0, 7, 7, 0, 1, 0, 1, 1],
        2002: [9, 0, 0, 4, 0, 0, 0, 0, 2, 4, 0, 7, 0, 0, 4, 0, 0, 0, 3, 0, 1, 0, 0, 0, 1, 2, 7, 0, 1, 0, 1]
      });

      dataMap.dataTI = dataFormatter({
        // max : 0,
        2011: [3, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 7, 0, 7, 0, 8, 0, 4, 0, 1, 0, 0, 0, 0, 1, 45],
        2010: [0, 0, 0, 2, 0, 9, 0, 0, 0, 0, 0, 3, 0, 0, 0, 7, 0, 0, 0, 0, 0, 1, 0, 7, 2, 0, 0, 0, 0, 1, 6],
        2009: [9, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 2, 0, 7, 0, 0, 7, 2, 2, 0, 0, 4, 0, 0, 0, 0, 0, 3, 0, 1, 7],
        2008: [5, 0, 6, 0, 2, 7, 2, 0, 2, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 4, 0, 1, 1],
        2007: [6, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 6, 0, 0, 0, 2, 0, 0, 0, 7, 0, 1, 6],
        2006: [7, 2, 0, 0, 4, 0, 7, 0, 0, 4, 0, 0, 2, 4, 7, 0, 1, 0, 0, 5, 0, 0, 9, 0, 7, 0, 0, 0, 1, 0, 8],
        2005: [4, 0, 0, 0, 2, 0, 0, 7, 0, 2, 0, 7, 0, 1, 4, 0, 0, 2, 2, 0, 0, 0, 0, 0, 4, 0, 0, 0, 1, 0, 1],
        2004: [2, 0, 0, 5, 0, 0, 0, 7, 7, 0, 4, 0, 0, 0, 4, 2, 2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 4, 0, 1, 0, 1],
        2003: [5, 0, 0, 0, 0, 7, 0, 7, 4, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 8, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        2002: [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1]
      });

      dataMap.dataEstate = dataFormatter({
        // max : 0,
        2011: [4, 0, 1, 0, 1, 0, 1, 0, 0, 7, 7, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 7, 0, 1, 0, 9, 1],
        2010: [6, 0, 1, 0, 1, 0, 1, 0, 2, 0, 0, 0, 1, 0, 2, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 4, 0, 1, 0, 0, 1],
        2009: [2, 0, 1, 0, 1, 0, 1, 0, 7, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 7, 1],
        2008: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 7, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 9],
        2007: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 7, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        2006: [1, 0, 1, 0, 1, 0, 1, 0, 1, 7, 0, 1, 0, 1, 0, 1, 0, 1, 2, 0, 4, 0, 1, 0, 0, 1, 0, 0, 0, 5, 8],
        2005: [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 2, 5],
        2004: [1, 0, 1, 0, 0, 0, 7, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 0, 0, 3],
        2003: [1, 2, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 4, 0, 0, 0, 0, 7],
        2002: [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 3]
      });

      dataMap.dataFinancial = dataFormatter({
        // max : 0,
        2011: [5, 0, 1, 0, 1, 0, 1, 0, 7, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1],
        2010: [3, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 7, 0, 1, 4, 7, 1],
        2009: [3, 0, 1, 0, 1, 0, 1, 0, 4, 0, 0, 0, 1, 0, 4, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 5, 1],
        2008: [9, 0, 1, 0, 1, 0, 1, 0, 4, 0, 0, 0, 1, 0, 1, 0, 1, 0, 2, 0, 7, 0, 1, 0, 1, 2, 0, 2, 0, 4, 1],
        2007: [2, 0, 1, 0, 1, 0, 1, 0, 0, 4, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 4, 0, 1, 0, 1, 0, 1, 0, 7, 0, 1],
        2006: [1, 0, 1, 0, 1, 0, 1, 4, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 9],
        2005: [1, 0, 1, 0, 2, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 7, 0, 4, 0, 2, 0],
        2004: [1, 0, 1, 0, 0, 0, 7, 2, 0, 1, 0, 4, 0, 0, 0, 1, 0, 1, 0, 4, 0, 1, 0, 0, 0, 0, 0, 2, 0, 7, 0],
        2003: [1, 0, 1, 0, 0, 0, 0, 2, 0, 1, 0, 7, 0, 4, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 4, 7, 2, 7, 4, 4],
        2002: [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 2, 0, 0, 0, 0, 1, 0, 1, 2, 7, 2, 0, 0, 2]
      });

      dataMap.dataGDP_Estate = dataMix([dataMap.dataEstate, dataMap.dataGDP]);

      this.options2 = {
        baseOption: {
          timeline: {
            axisType: 'category',
            autoPlay: true,
            playInterval: 1000,
            data: [
              '2002-01-01', '2003-01-01', '2004-01-01',
              '2005-01-01', '2006-01-01', '2007-01-01',
              '2008-01-01', '2009-01-01', '2010-01-01',
              '2011-01-01'
            ],
            label: {
              formatter: function (s) {
                return (new Date(s)).getFullYear();
              }
            }
          },
          title: {
            subtext: 'Media Query 示例'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: 'value',
            name: '次数',
            max: 10,
            data: null
          },
          yAxis: {
            type: 'category',
            data: [
              '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
              '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
              '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
              '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆'
            ],
            axisLabel: {interval: 0},
            splitLine: {show: false}
          },
          legend: {
            data: ['9级', '8级', '7级', '6级', '5级', '4级'],
            selected: {
              '6级': false, '5级': false, '4级': false
            }
          },
          calculable: true,
          series: [
            {name: '6级', type: 'bar'},
            {name: '5级', type: 'bar'},
            {name: '4级', type: 'bar'},
            {name: '9级', type: 'bar'},
            {name: '8级', type: 'bar'},
            {name: '7级', type: 'bar'},
            {name: '6级占比', type: 'pie'}
          ]
        },
        media: [
          {
            option: {
              legend: {
                orient: 'horizontal',
                left: 'right',
                itemGap: 10
              },
              grid: {
                left: '10%',
                top: 80,
                right: 90,
                bottom: 100
              },
              xAxis: {
                nameLocation: 'end',
                nameGap: 10,
                splitNumber: 5,
                splitLine: {
                  show: true
                }
              },
              timeline: {
                orient: 'horizontal',
                inverse: false,
                left: '20%',
                right: '20%',
                bottom: 10,
                height: 40
              },
              series: [
                {name: '6级占比', center: ['75%', '30%'], radius: '28%'}
              ]
            }
          },
          {
            query: {maxWidth: 670, minWidth: 550},
            option: {
              legend: {
                orient: 'horizontal',
                left: 200,
                itemGap: 5
              },
              grid: {
                left: '10%',
                top: 80,
                right: 90,
                bottom: 100
              },
              xAxis: {
                nameLocation: 'end',
                nameGap: 10,
                splitNumber: 5,
                splitLine: {
                  show: true
                }
              },
              timeline: {
                orient: 'horizontal',
                inverse: false,
                left: '20%',
                right: '20%',
                bottom: 10,
                height: 40
              },
              series: [
                {name: '6级占比', center: ['75%', '30%'], radius: '28%'}
              ]
            }
          },
          {
            query: {maxWidth: 550},
            option: {
              legend: {
                orient: 'vertical',
                left: 'right',
                itemGap: 5
              },
              grid: {
                left: 55,
                top: '32%',
                right: 100,
                bottom: 50
              },
              xAxis: {
                nameLocation: 'middle',
                nameGap: 25,
                splitNumber: 3
              },
              timeline: {
                orient: 'vertical',
                inverse: true,
                right: 10,
                top: 150,
                bottom: 10,
                width: 55
              },
              series: [
                {name: '6级占比', center: ['45%', '20%'], radius: '28%'}
              ]
            }
          }
        ],
        options: [
          {
            title: {text: '2002震源分布与震级大小'},
            series: [
              {data: dataMap.dataGDP['2002']},
              {data: dataMap.dataFinancial['2002']},
              {data: dataMap.dataEstate['2002']},
              {data: dataMap.dataPI['2002']},
              {data: dataMap.dataSI['2002']},
              {data: dataMap.dataTI['2002']},
              {
                data: [
                  {name: '9级', value: dataMap.dataPI['2002sum']},
                  {name: '8级', value: dataMap.dataSI['2002sum']},
                  {name: '7级', value: dataMap.dataTI['2002sum']}
                ]
              }
            ]
          },
          {
            title: {text: '2003震源分布与震级大小'},
            series: [
              {data: dataMap.dataGDP['2003']},
              {data: dataMap.dataFinancial['2003']},
              {data: dataMap.dataEstate['2003']},
              {data: dataMap.dataPI['2003']},
              {data: dataMap.dataSI['2003']},
              {data: dataMap.dataTI['2003']},
              {
                data: [
                  {name: '9级', value: dataMap.dataPI['2003sum']},
                  {name: '8级', value: dataMap.dataSI['2003sum']},
                  {name: '7级', value: dataMap.dataTI['2003sum']}
                ]
              }
            ]
          },
          {
            title: {text: '2004震源分布与震级大小'},
            series: [
              {data: dataMap.dataGDP['2004']},
              {data: dataMap.dataFinancial['2004']},
              {data: dataMap.dataEstate['2004']},
              {data: dataMap.dataPI['2004']},
              {data: dataMap.dataSI['2004']},
              {data: dataMap.dataTI['2004']},
              {
                data: [
                  {name: '9级', value: dataMap.dataPI['2004sum']},
                  {name: '8级', value: dataMap.dataSI['2004sum']},
                  {name: '7级', value: dataMap.dataTI['2004sum']}
                ]
              }
            ]
          },
          {
            title: {text: '2005震源分布与震级大小'},
            series: [
              {data: dataMap.dataGDP['2005']},
              {data: dataMap.dataFinancial['2005']},
              {data: dataMap.dataEstate['2005']},
              {data: dataMap.dataPI['2005']},
              {data: dataMap.dataSI['2005']},
              {data: dataMap.dataTI['2005']},
              {
                data: [
                  {name: '9级', value: dataMap.dataPI['2005sum']},
                  {name: '8级', value: dataMap.dataSI['2005sum']},
                  {name: '7级', value: dataMap.dataTI['2005sum']}
                ]
              }
            ]
          },
          {
            title: {text: '2006震源分布与震级大小'},
            series: [
              {data: dataMap.dataGDP['2006']},
              {data: dataMap.dataFinancial['2006']},
              {data: dataMap.dataEstate['2006']},
              {data: dataMap.dataPI['2006']},
              {data: dataMap.dataSI['2006']},
              {data: dataMap.dataTI['2006']},
              {
                data: [
                  {name: '9级', value: dataMap.dataPI['2006sum']},
                  {name: '8级', value: dataMap.dataSI['2006sum']},
                  {name: '7级', value: dataMap.dataTI['2006sum']}
                ]
              }
            ]
          },
          {
            title: {text: '2007震源分布与震级大小'},
            series: [
              {data: dataMap.dataGDP['2007']},
              {data: dataMap.dataFinancial['2007']},
              {data: dataMap.dataEstate['2007']},
              {data: dataMap.dataPI['2007']},
              {data: dataMap.dataSI['2007']},
              {data: dataMap.dataTI['2007']},
              {
                data: [
                  {name: '9级', value: dataMap.dataPI['2007sum']},
                  {name: '8级', value: dataMap.dataSI['2007sum']},
                  {name: '7级', value: dataMap.dataTI['2007sum']}
                ]
              }
            ]
          },
          {
            title: {text: '2008震源分布与震级大小'},
            series: [
              {data: dataMap.dataGDP['2008']},
              {data: dataMap.dataFinancial['2008']},
              {data: dataMap.dataEstate['2008']},
              {data: dataMap.dataPI['2008']},
              {data: dataMap.dataSI['2008']},
              {data: dataMap.dataTI['2008']},
              {
                data: [
                  {name: '9级', value: dataMap.dataPI['2008sum']},
                  {name: '8级', value: dataMap.dataSI['2008sum']},
                  {name: '7级', value: dataMap.dataTI['2008sum']}
                ]
              }
            ]
          },
          {
            title: {text: '2009震源分布与震级大小'},
            series: [
              {data: dataMap.dataGDP['2009']},
              {data: dataMap.dataFinancial['2009']},
              {data: dataMap.dataEstate['2009']},
              {data: dataMap.dataPI['2009']},
              {data: dataMap.dataSI['2009']},
              {data: dataMap.dataTI['2009']},
              {
                data: [
                  {name: '9级', value: dataMap.dataPI['2009sum']},
                  {name: '8级', value: dataMap.dataSI['2009sum']},
                  {name: '7级', value: dataMap.dataTI['2009sum']}
                ]
              }
            ]
          },
          {
            title: {text: '2010震源分布与震级大小'},
            series: [
              {data: dataMap.dataGDP['2010']},
              {data: dataMap.dataFinancial['2010']},
              {data: dataMap.dataEstate['2010']},
              {data: dataMap.dataPI['2010']},
              {data: dataMap.dataSI['2010']},
              {data: dataMap.dataTI['2010']},
              {
                data: [
                  {name: '9级', value: dataMap.dataPI['2010sum']},
                  {name: '8级', value: dataMap.dataSI['2010sum']},
                  {name: '7级', value: dataMap.dataTI['2010sum']}
                ]
              }
            ]
          },
          {
            title: {text: '2011震源分布与震级大小'},
            series: [
              {data: dataMap.dataGDP['2011']},
              {data: dataMap.dataFinancial['2011']},
              {data: dataMap.dataEstate['2011']},
              {data: dataMap.dataPI['2011']},
              {data: dataMap.dataSI['2011']},
              {data: dataMap.dataTI['2011']},
              {
                data: [
                  {name: '9级', value: dataMap.dataPI['2011sum']},
                  {name: '8级', value: dataMap.dataSI['2011sum']},
                  {name: '7级', value: dataMap.dataTI['2011sum']}
                ]
              }
            ]
          }
        ]
      }
    },
    data() {
      return {
        activeName: 'first',
        value1: 12,
        options: {
          baseOption: {
            title: {
              text: '震级频次总计',
              subtext: '还没有数据，纯属虚构',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              data: ['9级', '8级', '7级', '6级', '5级', '4级', '3级', '2级']

            },
            toolbox: {
              show: true,
              feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {
                  show: true,
                  type: ['pie', 'funnel']
                },
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            calculable: true,
            series: [
              {
                name: '余震次数',
                type: 'pie',
                roseType: 'radius',
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: true
                  }
                },
                lableLine: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: true
                  }
                },
                data: [
                  {value: 10, name: '9级'},
                  {value: 5, name: '8级'},
                  {value: 15, name: '7级'},
                  {value: 25, name: '6级'},
                  {value: 20, name: '5级'},
                  {value: 35, name: '4级'},
                  {value: 30, name: '3级'},
                  {value: 40, name: '2级'}
                ]
              },
              {
                name: '主震次数',
                type: 'pie',
                roseType: 'area',
                data: [
                  {value: 10, name: '9级'},
                  {value: 5, name: '8级'},
                  {value: 15, name: '7级'},
                  {value: 25, name: '6级'},
                  {value: 20, name: '5级'},
                  {value: 35, name: '4级'},
                  {value: 30, name: '3级'},
                  {value: 40, name: '2级'}
                ]
              }
            ]
          },
          media: [
            {
              option: {
                legend: {
                  right: 'center',
                  bottom: 0,
                  orient: 'horizontal'
                },
                series: [
                  {
                    radius: [20, '50%'],
                    center: ['25%', '50%']
                  },
                  {
                    radius: [30, '50%'],
                    center: ['75%', '50%']
                  }
                ]
              }
            },
            {
              query: {
                minAspectRatio: 1
              },
              option: {
                legend: {
                  right: 'center',
                  bottom: 0,
                  orient: 'horizontal'
                },
                series: [
                  {
                    radius: [20, '50%'],
                    center: ['25%', '50%']
                  },
                  {
                    radius: [30, '50%'],
                    center: ['75%', '50%']
                  }
                ]
              }
            },
            {
              query: {
                maxAspectRatio: 1
              },
              option: {
                legend: {
                  right: 'center',
                  bottom: 0,
                  orient: 'horizontal'
                },
                series: [
                  {
                    radius: [20, '50%'],
                    center: ['50%', '30%']
                  },
                  {
                    radius: [30, '50%'],
                    center: ['50%', '70%']
                  }
                ]
              }
            },
            {
              query: {
                maxWidth: 750
              },
              option: {
                legend: {
                  right: 10,
                  top: '15%',
                  orient: 'vertical'
                },
                series: [
                  {
                    radius: [20, '50%'],
                    center: ['50%', '30%']
                  },
                  {
                    radius: [30, '50%'],
                    center: ['50%', '75%']
                  }
                ]
              }
            }
          ]
        },
        options2: {},
        options3: {}

      }
    },
    computed: mapState([
      'clientHeight'
    ])
  }
</script>

<style scoped>
  .echarts {
    width: 100%;
    min-height: 600px;
    height: 800px;
  }

  .my-charts {
    min-height: 800px;
  }

  .my-panel {
    /*padding: 20px 20px;*/
    box-shadow: 0px 0px 5px #888;
  }
</style>
