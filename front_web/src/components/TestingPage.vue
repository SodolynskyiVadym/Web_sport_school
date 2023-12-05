<template>
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

      <label for="nameGroup" class="label-field">Name of group</label>
      <div class="select-container">
        <select v-model="nameGroup" class="custom-select">
          <option v-if="groups.length === 0" disabled>No groups available</option>
          <option v-for="group in groups" :key="group._id" v-text="group.name"></option>
        </select>
      </div>
      <p v-if="groups.length === 0" class="no-groups">You don't have groups</p>

      <button @click="createSchedule" class="btn">Create schedule</button>
      <button @click="findScheduleGroup" class="btn">Find schedule</button>
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
  </div>
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

    const userData = await listURL.getUserByToken(localStorage.getItem("token"));
    this.coachID = userData.id

    await axios.get(`http://localhost:8000/groups/getCoachGroups/${this.coachID}`).then(res => {
      this.groups = res.data.groups;
    })


  }
}
</script>

<style>
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
  align-items: center; /* Вирівнюємо іконку та мітку по вертикалі */
}

.input-icon {
  margin-right: 10px;
  top: 80px;/* Відступ між іконкою і полем вводу */
  font-size: 20px; /* Розмір іконки */
  color: black; /* Колір іконки */
}

.underline {
  position: absolute;
  bottom: 8px;
  left: 0;
  width: 100%;
  height: 2px; /* Розмір риски */
  background-color: #000; /* Колір риски */
}

.input-field {
  margin-top: 10px; /* Зсув вниз */
  margin-bottom: 8px; /* Підвищення вгору */
  padding: 10px;
  border: none; /* Видалити рамку */
  border-radius: 0; /* Прибрати скруглення */
  background-color: white;
  width: calc(100% - 24px);
  font-size: 16px;
  transition: border-color 0.3s ease-in-out;
}

.input-field:focus {
  outline: none; /* Прибираємо контур при фокусі */
}


.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.btn:hover {
  background-color: #333;
}

.label-field {
  margin-bottom: 10px;
  color: #555;
  font-size: 14px;
}

.select-container {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}

.custom-select {
  width: calc(100% - 20px);
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  appearance: none; /* Hide default arrow in some browsers */
}

.custom-select:focus {
  outline: none;
  border-color: #000;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.no-groups {
  margin-top: -15px; /* Спускаємо текст вище */
  margin-left: 20px;
  color: #FF0000;
  font-size: 12px;
}



.no-groups {
  margin-top: 5px;
  color: #FF0000;
  font-size: 12px;
}


</style>