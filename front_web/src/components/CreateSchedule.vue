<template>
  <h1>Create schedule</h1>
  <div class="schedule-form">
    <label for="date" class="label-field">Date</label>
    <input type="date" v-model="date" id="date" class="input-field">

    <label for="time" class="label-field">Time:</label>
    <input type="time" v-model="time" id="time" class="input-field">

    <label for="nameGroup" class="label-field">Name of group</label>
    <input type="text" v-model="nameGroup" id="nameGroup" class="input-field">

    <button @click="createSchedule" class="btn-create">Create schedule</button>
  </div>
</template>

<script>
import axios from "axios";
import {getUserByToken} from "@/js/getterByValue";
export default {
  data() {
    return {
      date: Date.now(),
      time: "",
      nameGroup: "",
      dataInfo: ""
    }
  },
  methods: {
    async createSchedule(){

      let id = ""
      await axios.post("http://localhost:8000/groups/getGroupIDByName", { name: this.nameGroup }).then(res => {
        id = res.data.id
      });


      await axios.post("http://localhost:8000/groups/schedule/createSchedule", {
        date: this.date,
        timeLesson: this.time,
        coachID: this.dataInfo,
        groupID: id
      });
    }
  },
  async mounted() {
    await getUserByToken(localStorage.getItem("token")).then(res => {
      this.dataInfo = res.data.id
    })
  }
}
</script>

<style>
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
  font-size: 3rem;
  text-transform: uppercase;
  text-align: center;
  margin: 20px;
}
.schedule-form {
  background-color: #f8f8f8;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
}


.input-field {
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: calc(100% - 24px);
  font-size: 16px;
  color: #555;
  transition: border-color 0.3s ease-in-out;

}

.input-field:focus {
  border-color: #000;
}


.btn-create {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.btn-create:hover {
  background-color: #333;
}
.label-field {
  margin-bottom: 5px;
  color: #555;
  font-size: 14px;
}
@media screen and (max-width: 480px) {
  .schedule-form {
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    max-width: 300px;
  }

  .input-field {
    padding: 10px;
    border-radius: 6px;
    font-size: 14px;
  }

  .btn-create {
    padding: 10px 20px;
    border-radius: 6px;
    font-size: 14px;
  }

  .label-field {
    font-size: 12px;
  }
}


</style>