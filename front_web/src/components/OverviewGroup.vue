<template>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
  <div class="group-details" v-if="group">
    <div class="group-image">
      <img :src="require(`@/assets/${group.kindSport}.jpeg`)" :alt="`${group.kindSport}`">
    </div>
    <div class="group-info">
      <h1 class="group-name">{{ group.name }}</h1>
      <div class="details">
        <p class="info"><strong>Type:</strong> {{ group.kindSport.toUpperCase() }}</p>
        <p class="info"><strong>Description:</strong> {{ group.description }}</p>
        <p class="info"><strong>Coach:</strong> {{ group.coachID.name }} {{ group.coachID.lastName }} {{ group.coachID.patronymic }}</p>
        <button @click="enterCoachPage(group.coachID._id)">Read about coach</button>
        <p class="info"><strong>Members:</strong> {{ group.limitMembers }}</p>
        <p class="info"><strong>Price:</strong> {{ group.priceID.price }}</p>
        <p class="info"><strong>Discount:</strong> {{ group.priceID.discount }}</p>
      </div>
      <div class="contact">
        <p><a href="https://t.me"><i class="fab fa-telegram"></i> sport_school</a></p>
      </div>
    </div>
  </div>

  <div v-else>
    Loading...
  </div>
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
.group-details {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 30px;
}

.group-image img {
  max-width: 200px;
  height: auto;
  border-radius: 5px;
}

.group-info {
  flex: 2;
  margin-left: 20px;
}

.group-name {
  font-size: 2rem;
  margin-bottom: 10px;
}

.info {
  margin-bottom: 5px;
}

.contact a {
  color: black;
  text-decoration: none;
}

.contact a:hover {
  text-decoration: underline;
}
@media screen and (max-width: 768px) {
  .group-details {
    flex-direction: column;
  }

  .group-image img {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
  }

  .group-info {
    flex: 1;
    margin-left: 0;
  }

  .group-name {
    font-size: 1.8rem;
  }

  .info {
    margin-bottom: 10px;
  }

  .contact a {
    font-size: 1.2rem;
  }
}
</style>
