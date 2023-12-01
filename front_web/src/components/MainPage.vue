<template>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
  <div class="welcome-text">
    <h1>Welcome to our Sport school!</h1>
  </div>
  <div class="image-gallery">
    <div v-for="(image, index) in images" :key="index" class="gallery-item">
      <img :src="require(`@/assets/${image}`)" :alt="image">
    </div>
  </div>
  <h2>About Us</h2>
  <div class="about-us">
    <div class="image-about">
      <img src="@/assets/about.png" alt="Опис зображення">
    </div>
    <div class="text-about">
      <p>At our sports school, we're dedicated to nurturing the next generation of athletes and providing a holistic approach to sports education. Whether your passion lies in soccer, volleyball, basketball, hockey, or athletics, we offer comprehensive training programs that cater to various sports disciplines.</p>
      <p>We offer programs for athletes of all ages and skill levels. Whether you're a young aspiring athlete looking to get started or a seasoned player aiming to reach the professional level, we have a program tailored just for you. Our curriculum includes skill development, tactical training, physical conditioning, and mental resilience.</p>
      <p>If you're ready to embark on a journey of athletic excellence and personal growth, we invite you to join our sports school. Please fill the registration form. Contact us to learn more about our programs and enrollment options. Our experienced coaching staff comprises former athletes and seasoned professionals.</p>
    </div>
  </div>
  <h2>Learn more</h2>
  <div class="services-section">
    <div v-for="(service, index) in services" :key="index" class="service-card">
      <img :src="require(`@/assets/${service.image}`)" :alt="service.alt">
      <h3>{{ service.title }}</h3>
      <p>{{ service.description }}</p>
      <a :href="service.link" class="service-button">Learn More</a>
    </div>
  </div>
  <footer class="footer">
    <div class="white-bar"></div>
    <div class="footer-content">
      <div class="contact">
        <h3>Contact Us</h3>
        <p><a href="mailto:vadimsodolinskij@gmail.com"><i class="fa-solid fa-envelope fa"></i> example@gmail.com</a></p>
        <p><a href="tel:+380977447508"><i class="fas fa-phone"></i> +380977447508</a></p>
        <p><a href="https://t.me"><i class="fab fa-telegram"></i> sport_school</a></p>
        <p><a href="https://wa.me/0977447508"><i class="fab fa-whatsapp"></i> +380977447508</a></p>
      </div>
      <div class="follow-us">
        <h3>Follow Us</h3>
        <p><a href="https://www.facebook.com/"><i class="fab fa-facebook"></i> Facebook</a></p>
        <p><a href="https://twitter.com/?lang=uk"><i class="fab fa-twitter"></i> Twitter</a></p>
        <p><a href="https://www.instagram.com/"><i class="fab fa-instagram"></i> Instagram</a></p>
      </div>
      <div class="address">

        <h3>Our Address</h3>
        <p><i class="fas fa-map-marker-alt"></i> 123 Street Name</p>
        <p> Kyiv, Ukraine</p>
      </div>
      <div class="sport">
        <h3>Kind of Sport</h3>
        <p><i class="fas fa-futbol"></i> Football</p>
        <p><i class="fas fa-volleyball-ball"></i> Volleyball</p>
        <p><i class="fas fa-basketball-ball"></i> Basketball</p>
        <p><i class="fas fa-hockey-puck"></i> Ice Hockey</p>
        <p><i class="fas fa-running"></i> Athletics</p>
      </div>

    </div>
  </footer>

</template>





<script>
export default {
  data() {
    return {
      images: [
        'football.jpeg',
        'volleyball.jpeg',
        'basketball.jpeg',
        'icehockey.jpeg',
        'athletics.jpeg'
      ],
      services: [
        {
          image: 'schedule.png',
          alt: 'Service 1',
          title: 'Schedule',
          description: 'Here you can watch our schedule',
          link: '/schedule'
        },
        {
          image: 'trainers.jpeg',
          alt: 'Service 2',
          title: 'Coaches team',
          description: 'Here you can watch our coaches team',
          link: '/coaches'
        },
        {
          image: 'groups.jpeg',
          alt: 'Service 3',
          title: 'Groups',
          description: 'Here you can choose group',
          link: '/groups'
        }
      ]
    };
  }
};

</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

*{
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  outline: none;
  border: none;
  text-transform: capitalize;
  transition: all .2s linear;
}

h1 {
  font-style: italic;
  font-weight: 1000;
  font-size: 3rem;
  text-transform: uppercase;
  text-align: center;
  margin: 20px;
}
h2 {
  font-style: italic;
  font-weight: 1000;
  font-size: 2rem;
  text-transform: uppercase;
  text-align: center;
  margin: 80px;
}
body{
  background: white;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
.image-gallery {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  margin-bottom: 20px;
}

.gallery-item {
  flex: 0 0 auto;
  width: 33%;
  overflow: hidden;
}

img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.about-us {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  background-color: rgba(245, 245, 245, 0.7);
}

.text-about {
  flex: 1;
  padding: 20px;
  text-align: justify;
  margin-right: 120px;
}

.image-about {
  flex: 1;
  overflow: hidden;
  margin-left: 40px;
}

.image-about img {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
}
.services-section {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  max-width: 1400px;
  margin: 70px;
}

.service-card {
  flex: 0 0 calc(33.33% - 20px);
  max-width: 430px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: rgba(245, 245, 245, 0.7);
}

img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.service-button {
  display: block;
  text-align: center;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
}
.service-button:hover {
  background-color: darkgray;
}
.welcome-text,
.image-gallery,
.about-us{
  max-width: 1400px;
  margin: 30px;
}

.footer {
  bottom: 0;
  width: 100%;
  padding: 30px;
  background-color: #f7f7f7;
  position: relative;
  text-align: left;

}

.footer-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;

}

.contact,
.address,
.sport,
.follow-us {
  flex: 1 1 200px;
  max-width: 200px;
  margin-right: 50px;

}

.contact h3,
.address h3,
.sport h3,
.follow-us h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
}

.contact p,
.address p,
.sport p,
.follow-us p {
  margin-bottom: 5px;
}

.contact a,
.address a,
.sport a,
.follow-us a {
  color: #333;
  text-decoration: none;

}

.contact a:hover,
.address a:hover,
.sport a:hover,
.follow-us a:hover {
  text-decoration: underline;
}

.white-bar {
  position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: black;
  top: -5px;
}
/* Для мобільних пристроїв */
@media screen and (max-width: 768px) {
  h1 {
    font-size: 2rem;
    margin: 10px;
  }

  h2 {
    font-size: 1.5rem;
    margin: 40px;
  }

  .welcome-text,
  .image-gallery,
  .services-section {
    margin: 10px;
  }

  .gallery-item {
    width: 100%;
  }

  .text-about {
    margin-right: 0;
  }

  .service-card {
    flex: 0 0 100%;
    margin-bottom: 20px;
  }

  .contact,
  .address,
  .sport,
  .follow-us {
    flex: 1 1 100%;
    max-width: 100%;
    margin-right: 0;
  }
}
.about-us {
  flex-direction: column;
  align-items: center;
  margin: 10px;
}

.image-about {
  margin-left: 0;
  margin-bottom: 20px;
}

.text-about {
  margin-right: 0;
  text-align: center;
}



</style>
