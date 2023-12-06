<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <section class="trainers">
    <div class="container">
      <div v-for="coach in coaches" :key="coach._id" class="box">
        <div class="box-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
          </svg>
        </div>
        <div class="studio-button">
          <div class="studio-button-icon"> <i class="fas fa-mouse-pointer"></i>
          </div>
          <div class="studio-button-label">
            <a :href="`http://localhost:8080/overviewCoach/${coach._id}`" class="c-link" >JOIN</a>
          </div>
        </div>
        <div class="box-content">
          <div class="box-label">Coach Coach</div>
          <div class="box-title">Sport Sport Sport</div>
          <div class="box-image">
            <p><i class="fas fa-user"></i> {{ coach.name}} {{ coach.lastName }}</p>
            <p><i class="fas fa-envelope"></i> {{ coach.email }}</p>
            <p><i class="fas fa-phone"></i> {{ coach.phone }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as listURL from "../js/listURL";


export default {
  data(){
    return {
      coaches: []
    }
  },

  async mounted(){
    const coachData = await listURL.requestUsersGet("/getAllCoaches");
    this.coaches = coachData.coaches
  }
}
</script>

<style>
body{
  background-color: rgba(238,238,238,0.99);
}
.trainers {
  background-color: rgba(238,238,238,0.99);
  display: grid;
  place-items: center;
  min-height: 40vh;
  color: black;
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
  right: 95px;
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

.container {
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
  top: 10px;
  left: 10px;
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




</style>






