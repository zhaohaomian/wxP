
module.exports = function({url,success}){
  wx.request({
    url: url,
    success: (res) => {
       success(res.data.data)
    }
  });
}