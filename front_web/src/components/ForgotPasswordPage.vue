<template>
  <div v-if="error" role="alert">{{error}}</div>
  <input type="text" v-model="email" placeholder="email">
  <input type="password" v-if="isForgotPassword" v-model="password" placeholder="password">
  <p v-if="isForgotPassword">An email with a password has been sent to you</p>
  <button v-if="!isForgotPassword" @click="sendNewPassword">Send new password</button>
  <button v-else @click="login">Login</button>
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
          this.$router.push("/settingsAccount");
        })
      }catch (err){
        console.log(err)
        this.error = "Incorrect password";
      }
    }
  }
}
</script>