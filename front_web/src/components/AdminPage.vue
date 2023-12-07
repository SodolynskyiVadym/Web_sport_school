<template>
  <section>
    <div class="leftbox-setting">
      <div class="email-input">
        <input type="text" v-model="email" placeholder="Enter email to register coach" @input="validateEmail">
        <div v-if="invalidEmail" class="error-message-validate">Please enter a valid email address example@gmail.com</div>
        <button class="register-coach" @click="createCoach">Register</button>
      </div>
    <div class="search-input">
      <input type="text" v-model="emailFilter" placeholder="Search by email" @input="filterUsers">
    </div>
    <div v-if="error" class="error-message" role="alert">{{error}}</div>
    </div>
    <div class="rightbox-setting">
    <div class="table-container">
    <table id="tableUsers" class="custom-table">
      <tr>
        <th>Name</th>
        <th>Last Name</th>
        <th>Birthday</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Gender</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
      <tr v-for="user in filteredUsersList" :key="user._id">
        <td>{{ user.name }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ new Date(user.birth).toLocaleDateString('en-GB').split('/').reverse().join('-') }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
        <td>{{ user.gender }}</td>
        <td>{{ user.role }}</td>
        <td><button class="button-delete" @click="deleteUser(user._id)">DELETE</button></td>
      </tr>
    </table>
      </div>
  </div>
  </section>
</template>

<script>
import axios from "axios";
import * as listURL from "../js/listURL";

export default {
  data() {
    return {
      emailFilter: "",
      email: "",
      users: [],
      error: "",
      filteredUsersList: [],
      invalidEmail: false
    };
  },
  methods: {
    validateEmail() {
      const re = /\S+@\S+\.\S+/;
      this.invalidEmail = !re.test(this.email);
      console.log()
    },
    async deleteUser(userID) {
      await listURL.requestDeleteUser(userID);
      await this.refreshUsers();
    },

    async createCoach() {
      try {
        if (this.email === "" || this.invalidEmail) return
        await axios.post("http://localhost:8000/users/createCoach", { email: this.email });
        await this.refreshUsers();
      } catch (err) {
        this.error = "This email already exists";
      }
    },

    async refreshUsers() {
      const userData = await listURL.requestUsersGet("/getAllUsers");
      this.users = userData.users;
      this.filterUsers();
    },

    filterUsers() {
      this.filteredUsersList = this.users.filter(user => {
        return user.email.toLowerCase().includes(this.emailFilter.toLowerCase());
      });
    }
  },
  async mounted() {
    await this.refreshUsers();
  },
  watch: {
    emailFilter() {
      this.filterUsers();
    }
  }
};
</script>



<style>


body{
  background-color: rgba(238,238,238,0.99);
}

.leftbox-setting {
  display: flex;
}

.error-message {
  position: absolute;
  display: inline-block;
  margin-left: 280px;
  margin-top: 50px;
  color: #383535;
}
.error-message-validate {
  position: absolute;
  display: inline-block;
  margin-left: -345px;
  margin-top: 40px;
  color: #383535;
}

.email-input {
  margin-top: 80px;
  width: 90%;
  margin-left: 150px;
}
.email-input input{
  margin-bottom: 20px;
  width: calc(100% - 180px);
  box-sizing: border-box;
}

.search-input {
  position: relative;
  margin-top: 80px;
  width: calc(100% - 180px);
  margin-left: 320px;
  left: -280px;
}
.search-input input{
  margin-bottom: 60px;
  width: calc(100% - 180px);
  box-sizing: border-box;
}

.email-input input,
.search-input input {
  flex-grow: 1;
  border: none;
  border-bottom: 2px solid #ccc;
  background-color: rgba(238,238,238,0.99);
  padding: 5px 0;
  font-size: 16px;
  outline: none;
}




.email-input input:focus,
.search-input input:focus {
  border-bottom: 2px solid rgba(32, 32, 32, 0.99);
}




.table-container {
  margin-top: 20px;
  border-radius: 12px;
  height: 480px;
  overflow-y: auto;
}



table {
  border-collapse: collapse;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}
.rightbox-setting {
  position: relative;
  left: 730px;
  width: 80%;
  margin-top: -10px;
  padding: 20px;
  border: 1px solid white;
  border-radius: 8px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.76) 0px 10px 30px;
  margin-left: -590px;
}


.custom-table {
  width: 100%;
  table-layout: auto;
}


td {
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}



tr:nth-child(even) {
  background-color: #f9f9f9;
}
.button-delete {
  background: #fff;
  font-size: 10px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  font-weight: 700;
  height: 60px;
  width: 60px;
  color: black;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.76);
  cursor: pointer;
  transition: .2s;
}


.button-delete:active,
.button-delete:focus,
.button-delete:hover{
  border-color: rgba(0, 0, 0, 0.76);
  outline: none;
}
.register-coach {
  background: #fff;
  font-size: 10px;
  position: relative;
  top: 0;
  left: 10px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  font-weight: 700;
  height: 40px;
  width: 100px;
  color: black;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.76);
  cursor: pointer;
  transition: .2s;
}








</style>
