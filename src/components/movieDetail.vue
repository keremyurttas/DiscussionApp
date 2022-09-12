<template>
  <div class="flex items-center justify-between flex-col mt-10 absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 h-[300px]">
    <div
      class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg bg-red-500"
        :src="`https://image.tmdb.org/t/p/w1280` + details.poster_path"
        alt=""
      />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ details.title }}
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ details.overview }}
        </p>
        <!-- <span>Genres : <strong v-for="genre in details.genres">{{genre.name}}</strong></span> -->
      </div>
    </div>
    <div
      class="block mt-4 p-6 max-w-xl bg-blue-100 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 md:min-w-xl"
    >
      <span
        class="mb-2 text-2xl font-light tracking-tight text-gray-900 dark:text-white flex justify-between m2"
        ><strong class="mr-5"> {{ firstGenre }}</strong
        ><strong>{{ secondGenre }}</strong></span
      >
      <p
        class="font-normal text-gray-700 dark:text-gray-400 flex justify-between"
      >
        <span class="mr-16">IMDB Rate : {{ details.vote_average }}</span>
        <span>{{ details.release_date }}</span>
      </p>
    </div>

    <!-- <h2 class="mb-8">
      <strong>{{ details.title }}</strong> details
    </h2>
    <span class="w-1/2">{{ details.overview }}</span> -->

    <router-link
      class="mt-8 border-solid border-2 p-2 bg-blue-300 rounded-lg"
      tag="button"
      to="/"
    >
      Back to main Page
    </router-link>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      details: {},
      firstGenre: "",
      secondGenre: "",
    };
  },
  methods: {
    async fetchDetails(id) {
      const data = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=04c35731a5ee918f014970082a0088b1&language=en-US`
      );
      const results = await data.data;
      
      return results;
      
    },
    emitf(){
      this.$emit("loading",false)
      
    }
  },

  async created() {
    console.log(await this.fetchDetails(this.$route.params.id));
    this.details = await this.fetchDetails(this.$route.params.id);
    this.emitf()
    if (this.details.overview === "") {
      this.details.overview =
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita ea mollitia praesentium atque, labore facilis doloremque in voluptas fugiat alias enim sunt obcaecati amet facere ipsam voluptates quod porro corporis!";
    }
    if (this.details.poster_path === null || this.details.poster_path === undefined) {
      this.details.poster_path = "/wwemzKWzjKYJFfCeiB57q3r4Bcm.png";
    }
    if (this.details.vote_average === 0) {
      this.details.vote_average = "No data";
    } else {
      this.details.vote_average = Math.round(this.details.vote_average * 10) / 10;
    }
    if (this.details.genres.length !== 0) {
      this.firstGenre = this.details.genres[0].name;
    } else {
      this.firstGenre = "Unknown";
    }
    if (this.details.genres.length > 1) {
      this.secondGenre = this.details.genres[1].name;
    }

    

    // const data = await axios.get(this.searchURL);
    // const results = await data.data.results;
    // this.selectedMovie = results[0]
    // if(this.selectedMovie.overview===''){
    //     this.selectedMovie.overview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, magnam ullam. Nobis deserunt dicta dolorem? Corporis ex deleniti incidunt officiis ipsa, fugiat fuga excepturi mollitia obcaecati tempore nobis nemo ipsam?"
    // }
  },
};
</script>
