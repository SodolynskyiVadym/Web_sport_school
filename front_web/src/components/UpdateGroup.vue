<template>
<div v-if="limitMembers">
  <input type="text" v-model="name">
  <input type="text" v-model="limitMembers">
  <input type="text" v-model="kindSport">
  <textarea v-model="description"></textarea>
  <input type="number" v-model="price" min="0">
  <input type="number" v-model="discount" min="0" max="100">
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
      description: "",
      price: "",
      discount: ""
    }
  },

  methods: {
    async sendData(){
      await axios.patch("http://localhost:8000/groups/updateGroup", {
        id: this.$route.params.groupID,
        name: this.name,
        description: this.description,
        kindSport: this.kindSport,
        limitMembers: this.limitMembers,
        price: this.price,
        discount: this.discount
      });

      this.$router.push("/settingsAccount");
    }
  },

  async mounted() {
    await axios.get(`http://localhost:8000/groups/getGroup/${this.$route.params.groupID}`).then(res => {
      console.log(res.data.group)
      this.name = res.data.group.name;
      this.limitMembers = res.data.group.limitMembers;
      this.kindSport = res.data.group.kindSport;
      this.description = res.data.group.description;
      this.price = res.data.group.priceID.price;
      this.discount = res.data.group.priceID.discount;
    });
  }
}
</script>