<template>
  <section class="login">
    <!-- <header class="header"></header> -->
    <div class="login-mask"></div>
    <div class="wrapper">
      <div class="logo">
        <img src="@/assets/images/logo_r.png" alt="" />
      </div>
      <h2 :style="styleVar" class="title">登录爱问医生</h2>
      <div class="login-form">
        <div class="cell">
          <input
            v-model="loginForm.phone"
            type="tel"
            class="field_control"
            placeholder="请输入手机号"
            @focus="handleFocus('phone')"
            @blur="handleBlur('phone')"
          />
          <div
            :class="[sms.disabled ? 'field_btn field_disabled' : 'field_btn']"
            @click="handleGetSmsCode"
          >
            {{ sms.disabled ? `${sms.countTime}s` : sms.text }}
          </div>
        </div>
        <div class="cell">
          <input
            v-model="loginForm.sms"
            type="tel"
            class="field_control"
            maxlength="6"
            placeholder="请输入验证码"
            @focus="handleFocus('sms')"
            @blur="handleBlur('sms')"
          />
        </div>
      </div>
      <div :style="styleVar" class="policy">
        <div class="policy_checkbox" @click="handleCheckPolicy">
          <div :class="[checkedPolicy ? 'ischecked' : 'uncheck']"></div>
        </div>
        <div class="policy_text">
          同意
          <a href="https://health.sina.cn/zt/app/rules">《爱问医生用户协议》</a>
          与
          <a href="https://health.sina.cn/zt/agreement/patient">《隐私条款》</a>
        </div>
      </div>
      <div
        class="login-btn"
        :class="[formState.disabled ? 'disabled' : '', formState.loading ? 'loading' : 'loading']"
        @click="handleLogin"
      >
        <span>登录</span>
      </div>
      <div class="tip">未注册手机号验证后将自动注册新账号</div>
    </div>
    <div class="demo">
      <div class="btn" @click="handleWxLogin">微信授权登录</div>
      <div class="btn" @click="handleAppWeiboLogin">微博授权</div>
    </div>
    <footer class="footer h5">
      <!-- App端 第三方登录 -->
      <!-- <div class="third_login">
        <img class="weixin" src="@/assets/images/weixin.png" alt="" />
        <img class="weibo" src="@/assets/images/weibo.png" alt="" />
      </div> -->
      <!-- 广告 -->
      <div class="ad_contain" v-show="isShowAd">
        <div class="logo_s">
          <img src="@/assets/images/logo_s.png" alt="" />
        </div>
        <div class="desc">
          <span>使用APP</span>
          <p>体验更多优质服务</p>
        </div>
        <div class="action" @click="handleDownloadApp">下载APP</div>
        <div class="close" @click="handleCloseAd">
          <img src="@/assets/images/close.png" alt="" />
        </div>
      </div>
    </footer>
  </section>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, watchEffect } from "vue";

  import { getSmsCode, smsLoginApi, generateCodeUrl } from "@/api/user";

  import { UserTypeEnum, LoginSourceEnum, DeviceEnum, LoginTypeEnum } from "@/enums/businessEnum";

  import { isValidMobileS } from "@/utils/validateUtil";

  import { useMessage } from "@/hooks/web/useMessage";

  const { Toast } = useMessage();

  let smsTimer: any = {};
  export default defineComponent({
    setup() {
      const checkedPolicyRef = ref(false);
      const isShowAdRef = ref(true);
      const styleVar = reactive({
        "--space": "60px",
      });
      const loginForm = reactive({
        phone: "",
        sms: "",
      });
      const formState = reactive({
        loading: false,
        disabled: true,
      });
      const sms = reactive({
        text: "获取验证码",
        countTime: 60,
        disabled: false,
      });

      watchEffect(() => {
        // 监听手机号，验证码输入
        console.log(loginForm.phone);
        if (isValidMobileS(loginForm.phone) && loginForm.sms.length === 6) {
          formState.disabled = false;
        } else {
          formState.disabled = true;
        }
      });

      function handleCheckPolicy() {
        checkedPolicyRef.value = !checkedPolicyRef.value;
      }
      function handleFocus() {
        styleVar["--space"] = "40px";
      }
      function handleBlur() {
        styleVar["--space"] = "60px";
      }
      // 获取验证码
      async function handleGetSmsCode() {
        if (sms.disabled) {
          return false;
        }
        if (!loginForm.phone) {
          Toast("请输入手机号");
          return false;
        }
        if (!isValidMobileS(loginForm.phone)) {
          Toast("请输入正确的手机号");
          return false;
        }
        loginForm.sms = "";
        sms.countTime = 10;
        try {
          const params = {
            phone: loginForm.phone,
            userType: UserTypeEnum.USER,
          };
          await getSmsCode(params);
          sms.disabled = true;
          clearTimeout(smsTimer);
          smsTimer = setInterval(() => {
            sms.countTime--;
            if (sms.countTime === 0) {
              sms.disabled = false;
              sms.text = "重新获取";
              clearTimeout(smsTimer);
            }
          }, 1000);
        } catch (err) {
          sms.disabled = false;
          if (err.code === 10014) {
            // 超过特定次数，进行图形验证码验证
            // isShowPicCode = true
            // refreshCode()
          } else if (err.code === 10015) {
            // 请重新获取图形验证码
            // refreshCode()
          } else {
            Toast("验证码发送失败，请重试");
          }
        }
      }

      // 登录操作
      async function handleLogin() {
        if (formState.disabled || formState.loading) {
          return false;
        }
        if (!loginForm.phone) {
          Toast("请输入手机号");
          return false;
        }
        if (!isValidMobileS(loginForm.phone)) {
          Toast("请输入正确的手机号");
          return false;
        }
        if (loginForm.sms.length !== 6) {
          Toast("请输入正确的验证码");
          return false;
        }
        if (!checkedPolicyRef) {
          Toast("请勾选用户协议");
          return false;
        }
        try {
          const params = {
            tel: loginForm.phone,
            checkNum: loginForm.sms,
            loginSource: LoginSourceEnum.PATIENT,
            loginType: LoginTypeEnum.APP,
            source: DeviceEnum.H5,
            userType: UserTypeEnum.USER,
          };
          const data = await smsLoginApi(params);
          console.log("data", data);
        } catch (err) {
          return null;
        }
      }
      // 微信授权登录
      function handleWxLogin() {
        // //appID
        let appID = `wx9d5ab02fea68ed0a`;
        //appsecret
        // let appSerect = `f464746a86b3863ce9b820a40e2aac8a`;
        //点击授权后重定向url地址
        let redirectUrl = `/patient/login`;
        let host = `http://10.220.200.17:8080`;
        //微信授权api,接口返回code,点击授权后跳转到重定向地址并带上code参数
        let authorizeUrl =
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=` +
          `${host}${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=` +
          `STATE&connect_redirect=1#wechat_redirect`;

        window.location.href = authorizeUrl;
      }
      function generateCode(providerType: string) {
        const params = {
          providerType: providerType,
          userType: UserTypeEnum.DOCTOR,
          authType: "login",
          projectName: "patient",
          resourceUrl: "https://health.sina.cn/zt/mine",
          source: "h5",
          scope: "snsapi_userinfo",
        };
        generateCodeUrl(params).then((res) => {
          console.log("res", res);
          window.location.href = res;
        });
      }
      function handleWxBind() {
        console.log("handleWxBind");
      }
      function handleAppWxLogin() {
        console.log("handleAppWxLogin");
      }
      function handleAppWeiboLogin() {
        console.log("handleAppWeiboLogin");
        generateCode("weibo");
      }
      function handleDownloadApp() {
        console.log("handleDownloadApp");
      }
      function handleCloseAd() {
        console.log("handleCloseAd");
        isShowAdRef.value = false;
      }
      return {
        checkedPolicy: checkedPolicyRef,
        isShowAd: isShowAdRef,
        styleVar,
        loginForm,
        formState,
        sms,
        handleCheckPolicy,
        handleFocus,
        handleBlur,
        handleLogin,
        handleGetSmsCode,
        handleWxLogin,
        handleWxBind,
        handleAppWxLogin,
        handleAppWeiboLogin,
        handleDownloadApp,
        handleCloseAd,
      };
    },
  });
</script>
<style scoped lang="less">
  .login {
    min-height: 100vh;
    .header {
      height: 40px;
    }
    .wrapper {
      padding: 0 40px;
      padding-top: 40px;
      // display: flex;
      // flex-direction: column;
      // align-items: center;
      .logo {
        margin: 0 auto;
        margin-bottom: 15px;
        width: 76px;
        height: 76px;
        border-radius: 50%;
        // background: #664ae1;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        height: 33px;
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #2d2d2d;
        line-height: 33px;
        margin-bottom: var(--space); // 键盘弹起 为 40
        text-align: center;
      }
      .login-form {
        // margin-top: 20px;
        .cell {
          width: 100%;
          background: #f8f8fa;
          border-radius: 25px;
          height: 50px;
          line-height: 50px;
          padding: 0 16px 0 20px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          position: relative;
          .field_control {
            border: none;
            height: 50px;
            background: #f8f8fa;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            caret-color: #664ae1;
          }
          .field_btn {
            font-weight: 400;
            color: #664ae1;
            position: absolute;
            right: 18px;
            top: 0;
            &.field_disabled {
              color: #bbbbbb;
            }
          }
        }
      }
      .policy {
        margin: 0 0 var(--space) 0; // 键盘弹起 为 40
        // padding: 0 15px;
        height: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        a {
          color: #664ae1;
        }
        .policy_text {
          margin-left: 8px;
          letter-spacing: 0;
        }
        .policy_checkbox {
          width: 14px;
          height: 14px;
        }
        .uncheck,
        .ischecked {
          border: 1px solid #999999;
          width: 14px;
          height: 14px;
          border-radius: 50%;
        }
        .ischecked::after {
          content: "";
          display: block;
          width: 8px;
          height: 8px;
          background: #664ae1;
          border-radius: 50%;
          position: relative;
          top: 2px;
          left: 2px;
        }
      }
      .login-btn {
        margin-bottom: 10px;
        height: 50px;
        line-height: 50px;
        background: #664ae1;
        border-radius: 25px;
        text-align: center;
        &.disabled {
          background: #cccccc;
        }
        &.loading {
          opacity: 0.5;
        }
        span {
          color: #fff;
        }
      }
      .tip {
        font-weight: 400;
        color: #bbbbbb;
        line-height: 20px;
        text-align: center;
      }
    }
    .demo {
      padding: 10px 0;
      .btn {
        display: inline-block;
        padding: 10px;
      }
    }
    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      &.app {
        bottom: 40px;
      }
      &.h5 {
        bottom: 10px;
        padding: 0 10px;
      }
      .third_login {
        width: 100%;
        text-align: center;
        img {
          width: 50px;
          height: 50px;
        }
        .weibo {
          margin-left: 40px;
        }
      }
      .ad_contain {
        height: 60px;
        background: #5f5f5f;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 32px 0 10px;
        position: relative;
        .logo_s {
          width: 40px;
          height: 40px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .desc {
          flex: 1;
          margin-left: 9px;
          span{
            font-size: 17px;
            color: #f5f5f5;
          }
          p{
            color: #999999;
          }
        }
        .action {
          width: 100px;
          height: 34px;
          background: #664ae1;
          border-radius: 17px;
          line-height: 34px;
          text-align: center;
          color: #fff;
        }
        .close {
          width: 12px;
          height: 12px;
          position: absolute;
          right: 10px;
          top: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
