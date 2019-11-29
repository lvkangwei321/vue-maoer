const {User} = require('../utils/db')
const findOne = (data) => {
  const user = new User(data)
  return  User.find({ 'username': user.username },  function (err) {
    if(err){
      console.log(err);
    }
    });
  }
  module.exports = {
    findOne,
  }