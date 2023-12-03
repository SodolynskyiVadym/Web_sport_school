<template>
  <div class="container-groups">
    <div class="group" v-for="coach in coaches" :key="coach._id">
      <div class="coach-info">
        <span>Name: {{ coach.name }}</span>
        <span>Last name:{{ coach.lastName }}</span>
        <span>Patronymic:{{ coach.patronymic }}</span>
        <span>Email: {{ coach.email }}</span>
        <span>Phone: {{ coach.phone }}</span>
        <span>Gender: {{ coach.gender }}</span>
        <a :href="`http://localhost:8080/overviewCoach/${coach._id}`">
          <button>JOIN</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from "axios";

const coaches = ref();

onMounted(() => {
  axios
      .get('http://localhost:8000/users/getAllCoaches')
      .then(response => {
        coaches.value = response.data.coaches;
      })
      .catch(error => {
        coaches.value = error;
      });
});

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
  width: 170px;
  margin-top: -20px;
  border-radius: 12px 12px 0 0;
}

.coach-info {
  padding: 20px;
  width: 100%;
  text-align: left;
}

.coach-info span {
  display: block;
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


