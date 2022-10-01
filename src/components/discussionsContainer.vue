<template>
  <div class="h-min flex flex-col">
    <button
      @click="isCreatePopupShowing = true"
      class="bg-gray-500 text-white p-4 m-auto"
    >
      Create New Discussion
    </button>
    <div class="w-full">
      <div
        class="bg-gray-500 text-white flex justify-between px-20 mt-10 py-2 h-20"
      >
        <div class="flex w-full text-lg items-center">
          Search a discussion :
          <input
            class="rounded-md w-10/12 h-full px-2 text-gray-500 bg-gray-100 ml-5"
            placeholder="Topic of the discussion"
            v-model="search"
            type="text"
          />
        </div>
      </div>
    </div>

    <form action="" class="mt-4 ml-8 border-gray-500 border w-48 p-1">
      Sort by:
      <select v-model="selected" name="cars" id="cars">
        <option value="alphabetically">alphabetically</option>
        <option value="interaction">interaction</option>
        <option value="owner">owner</option>
        <option value="newest">newest</option>
      </select>
    </form>

    <create-discussion-popup
      v-if="isCreatePopupShowing"
      @newDiscussion="pushNewDiscussion($event)"
      
      @closePopup="isCreatePopupShowing = $event"
    ></create-discussion-popup>

    <div class="flex justify-center flex-wrap items-center space-y-6">
      <discussion-sum-component
        :discussionInfo="discussion"
        :key="index"
        v-for="(discussion, index) in searchFunction"
      ></discussion-sum-component>
      <!-- <div :key="i"
        v-for="(discussion,i) in searchFunction">
        {{discussion}}
        
      </div> -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
import createDiscussionPopup from "./createDiscussionPopup";
import discussionSumComponent from "./discussionSumComponent";
import CreateDiscussionPopup from "./createDiscussionPopup.vue";

export default {
  components: {
    createDiscussionPopup,
    discussionSumComponent,
    CreateDiscussionPopup,
  },

  data() {
    return {
      allDiscussions: [],
      sortedFinal: [],
      isCreatePopupShowing: false,
      selected: "interaction",
      search: "",
    };
  },
  computed: {
    sortedArrayFunc() {
      let sortedDiscussions = this.allDiscussions;

      if (this.selected == "alphabetically") {
        sortedDiscussions = sortedDiscussions.sort((a, b) => {
          let subjectA = a.subject.toLowerCase();
          let subjectB = b.subject.toLowerCase();
          return subjectA < subjectB ? -1 : subjectA > subjectB ? 1 : 0;
        });
      } else if (this.selected == "interaction") {
        sortedDiscussions.sort((a, b) =>
          a.commentsCount < b.commentsCount ? 1 : -1
        );
      } else if (this.selected == "newest") {
        sortedDiscussions.sort((a, b) => {
          let fa = a.createdTime,
            fb = b.createdTime;
          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else if (this.selected == "owner") {
        let filteredArray = [];
        sortedDiscussions.forEach((discussion) => {
          if (discussion.owner == localStorage.getItem("activeUser")) {
            filteredArray.push(discussion);
          }
        });
        sortedDiscussions = filteredArray;

        // sortedDiscussions.filter((discussion)=>{
        //   let filteredDiscussion=[];
        //   if(discussion.owner==localStorage.getItem('activeUser')){
        //     filteredDiscussion.push(discussion)
        //   }
        //   sortedDiscussions=filteredDiscussion;
        // console.log(sortedDiscussions)
        // })
      }

      return sortedDiscussions;
    },

    searchFunction() {
      let sortedDiscussions = this.sortedArrayFunc;
      sortedDiscussions = sortedDiscussions.filter((discussion) =>
        discussion.subject.toLowerCase().includes(this.search.toLowerCase())
      );
      console.log(sortedDiscussions);
      return sortedDiscussions;
    },
  },

  methods: {
    async fetchDiscussions() {
      this.allDiscussions = [];
      await axios
        .get(
          "https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com/discussions.json"
        )
        .then((resp) => {
          let data = resp.data;
          for (let key in data) {
            data[key].discussionKey = key;
            let commentsCount;
            console.log(data[key].comments)
            data[key].comments == undefined
              ? (commentsCount = 0)
              : (commentsCount = Object.keys(data[key].comments).length);

            data[key].commentsCount = commentsCount;

            console.log(data[key]);
            // data[key].commentsCount = 0;
            // for (let comment in data[key].comments) {
            //   comment;
            //   data[key].commentsCount++;
            // }

            this.allDiscussions.push(data[key]);
          }
        });
    },
    pushNewDiscussion(newDiscussion){
      this.allDiscussions.push(newDiscussion)
    }
  },

  created() {
    this.fetchDiscussions();
  },
};
</script>
