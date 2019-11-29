const fs = require('fs')
const path = require('path')
const deleteFile = async function(req,res,next){
    console.log(req.body.goodsLogo.split('/'));
   var imgName = req.body.goodsLogo.split('/')[4]
   fs.unlink(path.resolve(__dirname, `../public/upload/${imgName}`), (err) => {
    if (err) {
      console.log(err.message)
    }
  })
  res.set('Content-Type', 'application/json; charset=utf-8')
  res.render('succ', {
    data: JSON.stringify({
      message: "取消成功"
    })
  })
}
module.exports = {deleteFile}