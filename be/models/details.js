const {Goodsdetails} = require('../utils/db')
const findDetail = async function(data){
    let findRes = await Goodsdetails.find({goodsId:~~data})
        return findRes
}
module.exports = {findDetail}