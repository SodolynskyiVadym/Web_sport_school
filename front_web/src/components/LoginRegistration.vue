<template>
  <section>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
  <div v-if="error" role="alert" class="error-message-exist">
    {{error}}
  </div>
  <div class="container">
    <div class="main">
      <input type="checkbox" id="chk" aria-hidden="true" v-model="showRegistrationForm">

      <div class="login" :class="{ 'hidden-form': showRegistrationForm }">
        <div class="form">
          <label for="chk" aria-hidden="true">Log in</label>
          <input type="text" v-model="emailLog" placeholder="Email" class="input-field" @input="validateEmail">
          <div v-if="invalidEmail" class="error-message">Please enter a valid email address example@gmail.com</div>
          <input type="password" v-model="passwordLog" placeholder="Password" class="input-field" @input="validatePassword">
          <div class="forgot-password">
            <p style="font-size: 12px; color: #fff; cursor: pointer" @click="this.$router.push('/forgotPassword')"> Forgot password ?</p>
          </div>

          <div v-if="invalidPassword" class="error-message">Password should be at least 8 characters long</div>
          <button v-else @click="sendDataLogin" class="btn-login">Log in</button>
          <div v-if="loggedIn" class="success-message">You have successfully logged in!</div>
        </div>
      </div>

      <div class="register" :class="{ 'hidden-form': !showRegistrationForm }">
        <div class="form">
          <label for="chk" aria-hidden="true">Register</label>
          <input class="input" type="text" name="txt" v-model="name" placeholder="NAME" @input="validateName">
          <div v-if="invalidName" class="error-message-name">Name can consist only letters and '-' or '</div>
          <input class="input" type="text" name="txt" v-model="lastName" placeholder="LASTNAME" @input="validateLastName">
          <div v-if="invalidLastName" class="error-message-lastname">Last name can consist only letters and '-' or '</div>
          <input class="input" type="password" name="pswd" v-model="passwordReg" placeholder="PASSWORD" @input="validationPassword">
          <div v-if="invalidPasswordType" class="error-message-password">Password should be at least 8 characters long</div>
          <input class="input" type="email" name="email" v-model="emailReg" placeholder="EMAIL" @input="validationEmail">
          <div v-if="invalidEmailAdress" class="error-message-email">Please enter a valid email address example@gmail.com</div>
          <input class="input" type="date" name="date" v-model="birth" placeholder="BIRTH" ref="datePicker">
          <div  class="error-message-date">Your age should be less than 18 and more than 7 years old</div>


          <input class="input" type="text" name="phone" v-model="phone" ref="phone" placeholder="PHONE" @input="checkPhone">
          <div v-if="invalidPhone" class="error-message-phone">Please enter a valid phone number +38(0##)-###-##-##</div>
          <div class="gender-options">
            <h2 style="font-size: 0.9rem;">GENDER:</h2>
            <div class="radio-buttons">
              <label for="female" class="radio-label" style="font-size: 0.9rem;">
                <input type="radio" id="female" value="female" v-model="gender">
                <span class="radio-custom female"></span>
                Female
              </label>
              <label for="male" class="radio-label" style="font-size: 0.9rem;">
                <input type="radio" id="male" value="male" v-model="gender">
                <span class="radio-custom male"></span>
                Male
              </label>
            </div>
          </div>
          <button class="button-register" @click="sendDateRegistration">Register</button>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>

<script>
import axios from "axios";
import inputMask from "@/js/initInputMask";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { English } from "flatpickr/dist/l10n/default.js";


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
      showRegistrationForm: false,
      checkPassword: "",
      error: ""
    };
  },
  methods: {
    async sendDateRegistration() {
      try {
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
        this.$router.push("/")

      }catch (err){
        this.error = "This email already exist"
      }
    },

    async sendDataLogin() {
      if (this.invalidEmail || this.invalidPassword) {
        return;
      }

      try {
        const response = await axios.post("http://localhost:8000/users/login", {
          email: this.emailLog,
          password: this.passwordLog
        });

        localStorage.token = response.data.token;
        this.emailLog = "";
        this.passwordLog = "";
        this.loggedIn = true;

      }catch (err) {
        this.error = err.response.data.message
      }
    },

    validateEmail() {
      const re = /\S+@\S+\.\S+/;
      this.invalidEmail = !re.test(this.emailLog);
    },
    validatePassword() {
      this.invalidPassword = this.passwordLog.length < 7;
    },
    validationPassword() {
      this.invalidPasswordType = this.passwordReg.length < 7;
    },
    validationEmail() {
      const re = /\S+@\S+\.\S+/;
      this.invalidEmailAdress = !re.test(this.emailReg);
    },
    async checkPhone() {
      const phoneRegex = /^\+\d{2}\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
      this.invalidPhone = !phoneRegex.test(this.phone);
    },
    validateName() {
      const reg = /[\d\s]/;
      this.invalidName = reg.test(this.name);
    },
    validateLastName() {
      const re = /[\d\s]/;
      this.invalidLastName = re.test(this.lastName);
    },



  },
  mounted() {
    inputMask(this.$refs.phone);
    flatpickr(this.$refs.datePicker, {
      dateFormat: 'd.m.Y',
      locale: English,
      minDate: new Date().fp_incr(-18 * 365),
      maxDate: new Date().fp_incr(-7 * 365),
    });
  }
};

</script>

<style>

body{
  background-color: rgba(238,238,238,0.99);
}
.forgot-password {
  margin-top: -10px;
  text-align: right;
  margin-right: 350px;
}
.error-message-exist{
  color: red;
  position: absolute;
  font-size: 16px;
  margin-top: 35px;
  margin-left: 650px;
  transition: opacity 0.5s;
  text-align: center;
}
.error-message-name {
  color: black;
  position: absolute;
  font-size: 10px;
  margin-top: 85px;
  margin-bottom: -17px;
  margin-left: 100px;
  transition: opacity 0.5s;
  text-align: center;
}
.error-message-date {
  color: black;
  position: absolute;
  font-size: 10px;
  margin-top: 325px;
  margin-bottom: -17px;
  margin-left: 130px;
  transition: opacity 0.5s;
  text-align: center;
}
.error-message-lastname {
  color: black;
  position: absolute;
  font-size: 10px;
  margin-top: 145px;
  margin-bottom: -17px;
  margin-left: 100px;
  transition: opacity 0.5s;
  text-align: center;
}
.error-message-phone {
  color: black;
  position: absolute;
  font-size: 10px;
  margin-top: 385px;
  margin-bottom: -17px;
  margin-left: 100px;
  transition: opacity 0.5s;
  text-align: center;
}
.error-message-password {
  color: black;
  position: absolute;
  font-size: 10px;
  margin-top: 205px;
  margin-bottom: -17px;
  margin-left: 100px;
  transition: opacity 0.5s;
  text-align: center;
}
.error-message-email {
  color: black;
  position: absolute;
  font-size: 10px;
  margin-top: 265px;
  margin-bottom: -17px;
  margin-left: 100px;
  transition: opacity 0.5s;
  text-align: center;
}
.gender-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 27px;
}

.gender-options h2 {
  position: absolute;
  font-size: 1.5rem;
  margin-top: -26.5px;
  margin-left: -350px;

}

.radio-buttons {
  display: flex;
  margin-left: -80px;
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
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid #ccc;
  position: relative;
  margin-right: 8px;
}

.radio-custom::before {
  content: '';
  display: block;
  position: absolute;
  top: 2px;
  left: 2px;

  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: transparent;
  transition: background-color 0.3s ease;
}


input[type="radio"] {
  display: none;
}

input[type="radio"]:checked + .radio-custom::before {
  background-color: #000;
}



.container {
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(238, 238, 238, 0.99);

}

.main {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: black;
  height: 650px;
  width: 500px;
  overflow: hidden;
  border-radius: 3%;
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
  border-radius: 73% 73% 3% 3% / 10% 10% 3% 3%;
  transition: .8s ease-in-out;
  max-height: 247px;
  width: 500px;
  overflow: hidden;
  position: fixed;
  padding: 17px;
  margin-top: 402px;
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
  margin-top: -20px;

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
  color: white;
  font-size: 12px;
  margin-top: -50px;
  margin-left: 130px;

}
.error-message {
  color: #ffffff;
  font-size: 10px;
  margin-top: -7px;
  margin-bottom: -17px;
  transition: opacity 0.5s;
  text-align: center;
}
.error-message-password {
  color: black;
  position: absolute;
  font-size: 10px;
  margin-top: 205px;
  margin-bottom: -17px;
  transition: opacity 0.5s;
  text-align: center;
}
#chk:checked ~ .register .error-message {
  opacity: 1;
}
</style>

