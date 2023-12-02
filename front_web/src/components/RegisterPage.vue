<template>
  <input type="text" v-model="name" placeholder="NAME">
  <input type="text" v-model="lastName" placeholder="LASTNAME">
  <input type="text" v-model="patronymic" placeholder="PATRONYMIC">
  <input type="text" v-model="password" placeholder="PASSWORD">
  <input type="text" v-model="email" placeholder="EMAIL">
  <input type="date" v-model="birth" placeholder="BIRTH">
  <input type="text" v-model="gender" placeholder="GENDER">
  <input type="text" v-model="phone" ref="phone" placeholder="PHONE">
  <button @click="sendDate">Register</button>

</template>

<script>
import axios from "axios";
import inputMask from "@/js/initInputMask";
export default {
  data() {
    return {
      name: "",
      lastName: "",
      patronymic: "",
      password: "",
      email: "",
      birth: Date.now(),
      gender: "",
      phone: ""
    }
  },

  methods: {
    async sendDate(){
      await axios.post("http://localhost:8000/users/createUser", {
        name: this.name,
        lastName: this.lastName,
        patronymic: this.patronymic,
        password: this.password,
        email: this.email,
        birth: this.birth,
        gender: this.gender,
        phone: this.phone,
        role: "user"
      })
    }
  },
  mounted() {
    inputMask(this.$refs.phone)
  }
}
</script>

<style scoped>

</style>