<template>
<div id="type1">
    <div class="search-user" 
    v-for="item in res"
    :key="item.id"
    @click="handleClick(item)"
    >
        <img :src="item.avatar2" alt="">
        <div class="user-info">
            <span class="name">{{item.username}}</span>
            <div class="details">
                <span>音频：{{item.soundnumchecked}}</span>
                <span>粉丝：{{item.fansnum}}</span>
            </div>
                    <div class="intro">
            {{item.userintro}}
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
            res:[],
        }
    },
    methods: {
        handleClick(item){
            window.open(`https://www.missevan.com/${item.id}/sound`)
        }
    },
async mounted() {
    var value = encodeURI(this.$route.params.id);
 var res = await get({
     url:`/api/sound/getsearch?s=${value}&type=1&page_size=10&p=1`
 })
 this.res = res.info.Datas
},
}
</script>

<style lang="stylus" scoped>
#type1
    .search-user 
        display: flex;
        position: relative;
        width: 100%;
        height: 80px;
        margin-left: 10px;
        padding: 10px;
        padding-left: 0;
        border-bottom: 1px solid #e0e0e0;
        img 
            position: relative;
            width: 60px;
            border-radius: 50%;
            display: block;
            height: 60px;
        .user-info 
            margin-left: 10px;
            height: 60px;
            width: calc(100% - 70px);
            .name 
                display: block;
                color: #000;
                font-size: 15px;
                height: 22px;
                line-height: 22px;
                margin-bottom: 2px;
                width: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            .details
                height: 18px;
                line-height: 18px;
                width: 170px;
                clear: both;
                span 
                    float: left;
                    width: 85px;
                    font-size: 12px;
                    color: #9e9e9e;
            .intro 
                font-size: 12px;
                height: 18px;
                line-height: 18px;
                color: #9e9e9e;
                width: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
</style>