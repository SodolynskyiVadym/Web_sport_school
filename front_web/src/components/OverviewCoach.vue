<template>
  <div v-if="coach">
    <p>{{coach.name}}</p>
    <p>{{coach.lastName}}</p>
    <p>{{coach.patronymic}}</p>
    <p>{{coach.description}}</p>
    <p>{{coach.birth}}</p>

    <table>
      <tr>
        <th>Name</th>
        <th>Kind of sport</th>
        <th>Current members</th>
        <th>Limit members</th>
        <th>Action</th>
      </tr>
      <tr v-for="group in groups" :key="group._id">
        <td>{{group.name}}</td>
        <td>{{group.kindSport}}</td>
        <td>{{group.currentMembers}}</td>
        <td>{{group.limitMembers}}</td>
        <td><button @click="enterGroupPage(group._id)">Read more</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
// import {getUserByToken} from "@/js/getterByValue";

export default {
  data() {
    return {
      coach: null,
      groups: []
    }
  },
  methods: {
    async enterGroupPage(groupID) {
      this.$router.push(`/overviewGroup/${groupID}`)
    }
  },
  async mounted() {
    // await getUserByToken(localStorage.getItem("token")).then(res => {
    //   this.userID = res.data.id
    // });

    await axios.get(`http://localhost:8000/users/getCoach/${this.$route.params.id}`).then(res => {
      this.coach = res.data.user;
      this.groups = res.data.groups
    })
  }
}
</script>

<style scoped>
</style>