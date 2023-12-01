<template>
  <header class="header">
    <div class="white-bar"></div>
    <div class="logo">
      <img src="./assets/logo2.png" alt="logo">
      <span class="logo-text">Sport school</span>
    </div>
    <div class="header-text">
      <a href="/admin" class="text">Admin Page</a>
      <a href="/settingsAccount" class="text">Setting account</a>
      <a href="/createGroup" class="text">Create group</a>
      <a href="/createSchedule" class="text">Create schedule</a>
      <a href="/" class="text">Main page</a>
      <a href="/login" v-if="isLogin" class="text">Log in</a>
      <a href="/" @click="logout" v-else class="text">Log out</a>
      <a href="/register" class="text">Register</a>
    </div>
  </header>
  <router-view></router-view>
</template>
<script>
export default {
  data() {
    return {
      isLogin: !localStorage.getItem("token")
    }
  },
  methods: {
    async logout(){
      localStorage.removeItem("token");
    }
  }
}
</script>
<style scoped>
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

h1 {
font-style: italic;
font-weight: 1000;
font-size: 4rem;
text-transform: uppercase;
text-align: center;
margin: 20px;
}
h2 {
font-style: italic;
font-weight: 1000;
font-size: 2rem;
text-transform: uppercase;
text-align: center;
margin: 80px;
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
.header {
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  width: 100%;
  top: 0;
}

.header-text {
  display: flex;
}

.text {
  color: black;
}

.white-bar {
  position: absolute;
  top: 55px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: black;
}

.logo img {
  width: 50px;
  height: auto;
  padding: 5px;
  margin-right: 10px;
}

.logo-text {
  font-size: 1.5rem;
  color: black;
}
.header span {
cursor: pointer;
}

.header .text {
color: black;
}

.header .text:hover,
.header .text:hover {
color: darkgray;
}
.header-text a {
margin-right: 13px;
margin-top: -20px;
font-weight: bold;
font-size: 18px;

}


.logo {
  display: flex;
  align-items: center;
  margin-top: -20px;
  position: relative;

  z-index: 1000;
}


@media screen and (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: center;
    padding: 20px;




  }
  .header .header-text a {
    font-size: 0.7rem !important;
    white-space: nowrap;
  }

  .header-text {
    margin-top: 23px;

  }

  .text {
    margin: 7px 0;
    padding: -10px ;


  }

  .white-bar {
    top: 55px;
  }

  .logo {
    margin-top: -30px;
    left: 0;
  }

  .logo-text {
    font-size: 0.7rem;
  }

  .logo img {
    width: 30px;
    margin-right: 5px;
  }
}


</style>