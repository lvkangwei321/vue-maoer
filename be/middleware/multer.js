const multer = require('multer');
const path = require('path')
const randomstring = require('randomstring')
const fs = require('fs')
      var filename = "";
      var filenameMap = {
        "image/png":'.png',
        "image/jpg":".jpg",
        "image/jpeg":".jpeg",
        "image/gif":".gif"
      }
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.resolve(__dirname,"../public/upload"))
        },
        filename: function (req, file, cb) {
          
            let { fieldname, mimetype } = file
            filename = fieldname + randomstring.generate(6) + filenameMap[mimetype]
          cb(null,filename)
        }
      })
      const upload =  multer({ storage: storage }).single('goodsLogo')
  
  module.exports = (req, res, next) => {
    upload(req, res, (err) => {
      if(filename){
        res.render('succ', {
          data: JSON.stringify({
            message: '储存成功',
            filename : "http://localhost:3000/upload/" + filename
          })
        });
        if(err) {
          console.log(err.message)
        }
      }
      else{
        next()
      }
    })
  };