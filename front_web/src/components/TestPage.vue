<template>
  <div class="container">
    <div class="main">
      <input type="checkbox" id="chk" aria-hidden="true" v-model="showRegistrationForm">

      <div class="login" :class="{ 'hidden-form': showRegistrationForm }">
        <div class="form">
          <label for="chk" aria-hidden="true">Log in</label>
          <input type="text" v-model="emailLog" placeholder="Email" class="input-field" @input="validateEmail">
          <div v-if="invalidEmail" class="error-message">Please enter a valid email address example@gmail.com</div>
          <input type="password" v-model="passwordLog" placeholder="Password" class="input-field" @input="validatePassword">
          <div v-if="invalidPassword" class="error-message">Password should be at least 8 characters long</div>
          <button @click="sendDataLogin" class="btn-login">Log in</button>
          <div v-if="loggedIn" class="success-message">You have successfully logged in!</div>
        </div>
      </div>

      <div class="register" :class="{ 'hidden-form': !showRegistrationForm }">
        <div class="form">
          <label for="chk" aria-hidden="true">Register</label>
          <input class="input" type="text" name="txt" v-model="name" placeholder="NAME">
          <input class="input" type="text" name="txt" v-model="lastName" placeholder="LASTNAME">
          <input class="input" type="password" name="pswd" v-model="passwordReg" placeholder="PASSWORD">
          <input class="input" type="email" name="email" v-model="emailReg" placeholder="EMAIL">
          <input class="input" type="date" name="date" v-model="birth" placeholder="BIRTH">
          <input class="input" type="text" name="gender" v-model="gender" placeholder="GENDER">
          <input class="input" type="text" name="phone" v-model="phone" ref="phone" placeholder="PHONE">
          <button @click="sendDateRegistration">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import inputMask from "@/js/initInputMask";

export default {
  data() {
    return {
      name: "",
      lastName: "",
      passwordLog: "",
      passwordReg: "",
      emailLog: "",
      emailReg: "",
      birth: Date.now(),
      gender: "",
      phone: "",
      token: "",
      invalidEmail: false,
      invalidPassword: false,
      loggedIn: false,
      showRegistrationForm: false
    };
  },
  methods: {
    async sendDateRegistration() {
      const response = await axios.post("http://localhost:8000/users/createUser", {
        name: this.name,
        lastName: this.lastName,
        password: this.passwordReg,
        email: this.emailReg,
        birth: this.birth,
        gender: this.gender,
        phone: this.phone,
        role: "user"
      });

      localStorage.token = response.data.token;
    },
    async sendDataLogin() {
      if (this.invalidEmail || this.invalidPassword) {
        return;
      }

      const response = await axios.post("http://localhost:8000/users/login", {
        email: this.emailLog,
        password: this.passwordLog
      });

      localStorage.token = response.data.token;

      this.emailLog = "";
      this.passwordLog = "";
      this.loggedIn = true;
    },
    validateEmail() {
      const re = /\S+@\S+\.\S+/;
      this.invalidEmail = !re.test(this.emailLog);
    },
    validatePassword() {
      this.invalidPassword = this.passwordLog.length < 8;
    }
  },
  mounted() {
    inputMask(this.$refs.phone);
  }
};

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
}

.container {
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;

}

.main {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: black;
  height: 600px;
  width: 500px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.99) 0px 30px 90px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
}

#chk {
  display: none;
}

.login {
  position: relative;
  border-radius: 60% / 10%;
  transition: .8s ease-in-out;
}

.login label {
  margin: 5% 0 5%;
}


.login input {
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


.input {
  width: 100%;
  height: 40px;
  font-size: 1rem;
  background: #e0dede;
  padding: 7px;
  margin-top: 13px;
  border: none;
  outline: none;
  border-radius: 4px;
}


.register {
  background: #eee;
  border-radius: 73% / 10%;
  transition: .8s ease-in-out;
  max-height: 247px;
  width: 500px;
  padding: 7px;
}

.register input {
  width: auto;
  height: 30px;
  font-size: 0.9rem;
  background: #e0dede;
  padding: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  border: none;
  outline: none;
  border-radius: 4px;
  opacity: 0;
}

.register label {
  color: black;
  transform: translateY(50%);
  transition: transform 0.5s, opacity 0.5s;
  margin: 20px;
}

#chk:checked ~ .register {
  transform: translateY(-57%);
  max-height: 640px;
}

#chk:checked ~ .register label {
  transform: translateY(-29%);
  opacity: 1;
}
#chk:checked ~ .register input {
  opacity: 1;
}
#chk:checked ~ .login label {
  transform: scale(.6);
}


.form button {
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

.form button:hover {
  background-color: darkgray;
}
.success-message {
  color: green;
  font-size: 20px;
  margin-top: 40px;
}
.error-message {
  color: #ffffff;
  font-size: 10px;
  margin-top: -7px;
  margin-bottom: -17px;
  transition: opacity 0.5s;
  text-align: center;
}
#chk:checked ~ .register .error-message {
  opacity: 1;
}
</style>

