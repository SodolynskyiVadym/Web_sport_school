<template>
  <section>
    <body>
    <section class="about-us">
      <div class="about">
        <img src="@/assets/about.png" class="pic">
        <div class="about-text">
          <h2>About Us</h2>
          <p>At our sports school, we're dedicated to nurturing the next generation of athletes and providing a holistic approach to sports education. Whether your passion lies in soccer, volleyball, basketball, hockey, or athletics, we offer comprehensive training programs that cater to various sports disciplines.</p>
          <p>We offer programs for athletes of all ages and skill levels.  Our curriculum includes skill development, tactical training, physical conditioning, and mental resilience. If you're ready to embark on a journey of athletic excellence and personal growth, we invite you to join our sports school. Please fill the registration form. Contact us to learn more about our programs and enrollment options. Our experienced coaching staff comprises former athletes and seasoned professionals.</p>
          <div class="data">
            <a href="#services" class="hire">Our services</a>
          </div>
        </div>
      </div>
    </section>
    </body>
  </section>
</template>



<script>
export default {
  methods: {
    smoothScroll(e) {
      e.preventDefault();

      const targetId = e.target.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  },
  mounted() {
    const scrollLinks = document.querySelectorAll('.hire');

    scrollLinks.forEach(link => {
      link.addEventListener('click', this.smoothScroll);
    });
  }
}
</script>

<style>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: iran_sans_medi,sans-serif;
}
.about-us{
  height: 100vh;
  width: 100%;
  padding: 90px 0;

}
.pic{
  height: 420px;
  width:  420px;
}
.about{
  width: 1130px;
  max-width: 85%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.about-text{
  width: 540px;
}
.about-text h2{
  font-size: 90px;
  font-weight: 600;
  margin-bottom: 10px;
  text-shadow: rgba(0, 0, 0, 0.76) 0px 20px 70px;
}

.about-text p{
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 1px;
}
.data{
  margin-top: 30px;
}
.hire{
  font-size: 18px;
  background: black;
  color: #fff;
  text-decoration: none;
  border: none;
  padding: 8px 25px;
  border-radius: 6px;
  transition: 0.5s;
  box-shadow: rgba(0, 0, 0, 0.76) 0px 20px 70px;
}
.hire:hover{
  background: darkgray;

}
</style>