<template>
  <div class="container-groups">
    <div class="group" v-for="group in groups" :key="group._id">
      <img :src="require(`@/assets/${group.kindSport}.jpeg`)" :alt="`${group.kindSport}`">
      <div class="group-info">
        <span class="group-name">{{ group.name }}</span>
        <span class="info">{{ group.kindSport.toUpperCase() }}</span>
        <span class="info">{{ group.description }}</span>
        <span class="info">{{ group.coachID.name }} {{ group.coachID.lastName }} {{ group.coachID.patronymic }}</span>
        <span class="info">Members: {{ group.limitMembers }}</span>
        <span class="info">Price: {{ group.priceID.price }}</span>
        <span class="info">Discount: {{ group.priceID.discount }}</span>
      </div>
      <button @click="enterGroupPage(group._id)">BUY</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      groups: [],
    }
  },
  methods: {
    async enterGroupPage(groupID) {
      this.$router.push(`/overview/${groupID}`)
    }
  },
  async mounted() {
    await axios
        .get('http://localhost:8000/groups/getAllGroup')
        .then(response => {
          this.groups = response.data.groups;
          console.log(response.data.groups)
        })
    // .catch(error => {
    //   info.value = error;
    // });
  }
}
</script>
<style>
.container-groups {
  margin-left: 10%;
  margin-right: 10%;
  width: 80%;
  height: auto;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.group {
  flex: 0 0 calc(33.33% - 32px);
  margin: 16px;
  padding-bottom: 20px;
  background-color: #000;
  border-radius: 12px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;
}

.group:hover {
  transform: translateY(-5px);
}

.group img {
  height: 120px;
  width: 190px;
  margin-top: -20px;
  border-radius: 12px 12px 0 0;
}

.group-info {
  padding: 20px;
  width: 100%;
  text-align: left;
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

button {
  position: absolute;
  bottom: 10px;
  left: 50%;
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

@media screen and (max-width: 768px) {
  .group {
    flex: 0 0 calc(50% - 32px);
  }
}

@media screen and (max-width: 480px) {
  .group {
    flex: 0 0 calc(100% - 32px);
  }
}
</style>
