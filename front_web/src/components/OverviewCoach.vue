<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <section class="trainers-overview">
    <div class="coach-profile" v-if="coach">
      <h1 class="coach-title-overview">COACH {{ coach.name }} {{ coach.lastName }}</h1>
    </div>
    <div class="container-group-card">
      <div v-for="group in groups" :key="group._id" class="box">
        <div class="box-icon">
          <i class="fas fa-trophy" style=" font-size: 25px "></i>
        </div>
        <div class="studio-button">
          <div class="studio-button-icon"> <i class="fas fa-mouse-pointer"></i>
          </div>
          <div class="studio-button-label">
            <a @click="enterGroupPage(group._id)" class="c-link">INFO</a>
          </div>
        </div>
        <div class="box-content">
          <div class="box-label">Group Group Group</div>
          <div class="box-title">Sport Sport Sport</div>
          <div class="box-image">
            <p><i class="fas fa-pencil-alt"></i> GROUP: {{ group.name }}</p>
            <p><i class="fas fa-dumbbell"></i> SPORT: {{ group.kindSport.toUpperCase() }}</p>
            <p><i class="fas fa-user-friends"></i> MEMBERS: {{ group.currentMembers }}</p>
            <p><i class="fas fa-exclamation-triangle"></i> LIMIT: {{ group.limitMembers }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="review-header">
      <div class="container-review">
        <div class="container__right">
          <div class="card-review">
            <i class="fas fa-user-friends"> USER</i>
            <div class="card__content">
              <span><i class="ri-double-quotes-l"></i></span>
              <div class="card__details">
                <p>This trainer is really one of the best!</p>
                <h4>★★★★★ Rating</h4>
              </div>
            </div>
          </div>
          <div class="container-review" v-for="review in reviews" :key="review._id">
              <div class="card-review">
                <i class="fas fa-user-friends"> USER</i>
                <div class="card__content">
                  <span><i class="ri-double-quotes-l"></i></span>
                  <div class="card__details">
                    <p>{{ review.description }}</p>
                    <h4>
                      <span v-html="convertToStars(review.rating)"></span>Rating
                    </h4>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="container__left">
        <div class="all-review">
          <h1 class>Review</h1>
          <p>Every review at our sports school is a step towards improvement.
            We value your impressions and thoughts as they help us become better.
            Each review from our students is direct feedback that is crucial for the development of our school.
            We aim for honest and candid reviews because your words reflect your experience.
            Every expressed review is carefully considered, and your recommendations assist us in continuously enhancing our services</p>
        </div>
        <div v-if="isAuth && userRole === 'user'" class="user-review">
          <div class="star-rating">
        <span v-for="n in 5"
              :key="n"
              :class="{ 'filled-star': n <= hoveredRating, 'hoverable': isAuth && userRole === 'user' }"
              @mouseover="hoveredRating = n"
              @click="setRating(n)"
              @mouseleave="hoveredRating = myRating">★</span>
          </div>
          <textarea class="textarea-review" v-model="myReview"></textarea>
          <button class="button-review" v-if="isReview" @click="updateReview">Update review</button>
          <button class="button-review" v-else @click="writeReview">Write review</button>
          <button class="button-review" @click="deleteReview">Delete review</button>
        </div>
      </div>
      </div>
  </section>

</template>

<script>
import axios from "axios";
import * as listURL from "@/js/listURL";

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
      isReview: false,
      hoveredRating: 0
    }
  },
  methods: {


    async enterGroupPage(groupID) {
      this.$router.push(`/overviewGroup/${groupID}`)
    },
    setRating(value) {
      this.myRating = value;
    },


    convertToStars(rating) {
      return '★'.repeat(rating);
    },

    async getReviews() {
      const reviewsData = await listURL.requestReviewsGet(`/getReviews/${this.$route.params.id}`);
      this.reviews = reviewsData.reviews.map(review => ({
        ...review,
        starRating: this.convertToStars(review.rating)
      }));
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
      const userData = await listURL.getUserByToken(localStorage.getItem("token"));
      this.userID = userData.id
      this.isAuth = true;
      this.userRole = userData.role


      const reviewData = await listURL.requestReviewsGet(`/getReview/${this.userID}/${this.$route.params.id}`);
      this.isReview = reviewData.isReview;
      if (reviewData.isReview){
        this.myReview = reviewData.review.description;
        this.myRating = reviewData.review.rating;
      }
    }

    await axios.get(`http://localhost:8000/users/getCoach/${this.$route.params.id}`).then(res => {
      this.coach = res.data.user;
      this.groups = res.data.groups
    });

    await this.getReviews()
  }
}
</script>

<style>
body{
  background-color: rgba(238,238,238,0.99);

}
.coach-title-overview{
  margin-top: 50px;

}
.trainers-overview {
  background-color: rgba(238,238,238,0.99);
  display: grid;
  place-items: center;
  min-height: 40vh;
  color: black;
  height: 100%;
}

.user-review{
  width: 750px;
}
.box-title {
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: -30px;
  transform: rotate(-90deg) translateY(-50%);
}

.box-label {
  font-size: 18px;
  position: absolute;
  top: 6%;
  right: 45px;
}

.box-content {
  top: 50px;
  left: 50px;
}

.box-image {
  position: absolute;
  top: 35%;
  color: black;
  left: 60px
}

.container-group-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 60px;
  padding: 60px;
  margin: 50px;
}

.box {
  background: white;
  border-radius: 20px;
  height: 280px;
  width: 280px;
  overflow: hidden;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.76) 0px 10px 30px;

}

.box-icon {
  position: absolute;
  top: 25px;
  left: 20px;
}



.studio-button {
  bottom: 16px;
  left: 80%;
  transform: translateX(-50%);
  position: absolute;
  display: flex;
  align-items: center;
  background: black;
  color: white;
  padding: 8px 10px;
  border-radius: 15px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  transition: 0.35s ease all;
  overflow: hidden;
  max-width: 40px;
}

.studio-button-icon {
  position: relative;
  top: 1px;
  left: 4px;
}
.c-link{
  text-decoration: none;
  color: white;
}

.studio-button-label {
  text-transform: uppercase;
  white-space: nowrap;
  padding: 0 8px;
  opacity: 0;
  transform: translateX(10px);
  transition: 0.25s ease all;
}

.box:hover {
  .studio-button {
    max-width: 100%;
  }
  .studio-button-label {
    opacity: 1;
    transform: translateX(0);
    transition: 0.25s 0.1s ease-in opacity, 0.15s 0.1s cubic-bezier(.175, .885, .32, 1.275) transform;
  }
}

/*ревю*/
.review-header {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  justify-content: center;
}
.review-header {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  justify-content: center;
}
.container__left {
  display: flex;
  flex-direction: column;
  max-width: 50%;
  align-items: center;
  gap: 2rem;

}

.container__right {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
  max-width: 50%;
}

.card-review {
  padding: 2rem;
  border-radius: 1rem;
  margin: 20px;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  width: 600px;
  transition: transform 0.3s ease;
  height: 100%;
}

.card-review:hover {
  transform: translateY(-5px);
}

.card-review img {
  max-width: 100%;
  border-radius: 10px;
}

.card__content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card__details {
  flex: 1;
}

.card__details h4 {
  text-align: right;
  font-size: 1rem;
  font-weight: 500;
}
.card__details p,
.card__details h4 {
  max-width: 100%;
  overflow-wrap: break-word;
}
.star-rating {
  display: flex;
  font-size: 24px;
  color: #cbd5e0;
  margin-bottom: 1rem;
}

.star-rating .filled-star {
  color: #4a5568;
  cursor: pointer;
  transition: color 0.3s ease;
}

.star-rating .filled-star:hover {
  color: #2d3748;
}

.textarea-review {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 15px;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.button-review {
  padding: 0.75rem 1.5rem;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
  border: none;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;
}

button:hover {
  background-color: darkgray;
}

</style>













