<template>
  <div>
    <movie-detail-skeleton v-show="loading"> </movie-detail-skeleton>
    <movie-detail v-show="!loading" @loading="loading = $event"> </movie-detail>
  </div>
</template>
<script>
import movieDetail from "./movieDetail.vue";
import movieDetailSkeleton from "./movieDetailSkeleton.vue";
export default {
  components: {
    movieDetail,
    movieDetailSkeleton,
  },
  data() {
    return {
      loading: true,
    };
  },
};
</script>
