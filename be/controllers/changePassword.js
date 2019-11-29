const {sendMail,findOne,changePassword,setCode} = require('../models/email')
const tools = require('../utils/tools')
const sendCode = async function(req,res,next){
  res.set('Content-Type', 'application/json; charset=utf-8')
  const{username} = req.body
  var {mycode} = req.body
  if(username != undefined){
    code = ""
    let codeArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let length = 6; 
    for (let i = 0; i < length; i++)
     { 
       let randomI = Math.floor(Math.random() * 36);
       code+=codeArr[randomI];
      }
     let findRes = await findOne(req.body)
     if(mycode === ''){
      await setCode({"username":username,"code":code})
      if(findRes.length === 0){
        res.render('fail', {
          data: JSON.stringify({
            message: '2'
          })
        })
      }
      else{
        console.log(code);
        sendMail(username,code)
        res.render('succ', {
          data: JSON.stringify({
            message: '1'
          })
        })
      }
     }
    }
    if(mycode != ''){
      res.set('Content-Type', 'application/json; charset=utf-8')
     let username = req.body.username;
     let result =  await findOne({"username":username})
      if(mycode == result[0].code){
        next()
      }
      else{ 
        res.render('fail', {
          data: JSON.stringify({
            message: '2'
          })
        })
      }
    }
  }
 const setPassword = async function(req,res){
  res.set('Content-Type', 'application/json; charset=utf-8')
  var {newPassword,username} = req.body
  let hash = await tools.hash(newPassword)
  await changePassword({
    "username":username,
    "password": hash
  })
  res.render('succ', {
    data: JSON.stringify({
      message: '5'
    })
  })
 }
 
module.exports = {sendCode,setPassword}