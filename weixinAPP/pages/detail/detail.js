const app = getApp()
var util = require('../../utils/util.js');
var PH = [];
var COD = [];
var NH3N = [];
var TP = [];
var datetime = [];
import * as echarts from '../../ec-canvas/echarts';
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '园区泵站',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8", "#000000"],
    legend: {
      data: ['PH', 'COD', 'NH3N', 'TP'],
      top: 50,
      left: 'center',
    
      z: 100
    },

    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        } 
      }
      // show: false
    },
    series: [{
      name: 'PH',
      type: 'line',
      smooth: true,
       data: [18, 36, 65, 30, 78, 40, 33]
      
    }, {
      name: 'COD',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
      
    }, {
      name: 'NH3N',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }, {
      name: 'TP',
      type: 'line',
      smooth: true,
       data: [11, 22, 11, 52, 1, 21, 11]
    }]
  };
  chart.setOption(option);
  return chart;
}

Page({
  data: {
    onShareAppMessage: function (res) {
      return {
        title: '水质在线',
        path: '/pages/lists/lists',
        success: function () { },
        fail: function () { }
      }
    },
    ec: {
      onInit: initChart
    },

    info: {
      id: 1,
      title: "历史曲线",
      img: "../../images/1.png",
      cTime: '2018-12-12 00:00:00',
      content: "这是关于园区泵站趋势测试"
    }

  },
  //事件处理函数

  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    setInterval(function () {
      wx.request({
        url: 'https://yuanshengqi.top/default.aspx?method=getdata', //仅为示例，并非真实的接口地址
        header: {
          'Content-Type': 'application/json'
        },

        success(res) {
          PH.push(res.data[0].PH);
          COD.push(res.data[0].COD);
          NH3N.push(res.data[0].NH3N);
          TP.push(res.data[0].TP);
          datetime.push(res.data[0].datetimee);
          console.log(Date.parse(datetime[0]));
          console.log(datetime[1]);
          initChart;
        }


      })
    }, 60000)

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

})