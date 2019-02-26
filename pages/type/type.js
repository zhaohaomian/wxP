// pages/type/type.js
let request = require('../../util/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 显示下部显示框
  showBar(){
    let type = this.data.headerImgMsg.title;
    let array = ['内容过期', `内容和${type}不相关`, `不再显示来自${type}的内容`];
    wx.showActionSheet({
      itemList: array,
      itemColor: '#00b26a',
      success(res) {
        console.log(res.tapIndex)
      }
    })
  },
  // 获取缓存
  getStorage() {
    let likeArr = wx.getStorageSync('typelikeArray');
    if (!likeArr) {
      likeArr = {};
    };
    this.setData({
      typelikeArray: likeArr
    })
  },
  // 监听喜欢不喜欢
  onChangeLike(e) {
    let index = e.currentTarget.dataset.index;
    let typelikeArray = this.data.typelikeArray;
    let result = !this.data.typelikeArray[index];
    typelikeArray[index] = result;
    this.setData({
      typelikeArray: typelikeArray
    })
    wx.setStorageSync('typelikeArray', typelikeArray)
  },
  // 点击内容跳转
  onTap(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/article/article?id=${id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    request({
      url:`https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleTypeTitleInfo/${options.id}`,
      success:(data)=>{
        this.setData({
          ['headerImgMsg']:data
        })
      }
    });
    request({
      url: `https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleTypeList/${options.id}`,
      success: (data) =>{
        this.setData({
          ['articleList']: data
        })
      }
    })
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