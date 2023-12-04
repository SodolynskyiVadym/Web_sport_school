<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <div class="container">
    <div class="screen">
      <div class="screen__content">
        <form class="login">
          <div class="login__field">
            <div class="input-icon">
              <i class="login__icon fas fa-calendar-alt"></i>
              <input type="date" v-model="date" class="login__input" placeholder="Select date" ref="datePicker">
            </div>
          </div>
          <div class="login__field">
            <div class="input-icon">
              <i class="login__icon fas fa-clock"></i>
              <input type="time" v-model="time" class="login__input" placeholder="Select time" ref="timePicker">
            </div>
          </div>
          <div class="login__field">
            <label for="nameGroup"  class="label-field">Name of group </label>
            <p style="top: -1000px">Group name</p>
            <select v-model="nameGroup" @change="updateGroupName">
              <option v-for="group in groups" :key="group._id" v-text="group.name"></option>
            </select>
            <div class="login__no-groups">
            <p v-if="groups.length === 0">You don't have groups</p>
            </div>
          </div>

          <button class="button login__submit">
            <span class="button__text" @click="createSchedule">Create schedule</span>
            <i class="button__icon fas fa-chevron-right"></i>
          </button>
          <button class="button login__submit">
            <span class="button__text" @click="findScheduleGroup">Find schedule</span>
            <i class="button__icon fas fa-search"></i>
          </button>
        </form>
      </div>
    </div>
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
<style>


body {
  background: rgba(238,238,238,0.99);;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.screen {
  background: #ffffff;
  border-radius: 15px;
  position: relative;
  height: 600px;
  width: 360px;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.76);
}
.login {
  width: 320px;
  padding: 30px;
  padding-top: 80px;
}

.input-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon .login__input {
  padding-left: 40px;
}

.login__field {
  padding: 20px 0px;
  position: relative;
}
.login__field p {
  top:-100px;
  color: black;
  font-size: 15px;
}
.label-field {
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
  color: rgba(0, 0, 0, 0.76);
}
.login__field select {
  margin-bottom: -5px;
}

.login__icon {
  position: absolute;
  top: 50%;
  left: 12px; /* Відступ для іконки */
  transform: translateY(-50%);
  color: rgba(0, 0, 0, 0.76);
}



.login__input {
  border: none;
  border-bottom: 2px solid darkgray;
  background: none;
  padding: 5px;
  padding-left: 24px;
  font-weight: 700;
  width: 75%;
  transition: .2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
  outline: none;
  border-bottom-color: rgba(0, 0, 0, 0.76);
}

.login__submit {
  background: #fff;
  font-size: 14px;
  margin-top: 30px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 100%;
  color:rgba(0, 0, 0, 0.76);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.76);
  cursor: pointer;
  transition: .2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
  border-color: rgba(0, 0, 0, 0.76);
  outline: none;
}

.button__icon {
  font-size: 24px;
  margin-left: auto;
  color: rgba(0, 0, 0, 0.76);
}



</style>
<script>
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
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
    await flatpickr(this.$refs.datePicker, {
      minDate: 'today',
      dateFormat: 'Y-m-d',
      disable: [
        function(date) {
          return date.getDay() === 0;
        }
      ]
    });
    await flatpickr(this.$refs.timePicker, {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      minTime: '09:00',
      maxTime: '19:00'
    });

    await getUserByToken(localStorage.getItem("token")).then(res => {
      this.coachID = res.data.id
    });

    await axios.get(`http://localhost:8000/groups/getCoachGroups/${this.coachID}`).then(res => {
      this.groups = res.data.groups;
    })


  }
}
</script>


