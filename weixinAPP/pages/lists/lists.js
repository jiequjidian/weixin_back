//lists.js
const app = getApp()
Page({
  data: {
    newsList: [
    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    setInterval(function(){
     
      wx.request({
        url: 'https://yuanshengqi.top/default.aspx?method=getdata', //仅为示例，并非真实的接口地址
        header: {
          'Content-Type': 'application/json'
        },
        success(res) {
          that.setData({
            newsList: res.data
          })
          console.log(res.data)
        }
      })
    },60000)
    
  },
  onShow:function(){
    var that = this
      wx.request({
        url: 'https://yuanshengqi.top/default.aspx?method=getdata', //仅为示例，并非真实的接口地址
        header: {
          'Content-Type': 'application/json'
        },
        success(res) {
          that.setData({
            newsList: res.data
          })
          console.log(res.data) 
      }
  })
  }
 })
 



