<template>
  <input type="text" v-model="name" placeholder="NAME">
  <input type="text" v-model="lastName" placeholder="LASTNAME">
  <input type="text" v-model="patronymic" placeholder="PATRONYMIC">
  <input type="text" v-model="email" readonly placeholder="EMAIL">
  <input type="date" v-model="birth" placeholder="BIRTH">
  <input type="text" v-model="gender" placeholder="GENDER">
  <input type="text" v-model="phone" placeholder="PHONE">
  <button @click="sendDate">Update</button><br>

  <input type="text" v-model="password" placeholder="PASSWORD">
  <button @click="setPassword">Change password</button>

  <h1>My groups</h1>
  <table>
    <tr>
      <th>Name</th>
      <th>Kind of sport</th>
      <th>Coach id</th>
      <th>Limit members</th>
    </tr>
    <tr v-for="group in groups" :key="group._id">
      <th>{{group.name}}</th>
      <th>{{group.kindSport}}</th>
      <th>{{group.coachID}}</th>
      <th>{{group.limitMembers}}</th>
    </tr>
  </table>

</template>

<script>
import axios from "axios";
import {getUserByToken} from "@/js/getterByValue";
export default {
  data() {
    return {
      userID: "",
      name: "",
      lastName: "",
      patronymic: "",
      password: "",
      email: "",
      birth: Date.now(),
      gender: "",
      phone: "",
      groups: []
    }
  },

  methods: {
    async sendDate(){
      await axios.post(`http://localhost:8000/users/updateUser/${this.userID}`, {
        name: this.name,
        lastName: this.lastName,
        patronymic: this.patronymic,
        password: this.password,
        email: this.email,
        birth: this.birth,
        gender: this.gender,
        phone: this.phone,
      })
    },
    async setPassword(){
      await axios.post(`http://localhost:8000/users/setPassword`, {
        userID: this.userID,
        password: this.password,
      });
    },
  },
  async mounted() {
    await getUserByToken(localStorage.getItem("token")).then(res => {
      this.userID = res.data.id
    });

    await axios.get(`http://localhost:8000/users/getUserGroups/${this.userID}`).then(res => {
      this.groups = res.data.user.groupsID
    })


    await axios.get(`http://localhost:8000/users/getUser/${this.userID}`).then(res => {
       this.name = res.data.user.name;
       this.lastName = res.data.user.lastName;
       this.patronymic = res.data.user.patronymic;
       this.password = res.data.user.password;
       this.email = res.data.user.email;
       this.birth = res.data.user.birth;
       this.gender = res.data.user.gender;
       this.phone = res.data.user.phone;
    })
  }
}
</script>

<style scoped>

</style>