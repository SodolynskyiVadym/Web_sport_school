<template>
  <h1>Create Group</h1>
  <div v-if="error" role="alert">{{error}}</div>
  <div class="container">
    <div class="form">
      <div class="input-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name">
      </div>
      <div class="input-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="description"></textarea>
      </div>
      <div class="input-group">
        <label for="limitMembers">Limit Members:</label>
        <input type="number" id="limitMembers" v-model="limitMembers">
      </div>
      <div class="input-group">
        <label for="kindSport">Kind of Sport:</label>
        <input type="text" list="kind-sport" id="kindSport" v-model="kindSport">
        <datalist id="kind-sport">
          <option value="football"></option>
          <option value="volleyball"></option>
          <option value="basketball"></option>
          <option value="hockey"></option>
          <option value="athletics"></option>
        </datalist>
      </div>
      <div class="input-group">
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="price">
      </div>
      <div class="input-group">
        <label for="discount">Discount:</label>
        <input type="number" id="discount" v-model="discount">
      </div>
      <button @click="registerGroup">Create Group</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as listURL from "../js/listURL";

export default {
  data() {
    return {
      name: "",
      description: "",
      limitMembers: "",
      kindSport: "",
      price: "",
      discount: "",
      coachID: "",
      error: ""
    }
  },
  methods: {
    async registerGroup() {
      try {
        await axios.post('http://localhost:8000/groups/createGroup', {
          name: this.name,
          description: this.description,
          limitMembers: this.limitMembers,
          kindSport: this.kindSport,
          price: this.price,
          discount: this.discount,
          coachID: this.coachID,
        });

        this.clearFields();

      }catch (err){
        this.error = "This group already exist"
      }
    },

    clearFields() {
      this.name = "";
      this.description = "";
      this.limitMembers = "";
      this.kindSport = "";
      this.price = "";
      this.discount = "";
    }
  },
  async mounted() {
    const userData = await listURL.getUserByToken(localStorage.getItem("token"));
    this.coachID = userData.id
  }
}

</script>

<style scoped>
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
  font-size: 3rem;
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
.container {
  margin: 0 auto;
  width: 80%;
  padding: 20px;
  color: black;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  display: block;
}

input[type="text"],
input[type="number"],
textarea {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #000;
  width: 100%;
  color: #000;
}

button {
  padding: 10px;
  border-radius: 4px;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid black;
}

button:hover {
  background-color: #333;
}
input[type="text"],
input[type="number"],
textarea {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #000;
  width: 100%;
  color: #000;
  transition: border-color 0.3s ease;
}


input[type="text"]:focus,
input[type="number"]:focus,
textarea:focus {
  border-color: #333;
}
@media (min-width: 768px) {
  .container {
    width: 60%;
  }
}

@media (max-width: 767px) {
  .container {
    width: 90%;
  }
}
</style>
