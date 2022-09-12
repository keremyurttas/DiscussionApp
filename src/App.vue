<template>
  <div id="app">
    <!-- <span class="ml-12">{{ search }}</span> -->

    <transition name="anim"  >
      <router-view>
      
    </router-view>
    </transition>

    <!-- <movie-card
          v-for="movie in movies"
          
          :title="movie.title"
          :description="movie.overview"
          :img="`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`"
        /> -->
    <!-- <movieCard
          v-for="movie in movies"
          :key="movie.id"
          :title="movie.title"
          :description="movie.overview"
          
          :img="`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`"
        /> -->

    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <button @click="getFilms">Filmleri cek</button> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// const APIURL ="
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1
// ";
// const IMGPATH = "
// https://image.tmdb.org/t/p/w1280/
// ";
// const SEARCHAPI ="

// ";

export default {
  name: "App",
  //   components: {
  //     movieCard,
  //   },
  //   data() {
  //     return {
  //       output:"",
  //       search: "",
  //       movies: [],
  //       pageNumber: 1,
  //       pageURL:
  //         "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=",

  //      searchURL:
  //        "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=",
  //       height:2000,
  //       multiplier:1500,
  //       coefficient:0,

  //     };
  //   },
  //   watch: {
  //     search: "searchMovie",
  //   },
  //   methods: {
  //     async nextPage() {
  //       this.pageNumber++;
  //       this.fetchData(this.pageURL + this.pageNumber.toString());

  //     },
  //     async searchMovie(query) {
  //       this.fetchData(this.searchURL + query);

  //     },

  //     async fetchData(url){
  //       const data = await axios.get(url);
  //       const results = await data.data.results;
  //       console.log(results)
  //       this.movies = results;
  //     },

  //     async addData(url){
  //       const ls=this;
  //       const data = await axios.get(url);
  //       const results = await data.data.results;
  //       results.forEach(result => {
  //         ls.movies.push(result);
  //       });

  //     },
  //      onScroll(){

  //      if ((window.innerHeight + window.scrollY) + 100 >= document.body.offsetHeight) {
  //          this.pageNumber++;
  //          this.addData(this.pageURL+this.pageNumber.toString())
  //      }
  // }
  //       },

  //   async created() {
  //     this.fetchData(this.pageURL+this.pageNumber.toString())

  //   },
  //   mounted() {
  //     window.addEventListener("scroll",this.onScroll);

  // }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.anim-leave {
  opacity: 1;
}
.anim-leave-to {
  opacity: 0;
}
.anim-leave-active {
  transition: opacity 500ms;
}
.anim-enter {
  opacity: 0;
}
.anim-enter-to {
  opacity: 1;
}
.anim-enter-active {
  transition: opacity 1s;
  
}


</style>
