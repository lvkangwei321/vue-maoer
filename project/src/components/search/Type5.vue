<template>
  <div class="type5">
      <div class="drama-list">
          <div class="drama-item" 
          v-for="item in res"
          :key="item.id"
          @click="handleClick(item)"
          >
              <img :src="item.cover" alt="">
              <div class="details">
                  <div class="name">{{item.name}}</div>
                  <div class="drama-type">
                      <span>{{item.catalog_name}}</span>
                      <span>类型：{{item.type_name}}</span>
                  </div>
                  <span class="status">长篇完结</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {get} from 'utils/http.js'
export default {
data() {
    return {
        res:[]
    }
},
async mounted() {
    var value = encodeURI(this.$route.params.id);
     var res =   await get({
            url:`/api/dramaapi/search?s=${value}&p=1`
        })   
        this.res = res.info.Datas
},
methods: {
    handleClick(item){
        console.log(item)
        this.$router.push(`/drama/${item.id}`)
    }
},
}
</script>

<style lang='stylus' scoped>
.drama-item 
    display: block;
    position: relative;
    width: 100%;
    height: 90px;
    margin: 0;
    padding: 10px;
    img 
        width: 70px;
        height: 70px;
        display: block;
        overflow: hidden;
        position: relative;
        border-radius: 4px;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 100%;
    .details 
        position: absolute;
        top: 10px;
        right: 0;
        left: 0;
        padding-left: 90px;
        .name 
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #000;
        .drama-type 
            margin-top: 8px;
            color: #9e9e9e;
            font-size: 12px;
            span 
                width: 50%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                display: inline-block;
        .status 
            color: #9e9e9e;
            font-size: 12px;
.drama-item:after 
    content: "";
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 10px;
    border-bottom: 1px solid #e0e0e0;
</style>