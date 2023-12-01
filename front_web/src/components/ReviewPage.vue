<template>
  <h1>Review Page</h1>
  <div class="review-form">
    <input type="text" v-model="description" placeholder="Enter your review">
    <div class="rating-input">
      <input v-model="rating" type="number" placeholder="Rating (1-5)">
      <span>Select rating (1-5)</span>
    </div>
    <button @click="submitReview">Send</button>
  </div>

  <div v-if="isShow">
    <h2>Information was send</h2>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from "axios";

const description = ref("");
const rating = ref(0);
const isShow = ref(false);

async function submitReview(){
  try {
    await axios.post('http://localhost:8000/reviews/6553608cec03fa0fe842b577', {
      description: description.value,
      rating: rating.value
    });

    isShow.value = true;
  } catch (error) {
    console.error('Помилка:', error);
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

body{
  background: white;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

h1 {
  font-style: italic;
  font-weight: 1000;
  font-size: 3rem;
  text-transform: uppercase;
  text-align: center;
  margin: 20px 0;
}

.review-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 30px 20px;
  text-align: left;

}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

input[type="text"],
input[type="number"] {
  width: 100%;
}

button {
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.99);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.99);
}

h2 {
  font-style: italic;
  font-weight: 1000;
  font-size: 1.5rem;
  text-transform: uppercase;
  text-align: center;
  margin: 20px 0;
}


.rating-input {
  display: flex;
  flex-direction: column;
}

.rating-input input {
  margin-bottom: 5px;
}

.rating-input span {
  font-size: 12px;
  color: #888;
  text-align: center;
}



</style>