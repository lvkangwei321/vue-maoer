<template>
  <div class="catalogs-cont">
    <div class="cont-header">{{middleRes.catalog_name}}</div>
    <div class="details">
      <ul class="sub-catalogs">
        <div>
          <li class="active">全区动态</li>
          <li v-for="item in sonTitle" :key="item.id">{{item}}</li>
        </div>
      </ul>
      <div class="cont-item">
        <Title :title="title"></Title>
        <div class="panel-body">
          <div class="sound-list">
            <div
              class="sound-item"
              v-for="item in totalRes"
              :key="item.id"
              @click="handleClick(item)"
            >
              <div class="cover">
                <img :src="item.front_cover" alt />
              </div>
              <div class="details">
                <div class="title">{{item.soundstr}}</div>
                <div class="username">UP主： {{item.username}}</div>
                <div class="statistic">
                  <span
                    class="play-times"
                    v-if="parseInt(item.view_count) >= 10000"
                  >{{(item.view_count / 10000).toFixed(1)}} 万</span>
                  <span class="play-times" v-else>{{(item.view_count) }}</span>
                  <div class="duration">{{item.duration | toTime()}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cont-item" v-for="(item,index) in sonTitle" :key="item.id" :index="index">
        <Title :title="item"></Title>
        <div class="panel-body">
          <div class="sound-list">
            <div
              class="sound-item"
              v-for="sonItem in itemRes[index]"
              :key="sonItem.id"
              @click="handleClick(sonItem)"
            >
              <div class="cover">
                <img :src="sonItem.front_cover" alt />
              </div>
              <div class="details">
                <div class="title">{{sonItem.soundstr}}</div>
                <div class="username">UP主： {{sonItem.username}}</div>
                <div class="statistic">
                  <span
                    class="play-times"
                    v-if="parseInt(sonItem.view_count) >= 10000"
                  >{{(sonItem.view_count / 10000).toFixed(1)}} 万</span>
                  <span class="play-times" v-else>{{(sonItem.view_count) }}</span>
                  <div class="duration">{{sonItem.duration | toTime()}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Title from "components/Title.vue";
import { get } from "utils/http.js";
export default {
  methods: {
    handleClick(item) {
        console.log(item);
        
      this.$router.push(`/sound/${item.id}`);
    }
  },
  components: {
    Title
  },
  data() {
    return {
      title: "全区动态",
      totalRes: [],
      middleRes: [],
      id: 0,
      sonRes: [],
      sonId: [],
      sonTitle: [],
      itemRes: []
    };
  },
  async mounted() {
    var scroll = new BScroll(".sub-catalogs", {
      click: "ture",
      scrollX: true
    });
    var res = await get({
      url: "/api/mobileWeb/catalogrank?cid=8"
    });
    var middleRes = await get({
      url: "/api/mobileWeb/catalogs"
    });
    this.middleRes = middleRes.info;
    for (let key in this.middleRes) {
      if (key === this.$route.params.id) {
        this.id = key;
      }
    }
    this.middleRes = this.middleRes[this.id];
    this.sonRes = this.middleRes.son;
    for (let key in this.sonRes) {
      this.sonId.push(this.sonRes[key].id);
      this.sonTitle.push(this.sonRes[key].catalog_name);
    }
    this.totalRes = res.info;
    for (let key in this.sonId) {
      var itemRes = await get({
        url: `/api/mobileWeb/catalogmenu?order=3&cid=${this.sonId[key]}&page_size=4`
      });
      this.itemRes.push(itemRes.info.Datas);
      console.log(this.itemRes);
      
    }
  }
};
</script>

<style lang='stylus' scoped>
.active {
  color: black;
}

.active:after {
  pointer-events: none;
  border-color: #000;
  content: '';
  transition: 0.2s ease;
  width: 100%;
  display: block;
  position: absolute;
  bottom: 1px;
  border-bottom: 2px solid;
  z-index: 1;
}

.catalogs-cont {
  .cont-header {
    display: block;
    line-height: 40px;
    background-color: #fff;
    color: #000;
    text-align: center;
    font-size: 16px;
    border-bottom: 1px solid #e0e0e0;
  }

  .details {
    .sub-catalogs {
      // position: fixed;
      top: 0.4rem;
      height: 35px;
      display: flex;
      line-height: 35px;
      width: 100%;
      background-color: #fff;
      color: #9e9e9e;
      border-bottom: 1px solid #e0e0e0;
      z-index: 10;
      overflow-x: auto;
      white-space: nowrap;

      li {
        display: inline-block;
        position: relative;
        height: 100%;
        margin: 0 10px;
      }
    }
  }

  .cont-item {
    min-height: 400px;
    display: block;
    position: relative;
    width: 100%;
    margin: -0.1rem auto;

    .panel-body {
      margin: 0 14px;

      .sound-list {
        position: relative;
        top: -0.15rem;
        height: 3.6rem;
        overflow: hidden;

        .sound-item {
          height: 90px;
          position: relative;

          .cover img {
            height: 70px;
            width: 70px;
            border-radius: 4px;
            margin: 10px;
            float: left;
          }

          .details {
            .title {
              font-size: 0.16rem;
              color: #616161;
              padding-top: 0.1rem;
              line-height: 0.18rem;
            }

            .username {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              font-size: 12px;
              height: 20px;
              line-height: 20px;
              color: #9e9e9e;
            }

            .statistic {
              height: 12px;
              line-height: 12px;
              display: flex;
              position: absolute;
              bottom: 0.1rem;
              left: 0.9rem;

              .play-times {
                font-size: 12px;
                color: #9e9e9e;
                margin-right: 20px;
                padding-left: 18px;
                width: 66px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                display: inline-block;
                position: relative;
              }

              .play-times:before {
                background-image: url('https://static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png'); // static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png);
                background-size: 56px 55px;
                background-position: -44px -27px;
                content: '';
                display: block;
                position: absolute;
                height: 0.12rem;
                left: 2px;
                top: 1px;
                width: 12px;
              }

              .duration {
                font-size: 12px;
                color: #9e9e9e;
                margin-right: 20px;
                padding-left: 18px;
                width: 66px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                display: inline-block;
                position: relative;
              }

              .duration:before {
                background-image: url('https://static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png'); // static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png);
                background-size: 56px 55px;
                background-position: -29px -44px;
                content: '';
                display: block;
                position: absolute;
                height: 0.12rem;
                left: 2px;
                top: 1px;
                width: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>