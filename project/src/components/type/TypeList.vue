<template>
  <div>
      <div class="tags-type">
            <TypeItem
            v-for="(item,index) in typeRes"
            :item="item"
            :index="index"
            :key="item.id"
            > </TypeItem>
            </div>
  </div>
</template>

<script>
import TypeItem from 'components/type/TypeItem.vue'
import {get} from 'utils/http.js'
export default {
  data() {
    return {
      typeRes : []
    }
  },
  components : {
    TypeItem
  },
  async mounted() {
    this.typeRes = await get({
      url : '/api/malbum/recommand'
    })
    this.typeRes = this.typeRes.info
  },
}
</script>

<style lang = "stylus" scoped>
.tags-type
  display flex
  height .94rem
  flex-wrap wrap
</style>