<template>
  <div class="container">
    <div class="leftbox">
      <div class="input-row">
        <div class="input-wrapper">
          <h2>Name</h2>
          <input type="text" v-model="name" placeholder="NAME" @input="checkName">
          <div v-if="invalidName" class="error-message-validate">Name can consist only letters and '-' or '</div>

        </div>
        <div class="input-wrapper">
          <h2>Last Name</h2>
          <input type="text" v-model="lastName" placeholder="LASTNAME" @input="checkLastName">
          <div v-if="invalidLastName" class="error-message-validate-right">Last name can consist only letters and '-' or '</div>
        </div>
      </div>
      <div class="input-row">
        <div class="input-wrapper">
          <h2>Email</h2>
          <input type="text" v-model="email" readonly placeholder="EMAIL">
        </div>
        <div class="input-wrapper">
          <h2>Birth</h2>
          <input type="date" v-model="birth" v-if="userRole==='user'" placeholder="BIRTH" min="2005-01-01" max="2017-01-01">
          <input type="date" v-model="birth" v-else placeholder="BIRTH" min="1905-01-01" max="2005-01-01">

        </div>
      </div>
      <div class="input-row">
        <div class="input-wrapper">
          <h2>Gender</h2>
          <div class="radio-buttons">
            <label for="female" class="radio-label">
              <input type="radio" id="female" value="female" v-model="gender">
              <span class="radio-custom female"></span>
              Female
            </label>
            <label for="male" class="radio-label">
              <input type="radio" id="male" value="male" v-model="gender">
              <span class="radio-custom male"></span>
              Male
            </label>
          </div>
        </div>
        <div class="input-wrapper">
          <h2>Phone</h2>
          <input type="text" v-model="phone" ref="phone" placeholder="PHONE">
        </div>
      </div>
      <button class="button-update" @click="sendDate">Update</button>
      <div class="input-wrapper password-wrapper">
        <h2>Password</h2>
        <input type="text" v-model="password" placeholder="PASSWORD" @input="checkPassword">
        <div v-if="invalidPassword" class="error-message-password">Password must be more than 7 symbols and consist only letters and numbers</div>

      </div>
      <button class="button-change" @click="setPassword">Change password</button>
    </div>
    <div class="rightbox">
      <h1>My groups</h1>
      <div class="table-container">
      <table class="custom-table" v-if="userRole === 'user'">
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
          <th @click="readMoreCoach(group.coachID._id)" style="color: black; cursor: pointer ">{{group.coachID.name + " " + group.coachID.lastName}}</th>
          <th>{{group.limitMembers}}</th>
          <th><button class="button-table-coach" @click="leaveGroup(group._id)">Leave</button></th>
        </tr>
      </table>
      </div>
      <div class="table-container-coach">
        <table class="custom-table" v-if="userRole === 'coach'">
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
            <th><button class="button-table-coach" @click="enterUpdateGroupPage(group._id)">UPDATE</button></th>
            <th><button class="button-table-coach" @click="deleteGroup(group._id)">DELETE</button></th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as listURL from "@/js/listURL";
import inputMask from "@/js/initInputMask";
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
      groups: [],
      invalidName: false,
      invalidLastName: false,
      invalidPassword: false
    }
  },

  methods: {
    async sendDate(){
      if (this.invalidName || this.invalidLastName) return

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
      if (this.invalidPassword) return
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
      await listURL.requestDeleteGroup(groupID)
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
    },

    async checkName(){
      const reg = /[\d\s]/;
      this.invalidName = reg.test(this.name);
    },

    async checkLastName(){
      const reg = /[\d\s]/;
      this.invalidLastName = reg.test(this.lastName);
    },

    async checkPassword(){
      const reg = /^[a-zA-Z0-9]{8,}$/;
      this.invalidPassword = !reg.test(this.password);
    }
  },
  async mounted() {
    inputMask(this.$refs.phone);
    const userData = await listURL.getUserByToken(localStorage.getItem("token"));
    this.userID = userData.id
    this.userRole = userData.role;


    if (this.userRole === "user"){
      const userData = await listURL.requestUsersGet(`/getUserGroups/${this.userID}`);
      this.groups = userData.groups
    }

    if (this.userRole === "coach"){
      const userData = await listURL.requestUsersGet(`/getCoachGroups/${this.userID}`);
      this.groups = userData.groups
      await axios.get(`http://localhost:8000/users/getCoachGroups/${this.userID}`).then(res => {
        this.groups = res.data.groups
      });
    }

    const userDataFull = await listURL.requestUsersGet(`/getUser/${this.userID}`);
    this.name = userDataFull.user.name;
    this.lastName = userDataFull.user.lastName;
    this.password = userDataFull.user.password;
    this.email = userDataFull.user.email;
    this.birth = userDataFull.user.birth;
    this.gender = userDataFull.user.gender;
    this.phone = userDataFull.user.phone;
  }
}
</script>

<style>
body{
  background-color: rgba(238,238,238,0.99);
}
.container {
  display: flex;
  justify-content: space-between;
}
.error-message-validate {
  position: absolute;
  display: inline-block;
  margin-left: -270px;
  z-index: 1;
  margin-top: 30px;
  font-size: 10px;
  color: #383535;
}
.error-message-validate-right {
  position: absolute;
  display: inline-block;
  margin-left: -270px;
  z-index: 1;
  margin-top: 30px;
  font-size: 10px;
  color: #383535;
}
.error-message-password {
  position: absolute;
  display: inline-block;
  margin-left: -270px;
  z-index: 1;
  margin-top: 30px;
  font-size: 10px;
  color: #383535;
}

h1 {
  text-align: center;
}
.table-container {
  margin-top: 20px;
  border-radius: 12px;
  height: 480px;
  overflow-y: auto;
}
.table-container-coach {
  margin-top: -500px;
  border-radius: 12px;
  height: 480px;
  overflow-y: auto;
}

.custom-table {
  border-radius: 20px;
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

table {
  border-collapse: collapse;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}



 th,
 td {
   text-align: center;
   padding: 12px;
 }

th:not(:last-child),
td:not(:last-child) {
  border-right: 1px solid #ddd;
}


h2,
th {
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}



tr:nth-child(even) {
  background-color: #f9f9f9;
}

td button {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #ddd;
  color: #333;
  transition: background-color 0.3s ease;
}

td button:hover {
  background-color: #ccc;
}

.leftbox {
  width: 42%;
  height: 600px;
  padding: 20px;
  border: 1px solid white;
  border-radius: 8px;
  margin-top: 70px;
  margin-left: 60px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.76) 0px 10px 30px;
}
.rightbox {
  width: 42%;
  height: 600px;
  padding: 20px;
  border: 1px solid white;
  border-radius: 8px;
  margin-top: 70px;
  margin-right: 70px;
  margin-left: 60px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.76) 0px 10px 30px;
}

.input-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.input-wrapper {
  width: 48%;
}

.input-wrapper h2 {
  margin-bottom: 5px;
  font-size: 14px;
}

input[type="text"],
input[type="date"] {
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  width: 100%;
  font-size: 14px;
  padding-bottom: 5px;
}
.password-wrapper {
  position: relative;
  top: -125px;
  right: -310px;
  width: 280px;
}



.button-table-coach {
  background: #fff;
  font-size: 10px;
  text-align: center;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  align-items: center;
  height: 40px;
  width: 55px;
  color: black;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.76);
  cursor: pointer;
  transition: .2s;
}


.button-change {
  background: #fff;
  font-size: 14px;
  margin-top: -160px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  font-weight: 700;
  align-items: center;
  height: 60px;
  width: 220px;
  color: black;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.76);
  cursor: pointer;
  transition: .2s;
}
.button-update {
  background: #fff;
  font-size: 14px;
  margin-top: 70px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  font-weight: 700;
  align-items: center;
  height: 60px;
  width: 220px;
  color: black;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.76);
  cursor: pointer;
  transition: .2s;
}

.button-change:active,
.button-change:focus,
.button-change:hover,
.button-update:active,
.button-update:focus,
.button-update:hover{
  border-color: rgba(0, 0, 0, 0.76);
  outline: none;
}


.radio-buttons {
  display: flex;
}

.radio-label {
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  font-size: 16px;
}

.radio-custom {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
  position: relative;
  margin-right: 8px;
}

.radio-custom::before {
  content: '';
  display: block;
  position: absolute;
  top: 4px;
  left: 4px;

  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.female .radio-custom::before {
  background-color: #ff9ee3;
}

.male .radio-custom::before {
  background-color: #9ee3ff;
}

input[type="radio"] {
  display: none;
}

input[type="radio"]:checked + .radio-custom::before {
  background-color: #000;
}



</style>

