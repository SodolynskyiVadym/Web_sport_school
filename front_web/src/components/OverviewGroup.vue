<template>
  <section class="overview-group-page">
    <div style="background-color: rgba(238,238,238,0.99); height: auto;">
      <div class="group-details-overview" v-if="group">
        <div class="wrapper-overview pre">
        </div>
        <div class="wrapper-overview">
          <div class="title-overview">
            <div class="group-name-overview">{{ group.name }}</div>
            <div class="line-overview"></div>
          </div>
          <div class="container-overview">
            <div class="card tabs">
              <input id="tab-1" type="radio" class="tab tab-selector" checked="checked" name="tab" />
              <label for="tab-1" class="tab tab-primary">Group</label>
              <input id="tab-2" type="radio" class="tab tab-selector" name="tab" />
              <label for="tab-2" class="tab tab-success">Coach</label>
              <input id="tab-3" type="radio" class="tab tab-selector" name="tab" />
              <label for="tab-3" class="tab tab-default">Price</label>
              <input id="tab-4" type="radio" class="tab tab-selector" name="tab" />
              <label for="tab-4" class="tab tab-warning">Join</label>
              <div class="tabsShadow"></div>
              <div class="glider"></div>
              <section class="content-overview">
                <div class="item-overview" id="content-1">
                  <h2 class="tab-title tab-primary"><div class="group-name-overview">{{ group.name }}</div>
                  </h2>
                  <p>
                    <span class="numit-overview"> </span>
                  </p>
                  <p class="info-overview-sport"><strong>Type:</strong> {{ group.kindSport.toUpperCase() }}</p>
                  <p class="info-overview-sport"><strong>Description:</strong> {{ group.description }}</p>
                  <p class="info-overview-sport"><strong>Members:</strong> {{ group.limitMembers }}</p>
                </div>
                <div class="item-overview" id="content-2">
                  <h2 class="tab-title tab-success">Group coach</h2>
                  <p>
                    <span class="numit-overview"></span>
                  </p>
                  <p class="info-overview-sport"><strong>Name:</strong> {{ group.coachID.name }}</p>
                  <p class="info-overview-sport"><strong>Last Name:</strong> {{ group.coachID.lastName }}</p>
                  <button class="button-overview join-button;" style="cursor: pointer" @click="enterCoachPage(group.coachID._id)">Read about coach</button>
                </div>
                <div class="item-overview" id="content-3">
                  <h2 class="tab-title tab-default">Price</h2>
                  <p>
                    <span class="numit-overview"></span>
                  </p>
                  <p class="info-overview-sport"><strong>Price:</strong> ${{ group.priceID.price }}</p>
                  <p class="info-overview-sport"><strong>Discount:</strong> {{ group.priceID.discount }}%</p>
                </div>
                <div class="item-overview" id="content-4">
                  <h2 class="tab-title tab-warning"></h2>
                  <p>
                    <span class="numit-overview"></span>  Would you like to join this group? Click join and pay
                  </p>
                  <div v-if="userRole === 'user'">
                    <button class="button-overview join-button" v-if="!userGroupsID.includes(this.$route.params.id) && userID && userRole==='user'" @click="buy">Buy</button>
                    <button class="button-overview join-button" v-else @click="login">Login</button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
  </section>
</template>

<script>
import * as listURL from "@/js/listURL";
import {bookGroup} from "@/js/stripe";

export default {
  data() {
    return {
      group: null,
      userID: "",
      userRole: "",
      userGroupsID: []
    };
  },
  methods: {
    async buy(){
      await bookGroup(this.$route.params.id, this.userID);
    },

    async enterCoachPage(coachID) {
      this.$router.push(`/overviewCoach/${coachID}`)
    },

    async login(){
      this.$router.push(`/login`)
    }
  },

  async mounted() {
    if (localStorage.getItem("token")){
      const userData = await listURL.getUserByToken(localStorage.getItem("token"));
      this.userID = userData.id
      this.userRole = userData.role
      this.userGroupsID = userData.user.groupsID
    }

    const groupData = await listURL.requestGroupsGet(`/getGroup/${this.$route.params.id}`);
    this.group = groupData.group

    console.log(!this.userGroupsID.includes(this.$route.params.id) && this.userID && this.userRole==='user')
    console.log(!this.userGroupsID.includes(this.$route.params.id))
    console.log(this.userID)
    console.log(this.userRole==='user')
  }
};
</script>

<style>
.title-overview {
  text-align: center;
  padding: 50px 0px 25px 0;
  font-size: 50px;
  font-weight: 600;

  color: black;
}
.wrapper-overview {
  width: 100%;
  min-height: 100vh;
  min-width: 90vh;
  opacity: 1;
}

.button-overview.join-button {
  background-color: rgba(232,232,232,0.99) !important;
  width: 140px !important;
  border-radius: 15px !important;
  border: 1px solid black !important;
  bottom: -10px !important;
}

.wrapper-overview.pre {
  position: absolute;
}

.wrapper-overview .line-overview {
  width: 50%;
  margin: 25px auto 0 auto;
  height: 1px;
  background-color: black;
}




.tabs input + label:hover {
  color: darkgray;
}


.content-overview .item-overview {
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  position: absolute;
  padding: 10px 20px;
  color: black;
}

#tab-1:checked ~ section #content-1,
#tab-2:checked ~ section #content-2,
#tab-3:checked ~ section #content-3,
#tab-4:checked ~ section #content-4 {
  opacity: 1;
  visibility: visible;
}

.tabs input + label {
  margin: 12px -5px;
  width: 15%;
  transition: all 0.3s;
  text-align: center;
  color: white;
  padding: 5pt 10pt;
  vertical-align: top;
  background: black;
  box-shadow: 1px 1px 2px 1px #231f20;
  border-radius: 7px 7px 0 0 !important;
}

.content-overview {
  margin: 0px auto;
  text-align: left;
  line-height: 20px;
  height: 200px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.76) 0px 20px 70px;
  padding: 1.25rem;
  border-top: black;
  background: white;
  position: relative;
}

.container-overview .card {
  width: 600px;
  height: 140px;
  border-radius: 10px;
  border: none;
  margin: 0 auto;
  position: relative;
  border-top: 1px solid darkgray;
  background: black;
}

.content-overview p {
  margin: 10px 15px 10px 0;
  font-size: 14pt;
  color: black;
}




.tabs input {
  position: relative;
  opacity: 0;
  padding: 0;
}


#tab-1:checked ~ .glider {
  background: white;
  left: 1.6%;
}

#tab-2:checked ~ .glider {
  left: 16%;
}
#tab-3:checked ~ .glider {
  background: white;
  left: 32%;

}

#tab-4:checked ~ .glider {
  background: white;
  left: 48% !important;
}
</style>