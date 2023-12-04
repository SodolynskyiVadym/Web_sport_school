<template>
  <div class="coach-profile" v-if="coach">
    <div class="coach-info">
      <p>{{ coach.name }}</p>
      <p>{{ coach.lastName }}</p>
      <p>{{ coach.patronymic }}</p>
      <p>{{ coach.description }}</p>
      <p>{{ coach.birth }}</p>
    </div>

    <table class="group-table">
      <tr>
        <th>Name</th>
        <th>Kind of sport</th>
        <th>Current members</th>
        <th>Limit members</th>
        <th>Action</th>
      </tr>
      <tr v-for="group in groups" :key="group._id">
        <td>{{ group.name }}</td>
        <td>{{ group.kindSport }}</td>
        <td>{{ group.currentMembers }}</td>
        <td>{{ group.limitMembers }}</td>
        <td><button @click="enterGroupPage(group._id)">Read more</button></td>
      </tr>
    </table>
  </div>

  <div class="review-section" v-for="review in reviews" :key="review._id">
    <div class="review">
      <p>{{ review.description }}</p>
      <p>{{ review.rating }}</p>
    </div>
  </div>

  <div v-if="isAuth && this.userRole === 'user'">
    <input type="number" v-model="myRating">
    <textarea v-model="myReview"></textarea>
    <button v-if="isReview" @click="updateReview">Update review</button>
    <button v-else @click="writeReview">Write review</button>
    <button @click="deleteReview">Delete review</button>
  </div>
</template>


<style scoped>
.coach-profile {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;
}

.coach-info {
  margin-bottom: 20px;
}

.group-table {
  width: 100%;
  border-collapse: collapse;
}

.group-table th,
.group-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.review-section {
  background-color: #666666;
  color: #fff;
  margin-bottom: 20px;
  padding: 20px;
}

.review {
  margin-bottom: 10px;
}

.review-form {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
}

.review-form input,
.review-form textarea {
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.review-form button {
  padding: 8px 16px;
  margin-right: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.review-form button:hover {
  background-color: #252222;
}
</style>

<script>
import axios from "axios";
import {getUserByToken} from "@/js/getterByValue";

export default {
  data() {
    return {
      userID: "",
      userRole: "",
      coach: null,
      groups: [],
      reviews: [],
      isAuth: false,
      myReview: "",
      myRating: 0,
      isReview: false
    }
  },
  methods: {
    async enterGroupPage(groupID) {
      this.$router.push(`/overviewGroup/${groupID}`)
    },


    async getReviews(){
      await axios.get(`http://localhost:8000/reviews/getReviews/${this.$route.params.id}`).then(res => {
        this.reviews = res.data.reviews
      });
    },

    async deleteReview(){
      await axios.delete(`http://localhost:8000/reviews/deleteReview/${this.userID}/${this.$route.params.id}`)
      this.isReview = false;
      this.myReview = "";
      this.myRating = 0;
      await this.getReviews()
    },

    async updateReview(){
      await axios.patch("http://localhost:8000/reviews/updateReview", {
        coachID: this.$route.params.id,
        description: this.myReview,
        userID: this.userID,
        rating: this.myRating
      });
      console.log(this.myReview)
      await this.getReviews()
    },

    async writeReview(){
      await axios.post("http://localhost:8000/reviews/createReview", {
        coachID: this.$route.params.id,
        description: this.myReview,
        userID: this.userID,
        rating: this.myRating
      });
      this.isReview = true
      await this.getReviews()
    }
  },
  async mounted() {
    if (localStorage.getItem("token")){
      await getUserByToken(localStorage.getItem("token")).then(res => {
        this.userID = res.data.id;
        this.userRole = res.data.role;
        this.isAuth = true
      });

      await axios.get(`http://localhost:8000/reviews/getReview/${this.userID}/${this.$route.params.id}`).then(res => {
        this.myReview = res.data.review.description;
        this.isReview = res.data.isReview
      });
    }


    await axios.get(`http://localhost:8000/users/getCoach/${this.$route.params.id}`).then(res => {
      this.coach = res.data.user;
      this.groups = res.data.groups
    });

    await this.getReviews()
  }
}
</script>






















