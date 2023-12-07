<template>
  <section>
    <div v-if="error" class="error-message-password-incorect" role="alert">{{error}}</div>
    <div class="container-forgot">
      <div class="main-forgot">
        <div class="login-forgot">
          <div class="form-forgot">
            <label for="chk" aria-hidden="true">Forgot password</label>
            <input type="text" v-model="email" placeholder="Email" class="input-field" >
            <input type="password" v-if="isForgotPassword" v-model="password" placeholder="password" class="input-field">
            <button v-if="!isForgotPassword" @click="sendNewPassword" class="btn-login">Send new password</button>
            <button  v-else @click="login" class="btn-login">Log in</button>
            <div v-if="isForgotPassword" class="success-message-forgot">An email with a password has been sent to you</div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      email: "",
      password: "",
      isForgotPassword: false,
      error: ""
    }
  },

  methods: {
    async sendNewPassword(){
      try {
        await axios.post("http://localhost:8000/users/createReservePassword", {email: this.email})
        this.isForgotPassword = true;
      }catch (err) {
        console.log(err)

        this.error = err.response.data.message;
      }
    },

    async login(){
      try {
        await axios.post("http://localhost:8000/users/loginViaReservePassword", {
          email: this.email,
          reservePassword : this.password
        }).then(res => {
          localStorage.token = res.data.token;
          this.$router.push("/");
        })
      }catch (err){
        console.log(err)
        this.error = "Incorrect password";
      }
    }
  }
}
</script>
<style>
body{
  background-color: rgba(238,238,238,0.98);
}
.error-message-password-incorect{
  color: red;
  position: absolute;
  font-size: 18px;
  margin-top: 135px;
  margin-left: 670px;
  transition: opacity 0.5s;
  text-align: center;
}

.container-forgot {
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;

}

.main-forgot {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: black;
  height: 380px;
  width: 500px;
  overflow: hidden;
  border-radius: 3%;
  box-shadow: rgba(0, 0, 0, 0.99) 0px 30px 90px;
}

.form-forgot {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
}

.login-forgot {
  position: relative;
  border-radius: 60% / 10%;
  transition: .8s ease-in-out;
}

.login-forgot label {
  margin: 5% 0 5%;
}

.login-forgot input {
  width: calc(100% - 20px);
  height: 40px;
  font-size: 1rem;
  background: #e0dede;
  padding: 10px;
  margin-top: 15px;
  border: none;
  outline: none;
  border-radius: 4px;
}

label {
  color: #fff;
  font-size: 2rem;
  justify-content: center;
  display: flex;
  font-weight: bold;
  cursor: pointer;
  transition: .5s ease-in-out;
}

#chk:checked ~ .login label {
  transform: scale(.6);
}


.form-forgot button {
  width: 70%;
  height: 30px;
  margin: 13px auto 10%;
  color: white;
  background: #252222;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: .2s ease-in;
  border: 1px solid #fff;
}

.form-forgot button:hover {
  background-color: darkgray;
}
.success-message-forgot {
  color: white;
  font-size: 12px;
  margin-top: -50px;
  margin-left: 100px;
}

</style>