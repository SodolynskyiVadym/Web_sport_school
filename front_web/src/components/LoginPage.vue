<template>
  <div class="login-container">
    <h2>Log in</h2>
    <div class="form-container">
      <div class="input-container">
        <input type="text" v-model="email" placeholder="Email" class="input-field" @input="validateEmail">
        <div v-if="invalidEmail" class="error-message">Please enter a valid email address example@gmail.com</div>
      </div>
      <div class="input-container">
        <input type="password" v-model="password" placeholder="Password" class="input-field" @input="validatePassword">
        <div v-if="invalidPassword" class="error-message">Password should be at least 8 characters long</div>
      </div>
      <button @click="sendData" class="btn-login">Log in</button>
      <div v-if="loggedIn" class="success-message">You have successfully logged in!</div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      token: "",
      invalidEmail: false,
      invalidPassword: false,
      loggedIn: false
    }
  },
  methods: {
    async sendData() {
      if (this.invalidEmail || this.invalidPassword) {
        return;
      }

      const response = await axios.post("http://localhost:8000/users/login", {
        email: this.email,
        password: this.password
      });

      localStorage.token = response.data.token;

      this.email = "";
      this.password = "";

      this.loggedIn = true
    },

    validateEmail() {
      const re = /\S+@\S+\.\S+/;
      this.invalidEmail = !re.test(this.email);
    },
    validatePassword() {
      this.invalidPassword = this.password.length < 8;
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

* {
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

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  margin-top: 50px;
}


h2 {
  font-style: italic;
  font-weight: 1000;
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 40px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.input-field {
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 250px;
  font-size: 16px;
  color: #555;
  transition: border-color 0.3s ease-in-out;
}
.input-container {
  position: relative;
  margin-bottom: 8px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 10px;
  position: absolute;
  bottom: -18px;
  left: 0;
}

.input-field:focus {
  border-color: #000;
}

.btn-login {
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 20px
}

.btn-login:hover {
  background-color: #333;
}
.success-message {
  color: green;
  font-size: 20px;
  margin-top: 40px;
}
</style>