<template>
<table>
  <tr>
    <th>Group</th>
    <th>Time</th>
    <th>Date</th>
  </tr>
  <tr v-for="schedule in schedules" :key="schedule._id">
    <td>{{schedule.groupID.name}}</td>
    <td>{{schedule.time}}</td>
    <td>{{schedule.date}}</td>
  </tr>
</table>
</template>

<script>
// import axios from "axios";
import * as listURL from "../js/listURL";

export default {
  data() {
    return {
      schedules: [],
      userID: "",
      userRole: ""
    }
  },
  async mounted() {
    const userData = await listURL.getUserByToken(localStorage.getItem("token"));
    this.userID = userData.id
    this.userRole = userData.role;

    if (this.userRole === "user"){
      const scheduleData = await listURL.requestSchedulesGet(`/getScheduleUser/${this.userID}`)
      this.schedules = scheduleData.schedules
    }

    if (this.userRole === "coach"){
      const scheduleData = await listURL.requestSchedulesGet(`/getScheduleCoach/${this.userID}`)
      this.schedules = scheduleData.schedules
    }
  }
}
</script>

<style scoped>
</style>