<template>
<div class="out">
<div class="box">
  <div class="boxContent">
    <div class="boxInner">
        <div class="inputRow">
        <input class="inputSingle" type="text" v-model="loginForm.username" placeholder="用户名"/>
        </div>
        <div class="inputRow">
        <input class="inputSingle" type="password" v-model="loginForm.password" placeholder="密码"/>
        </div>
      <button class="boxConfirm" @click="login">登录</button>
    </div>
  </div>
</div>
</div>
</template>
 
<script>
import axios from 'axios'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    };
  },
 
  methods: {
    login () {
      let _this = this;
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        alert('账号或密码不能为空');
      } else {
        axios.request({
          method: 'post',
          url: 'http://47.113.225.96:8080/login',
          data: _this.loginForm
        }).then(res => {
          this.$store.dispatch('user/login', _this.loginForm);
          alert('登陆成功');
        }).catch(error => {
          alert('账号或密码错误');
          console.log(error);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  * {
    padding: 0;
    margin: 0;
    list-style: none;
    border: none;
    outline: none;
  }

  // body {
  //   cursor: default;
  // }

  @keyframes popUp {
    from {
      bottom: -28.5px;
    }
    to {
      bottom: 0;
    }
  }

  @keyframes shake {
    0% {
      left: -47.5px;
    }
    12.5% {
      left: 0;
    }
    37.5% {
      left: -95px;
    }
    50% {
      left: -47.5px;
    }
    62.5% {
      left: 0;
    }
    87.5% {
      left: -95px;
    }
    100% {
      left: -47.5px;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    40% {
      transform: rotate(144deg);
    }
    80% {
      transform: rotate(288deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  // .out {
  //   width: 100vw;
  //   height: 100vh;
  //   position: relative;
  // }

  .box {
    // position: absolute;
    // top: 0;
    // bottom: 0;
    // left: 0;
    // right: 0;
    // margin: auto;
    margin: 100px auto 0 auto;
    position: relative;
    top: -120px;
    overflow: hidden;
    height: 360px;
    width: 475px;
    font-size: inherit;
    background-image: url("src/assets/loginback.png");
    background-size: cover;
    background-position: left;
    // animation: 0.3s ease-in 0s 1 normal none running fadeUp;
  }
  
  .boxTip {
    position: absolute;
    bottom: 0;
    left: -47.5px;
    width: 570px;
    height: 28.5px;
    font-size: 14.25px;
    line-height: 28.5px;
    text-align: center;
    color: rgba(255, 255, 255, 0.9);
    background: rgb(255, 64, 64);
    display: none;
  }

  .boxContent {
    position: absolute;
    width: 380px;
    top: 47.5px;
    left: 47.5px;
  }

  .boxOperation {
    position: absolute;
    width: 380px;
    bottom: 47.5px;
    left: 47.5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13.3px;
  }

  .boxConfirm {
    background: rgba(66, 62, 255, 0.93);
    height: 47.5px;
    width: 142.5px;
    color: rgba(255, 255, 255, 0.9);
    border-radius: 4.75px;
    font-size: 19px;
    line-height: 47.5px;
    position: absolute;
    top: 150%;
    left: 50%;
    height: 30%;
    width: 50%;
    margin: -15% 0 0 -25%;
    cursor: pointer;
  }

  .boxTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .boxTitle {
    position: relative;
    left:130px;
    font-size: 28px;
    color: white;
    font-weight: 700;
  }

  .boxBack {
    font-size: 16.15px;
    color: rgb(255, 64, 64);
    cursor: pointer;
  }

  .boxInner {
    font-size: 17.5px;
    margin-top: 47.5px;
    color: rgba(0, 0, 0, 0.6);
  }

  .inputRow {
    position: relative;
    left: 38px;
    top:-18px;
    width: 300px;
    height: 57px;
    display: flex;
    align-items: center;
  }

  .inputLeft {
    position: relative;
    width: 76px;
    height: 57px;
    text-align: left;
    font-size: 19px;
    color: rgba(0, 0, 0, 0.6);
    line-height: 57px;
    font-weight: 700;
    padding-left: 9.5px;
  }

  .inputRight {
    width: 304px;
  }

  .input {
    width: 285px;
    height: 19px;
    font-size: 19px;
    line-height: 38px;
    padding: 9.5px;
    color: rgba(0, 0, 0, 0.75);
    border-bottom: solid 0.95px rgba(0, 0, 0, 0.3);
  }

  .inputSingle {
    width: 100%;
    height: 38px;
    font-size: 17.1px;
    line-height: 38px;
    padding: 9.5px;
    color: rgba(0, 0, 0, 0.75);
    border-bottom: solid 0.95px rgba(0, 0, 0, 0.3);
  }

  .boxOther {
    margin-top: 9.5px;
    text-align: left;
    color: rgba(0, 0, 0, 0.4);
    font-size: 12.35px;
    line-height: 14.25px;
    height: 14.25px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .choose {
    width: 380px;
    border: solid 0.95px rgba(0, 0, 0, 0.1);
    border-radius: 4.75px;
    overflow: hidden;
  }

  .option {
    cursor: pointer;
    width: 380px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .option:hover {
    background: rgba(255, 255, 0, 0.2);
  }

  .optionLeft {
    font-size: 16.15px;
    line-height: 47.5px;
    height: 47.5px;
    margin-left: 14.25px;
  }

  .optionRight {
    width: 12.35px;
    height: 38px;
    margin-right: 14.25px;
  }
</style>
