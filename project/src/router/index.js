import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from 'pages/Index.vue'
import Home from 'pages/home/Home.vue'
import Search from 'pages/Search.vue'
import Albums from 'pages/home/Albums.vue'
import Recommend from 'pages/home/Recommend.vue'
import Catalogs from 'pages/home/Catalogs.vue'
import Sound from 'pages/Sound.vue'
import Download from 'pages/Download.vue'
import Rank from 'pages/Rank.vue'
import SoundComments from 'components/sound/SoundComment.vue'
import SoundImages from 'components/sound/SoundImages.vue'
import SoundIntro from 'components/sound/SoundIntro.vue'
import Album from 'pages/Album.vue'
import Drama from 'pages/Drama.vue'
import Channels from 'pages/Channels.vue'
import Channel from 'pages/Channel.vue'
import ChannelIntro from 'components/channel/ChannelIntro.vue'
import ChannelComments from 'components/channel/ChannelComments.vue'
import ChannelAdmins from 'components/channel/ChannelAdmins.vue'
import CatalogsCont from 'components/catalogs/CatalogsCont.vue'
import Total from 'components/search/Total.vue'
import Type1 from 'components/search/Type1.vue'
import Type2 from 'components/search/Type2.vue'
import Type4 from 'components/search/Type4.vue'
import Type5 from 'components/search/Type5.vue'
import Type6 from 'components/search/Type6.vue'
import Type8 from 'components/search/Type8.vue'
import Login from 'pages/Login.vue'
import Register from 'pages/Register.vue'
import ChangePassword from 'pages/ChangePassword.vue'
Vue.use(VueRouter)
const routes = [{
  path: '/',
  component: Index,
  children: [{
      path: '/',
      component: Home,
      redirect: '/recommend',
      children: [{
          path: 'albums/:id?',
          component: Albums,
        },
        {
          path: 'recommend',
          component: Recommend
        },
        {
          path: 'catalogs',
          component: Catalogs,
        }
      ],
    },
    {
        path:'catalogs/:id',
        component:CatalogsCont
    },
    {
      path: 'search/:id?',
      component: Search,
      children:[{
        path:'total',
        component:Total
      },{
        path:'type1',
        component:Type1
      },{
        path:'type2',
        component:Type2
      },{
        path:'type4',
        component:Type4
      }
      ,{
        path:'type5',
        component:Type5
      }   
      ,{
        path:'type6',
        component:Type6
      }    
       ,{
        path:'type8',
        component:Type8
      }
    ]
    },
    {
      path: 'download',
      component: Download
    },
    {
      path: 'rank',
      component: Rank
    },
    {
      path: '/sound/:id',
      component: Sound,
      redirect: '/sound/:id/intro',
      children: [{
          path: 'comments',
          component: SoundComments
        },
        {
          path: 'images',
          component: SoundImages
        },
        {
          path: 'intro',
          component: SoundIntro
        }
      ]
    },
    {
      path: '/album/:id',
      component: Album
    },
    {
      path: '/drama/:id',
      component: Drama
    },
    {
      path:'/channels',
      component : Channels
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/register',
      component:Register
    },
    {
      path:'/reset',
      component:ChangePassword
    },
    {
      path:'/channel/:id',
      component : Channel,
      redirect : '/channel/:id/intro',
      children:[{
        path:'intro',
        component : ChannelIntro
      },
      {
        path: 'comments',
        component: ChannelComments
      },
      {
        path:'admins',
        component : ChannelAdmins
      }
    ]
    }
  ]
}]
const router = new VueRouter({
  routes,
  mode: "history"
})
export default router