<template>
  <div class="wrapper p-20">
    <div>
      <button
        @click="toTop"
        class="text-xl p-5 bg-black text-white rounded-xl fixed bottom-10 right-10"
      >
        <i class="fa-solid fa-arrow-up"></i>
      </button>
      <div class="flex items-center mb-12">
        <button
          @click="changePage(-1)"
          class="mr-10 bg-gray-800 text-white p-3 rounded-lg"
        >
          PREVIOUS
        </button>
        <input
          v-model="search"
          type="text"
          placeholder="search film"
          class="border border-danger p-2 rounded-lg"
        />
        <button
          @click="changePage(+1)"
          class="ml-10 bg-gray-800 text-white p-3 rounded-lg"
        >
          NEXT
        </button>
      </div>
    </div>

    <transition-group name="fade">
      <div
        class="cards px-5 flex flex-wrap justify-center gap-x-8 gap-y-8"
        v-show="!loading"
        :key="1"
      >
        <transition-group
          class="cards px-5 flex flex-wrap justify-center gap-x-8 gap-y-8"
          name="fade"
        >
          <movie-card
            v-for="movie in fixedMovies"
            :key="movie.id"
            :title="movie.title"
            :description="movie.overview"
            :img="`https://image.tmdb.org/t/p/w1280/`"
            :path="movie.poster_path"
            :movieId="movie.id"
            @isImgLoading="handleImgLoading"
          />
        </transition-group>
      </div>
      <div
        class="cards px-5 flex flex-wrap justify-center gap-x-8 gap-y-8"
        v-show="loading"
        :key="2"
      >
        <movie-card-skeleton
          v-for="movie in fixedMovies"
          img="https://img.freepik.com/premium-vector/system-software-update-upgrade-concept-loading-process-screen-vector-illustration_175838-2182.jpg?w=2000"
          :title="loading"
          :key="movie.id"
        />
      </div>
      <div
        class="cards px-5 flex flex-wrap justify-center gap-x-8 gap-y-8"
        v-show="isDataAdding"
        :key="2"
      >
        <movie-card-skeleton
          v-for="movie in fixedMovies"
          img="https://img.freepik.com/premium-vector/system-software-update-upgrade-concept-loading-process-screen-vector-illustration_175838-2182.jpg?w=2000"
          :title="loading"
          :key="movie.id"
        />
      </div>
    </transition-group>
  </div>
</template>
<script>
import movieCard from "./components/movieCard.vue";
import axios from "axios";
import MovieCard from "./components/movieCard.vue";
import movieCardSkeleton from "./components/movieCardSkeleton.vue";
import MovieCardSkeleton from "./components/movieCardSkeleton.vue";

export default {
  name: "App",
  components: {
    movieCard,
    MovieCard,
    movieCardSkeleton,
    MovieCardSkeleton,
  },
  data() {
    return {
      output: "",
      search: "",
      movies: [],
      pageNumber: 1,
      pageURL:
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=",
      searchURL:
        "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=",
      height: 2000,
      multiplier: 1500,
      coefficient: 0,
      loading: true,
      isDataAdding: false,
    };
  },
  watch: {
    search: "searchMovie",
  },
  methods: {
    async changePage(num) {
      if (this.pageNumber == 1 && num == +1) {
        this.pageNumber++;
        this.fetchData(this.pageURL + this.pageNumber.toString());
      } else if (this.pageNumber >= 2) {
        this.pageNumber += num;
        this.fetchData(this.pageURL + this.pageNumber.toString());
      }
    },
    handleImgLoading(isLoading) {
      console.log(isLoading);
      this.loading = !isLoading;
    },
    async searchMovie(query) {
      this.fetchData(this.searchURL + query);
      if (query == "") {
        this.fetchData(this.pageURL + this.pageNumber.toString());
      }
    },

    async fetchData(url) {
      this.loading = true;
      const data = await axios.get(url);
      const results = await data.data.results;
      this.movies = results;

      // this.loading = false;

      console.log(this.movies);
    },
    async addData(url) {
      this.isDataAdding = true;
      const data = await axios.get(url);
      const results = await data.data.results;
      this.movies.push(...results);
      this.isDataAdding = false;

      // this.loading = false;
    },
    cleanNullFields(obj) {
      for (var propName in obj) {
        if (
          obj[propName] === null ||
          obj[propName] === undefined ||
          obj[propName] === ""
        ) {
          delete obj[propName];
        }
      }
      return obj;
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    onScroll() {
      if (
        window.innerHeight + window.scrollY + 100 >=
        document.body.offsetHeight
      ) {
        this.pageNumber++;
        this.addData(this.pageURL + this.pageNumber.toString());
      }
    },
    changeLoading() {
      this.loading = false;
    },
  },
  computed: {
    fixedMovies() {
      const fixedMovies = this.movies.map((m) => this.cleanNullFields(m));
      console.log(fixedMovies);
      return fixedMovies;
    },
  },

  async created() {
    this.fetchData(this.pageURL + this.pageNumber.toString());
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
};
</script>

<style>
.fade-leave {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 500ms;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 2s;
}

/* ----------------------------------------------
 * Generated by Animista on 2022-9-5 22:26:31
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-right
 * ----------------------------------------
 */
@keyframes slide-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100px);
  }
}
/* ----------------------------------------------
 * Generated by Animista on 2022-9-5 22:28:41
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-left
 * ----------------------------------------
 */
@keyframes slide-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100px);
  }
}
</style>
