<template>
  <div id="login">
      <div class="login-cont">
          <ValidationObserver v-slot="{ invalid }">
          <form action="" class="form-group" >
              <span class="form-title">登录 猫耳FM</span>
              <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
              <input type="text" placeholder="邮箱" v-model="formData.username">
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
              <div class="form-row">
                  <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                  <input type="password" name="" id="" placeholder="密码" v-model="formData.password">
                    <span>{{ errors[0] }}</span>
              </ValidationProvider>
                  <a href="javascript:void(0)" class="row-right" @click="handleToChange">忘记密码？</a>
              </div>
            <div class="check-box">
                <input type="checkbox" name="" @change='handleChangeClick' id="row-before">
                <label for="row-before">记住我</label>
                <div class="abroad">海外手机号登录</div>
            </div>
            <button type="button"  class="submit" :disabled="invalid" @click="handleLoginClick">登录</button>
            <button type="button" class="register" @click="$router.push('/register')" >注册</button>
          </form>
           </ValidationObserver>
          <div class="page-bottom">登录即代表您已同意用户协议和隐私政策</div>
      </div>
  </div>
</template>

<script>
import { ValidationProvider ,extend,ValidationObserver} from 'vee-validate';
import {post} from 'utils/http.js'
import { required, email,regex } from 'vee-validate/dist/rules';
var store = require('store')
extend('email', {
    ...email,
    message:'邮箱格式不正确'
});
extend('required', {
  ...required,
  message: '该项必填'
});
export default {
    components:{
        ValidationProvider,
        ValidationObserver
    },
    methods: {
        handleToChange(){
            this.$router.push('/reset')
        },
        handleChangeClick(){
            this.checked = ! this.checked
        },
      async  handleLoginClick(){
        var res = await  post(
            '/be/users/login',
              this.formData
        )
                switch(res.data.message){
            case '3':this.$toast.fail({
                    message: '密码错误',
                    forbidClick: true,
                    loadingType: 'spinner'
                    });
                    break;
            case '1':this.$toast.success({
                    message: '登陆成功',
                    forbidClick: true,
                    loadingType: 'spinner'
                    });
                    store.set('token', res.data.token)
                    store.set('username',res.data.username)
                    this.$store.dispatch(
                        'changeUsername',{
                            username:res.data.username
                        }
                    )
                    if(this.checked){
                        store.set('remember',this.formData)
                    }else{
                         store.remove('remember')
                    }
                    this.$router.push('/')
                    break;
            }
        }
    },
    data() {
        return {
            formData:{
                username:'',
                password:'',
            },
            checked:false
        }
    },
    mounted() {
        var rememberData = store.get('remember')
        if(rememberData != undefined){
            this.formData.username = rememberData.username
            this.formData.password = rememberData.password
        }
    },
}
</script>

<style lang = 'stylus' scoped>
#login 
    height 80VH
    .login-cont 
        margin: 0 36px;
        width: calc(100% - 72px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position relative
        .form-group 
            margin: 10px auto;
            width: 100%;
            display: block;
            padding: 5px;
            box-sizing: border-box;
            .form-title 
                font-size: 16px;
                display block
                color: #000;
                margin: 12px 0;
            .form-row
                position relative
            input[type=password],input[type=text] 
                width: 100%;
                margin: 20px 0;
                display: block;
                height: 42px;
                line-height: 30px;
                padding: 5px 10px;
                color: #000;
                box-sizing: border-box;
                font-size: 14px;
                background-color: #fff;
                border-radius: 4px;
                border: 1px solid #e0e0e0;
            .row-right 
                top: 0rem;
                color: #bdbdbd;
                bottom: 0;
                height: 14px;
                position absolute
                right .1rem
                margin: auto
            .check-box 
                #row-before
                    position relative
                    top .02rem
                    color: #000;
                    box-sizing: border-box;
                    font-size: 14px;
                    background-color: #fff;
                    border-radius: 4px;
                    border: 1px solid #e0e0e0;
                .abroad 
                    float right
            .submit,.register
                height: 40px;
                line-height: 26px;
                width: 100%;
                margin: 20px 0;
                color: #fff;
                background-color: #c14a3f;
                border-color: #c14a3f;
                display: inline-block;
                position: relative;
                text-align: center;
                vertical-align: middle;
                cursor: pointer;
                border: 1px solid transparent;
                border-radius: 3px;
            .register
                color: #000;
                background-color: #fff;
                border-color: #e0e0e0;
                font-size: 16px;
                height: 42px;
                margin 0
                line-height: 42px;
        .page-bottom 
            text-align center
            color #424242;
</style>