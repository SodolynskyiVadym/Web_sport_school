<template>
  <section>
  <div class="container"  v-if="limitMembers">
    <div class="leftbox">
      <div class="input-row">
        <div class="input-wrapper">
          <h2>Name</h2>
          <input type="text" v-model="name" placeholder="NAME" @input="checkNameGroup">
          <div v-if="invalidNameGroup" class="error-message-validate">Name must be longer and consist letters or number or '-'</div>
        </div>
      </div>
      <div class="input-row">
        <div class="input-wrapper">
          <h2>Description</h2>
          <input type="text" v-model="description" placeholder="DESCRIPTION" @input="checkDescription">
          <div v-if="invalidDescription" class="error-message-validate">Description must be more than 15 symbols</div>
        </div>
        <div class="input-wrapper">
          <h2>Limit members</h2>
          <input type="number" class="styled-number-input" v-model="limitMembers" @input="checkPriceDiscountLimitMembers" >
          <div v-if="invalidLimitMembers" class="error-message-validate-right">Limit members must be more than 0</div>
        </div>
      </div>
      <div class="input-row">
        <div class="input-wrapper">
          <h2>Kind of sport</h2>
          <select v-model="kindSport" class="styled-select">
            <option>Football</option>
            <option>Icehockey</option>
            <option>Basketball</option>
            <option>Volleyball</option>
            <option>Athletics</option>
          </select>
        </div>
        <div class="input-wrapper">
          <h2>Price</h2>
          <input type="number" class="styled-number-input" v-model="price" min="0" @input="checkPriceDiscountLimitMembers">
          <div v-if="invalidPrice" class="error-message-validate">Price must be more than 0</div>
        </div>
      </div>
      <button class="button-update" @click="sendData">Update</button>
      <div class="input-wrapper discount-wrapper">
        <h2>Discount</h2>
        <input type="number" class="styled-number-input" v-model="discount" min="0" max="100" @input="checkPriceDiscountLimitMembers">
        <div v-if="invalidDiscount" class="error-message-validate">Discount must be more than 0 and less than 100</div>
      </div>
    </div>
  </div>
  </section>
</template>

<script>
import * as listURL from "@/js/listURL";
import * as patchRequest from "@/js/patchRequest";

export default {
  data(){
    return{
      name: "",
      limitMembers: 0,
      kindSport: "",
      description: "",
      price: "",
      discount: "",
      error: "",
      invalidNameGroup: false,
      invalidDescription: false,
      invalidLimitMembers: false,
      invalidPrice: false,
      invalidDiscount: false
    }
  },

  methods: {
    async sendData(){
      if (this.invalidDiscount || this.invalidDescription || this.invalidPrice || this.invalidDescription || this.invalidNameGroup) return
      try {
        const data = {
          id: this.$route.params.groupID,
          name: this.name,
          description: this.description,
          kindSport: this.kindSport.toLowerCase(),
          limitMembers: this.limitMembers,
          price: this.price,
          discount: this.discount
        }

        await patchRequest.requestGroup("/updateGroup", data);

        // await axios.patch("http://localhost:8000/groups/updateGroup", {
        //   id: this.$route.params.groupID,
        //   name: this.name,
        //   description: this.description,
        //   kindSport: this.kindSport.toLowerCase(),
        //   limitMembers: this.limitMembers,
        //   price: this.price,
        //   discount: this.discount
        // });

        this.$router.push("/settingsAccount");

      }catch (err){
        this.error = "Group with this name already exist"
      }
    },

    async checkNameGroup(){
      const reg = /^[a-zA-Z0-9-]{2,}$/;
      this.invalidNameGroup = !reg.test(this.name);
    },

    async checkDescription(){
      this.invalidDescription = this.description.length < 15;
    },

    async checkPriceDiscountLimitMembers(){
      this.invalidPrice = this.price < 0;
      this.invalidLimitMembers = this.limitMembers < 1;
      this.invalidDiscount = this.discount > 100 || this.discount < 0;
    }
  },

  async mounted() {
    const groupData = await listURL.requestGroupsGet(`/getGroup/${this.$route.params.groupID}`);
    console.log(groupData)
    this.name = groupData.group.name;
    this.limitMembers = groupData.group.limitMembers;
    this.kindSport = groupData.group.kindSport.charAt(0).toUpperCase() + groupData.group.kindSport.slice(1);
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

.styled-select {
  appearance: none;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-repeat: no-repeat;
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"  d="M4 6h16M4 12h16m-8 6h8"></path></svg>');
  background-position: right 8px center;
  width: 100%;
  outline: none;
  border-bottom: 1px solid black;
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
.discount-wrapper {
  position: relative;
  top: -125px;
  right: -300px;
  width: 280px;
}
.error-message-validate {
  position: absolute;
  display: inline-block;
  margin-left: -270px;
  z-index: 1;
  margin-top: 30px;
  font-size: 10px;
  color: #383535;
}
.error-message-validate-right {
  position: absolute;
  display: inline-block;
  margin-left: 70px;
  z-index: 1;
  margin-top: 30px;
  font-size: 10px;
  color: #383535;
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