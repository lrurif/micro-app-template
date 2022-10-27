<template>
  <div class="login-container">
    <div :class="[isLoginStatus ? '' : 'back-status', 'login-inner']">
      <div class="front-box">
        <div class="box-title gradient">登录</div>
        <div class="form-wrapper">
          <div class="form-item">
            <el-icon class="form-item__icon" :size="24" color="#ffeba7">
              <User />
            </el-icon>
            <input class="login-input" type="text" placeholder="请输入账号" />
          </div>
          <div class="form-item">
            <el-icon class="form-item__icon" :size="24" color="#ffeba7">
              <Unlock />
            </el-icon>
            <input
              class="login-input"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <div class="btn-wrapper">
            <div class="submit-btn" @click="loginIn">登录</div>
          </div>
        </div>
        <div class="tip-wrapper">
          <div class="register-text gradient">
            没有账号？<span @click="toggleStatus" class="btn">立即注册</span>
          </div>
          <div class="forget-password">忘记密码</div>
        </div>
      </div>
      <div class="end-box">
        <div class="box-title gradient">注册</div>
        <div class="form-wrapper">
          <div class="form-item">
            <el-icon class="form-item__icon" :size="24" color="#ffeba7">
              <User />
            </el-icon>
            <input class="login-input" type="text" placeholder="请输入账号" />
          </div>
          <div class="form-item">
            <el-icon class="form-item__icon" :size="24" color="#ffeba7">
              <Unlock />
            </el-icon>
            <input
              class="login-input"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <div class="form-item">
            <el-icon class="form-item__icon" :size="24" color="#ffeba7">
              <Message />
            </el-icon>
            <input
              class="login-input"
              type="password"
              placeholder="请输入电子邮箱"
            />
          </div>
          <div class="btn-wrapper">
            <div class="submit-btn">注册</div>
          </div>
        </div>
        <div class="tip-wrapper center">
          <div class="register-text gradient">
            已有账号？<span @click="toggleStatus" class="btn">立即登录</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { User, Unlock, Message } from "@element-plus/icons-vue";
import { mainStore } from "@/store/index"
import { useRouter } from "vue-router"
const router = useRouter()
let isLoginStatus = ref(true);
let toggleStatus = () => {
  isLoginStatus.value = !isLoginStatus.value;
};
const loginIn = () => {
    const store = mainStore();
    store.setToken("token")
    router.push("/")
}
</script>
<style lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  background-color: #1f2029;

  .login-inner {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 440px;
    height: 400px;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    background-color: #2f3143;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.21);
    transition: all 1s;
    transform-style: preserve-3d;
    position: relative;

    &.back-status {
      transform: translate(-50%, -50%) rotateY(180deg);
    }
    .front-box {
      position: relative;
      z-index: -1;
    }
    .front-box,
    .end-box {
      padding: 35px 25px 0;
      box-sizing: border-box;
      backface-visibility: hidden;
    }

    .end-box {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transform: rotateY(180deg);
    }

    .box-title {
      font-size: 25px;
      color: #fff;
      text-align: center;
      font-weight: 600;
    }

    .form-item {
      position: relative;
      margin-bottom: 20px;

      .form-item__icon {
        position: absolute;
        top: 50%;
        left: 18px;
        transform: translate(0, -50%);
      }

      .login-input {
        width: 100%;
        height: 48px;
        box-sizing: border-box;
        padding: 13px 20px 13px 55px;
        color: #c4c3ca;
        background-color: #1f2029;
        border: none;
        outline: none;
        box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
        border-radius: 4px;
      }
    }

    .btn-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;

      .submit-btn {
        border-radius: 4px;
        font-size: 13px;
        font-weight: 600;
        height: 44px;
        padding: 0 30px;
        line-height: 44px;
        color: #102770;
        background-color: #ffeba7;
        box-shadow: 0 8px 24px 0 rgba(255, 235, 167, 0.2);
        cursor: pointer;
        transition: all 0.2s linear;

        &:hover {
          background-color: #f3d97f;
          color: #061f6e;
          box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2);
        }
      }
    }

    .form-wrapper {
      margin-top: 30px;
    }

    .tip-wrapper {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &.center {
        justify-content: center;
      }
      .forget-password {
        color: #c4c3ca;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
}
.btn {
  cursor: pointer;
}

.gradient {
  animation: gradient 5s ease infinite;
}

@keyframes gradient {
  from {
    color: rgb(18, 108, 205);
  }

  50% {
    color: rgb(15, 218, 177);
  }

  to {
    color: rgb(18, 108, 205);
  }
}
</style>
