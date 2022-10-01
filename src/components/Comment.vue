<template>
  <div class="w-screen flex justify-center">
    <li class="py-3 sm:py-4 w-2/3">
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <img
            class="w-8 h-8 rounded-full"
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Neil image"
          />
        </div>
        <div class="flex-1 min-w-0 w-64">
          <p
            class="text-sm font-medium text-gray-900 truncate dark:text-white mt-2"
          >
            {{ data.owner }}
          </p>
          <transition name="moreComment">
            <div
              v-if="!showMore"
              @click="showMore = !showMore"
              class="text-sm text-gray-500 truncate dark:text-gray-400"
            >
              {{ data.text }}
            </div>
            <div
              v-else
              @click="showMore = !showMore"
              class="text-sm text-gray-500 dark:text-gray-400"
            >
              {{ data.text }}
            </div>
          </transition>
        </div>
        <div class="flex flex-col items-end mr-8">
          <button
            class="p-2 rounded border-solid text-center bg-gray-200 w-8"
            @click="deleteComment"
          >
            x
          </button>
          <span class="text-xs mt-2">
            {{ data.date }}
          </span>
        </div>
        <div class="flex flex-col h-16 justify-between items-center">
          <button @click="vote">
            <img
              class="w-6 h-6"
              :class="this.checkIsUserVoted ? 'bg-green-500  ' : 'bg-white'"
              src="../assets/up-arrow-svgrepo-com (1).svg"
              alt=""
            />
          </button>
          <div v-if="!isVoteLoading">{{ this.getVoteLength }}</div>
          <div v-else class="w-4 h-4">
            <img src="../media/loader-icon.svg" alt="" />
          </div>
        </div>
      </div>
    </li>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      showMore: false,
      currentUser: localStorage.getItem("activeUser"),
      isVoteLoading: false,
      localData: {},
    };
  },

  props: ["data"],
  computed: {
    getVoteLength() {
      if (this.data.vote === undefined) return 0;
      console.log(this.data.vote);
      console.log(Object.keys(this.data.vote));
      return Object.keys(this.data.vote).length;
    },
    checkIsUserVoted() {
      let emails = [];
      for (let key in this.data.vote) {
        emails.push(this.data.vote[key].vote);
      }

      return emails.includes(this.currentUser);
    },
  },
  methods: {
    async deleteComment() {
      if (this.data.owner === this.currentUser) {
        await axios.delete(
          `https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com/discussions/${this.data.discussionKey}/comments/${this.data.commentKey}.json`
        );
        this.$emit("deleteComment", this.data.commentKey);
      } else {
        alert("You can't delete different account's comment");
      }
    },
    async vote() {
      console.log(this.data);
      if (this.checkIsUserVoted) {
        this.isVoteLoading = true;

        for (let key in this.data.vote) {
          const activeKey = this.data.vote[key];
          if (activeKey.vote == this.currentUser) {
            await axios.delete(
              `https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com/discussions/${this.data.discussionKey}/comments/${this.data.commentKey}/vote/${key}.json`
            );

            this.$emit("fetchData");
            // this.$eventbus.emit('deleteVote',voteKey)
            this.isVoteLoading = false;
          }
        }
      } else {
        this.isVoteLoading = true;
        await axios
          .post(
            `https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com/discussions/${this.data.discussionKey}/comments/${this.data.commentKey}/vote.json`,
            { vote: this.currentUser }
          )
          .then((resp) => {
            // console.log(resp);
            //  this.localData.vote+={vote:this.currentUser}
            // Object.assign(this.localData.vote,["vote":{vote:this.currentUser])
            // this.localData.vote.push({vote:{vote:this.currentUser}})
            console.log(this.localData);
            this.$emit("fetchData");
            this.isVoteLoading = false;
            console.log(resp);
          });
      }
    },
  },
  created() {
    this.localData = this.data;
    console.log(this.localData);
  },
};
</script>
<style></style>
