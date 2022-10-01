<template>
  <div class="flex items-center flex-col w-screen">
    <div
      class="p-4 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 w-3/4 h-60"
    >
      <div class="mb-4 text-center text-md">The Discussion</div>
      <div>
        <div class="min-h-min text-xl mb-2 text break-words">
          {{ discussion.subject }}
        </div>
        <div class="flex items-center space-x-4 flex-col border-t-2 mt-8">
          <p
            class="text-sm font-medium text-gray-900 truncate dark:text-white mt-2"
          >
            {{ discussion.owner }}
          </p>

          <div
            @click="showMore = !showMore"
            class="text-md text-gray-500 dark:text-gray-400"
          >
            {{ discussion.createdTime }}
          </div>
        </div>
      </div>
    </div>
    <div class="flow-root">
      <ul
        role="list"
        class="divide-y divide-gray-200 dark:divide-gray-700 mt-6"
      >
        <comment-component
          @fetchData="fetchData(discussion.discussionKey)"
          @deleteComment="deleteComment($event)"
          :key="index"
          v-for="(comment, index) in sortComments"
          :data="comment"
        ></comment-component>
      </ul>
    </div>

    <add-comment-component
      :discussionId="discussion.discussionKey"
      @newComment="addNewComment($event)"
      @fetchData="fetchData(discussion.discussionKey)"
    ></add-comment-component>
  </div>
</template>
<script>
import commentComponent from "./commentComponent";
import addCommentComponent from "./addCommentComponent.vue";
import axios from "axios";

export default {
  components: {
    commentComponent,
    addCommentComponent,
  },
  computed: {
    sortComments() {
     
      let sortedComments = this.comments;
      
      sortedComments.forEach((comment) => {
        if (comment.vote == undefined) {
          comment.voteCount = 0;
        } else {
          comment.voteCount = Object.keys(comment.vote).length;
        }
        console.log(sortedComments);
      });
      sortedComments = sortedComments.sort((a, b) =>
        a.voteCount < b.voteCount ? 1 : -1
      );
      // sortedComments = sortedComments.sort((a,b)=>
      // if(Object.values(a.vote)==undefined || Object.values(a.vote)==undefined){

      //   return
      // }
      // Object.values(a.vote).length <
      //   Object.values(b.vote).length ? 1 : -1
      // )
      return sortedComments;
    },
  },

  data() {
    return {
      discussion: {},
      comments: [],
    };
  },
  methods: {
    async fetchData(key) {
      await axios
        .get(
          `https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com/discussions/${key}.json`
        )
        .then((resp) => {
          this.discussion.subject = resp.data.subject;
          this.discussion.createdTime = resp.data.createdTime;
          this.discussion.owner = resp.data.owner;
          this.comments = [];
          for (let key in resp.data.comments) {
            (resp.data.comments[key].commentKey = key),
              (resp.data.comments[key].discussionKey = this.$route.params.id),
              this.comments.push(resp.data.comments[key]);
          }
          this.discussion.discussionKey = this.$route.params.id;
          for (let key in this.comments.vote) {
            key;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addNewComment(comment){
      this.comments.push(comment)
    },
    deleteComment(deleteKey) {
      Object.values(this.comments).forEach((item) => {
        if (deleteKey == item.commentKey) {
          const index = this.comments.indexOf(item);
          if (index > -1) {
            this.comments.splice(index, 1);
          }
        }
      });

      // if (index > -1) {
      //   // only splice array when item is found
      //   this.comments.splice(index, 1); // 2nd parameter means remove one item only
      // }
    },
  },

  created() {
    this.fetchData(this.$route.params.id);
  },
};
</script>
