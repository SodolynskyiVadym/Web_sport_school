<template>
  <div class="main-page">
    <Main />
    <Sport />
    <Prefernces />
    <About />
    <Service />
    <Footer />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Main from '@/components/MainPage/MainPage.vue';
import Sport from "@/components/MainPage/SportInfoPage.vue";
import Prefernces from "@/components/MainPage/PreferncesPage.vue";
import About from "@/components/MainPage/AboutPage.vue";
import Service from "@/components/MainPage/ServicePage.vue";
import Footer from "@/components/MainPage/FooterPage.vue";




export default defineComponent({
  name: 'HomePage',
  components:  {Main, Sport, Prefernces, About, Service, Footer}
})
</script>

<style>

</style>