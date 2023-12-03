<template>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
  <div class="group-details-overview" v-if="group">
    <div class="group-image">
      <img :src="require(`@/assets/${group.kindSport}.jpeg`)" :alt="`${group.kindSport}`">
    </div>
    <div class="group-info">
      <h1 class="group-name-overview">{{ group.name }}</h1>
      <div class="details">
        <p class="info-overview-sport"><strong>Type:</strong> {{ group.kindSport.toUpperCase() }}</p>
        <p class="info-overview-sport"><strong>Description:</strong> {{ group.description }}</p>
        <p class="info-overview-sport"><strong>Coach:</strong> {{ group.coachID.name }} {{ group.coachID.lastName }} {{ group.coachID.patronymic }}</p>

        <p class="info-overview-sport"><strong>Members:</strong> {{ group.limitMembers }}</p>
        <p class="info-overview-sport"><strong>Price:</strong> {{ group.priceID.price }}</p>
        <p class="info-overview-sport"><strong>Discount:</strong> {{ group.priceID.discount }}</p>
      </div>
      <div class="contact">
        <p><a href="https://t.me"><i class="fab fa-telegram"></i> sport_school</a></p>
      </div>
    </div>
  </div>

  <div v-else>
    Loading...
  </div>
  <button @click="enterCoachPage(group.coachID._id)">Read about coach</button><br>

  <button @click="joinGroup">Join to group</button>

</template>

<script>
import axios from "axios";
import {getUserByToken} from "@/js/getterByValue";

export default {
  data() {
    return {
      group: null,
      userID: ""
    };
  },
  methods: {
    async joinGroup(){
      await axios.post("http://localhost:8000/users/joinGroup",
          {
            groupID: this.$route.params.id,
            userID: this.userID
          });
    },

    async enterCoachPage(coachID) {
      this.$router.push(`/overviewCoach/${coachID}`)
    }
  },

  async mounted() {
    await axios.get(`http://localhost:8000/groups/getGroup/${this.$route.params.id}`).then(res => {
      this.group = res.data.group;
    });

    await getUserByToken(localStorage.getItem("token")).then(res => {
      this.userID = res.data.id
    })
  }
};
</script>

<style scoped>

</style>
