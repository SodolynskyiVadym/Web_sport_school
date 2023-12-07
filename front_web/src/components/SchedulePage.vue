<template>
  <section>
    <div class="schedule-filters">
      <label>Filter by Group:</label>
      <select v-model="selectedGroup" class="filter-select">
        <option value=""></option>
        <option v-for="group in uniqueGroups" :key="group" :value="group">{{ group }}</option>
      </select>
      <label>Filter by Date:</label>
      <input type="text" v-model="selectedDate" placeholder="Select Date" class="filter-input" ref="datePicker">
      <label>Filter by Time:</label>
      <div class="time-filter">
        <input type="text" v-model="selectedStartTime" placeholder="Start Time" class="filter-input" ref="startTimePicker">
        <input type="text" v-model="selectedEndTime" placeholder="End Time" class="filter-input" ref="endTimePicker">
      </div>
    </div>

    <div class="schedule-container">
      <table class="schedule-table">
        <thead>
        <tr>
          <th>Group</th>
          <th>Time</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="schedule in filteredSchedules" :key="schedule._id">
          <td>{{ schedule.groupID.name }}</td>
          <td>{{ schedule.time }}</td>
          <td>{{ formatDate(schedule.date) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import * as listURL from "../js/listURL";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default {
  data() {
    return {
      schedules: [],
      userID: "",
      userRole: "",
      selectedGroup: "",
      selectedDate: "",
      selectedTime: "",
      selectedStartTime: "",
      selectedEndTime: "",
    };
  },
  computed: {
    uniqueGroups() {
      return [...new Set(this.schedules.map((schedule) => schedule.groupID.name))];
    },
    filteredSchedules() {
      let filteredSchedules = this.schedules;

      if (this.selectedGroup) {
        filteredSchedules = filteredSchedules.filter((schedule) => schedule.groupID.name === this.selectedGroup);
      }

      if (this.selectedDate) {
        filteredSchedules = filteredSchedules.filter((schedule) => schedule.date.includes(this.selectedDate));
      }

      if (this.selectedStartTime && this.selectedEndTime) {
        filteredSchedules = filteredSchedules.filter((schedule) => {
          const startTime = new Date(`2000-01-01T${this.selectedStartTime}`);
          const endTime = new Date(`2000-01-01T${this.selectedEndTime}`);
          const scheduleTime = new Date(`2000-01-01T${schedule.time}`);
          return scheduleTime >= startTime && scheduleTime <= endTime;
        });
      }

      return filteredSchedules;
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    async fetchData() {
      const userData = await listURL.getUserByToken(localStorage.getItem("token"));
      this.userID = userData.id;
      this.userRole = userData.role;

      if (this.userRole === "user") {
        const scheduleData = await listURL.requestSchedulesGet(`/getScheduleUser/${this.userID}`);
        this.schedules = scheduleData.schedules;
      }

      if (this.userRole === "coach") {
        const scheduleData = await listURL.requestSchedulesGet(`/getScheduleCoach/${this.userID}`);
        this.schedules = scheduleData.schedules;
      }
    },
  },
  mounted() {
    flatpickr(this.$refs.datePicker, {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
      minDate: 'today',
      disable: [
        function(date) {
          return date.getDay() === 0;
        },
        function(date) {
          return date < new Date();
        }
      ]
    });

    flatpickr(this.$refs.startTimePicker, {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      time_24hr: true,
      minTime: '09:00',
      maxTime: '19:00'
    });

    flatpickr(this.$refs.endTimePicker, {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      time_24hr: true,
      minTime: '09:00',
      maxTime: '19:00'
    });

    this.fetchData();
  },
};
</script>






<style>
body {
  background-color: rgba(238, 238, 238, 0.99);
}

.schedule-container {
  display: flex;
  flex-direction: column;
  align-items: center;

}

.schedule-filters {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
}

.filter-select {
  padding: 8px;
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: rgba(238, 238, 238, 0.99);
  font-size: 14px;
  width: 80px;
  height: 30px;
  margin: 4px 8px;
}

.filter-input {
  width: 130px;
  height: 20px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  background-color: rgba(238, 238, 238, 0.99);
  font-size: 14px;
  padding: 4px;
  margin: 4px 8px;
}
.filter-input:focus {
  border-bottom-color: black;
}
.time-filter {
  display: flex;
  margin-top: 75px;
  height: 100px;
}
.schedule-table {
  border-collapse: collapse;
  width: 60%;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.76) 0px 10px 30px;
}

.schedule-table th,
.schedule-table td {
  padding: 15px;
  text-align: center;
}

.schedule-table thead {
  background-color: black;
  color: white;
}

.schedule-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.schedule-table tbody tr:hover {
  background-color: #e0e0e0;
  transition: all 0.3s ease;
}
</style>




