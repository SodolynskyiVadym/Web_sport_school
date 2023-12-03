<template>
  <section>
    <div class="services-section">
      <div class="service-card" v-for="(service, index) in services" :key="index">
        <div class="service-image">
          <img :src="require(`@/assets/${service.image}`)" :alt="service.alt">
        </div>
        <div class="service-info">
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <a :href="service.link" class="service-button">Learn More</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.services-section {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.service-card {
  flex: 0 0 calc(30% - 20px); /* Зміна ширини блоків */
  max-width: 400px; /* Максимальна ширина блоків */
  height: 550px; /* Фіксована висота блоків */
  box-shadow: rgba(0, 0, 0, 0.76) 0px 20px 70px;
  border-radius: 15px;
  /* Інші параметри */
}

.service-card:hover {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  background-color: #ddd;
}

.service-image {
  width: 100%;
  height: auto;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
}

.service-image img {
  width: 100%;
  height: auto; /* Змінити фіксовану висоту на auto */
  object-fit: cover;
}

.service-info {
  padding: 20px;
}

h3 {
  margin-bottom: 10px;
  font-size: 1.6rem;
  color: #333;
}

p {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.4;
}

.service-button {
  padding: 8px 16px;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;
  display: block;
  width: fit-content; /* Кнопка розширюється відповідно до змісту */
  margin: 10px auto; /* Відступи на кожній стороні кнопки */
  }


.service-button:hover {
  background-color: #252222;
}
</style>

<script>
export default {
  data() {
    return {
      services: [
        {
          image: 'schedule.png',
          alt: 'Service 1',
          title: 'Schedule',
          description: 'Here you can watch our schedule',
          link: '/schedule'
        },
        {
          image: 'trainers.png',
          alt: 'Service 2',
          title: 'Coaches team',
          description: 'Here you can watch our team',
          link: '/coaches'
        },
        {
          image: 'groups.png',
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
