<template>
  <div class="container">
    <h3>Enter email to register coach:</h3>
    <div class="email-input">
      <input type="text" v-model="email" placeholder="Enter email">
      <button @click="registerCoach">Register</button>
    </div>

    <table id="tableUsers" class="table-users-data">
      <tr>
        <th>Name</th>
        <th>Last Name</th>
        <th>Patronymic</th>
        <th>Birthday</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Gender</th>
        <th>Role</th>
        <th>Checkbox</th>
      </tr>
      <tr v-for="user in users" :key="user._id">
        <td>{{ user.name }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.patronymic }}</td>
        <td>{{ user.birth }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
        <td>{{ user.gender }}</td>
        <td>{{ user.role }}</td>
      </tr>
    </table>

    <div class="button-container">
      <button id="deleteRows" @click="deleteRows">DELETE</button>
      <button id="duplicateRows" @click="dublicateRow">DUPLICATE</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      users: []
    }
  },
  methods: {
    async registerCoach(){
      await axios.post('http://localhost:8000/users/createUser', {
        email: this.email,
        role: "coach",
        lastName: "",
        lastname: "",
        patronymic: "",
        gender: "",
        phone: "",
        password: "12345678",
        birth: "",
      })
    },
    async getUsers() {
      await axios.get(`http://localhost:8000/users/getAllUsers`).then(response => {
        this.users = response.data.users
      })
    },
    deleteRows() {
      // Your deleteRows function logic here
    },
    dublicateRow() {
      // Your dublicateRow function logic here
    }
  },
  async mounted() {
    await this.getUsers();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

*{
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  outline: none;
  border: none;
  text-transform: capitalize;
  transition: all .2s linear;
}

body{
  background: white;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

h3 {
  font-style: italic;
  font-weight: 1000;
  font-size: 1rem;
  text-transform: uppercase;
  margin: 10px 0;
}

.container {
  margin: 20px auto;
  width: 80%;
  max-width: 1200px;
}

.email-input {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

input[type="text"] {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid black;
  margin-right: 10px;
}

button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: black;
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.button-container button {
  margin: 0 5px;
}

button#deleteRows, button#duplicateRows {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
}

button#deleteRows:hover, button#duplicateRows:hover {
  background-color: #333;
}
@media screen and (max-width: 768px) {
  .email-input {
    flex-direction: column;
    align-items: stretch;
  }

  .email-input input[type="text"] {
    margin-bottom: 10px;
    margin-right: 0;
  }

  .email-input button {
    width: 100%;
  }

  table {
    font-size: 12px;
  }

  th, td {
    padding: 6px;
  }

  .button-container {
    flex-direction: column;
    align-items: center;
  }

  .button-container button {
    margin: 5px 0;
  }
}
</style>
