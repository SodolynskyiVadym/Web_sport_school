<template>
  <div role="alert" v-if="error">{{error}}</div>
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
import * as listURL from "@/js/listURL";

export default {
  data(){
    return{
      name: "",
      limitMembers: 0,
      kindSport: "",
      description: "",
      price: "",
      discount: "",
      error: ""
    }
  },

  methods: {
    async sendData(){
      try {
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

      }catch (err){
        this.error = "Group with this name already exist"
      }
    }
  },

  async mounted() {
    const groupData = await listURL.requestGroupsGet(`/getGroup/${this.$route.params.groupID}`);
    this.name = groupData.group.name;
    this.limitMembers = groupData.group.limitMembers;
    this.kindSport = groupData.group.kindSport;
    this.description = groupData.group.description;
    this.price = groupData.group.priceID.price;
    this.discount = groupData.group.priceID.discount;
  }
}
</script>