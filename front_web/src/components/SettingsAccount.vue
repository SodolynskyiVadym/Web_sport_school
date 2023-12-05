<template>
  <input type="text" v-model="name" placeholder="NAME">
  <input type="text" v-model="lastName" placeholder="LASTNAME">
  <input type="text" v-model="email" readonly placeholder="EMAIL">
  <input type="date" v-model="birth" placeholder="BIRTH">
  <input type="text" v-model="gender" placeholder="GENDER">
  <input type="text" v-model="phone" placeholder="PHONE">
  <button @click="sendDate">Update</button><br>

  <input type="text" v-model="password" placeholder="PASSWORD">
  <button @click="setPassword">Change password</button>

  <h1>My groups</h1>
  <table v-if="userRole === 'user'">
    <tr>
      <th>Name</th>
      <th>Kind of sport</th>
      <th>Coach</th>
      <th>Limit members</th>
      <th>Action</th>
    </tr>
    <tr v-for="group in groups" :key="group._id">
      <th>{{group.name}}</th>
      <th>{{group.kindSport}}</th>
      <th @click="readMoreCoach(group.coachID._id)" style="color: cornflowerblue; cursor: pointer ">{{group.coachID.name + " " + group.coachID.lastName}}</th>
      <th>{{group.limitMembers}}</th>
      <th><button @click="leaveGroup(group._id)">Leave</button></th>
    </tr>
  </table>

  <table v-if="userRole === 'coach'">
    <tr>
      <th>Name</th>
      <th>Kind of sport</th>
      <th>Limit members</th>
      <th>Price</th>
      <th>Discount</th>
      <th>Action1</th>
      <th>Action2</th>
    </tr>
    <tr v-for="group in groups" :key="group._id">
      <th>{{group.name}}</th>
      <th>{{group.kindSport}}</th>
      <th>{{group.limitMembers}}</th>
      <th>{{group.priceID.price}}</th>
      <th>{{group.priceID.discount}}</th>
      <th><button @click="enterUpdateGroupPage(group._id)">UPDATE</button></th>
      <th><button @click="deleteGroup(group._id)">DELETE</button></th>
    </tr>
  </table>

</template>

<script>
import axios from "axios";
import * as listURL from "@/js/listURL";
export default {
  data() {
    return {
      userID: "",
      userRole: "",
      name: "",
      lastName: "",
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
        password: this.password,
        email: this.email,
        birth: this.birth,
        gender: this.gender,
        phone: this.phone,
      })
    },
    async setPassword(){
      await axios.post("http://localhost:8000/users/setPassword", {
        userID: this.userID,
        password: this.password,
      });
      this.password = "";
    },

    async enterUpdateGroupPage(groupID){
      this.$router.push(`/updateGroup/${groupID}`);
    },

    async deleteGroup(groupID){
      await axios.delete(`http://localhost:8000/groups/deleteGroup/${groupID}`);
    },

    async leaveGroup(groupID){
      await axios.patch(`http://localhost:8000/users/leaveGroup`, {
        groupID: groupID,
        userID: this.userID
      });

      location.reload();
    },
    async readMoreCoach(coachID){
      this.$router.push(`/overviewCoach/${coachID}`);
    }
  },
  async mounted() {
    const userData = await listURL.getUserByToken(localStorage.getItem("token"));
    this.userID = userData.id
    this.userRole = userData.role;


    if (this.userRole === "user"){
      await axios.get(`http://localhost:8000/users/getUserGroups/${this.userID}`).then(res => {
        this.groups = res.data.groups
      });
    }

    if (this.userRole === "coach"){
      await axios.get(`http://localhost:8000/users/getCoachGroups/${this.userID}`).then(res => {
        this.groups = res.data.groups
      });
    }


    await axios.get(`http://localhost:8000/users/getUser/${this.userID}`).then(res => {
       this.name = res.data.user.name;
       this.lastName = res.data.user.lastName;
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