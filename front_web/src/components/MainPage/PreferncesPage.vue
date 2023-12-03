<template>
<div class="preferences-wrapper">
<section class="preferences" id="preferences">
  <div class="textBoxing">
    <h1>Why people choose us?</h1>
  </div>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
<div class="item-hints">
  <div class="hint" data-position="4">
    <span class="hint-radius"></span>
    <span class="hint-dot"></span>
    <div class="hint-content do--split-children">
      <span class="fas fa-map-marker-alt"> Prime Location</span>
      <p>Nestled in the heart of City, our school offers unrivaled accessibility, ensuring a hassle-free journey for all.</p>
    </div>
  </div>
  <div class="hint" data-position="4">
    <span class="hint-radius"></span>
    <span class="hint-dot"></span>
    <div class="hint-content do--split-children">
      <span class="fas fa-users"> Qualified Coaches</span>
      <p>Our school is proud to boast a team of highly qualified coaches, each bringing a wealth of experience and expertise. </p>
    </div>
  </div>
  <div class="hint" data-position="4">
    <span class="hint-radius"></span>
    <span class="hint-dot"></span>
    <div class="hint-content do--split-children">
      <span class="fas fa-tag"> Affordable Pricing</span>
      <p>Our commitment to affordable pricing ensures that quality coaching and development opportunities are within reach.</p>
    </div>
  </div>
</div>
</section>
</div>
</template>


<style >
.preferences{
  height: auto;
  padding: 20px;
  margin: 10px;
  align-items: center;
}
.preferences-wrapper {
  height: 600px;
  overflow: hidden;
}
.preferences {
  padding: 20px;
  margin: 10px;
  align-items: center;
}
.textBoxing {
  text-align: center;
  line-height: 2em;
  font-weight: 800;
  font-size: 2.3rem;
  margin: 120px auto;
  padding: 20px;
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-47%);
  text-shadow: rgba(0, 0, 0, 0.76) 0px 20px 70px;
}
span{
  font-family: iran_sans_medi,sans-serif;

}
.item-hints {
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center ;
  width: 150px;
  height: auto;

}
.item-hints .hint {
  width: 60px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-hints .hint::before {
  content: "\f128";
  font-family: "Font Awesome 5 Free";
  font-weight: 800;
  z-index: 1;
  font-size: 35px;
  color: black;
}
.item-hints .hint::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  width: 2px;
  height: 2px;
  z-index: 1;
  -webkit-box-shadow: 0 0 50px 30px rgba(0, 0, 0, 0.76);
  box-shadow: 0 0 50px 30px rgba(0, 0, 0, 0.76);
  -webkit-animation: home_hero_item_hints_glow 2s
  cubic-bezier(0.25, 0.1, 0.2, 1) infinite;
  animation: home_hero_item_hints_glow 2s cubic-bezier(0.25, 0.1, 0.2, 1)
  infinite;
  -webkit-transition: opacity 0.5s ease;
  transition: opacity 0.5s ease;
}
@-webkit-keyframes home_hero_item_hints_glow {
  0% {
    -webkit-box-shadow: 0 0 30px 5px rgba(0, 0, 0, 0.76);
    box-shadow: 0 0 30px 5px rgba(0, 0, 0, 0.76);
  }
  70% {
    -webkit-box-shadow: 0 0 70px 50px rgba(72, 170, 72, 0);
    box-shadow: 0 0 70px 50px rgba(72, 170, 72, 0);
  }
  100% {
    -webkit-box-shadow: 0 0 0 50px rgba(0, 0, 0, 0.76);
    box-shadow: 0 0 0 50px rgba(0, 0, 0, 0.76);
  }
}

@keyframes home_hero_item_hints_glow {
  0% {
    -webkit-box-shadow: 0 0 30px 5px rgba(0, 0, 0, 0.76);
    box-shadow: 0 0 30px 5px rgba(0, 0, 0, 0.76);
  }
  70% {
    -webkit-box-shadow: 0 0 70px 50px rgba(72, 170, 72, 0);
    box-shadow: 0 0 70px 50px rgba(72, 170, 72, 0);
  }
  100% {
    -webkit-box-shadow: 0 0 0 50px rgba(72, 170, 72, 0);
    box-shadow: 0 0 0 50px rgba(72, 170, 72, 0);
  }
}
.item-hints .hint-dot {
  z-index: 3;
  border: 1px solid black;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: block;
  -webkit-transform: translate(-0%, -0%) scale(0.95);
  transform: translate(-0%, -0%) scale(0.95);
  -webkit-animation: home_hero_item_hints_border 2s linear infinite;
  animation: home_hero_item_hints_border 2s linear infinite;
  position: absolute;
}
@-webkit-keyframes home_hero_item_hints_border {
  0%,
  100% {
    border-color: black;
    -webkit-transform: translate(-50%, -50%) scale(0.95);
    transform: translate(-0%, -0%) scale(0.95);
  }
  50% {
    border-color: black;
    -webkit-transform: translate(-50%, -50%) scale(1);
    transform: translate(-0%, -0%) scale(1);
  }
}
@keyframes home_hero_item_hints_border {
  0%,
  100% {
    border-color: black;
    -webkit-transform: translate(-50%, -50%) scale(0.95);
    transform: translate(-0%, -0%) scale(0.95);
  }
  50% {
    border-color: black;
    -webkit-transform: translate(-50%, -50%) scale(1);
    transform: translate(-0%, -0%) scale(1);
  }
}
.item-hints .hint-radius {
  background-color: darkgray;
  border-radius: 50%;
  width: 250px;
  height: 250px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -125px 0 0 -125px;
  opacity: 0;
  visibility: hidden;
  -webkit-transform: scale(0);
  transform: scale(0);
  -webkit-transition-property: background-color, opacity, visibility,
  -webkit-transform;
  transition-property: background-color, opacity, visibility, -webkit-transform;
  transition-property: background-color, opacity, visibility, transform;
  transition-property: background-color, opacity, visibility, transform,
  -webkit-transform;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  -webkit-transition-timing-function: ease, ease, ease,
  cubic-bezier(0.5, 0, 0, 1);
  transition-timing-function: ease, ease, ease, cubic-bezier(0.5, 0, 0, 1);
}
.item-hints .hint:hover .hint-radius {
  opacity: 1;
  visibility: visible;
  -webkit-transform: scale(1);
  transform: scale(1);
}

.item-hints .hint-content {
  width: 300px;
  position: absolute;
  z-index: 5;
  padding: 12px 0;
  opacity: 0;
  visibility: hidden;
  -webkit-transition: opacity 0.7s ease, visibility 0.7s ease;
  transition: opacity 0.7s ease, visibility 0.7s ease;
  pointer-events: none;
  color: black;
}
.item-hints .hint:hover .hint-content {
  color: black;
  width: 300px;
  position: absolute;
  z-index: 5;
  padding: 12px 0;
  opacity: 1;
  visibility: visible !important;
  -webkit-transition: opacity 0.7s ease, visibility 0.7s ease;
  transition: opacity 0.7s ease, visibility 0.7s ease;
  pointer-events: none;
  color: black;
;
}
.item-hints .hint-content::before {
  width: 0px;
  bottom: 0;
  left: 0;
  content: "";
  background-color: black;
  height: 1px;
  position: absolute;
  transition: width 0.4s;
}
.item-hints .hint:hover .hint-content::before {
  width: 180px;
  transition: width 0.4s;
}
.item-hints .hint-content::after {
  -webkit-transform-origin: 0 50%;
  transform-origin: 0 50%;
  -webkit-transform: rotate(-225deg);
  transform: rotate(-225deg);
  bottom: 0;
  left: 0;
  width: 80px;
  content: "";
  background-color: black;
  height: 1px;
  position: absolute;
  opacity: 1;
  -webkit-transition: opacity 0.5s ease;
  transition: opacity 0.5s ease;
  transition-delay: 0s;
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
}
.item-hints .hint:hover .hint-content::after {
  opacity: 1;
  visibility: visible;
}
.item-hints .hint[data-position="4"] .hint-content {
  bottom: 100px;
  left: 50%;
  margin-left: 56px;
}
.item-hints .hint:nth-child(1) {
  left: 405px;
}
.item-hints .hint:nth-child(2) {
  left: 655px;

}

.item-hints .hint:nth-child(3) {
  left: 905px;
}


</style>
<script setup>
</script>