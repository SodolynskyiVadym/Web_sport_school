<template>
  <header>

    <a class="logo">Sport school</a>
    <ul>
      <li><a href="/admin" class="text">Admin Page</a></li>
      <li><a href="/settingsAccount" class="text">Setting account</a></li>
      <li><a href="/createGroup" class="text">Create group</a></li>
      <li><a href="/createSchedule" class="text">Create schedule</a></li>
      <li><a href="/" class="text">Home</a></li>
      <li v-if="isLogin"><a href="/login"  class="text">Log in</a></li>
      <li v-else><a href="/" @click="logout" class="text">Log out</a></li>
      <li><a href="/register" class="text">Register</a></li>
    </ul>

  </header>
  <div class="content-wrapper">

  <router-view></router-view>
  </div>
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
<style >
@font-face {
  font-family: 'iran_sans_bold';
  src: url('@/assets/iran_sans_bold.woff') format('woff');
}

@font-face {
  font-family: 'iran_sans_light';
  src: url('@/assets/iran_sans_light.woff') format('woff');
}

@font-face {
  font-family: 'iran_sans_medi';
  src: url('@/assets/iran_sans_medi.woff') format('woff');
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: iran_sans_medi,sans-serif;
}

header{
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  padding: 20px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  background-color: rgba(238,238,238,0.99);


}
header .logo{
  position: relative;
  font-size: 30px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.99);
  font-weight: 600;
  left: -45px;


}
header ul{
  position: relative;
  display: flex;


}
header ul li{
  list-style-type: none;

}
header ul li a{
  display: inline-block;
  color: rgba(0, 0, 0, 0.99);
  font-weight: 400;
  margin-left: 40px;
  text-decoration: none;

}
.content-wrapper {
  margin-top: 80px;
}

</style>