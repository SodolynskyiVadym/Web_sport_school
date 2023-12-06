<template>
  <div class="container"  v-if="limitMembers">
    <div class="leftbox">
      <div class="input-row">
        <div class="input-wrapper">
          <h2>Name</h2>
          <input type="text" v-model="name" placeholder="NAME">

        </div>
      </div>
      <div class="input-row">
        <div class="input-wrapper">
          <h2>Description</h2>
          <input type="text" v-model="description" placeholder="DESCRIPTION">
        </div>
        <div class="input-wrapper">
          <h2>Limit members</h2>
          <input type="number" class="styled-number-input" v-model="limitMembers">

        </div>
      </div>
      <div class="input-row">
        <div class="input-wrapper">
          <h2>Kind of sport</h2>
          <input type="text" v-model="kindSport" readonly>
        </div>
        <div class="input-wrapper">
          <h2>Price</h2>
          <input type="number" class="styled-number-input" v-model="price" min="0">
        </div>
      </div>
      <button class="button-update" @click="sendData">Update</button>
      <div class="input-wrapper password-wrapper">
        <h2>Discount</h2>
        <input type="number" class="styled-number-input" v-model="discount" min="0" max="100">
      </div>
    </div>
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
<style>

body{
  background-color: rgba(238,238,238,0.99);
}
.container {
  display: flex;
  justify-content: space-between;
}

h1 {
  text-align: center;
}
input.styled-number-input {
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  width: 100%;
  font-size: 14px;
  padding-bottom: 5px;
}


.leftbox {
  width: 42%;
  height: 450px;
  padding: 20px;
  border: 1px solid white;
  border-radius: 8px;
  margin-top: 120px;
  margin-left: 450px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.76) 0px 10px 30px;
}

.input-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.input-wrapper {
  width: 48%;
}

.input-wrapper h2 {
  margin-bottom: 5px;
  font-size: 14px;
}

input[type="text"],
input[type="date"] {
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  width: 100%;
  font-size: 14px;
  padding-bottom: 5px;
}
.password-wrapper {
  position: relative;
  top: -125px;
  right: -310px;
  width: 280px;
}



.button-update {
  background: #fff;
  font-size: 14px;
  margin-top: 70px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  font-weight: 700;
  align-items: center;
  height: 60px;
  width: 220px;
  color: black;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.76);
  cursor: pointer;
  transition: .2s;
}

.button-update:active,
.button-update:focus,
.button-update:hover{
  border-color: rgba(0, 0, 0, 0.76);
  outline: none;
}


</style>