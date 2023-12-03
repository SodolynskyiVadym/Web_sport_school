<template>
  <h1>Create schedule</h1>
  <div class="schedule-form">
    <label for="date" class="label-field">Date</label>
    <input type="date" v-model="date" id="date" class="input-field">

    <label for="time" class="label-field">Time:</label>
    <input type="time" v-model="time" id="time" class="input-field">

    <label for="nameGroup" class="label-field">Name of group</label>
    <select v-model="nameGroup">
      <option v-for="group in groups" :key="group._id" v-text="group.name"></option>
    </select>
    <p v-if="groups.length === 0">You don't have groups</p>

    <button @click="createSchedule" class="btn-create">Create schedule</button>
    <button @click="findScheduleGroup" class="btn-create">Find schedule</button>
  </div>

  <table v-if="schedules">
    <tr>
      <th>Date</th>
      <th>Time</th>
      <th>Action</th>
    </tr>
    <tr v-for="schedule in schedules" :key="schedule._id">
      <td>{{schedule.date}}</td>
      <td>{{schedule.time}}</td>
      <td><button @click="deleteSchedule(schedule._id)">DELETE</button></td>
    </tr>
  </table>
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
      coachID: "",
      schedules: [],
      groups: []
    }
  },
  methods: {


    async findScheduleGroup(){
      await axios.get(`http://localhost:8000/groups/schedule/getSchedules/${this.nameGroup}`).then(res => {
        this.schedules = res.data.schedules;
      })
    },

    async deleteSchedule(scheduleID){
      await axios.delete(`http://localhost:8000/groups/schedule/deleteSchedule/${scheduleID}`)
      await this.findScheduleGroup()
    },

    async createSchedule(){
      await axios.post("http://localhost:8000/groups/schedule/createSchedule", {
        nameGroup: this.nameGroup,
        date: this.date,
        timeLesson: this.time,
        coachID: this.coachID
      });

      this.date = Date.now();
      this.time = ""
      await this.findScheduleGroup()
    }
  },
  async mounted() {
    await getUserByToken(localStorage.getItem("token")).then(res => {
      this.coachID = res.data.id
    });

    await axios.get(`http://localhost:8000/groups/getCoachGroups/${this.coachID}`).then(res => {
      this.groups = res.data.groups;
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