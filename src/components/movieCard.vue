<template>
  <div
    class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300"
  >
    <div>
      <img
        @load="onImgLoad"
        class="rounded-t-lg bg-gray-600 h-128"
        :src="'https://image.tmdb.org/t/p/w1280' + path"
        alt=""
      />
    </div>
    <div class="p-5 flex flex-col card-body">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ title }}
      </h5>

      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {{
          description.length > 150 ? description.substring(0, 150) : description
        }}
        <span class="-ml-1 text-xl text-blue-400">...</span>
      </p>
      <button
        class="inline-flex justify-center items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-auto"
      >
        <router-link class="" tag="a" :to="'/movie-detail/' + movieId">
          Read More
        </router-link>
        <!-- <button  @click="sendDetails">Read more</button> -->
        <svg
          aria-hidden="true"
          class="ml-2 -mr-1 w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "MovieCard",
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quaerat praesentium. Pariatur, eaque possimus fuga dignissimos, assumenda officiis dolorem incidunt voluptate dolore odit ducimus ad obcaecati laudantium et nisi ipsa?",
    },
    img: {
      type: String,
      default: "",
    },
    path: {
      type: String,
      default: "/rugyJdeoJm7cSJL1q4jBpTNbxyU.jpg",
    },
    movieId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      imgLoading: true,
    };
  },
  methods: {
    // setImg() {
    //   return "https://image.tmdb.org/t/p/w1280" + this.path;
    // },
    onImgLoad() {
      console.log("img yüklendi");
      this.imgLoading = false;
      this.$emit("isImgLoading", true);
    },
  },
  created() {
    if (this.img == "https://image.tmdb.org/t/p/w1280/null") {
      // const copiedImg = this.img;
      return {
        img: "https://protkd.com/wp-content/uploads/2017/04/default-image.jpg",
      };
    }
  },
};
</script>
<style scoped>
.card-body {
  min-height: 300px;
}
</style>
