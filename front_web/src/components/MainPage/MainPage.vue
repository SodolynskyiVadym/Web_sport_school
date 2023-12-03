<template>
  <section class="home" id="home">
    <div class="content">
      <div class="textBox">
        <h2>That's who<br><span>we are</span></h2>
        <p>
          We offer training in five exciting sports disciplines: football, volleyball, basketball, ice hockey, and athletics.
          Our goal is to cultivate not just athletic prowess but also teamwork, discipline, and a passion for sportsmanship.
          Join us as we strive for excellence both on and off the field!
        </p>
        <a href="#preferences" class="scrollLink">View Info</a>
      </div>
      <div class="imgBox">
        <img src="../../assets/logo2.png" alt="" class="sports">
      </div>
    </div>
    <ul class="thumb">
      <li><img src="https://cdn-icons-png.flaticon.com/512/857/857492.png" @click="imgSlider('https://cdn-icons-png.flaticon.com/512/857/857492.png');"></li>
      <li><img src="https://cdn-icons-png.flaticon.com/512/4163/4163679.png" @click="imgSlider('https://cdn-icons-png.flaticon.com/512/4163/4163679.png');"></li>
      <li><img src="https://cdn-icons-png.flaticon.com/512/4344/4344985.png" @click="imgSlider('https://cdn-icons-png.flaticon.com/512/4344/4344985.png');"></li>
    </ul>
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
        window.scroll({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    },
    imgSlider(someThing) {
      document.querySelector('.sports').src = someThing;
    }
  },
  mounted() {
    const scrollLinks = document.querySelectorAll('.scrollLink');

    scrollLinks.forEach(link => {
      link.addEventListener('click', this.smoothScroll);
    });
  }
}

</script>
<style>
@font-face {
  font-family: 'iran_sans_bold';
  src: url('@/assets/iran_sans_bold.woff') format('woff');
}

@font-face {
  font-family: 'iran_sans_light';
  src: url('@/assets/iran_sans_light.woff') format('woff');
}

@font-face {
  font-family: 'iran_sans_medi';
  src: url('@/assets/iran_sans_medi.woff') format('woff');
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: iran_sans_medi,sans-serif;
}
section{
  position: relative;
  width: 100%;
  min-height: 90vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.5s;
}

.content{
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 100px;
}
.content .textBox{
  position: relative;
  max-width: 600px;
}
.content .textBox h2{
  color: rgba(0, 0, 0, 0.99);
  font-size: 4em;
  line-height: 1.7em;
  font-weight: 900;
  text-transform: uppercase;
}
.content .textBox h2 span{
  font-size: 2em;
}
.content .textBox p{
  color: rgba(0, 0, 0, 0.99);
}
.content .textBox a{
  display: inline-block;
  margin-top: 20px;
  padding: 8px 20px;
  background: rgba(0, 0, 0, 0.99);
  color: rgba(238, 238, 238, 0.99);
  border-radius: 40px;
  font-weight: 500;
  letter-spacing: 1px;
  text-decoration: none;
  text-transform: uppercase;
}
.content .imgBox{
  width: 600px;
  display: flex;
  padding-right: 75px;
  margin-top: 20px;
  justify-content: flex-end;
}
.content .imgBox img{
  max-width: 500px;
}
.thumb{
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  display: flex;
}
.thumb li{
  list-style: none;
  display: inline-block;
  margin: 0 20px;
  cursor: pointer;
  transition: 0.5s;
}
.thumb li img{
  max-width: 100px;
}
.thumb li:hover{
  transform: translateY(-15px);
}


</style>

