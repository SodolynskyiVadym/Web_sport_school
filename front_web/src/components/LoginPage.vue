<template>
  <input type="text" v-model="email" placeholder="EMAIL">
  <input type="text" v-model="password" placeholder="PASSWORD">
  <button @click="sendData">Login</button>

  <h1>{{token}}</h1>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return{
      email: "",
      password: "",
      token: ""
    }
  },
  methods: {
    async sendData(){
      await axios.post("http://localhost:8000/users/login", {
        email: this.email,
        password: this.password
      }).then(res => {
        localStorage.token = res.data.token
        this.token = res.data.token
      })
    }
  }
}
</script>

<style scoped>

</style>