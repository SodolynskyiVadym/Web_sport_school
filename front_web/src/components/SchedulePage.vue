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
import axios from "axios";
import {getUserByToken} from "@/js/getterByValue";

export default {
  data() {
    return {
      schedules: [],
      userID: "",
      userRole: ""
    }
  },
  async mounted() {
    await getUserByToken(localStorage.getItem("token")).then(res => {
      this.userID = res.data.id
      this.userRole = res.data.role
    });

    if (this.userRole === "user"){
      await axios.post("http://localhost:8000/groups/schedule/getScheduleUser", {userID: this.userID}).then(res => {
        this.schedules = res.data.schedules
      });
    }
    if (this.userRole === "coach"){
      await axios.post("http://localhost:8000/groups/schedule/getScheduleCoach", {userID: this.userID}).then(res => {
        this.schedules = res.data.schedules
      });
    }
  }
}
</script>

<style scoped>
</style>