<template>
<div id="register">
      <div class="login-cont">
          <ValidationObserver v-slot="{ invalid }">
          <form action="" class="form-group">
              <span class="form-title">注册 猫耳FM</span>
              <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
              <input type="text" placeholder="请输入邮箱" v-model="formData.username">
               <span>{{ errors[0] }}</span>
              </ValidationProvider>
              <div class="phone-check">
                  <ValidationProvider name="code" rules="required" v-slot="{ errors }">
                  <input type="text" name="" id="" placeholder="验证码" class="code" v-model="formData.mycode">
                    <span>{{ errors[0] }}</span>
              </ValidationProvider>
                  <button class="verification" v-if="showBtn" @click="handleCodeClick" type="button">获取验证码</button>
                  <button class="verification" v-else type="button">{{time}}秒后重新获取</button>
              </div>
              <div class="form-row">
                  <ValidationProvider name="password" :rules="{regex: /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/}" v-slot="{ errors }">
                  <input type="password" name="" id="" placeholder="密码" v-model="formData.password">
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
                  <a href="" class="row-right"></a>
              </div>
            <button class="register" type="button" @click="submit" :disabled="invalid">注册</button>
          </form>
            </ValidationObserver>
          <div class="page-bottom">注册即代表您已同意用户协议和隐私政策</div>
      </div>
  </div>
</template>

<script>
import { ValidationProvider ,extend,ValidationObserver} from 'vee-validate';
import {post} from 'utils/http.js'
import { required, email,regex } from 'vee-validate/dist/rules';
extend('email', {
    ...email,
    message:'邮箱格式不正确'
});
extend('required', {
  ...required,
  message: '该项必填'
});
extend('regex', {
  ...regex,
  message: '只能输入5-20个以字母开头、可带数字、“_”、“.”的字串'
});
export default {
    components:{
        ValidationProvider,
        ValidationObserver
    },
    data() {
        return {
            formData:{
                username:'',
                password:'',
                mycode:'',
            },
            showBtn:true,
            time:30
        }
    },
methods: {
   async handleCodeClick(){
             var res = await  post(
            '/be/users/mail',
              this.formData
        )
        switch(res.data.message){
            case '1' : this.$toast.success({
                    message: '验证码发送成功',
                    forbidClick: true,
                    loadingType: 'spinner'
                    });
                    this.showBtn = !this.showBtn;
                 var timer = setInterval(function(){
                        this.time--
                        if(this.time === 0){
                            this.showBtn = !this.showBtn
                            this.time = 30
                            clearInterval(timer)
                        }
                    }.bind(this),1000)
            break;
            case '2' :  this.$toast.fail({
                    message: '账号已存在',
                    forbidClick: true,
                    loadingType: 'spinner'
                    });
            break;
            default : this.$toast.fail({
                    message: '验证码发送失败',
                    forbidClick: true,
                    loadingType: 'spinner'
                    });
        }
    },
    async submit() {
     var res = await  post(
            '/be/users/register',
              this.formData
        )
        switch(res.data.message){
            case '3':this.$toast.fail({
                    message: '验证码错误',
                    forbidClick: true,
                    loadingType: 'spinner'
                    });
            case '1':this.$toast.success({
                    message: '注册成功，即将跳往注册页面',
                    forbidClick: true,
                    loadingType: 'spinner'
                    });
                    this.$router.push('/login')
        }
    }

},
}
</script>

<style lang = 'stylus' scoped>
.phone-check
    display flex
    align-items center
    justify-content space-between
    .code 
        width 2rem !important
    .verification
        width: 105px;
        height: 42px;
        font-size: 14px;
        background-color: #424242;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 3px;
        line-height: 42px;
        color: #fff;
        border-color: #424242;
#register 
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
                color: #fff;
                background-color: #c14a3f
                border-color: #e0e0e0;
                font-size: 16px;
                height: 42px;
                margin 0
                line-height: 42px;
        .page-bottom 
            text-align center
            color #424242;
</style>