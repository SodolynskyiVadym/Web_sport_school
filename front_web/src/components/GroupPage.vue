<template>
  <section class="group-page">
    <div class="container-groups">
      <div class="group" v-for="group in groups" :key="group._id">
        <div class="image-animation"><img :src="require(`@/assets/${group.kindSport}.jpeg`)" :alt="`${group.kindSport}`"></div>
        <div class="group-info">
          <div class="group-info-title">
            <span class="info">${{ group.priceID.price }}</span>
            <span class="group-name">{{ group.name }}</span>
          </div>
          <span class="info">{{ group.kindSport.toUpperCase() }}</span>
          <span class="info-coach">{{ group.coachID.name }} {{ group.coachID.lastName }}</span>
        </div>
        <button class="button-group-page" @click="enterGroupPage(group._id)">INFO</button>
      </div>
    </div>
  </section>
</template>

<script>
// import axios from "axios";
import * as listURL from "@/js/listURL";

export default {
  data() {
    return {
      groups: [],
      userID: "",
      userGroupsID: []
    }
  },
  methods: {
    async enterGroupPage(groupID) {
      this.$router.push(`/overviewGroup/${groupID}`)
    }
  },
  async mounted() {
    if (localStorage.getItem("token")){
      const userData = await listURL.getUserByToken(localStorage.getItem("token"));
      this.userID = userData.id
      this.userRole = userData.role
      this.userGroupsID = userData.user.groupsID
    }


    const groupsData = await listURL.requestGroupsGet(`/getAllGroup`);
    this.groups = await groupsData.groups.filter(group => !this.userGroupsID.includes(group));
    this.groups = this.groups.filter(group => group.limitMembers > group.currentMembers);

    await this.$nextTick();

    const images = document.querySelectorAll('.group img');
    images.forEach(image => {
      image.classList.add('image-animation');
    });
  }
}
</script>
<style>
body{
  background-color: rgba(238,238,238,0.99);
}
.group-page{
  position: relative;
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.5s;
  background-color: rgba(238,238,238,0.99);
}

.container-groups {
  margin-left: 10%;
  margin-right: 10%;
  width: 80%;
  height: auto;
  background-color: rgba(238,238,238,0.99);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 80px;
  margin-top: 80px;
}

.group {
  flex: 0 0 calc(33.33% - 32px);
  margin:16px;
  margin-bottom: 46px;
  padding-top: 60px;
  height: auto;
  background-color: white;
  border-radius: 12px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.76) 0px 10px 30px;
  transition: transform 0.3s ease;
  position: relative;
}

.group:hover {
  transform: translateY(-5px);
}

.group img {
  height: 120px;
  width: 170px;
  margin-top: -20px;
  border-radius: 12px 12px 0 0;
}
.image-animation {
  animation-name: slideUp;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

@keyframes slideUp {
  from {
    margin-top: 40px;
    opacity: 0;
  }
  to {
    margin-top: -40px;
    opacity: 1;
  }
}

.group img:not(.image-animation) {
  margin-top: -20px;
}

.group-info {
  padding: 20px;
  width: 100%;
  text-align: left;
}

.group-info-title .group-name {
  flex: 1;
}

.group-info-title .info {
  margin-left: 280px;
  margin-bottom: -33px;
  font-size: 20px;
}

.group-info span {
  display: block;
  margin-bottom: 10px;
}

.group-name {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.button-group-page {
  position: absolute;
  bottom: 20px;
  left: 85%;
  transform: translateX(-50%);
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #fff;
  background-color: #000;
  border: 1px solid #fff;
  text-decoration: none;
}

button:hover {
  background-color: darkgray;
  color: #fff;
}
</style>