<template>
  <section class="schedule-section">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <div class="form-container">
      <h1>Create schedule</h1>
      <div class="schedule-form">
        <label for="date" class="label-field"></label>
        <div class="input-container">
          <i class="fas fa-calendar-alt input-icon"></i>
          <input type="date" v-model="date" id="date" class="input-field" ref="datePicker">
          <div class="underline"></div>
        </div>

        <label for="time" class="label-field"></label>
        <div class="input-container">
          <i class="fas fa-clock input-icon"></i>
          <input type="time" v-model="time" id="time" class="input-field" ref="timePicker">
          <div class="underline"></div>
        </div>

        <label for="nameGroup" class="label-field"></label>
        <div class="select-container">
          <select v-model="nameGroup" class="custom-select">
            <option v-if="groups.length === 0" disabled>No groups available</option>
            <option v-for="group in groups" :key="group._id" v-text="group.name"></option>
          </select>
          <i class="fas fa-chevron-down select-icon"></i>
          <div class="underline"></div>
        </div>

        <p class="name-of-groups">Name of group</p>
        <p v-if="groups.length === 0" class="no-groups">You don't have groups</p>

        <button @click="createSchedule" class="login-submit">Create schedule<i class="fas fa-mouse-pointer icon-left"></i></button>
        <button @click="findScheduleGroup" class="login-submit">Find schedule<i class="fas fa-search icon-left-2"></i></button>
      </div>
    </div>
  </section>
  <section class="schedule-table">
    <table v-if="schedules">
      <tr>
        <th>Date</th>
        <th>Time</th>
        <th>Action</th>
      </tr>
      <tr v-for="schedule in schedules" :key="schedule._id">
        <td>{{ formatDate(schedule.date) }}</td>
        <td>{{schedule.time}}</td>
        <td><button class="login-submit-delete" @click="deleteSchedule(schedule._id)">DELETE</button></td>
      </tr>
    </table>
  </section>
</template>

<script>
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import axios from "axios";
import * as listURL from "@/js/listURL";

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
      const scheduleData = await listURL.requestSchedulesGet(`/getSchedules/${this.nameGroup}`);
      this.schedules = scheduleData.schedules;
    },

    async deleteSchedule(scheduleID){
      await axios.delete(`http://localhost:8000/groups/schedule/deleteSchedule/${scheduleID}`)
      await this.findScheduleGroup()
    },

    formatDate(date) {
      const d = new Date(date);
      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
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

    const userData = await listURL.getUserByToken(localStorage.getItem("token"));
    this.coachID = userData.id

    const coachData = await listURL.requestGroupsGet(`/getCoachGroups/${this.coachID}`);
    this.groups = coachData.groups
  }
}
</script>

<style>
body{
  background-color: rgba(238,238,238,0.99);
}
.schedule-section {
  display: flex;
  justify-content: flex-start;
  width: 50%;
  float: left;
  margin-top: 100px;
}

.schedule-table {
  position: absolute;
  width: 50%;
  height: 470px;
  top: 85px;
  margin-bottom: 20px;
  right: 445px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
  transform: translateX(50%);
}


.schedule-section {
  display: flex;
  justify-content: flex-start;
  width: 50%;
  float: left ;
  left: 20px;
  margin-top: 100px;
}

.schedule-table {
  position: absolute;
  width: 40%;
  top: 175px;
  right: 455px;
  border-radius: 15px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1)!important;
  padding: 20px;
  transform: translateX(50%);
  background-color: rgba(255, 255, 255, 0.9);
}

.schedule-table table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 18px;
  overflow: hidden;
}

.schedule-table th,
.schedule-table td {
  padding: 12px;
  text-align: center;
}

.schedule-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.schedule-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.schedule-table th, .schedule-table td{
  padding: 16px;
  text-align: center;
  border-right: 1px solid rgba(32, 32, 32, 0.99)
}
.schedule-table th:last-child, .schedule-table td:last-child{
  border: none;
}
.icon-left {
  margin-left: 130px;
}
.icon-left-2 {
  margin-left: 150px;
}


.form-container {
  background-color: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.76) 0px 10px 30px;
  max-width: 400px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  margin-right: 10px;
  top: 80px;
  font-size: 20px;
  color: black;
}

.underline {
  position: absolute;
  bottom: 8px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #000;
}

.input-field {
  margin-top: 10px;
  margin-bottom: 8px;
  padding: 10px;
  border: none;
  border-radius: 0;
  background-color: white;
  width: calc(100% - 24px);
  font-size: 16px;
  transition: border-color 0.3s ease-in-out;
}

.input-field:focus {
  outline: none;
}
.label-field {
  margin-bottom: 10px;
  color: black;;
  font-size: 14px;
}

.select-container {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}

.custom-select {
  width: 295px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  appearance: none;
  z-index: 4;
}

.custom-select:focus {
  outline: none;}


.name-of-groups {
  position: absolute;
  margin-left: 205px;
  color: black;
  font-size: 12px;
  z-index: 5;
  margin-top: -54px;
}


.login-submit {
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
  width: 320px;
  color: black;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.76);
  cursor: pointer;
  transition: .2s;
}

.login-submit:active,
.login-submit:focus,
.login-submit:hover {
  border-color: rgba(0, 0, 0, 0.76);
  outline: none;
}
.login-submit-delete {
  background: #fff;
  font-size: 14px;
  margin-top: 30px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  font-weight: 700;
  align-items: center;
  width: 100px;
  color: black;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.76);
  cursor: pointer;
  transition: .2s;
}

.login-submit-delete:active,
.login-submit-delete:focus,
.login-submit-delete:hover {
  border-color: rgba(0, 0, 0, 0.76);
  outline: none;
}
</style>