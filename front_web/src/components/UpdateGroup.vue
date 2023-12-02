<template>
<div v-if="limitMembers">
  <input type="text" v-model="name">
  <input type="text" v-model="limitMembers">
  <input type="text" v-model="kindSport">
  <textarea v-model="description"></textarea>
  <button @click="sendData">Update</button>
</div>

</template>

<script>
import axios from "axios";
export default {
  data(){
    return{
      name: "",
      limitMembers: 0,
      kindSport: "",
      description: ""
    }
  },

  methods: {
    async sendData(){
      await axios.patch("http://localhost:8000/groups/updateGroup", {
        id: this.$route.params.id,
        name: this.name,
        description: this.description,
        kindSport: this.kindSport,
        limitMembers: this.limitMembers
      });

      this.$router.push("/settingsAccount");
    }
  },

  async mounted() {
    await axios.get(`http://localhost:8000/groups/getGroup/${this.$route.params.id}`).then(res => {
      this.name = res.data.group.name;
      this.limitMembers = res.data.group.limitMembers;
      this.kindSport = res.data.group.kindSport;
      this.description = res.data.group.description;
    });
  }
}
</script>