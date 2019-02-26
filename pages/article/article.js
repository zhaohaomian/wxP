// pages/article/article.js
let request = require('../../util/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onAudioPlay(e) {
    let audio = wx.getBackgroundAudioManager();
    console.log(e.target.dataset.src);
    audio.title = e.target.dataset.title;
    audio.src=e.target.dataset.src;

    audio.onTimeUpdate(()=>{
      let allTime = 401; 
      let percent = audio.currentTime / allTime * 100 ;

      this.setData({
        percent:percent,
        nowTime :audio.currentTime.toFixed()
      })
    })

  },
  // ajax(id){
  //   wx.request({
  //     url:'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleDetail/'+id,
  //     success:(res)=>{
  //       this.setData({
  //         article:res.data.data
  //       })
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
      url: `https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleDetail/${options.id}`,
      success: (data) => {
        this.setData({
          ['article']: data
        })
      }
    });


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})