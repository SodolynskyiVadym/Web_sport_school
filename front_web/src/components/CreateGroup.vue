<template>
  <section>
    <div class="error-message-exist" v-if="error" role="alert">{{error}}</div>
    <div class="box">
      <div class="form">
        <div class="input-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" placeholder="NAME" @input="checkNameGroup">
          <div v-if="invalidNameGroup" class="error-message-validate">Name must be longer and consist letters or number or '-'</div>
        </div>
        <div class="input-group">
          <label for="description">Description:</label>
          <textarea id="description" v-model="description" placeholder="DESCRIPTION" @input="checkDescription"></textarea>
          <div v-if="invalidDescription" class="error-message-validate">Description must be more than 15 symbols</div>
        </div>
        <div class="input-group">
          <label for="limitMembers">Limit Members:</label>
          <input type="number" id="limitMembers" v-model="limitMembers" @input="checkPriceDiscountLimitMembers">
        </div>
        <div class="input-group">
          <label for="kindSport">Kind of Sport:</label>
          <input type="text" list="kind-sport" id="kindSport" v-model="kindSport" @input="checkKindSport">
          <datalist id="kind-sport">
            <option value="football"></option>
            <option value="volleyball"></option>
            <option value="basketball"></option>
            <option value="icehockey"></option>
            <option value="athletics"></option>
          </datalist>
        </div>
        <div class="input-group">
          <label for="price">Price:</label>
          <input type="number" id="price" v-model="price" min="0" @input="checkPriceDiscountLimitMembers">
        </div>
        <div class="input-group">
          <label for="discount">Discount:</label>
          <input type="number" id="discount" v-model="discount" min="0" max="100" @input="checkPriceDiscountLimitMembers">
        </div>
        <button class="button-update" @click="registerGroup">Create Group</button>
      </div>
    </div>
  </section>
</template>


<script>
import axios from "axios";
import * as listURL from "../js/listURL";

export default {
  data() {
    return {
      name: "",
      description: "",
      limitMembers: "",
      kindSport: "",
      price: "",
      discount: "",
      coachID: "",
      error: "",
      invalidNameGroup: false,
      invalidDescription: false
    }
  },
  methods: {
    async registerGroup() {
      try {
        if (this.invalidDescription || this.invalidNameGroup || this.name === "" || this.description === "" ||
            this.price === "" || this.discount === "" || this.limitMembers === "") return
        await axios.post('http://localhost:8000/groups/createGroup', {
          name: this.name,
          description: this.description,
          limitMembers: this.limitMembers,
          kindSport: this.kindSport,
          price: this.price,
          discount: this.discount,
          coachID: this.coachID,
        });

        this.clearFields();

      }catch (err){
        this.error = "This group already exist"
      }
    },

    async checkNameGroup(){
      const reg = /^[a-zA-Z0-9-]{2,}$/;
      this.invalidNameGroup = !reg.test(this.name);
    },

    async checkDescription(){
      this.invalidDescription = this.description.length < 15;
    },

    checkPriceDiscountLimitMembers() {
      // this.invalidPrice = this.price <= 0;
      // this.invalidLimitMembers = this.limitMembers < 1;
      // this.invalidDiscount = this.discount <= 0 || this.discount > 100;

      if (this.price > 0) {
        this.invalidPrice = false;
      }
      if (this.limitMembers >= 1) {
        this.invalidLimitMembers = false;
      }
    },
    checkKindSport() {
      this.invalidKindSport = !this.kindSport.trim();
    },



    clearFields() {
      this.name = "";
      this.description = "";
      this.limitMembers = "";
      this.kindSport = "";
      this.price = "";
      this.discount = "";
    }
  },
  async mounted() {
    const userData = await listURL.getUserByToken(localStorage.getItem("token"));
    this.coachID = userData.id
  }
}

</script>


<style>
body {
  background-color: rgba(238,238,238,0.99); /* Колір фону, який вам подобається */
}

.box {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.76) 0px 10px 30px;
  border-radius: 20px;
  margin-left: 410px;
  height: 700px;
  width: 50%;
  margin-top: 120px;
}
.error-message-validate {
  position: absolute;
  display: inline-block;
  margin-left: 170px;
  z-index: 1;
  margin-top: 75px;
  font-size: 10px;
  color: #383535;
}
.error-message-exist {
  position: absolute;
  display: inline-block;
  margin-left: 720px;
  z-index: 1;
  margin-top: -25px;
  font-size: 16px;
  color: #383535;
}
.form {
  width: 80%;
  margin-left: 80px;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 10px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.input-group input[type="text"],
.input-group input[type="number"],
.input-group textarea {
  border: none;
  border-bottom: 1px solid #000;
  padding: 8px;
  font-size: 16px;
  color: #000;
  transition: border-color 0.3s ease;
  width: 100%;
}

.input-group input[type="text"]:focus,
.input-group input[type="number"]:focus,
.input-group textarea:focus {
  outline: none;
}


.input-group label {
  margin-bottom: 5px;
}


.button-update {
  background: #fff;
  font-size: 14px;
  margin-top: -5px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  font-weight: 700;
  height: 60px;
  width: 220px;
  color: black;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.76);
  cursor: pointer;
  transition: .2s;
  margin-left: calc(100% - 200px);
}

.button-update:active,
.button-update:focus,
.button-update:hover{
  border-color: rgba(0, 0, 0, 0.76);
  outline: none;
}
</style>


