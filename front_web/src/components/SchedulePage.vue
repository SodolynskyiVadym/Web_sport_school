<template>
<table>
  <tr>
    <th>Group</th>
    <th>Time</th>
    <th>Date</th>
  </tr>
  <tr v-for="schedule in shedules" :key="schedule._id">
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
      userID: "",
      shedules: []
    }
  },
  async mounted() {
    await getUserByToken(localStorage.getItem("token")).then(res => {
      this.userID = res.data.id
    });

    await axios.post("http://localhost:8000/groups/schedule/getScheduleUser", {userID: this.userID}).then(res => {
      this.shedules = res.data.schedules
    });
  }
}
</script>

<style scoped>
</style>