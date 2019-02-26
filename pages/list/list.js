// pages/list.js

let request = require('../../util/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  onPassMsg(e){
    let type = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:`/pages/type/type?id=${type}`
    })
  },
  onAudioPlay(e){
    let audio = wx.getBackgroundAudioManager();
    audio.setSrc(e.current.dataset.src)
  },
  // 喜欢 和 取消喜欢的 函数监听
  onChangeLike(e){
    let index = e.currentTarget.dataset.index;
    let likeArray = this.data.likeArray;
    let result = !this.data.likeArray[index];
    likeArray[index] =result;
    this.setData({
      likeArray:likeArray
    })
    wx.setStorageSync('likeArray', likeArray)
  },


  // 显示 showActionSheet
  showBar(e){
    let type = e.target.dataset.articletype;
    console.log(e.target.dataset)
    let array = ['内容过期', `内容和${type}不相关`, `不再显示来自${type}的内容`];
    wx.showActionSheet({
      itemList:array,
      itemColor:'#00b26a',
      success(res){
        console.log(res.tapIndex)
      }
    })
  },

  // 获取缓存
  getStorage(){
    let likeArr = wx.getStorageSync('likeArray');
    if (!likeArr) {
      likeArr = {};
    };
    this.setData({
      likeArray: likeArr
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取头部日期 大图 推荐文
    request({
      url: `https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getRecommendInfo`,
      success: (data) => {
        this.setData({
          ['recommend']: data
        })
      }
    });
    // 获取 “女性穿搭”等 标签
    request({
      url: `https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getMarkTypeList`,
      success: (data) => {
        this.setData({
          ['markType']: data
        })
      }
    });
    // 获取文章列表的信息
    request({
      url: `https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getHomeArticleList`,
      success: (data) => {
        this.setData({
          ['articleList']: data
        })
      }
    });
    // 获取缓存
    this.getStorage();
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
    console.log(2)
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