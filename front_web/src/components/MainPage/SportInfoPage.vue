<template>
  <section class="info-sports">
    <div class="textBoxingSport">
      <h1>Sport Info</h1>
    </div>
    <body>
    <div id="scene">
      <div id="left-zone">
        <ul class="list">
          <li class="item">
            <input type="radio" id="radio_The garden strawberry (or simply strawberry /ˈstrɔːbᵊri/; Fragaria × ananassa) is a widely grown hybrid species of the genus Fragaria (collectively known as the strawberries)" name="basic_carousel" value="The garden strawberry (or simply strawberry /ˈstrɔːbᵊri/; Fragaria × ananassa) is a widely grown hybrid species of the genus Fragaria (collectively known as the strawberries)" checked="checked"/>
            <label class="label_football" for="radio_The garden strawberry (or simply strawberry /ˈstrɔːbᵊri/; Fragaria × ananassa) is a widely grown hybrid species of the genus Fragaria (collectively known as the strawberries)">football</label>
            <div class="content content_football"><span class="picto"></span>
              <h1>Football</h1>
              <p>Football, or soccer, stands as one of the most popular team sports globally. It unites millions of people around the world, inspiring them with its simplicity and emotional richness. It's a game that requires agility, strategy, and the ability to work as a team.</p>
            </div>
          </li>
          <li class="item">
            <input type="radio" id="radio_A banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa." name="basic_carousel" value="A banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa."/>
            <label class="label_volleyball" for="radio_A banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa.">voleyball</label>
            <div class="content content_volleyball"><span class="picto"></span>
              <h1>Volleyball</h1>
              <p>Volleyball, a dynamic and captivating sport. It's a game that demands teamwork, precision, and quick reflexes.</p>
            </div>
          </li>
          <li class="item">
            <input type="radio" id="radio_The apple tree (Malus domestica) is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated worldwide as a fruit tree, and is the most widely grown species in the genus Malus." name="basic_carousel" value="The apple tree (Malus domestica) is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated worldwide as a fruit tree, and is the most widely grown species in the genus Malus."/>
            <label class="label_basketball" for="radio_The apple tree (Malus domestica) is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated worldwide as a fruit tree, and is the most widely grown species in the genus Malus.">basketball</label>
            <div class="content content_basketball"><span class="picto"></span>
              <h1>Basketball</h1>
              <p>Basketball is a sport that combines energy, grace, and strategy on the court. It's a game that demands high physical fitness, teamwork, and precision in every move.</p>
            </div>
          </li>
          <li class="item">
            <input type="radio" id="radio_The orange (specifically, the sweet orange) is the fruit of the citrus species Citrus × sinensis in the family Rutaceae." name="basic_carousel" value="The orange (specifically, the sweet orange) is the fruit of the citrus species Citrus × sinensis in the family Rutaceae."/>
            <label class="label_hockey" for="radio_The orange (specifically, the sweet orange) is the fruit of the citrus species Citrus × sinensis in the family Rutaceae.">Ice hockey</label>
            <div class="content content_hockey"><span class="picto"></span>
              <h1>Ice hockey</h1>
              <p>Ice hockey is an exhilarating sport played on ice, combining speed, skill, and physicality. It's a game that demands agility, precision, and teamwork as players glide across the ice, maneuvering the puck with swift and calculated movements.</p>
            </div>
          </li>
          <li class="item">
            <input type="radio" id="radio_The_grapefruit_is_a_tropical_citrus_fruit_known_for_its_sour_to_semisweet_taste." name="basic_carousel" value="The grapefruit is a tropical citrus fruit known for its sour to semisweet taste."/>
            <label class="label_athletic" for="radio_The_grapefruit_is_a_tropical_citrus_fruit_known_for_its_sour_to_semisweet_taste.">Athletic</label>
            <div class="content content_athletic"><span class="picto"></span>
              <h1>Athletic</h1>
              <p>Athletics encompasses a diverse range of individual and team sporting events that test physical strength, agility, speed, and endurance. From track and field competitions to cross-country running and race walking, athletics celebrate the human body's capabilities and competitive spirit.</p>
            </div>
          </li>
        </ul>
      </div>
      <div id="middle-border"></div>
      <div id="right-zone"></div>
    </div>
    </body>
  </section>

</template>

<style>
.textBoxingSport {
  text-align: center;
  line-height: 2em;
  font-weight: 900;
  font-size: 2rem;
  margin: 50px auto;
  padding: 10px;
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-47%);
}


@-webkit-keyframes slidein {
  0% {
    top: -400px;
    opacity: 0;
  }
  100% {
    opacity: 1;
    top: 0px;
  }
}
@keyframes slidein {
  0% {
    top: -400px;
    opacity: 0;
  }
  100% {
    opacity: 1;
    top: 0px;
  }
}
@-webkit-keyframes slideout {
  0% {
    top: 0;
    opacity: 1;
  }
  100% {
    top: -400px;
    opacity: 0;
  }
}
@keyframes slideout {
  0% {
    top: 0;
    opacity: 1;
  }
  100% {
    top: -400px;
    opacity: 0;
  }
}
.textBoxing{
  text-align: center;
  line-height: 2em;
  font-weight: 900;
  font-size: 2rem;
  margin: 50px;
  padding: 10px;


}
body {
  background: rgba(238,238,238,0.99);
  font-family: "Tahoma";
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
body #scene {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 1000px;
  height: 400px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  background: rgba(245, 243, 243, 0.98);
  box-shadow: rgba(0, 0, 0, 0.76) 0px 20px 70px;
  border-radius: 10px;
  overflow: hidden;
  padding: 40px;
}
body #scene #left-zone {
  background: rgba(245, 242, 242, 0.98);
  height: 75%;
  flex-grow: 0;
  display: flex;
  width: 350px;
  align-items: center;
  justify-content: left;
}
body #scene #left-zone .list {
  display: flex;
  list-style: none;
  align-content: stretch;
  flex-direction: column;
  flex-grow: 1;
  margin: 0;
  padding: 0;
}
body #scene #left-zone .list li.item input[type=radio] {
  display: none;
}
body #scene #left-zone .list li.item input[type=radio] ~ label {
  display: block;
  opacity: 0.5;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
body #scene #left-zone .list li.item input[type=radio] ~ label:first-letter {
  text-transform: uppercase;
}
body #scene #left-zone .list li.item input[type=radio] ~ label:hover {
  opacity: 0.75;
  cursor: pointer;
}
body #scene #left-zone .list li.item input[type=radio] ~ label.label_football:before {
  content: " ";
  display: block;
  position: absolute;
  width: 50px;
  height: 50px;
  margin-left: 15px;
  background-image: url("https://cdn-icons-png.flaticon.com/512/53/53283.png");
  background-position: center;
  background-size: 75% 75%;
  background-repeat: no-repeat;
}
body #scene #left-zone .list li.item input[type=radio] ~ label.label_volleyball:before {
  content: " ";
  display: block;
  position: absolute;
  width: 50px;
  height: 50px;
  margin-left: 15px;

  background-position: center;
  background-image: url('https://cdn-icons-png.flaticon.com/512/8/8384.png');
  background-size: 75% 75%;
  background-repeat: no-repeat;
}
body #scene #left-zone .list li.item input[type=radio] ~ label.label_basketball:before {
  content: " ";
  display: block;
  position: absolute;
  width: 50px;
  height: 50px;
  margin-left: 15px;
  background-image: url("https://cdn-icons-png.flaticon.com/512/889/889289.png");
  background-position: center;
  background-size: 75% 75%;
  background-repeat: no-repeat;
}
body #scene #left-zone .list li.item input[type=radio] ~ label.label_hockey:before {
  content: " ";
  display: block;
  position: absolute;
  width: 50px;
  height: 50px;
  margin-left: 15px;
  background-image: url("https://cdn-icons-png.flaticon.com/512/140/140483.png");
  background-position: center;
  background-size: 75% 75%;
  background-repeat: no-repeat;
}
body #scene #left-zone .list li.item input[type=radio] ~ label.label_athletic:before {
  content: " ";
  display: block;
  position: absolute;
  width: 50px;
  height: 50px;
  margin-left: 15px;
  background-image: url("https://cdn-icons-png.flaticon.com/512/2262/2262790.png");
  background-position: center;
  background-size: 75% 75%;
  background-repeat: no-repeat;
}
body #scene #left-zone .list li.item input[type=radio] ~ .content {
  position: absolute;
  left: 370px;
  top: -400px;
  width: 650px;
  height: 400px;
  -webkit-animation-duration: 0.75s;
  animation-duration: 0.75s;
  -webkit-animation-name: slideout;
  animation-name: slideout;
  -webkit-animation-timing-function: ease-out;
  animation-timing-function: ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
body #scene #left-zone .list li.item input[type=radio] ~ .content.content_football .picto {
  height: 100px;
  width: 100px;
  background-image: url("https://cdn-icons-png.flaticon.com/512/53/53283.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
body #scene #left-zone .list li.item input[type=radio] ~ .content.content_football h1 {
  color: black;
}
body #scene #left-zone .list li.item input[type=radio] ~ .content.content_volleyball .picto {
  height: 100px;
  width: 100px;
  background-image: url("https://cdn-icons-png.flaticon.com/512/8/8384.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
body #scene #left-zone .list li.item input[type=radio] ~ .content.content_volleyball h1 {
  color: black;
}
body #scene #left-zone .list li.item input[type=radio] ~ .content.content_basketball .picto {
  height: 100px;
  width: 100px;
  background-image: url("https://cdn-icons-png.flaticon.com/512/889/889289.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
body #scene #left-zone .list li.item input[type=radio] ~ .content.content_basketball h1 {
  color: black;
}
body #scene #left-zone .list li.item input[type=radio] ~ .content.content_hockey .picto {
  height: 100px;
  width: 100px;
  background-image: url("https://cdn-icons-png.flaticon.com/512/140/140483.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
body #scene #left-zone .list li.item input[type=radio] ~ .content.content_hockey h1 {
  color: black;
}
body #scene #left-zone .list li.item input[type=radio] ~ .content.content_athletic .picto {
  height: 100px;
  width: 100px;
  background-image: url("https://cdn-icons-png.flaticon.com/512/2262/2262790.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
body #scene #left-zone .list li.item input[type=radio] ~ .content.content_athletic h1 {
  color: black;
}
body #scene #left-zone .list li.item input[type=radio] ~ .content h1:first-letter {
  text-transform: uppercase;
}
body #scene #left-zone .list li.item input[type=radio] ~ .content p {
  max-width: 50%;
  text-align: center;
}
body #scene #left-zone .list li.item input[type=radio]:checked ~ label {
  opacity: 1;
  -webkit-animation: all 1s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  animation: all 1s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}
body #scene #left-zone .list li.item input[type=radio]:checked ~ label.label_football {
  color: black;
  border-right: solid 4px black;
}
body #scene #left-zone .list li.item input[type=radio]:checked ~ label.label_volleyball {
  color: black;
  border-right: solid 4px black;
}
body #scene #left-zone .list li.item input[type=radio]:checked ~ label.label_basketball {
  color: black;
  border-right: solid 4px black;
}
body #scene #left-zone .list li.item input[type=radio]:checked ~ label.label_hockey {
  color: black;
  border-right: solid 4px black;
}
body #scene #left-zone .list li.item input[type=radio]:checked ~ label.label_athletic {
  color: black;
  border-right: solid 4px black;
}
body #scene #left-zone .list li.item input[type=radio]:checked ~ .content {
  -webkit-animation-duration: 0.75s;
  animation-duration: 0.75s;
  -webkit-animation-name: slidein;
  animation-name: slidein;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
}
body #scene #middle-border {
  background: rgba(245, 243, 243, 0.98);
  height: 75%;
  flex-grow: 1;
  max-width: 2px;
}
body #scene #right-zone {
  background: rgba(245, 243, 243, 0.98);
  height: 100%;
  flex-grow: 3;
}
</style>
<script setup>
</script>