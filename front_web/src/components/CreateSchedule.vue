<template>
<input type="date" v-model="date">
<input type="text" v-model="time">
<input type="text" v-model="nameGroup">
<button @click="createSchedule">Create schedule</button>
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