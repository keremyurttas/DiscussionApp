<template>
  <div>
    <header-component class=""></header-component>
    <router-view class="pt-20"> </router-view>
  </div>
</template>
<script>
import { api } from "./api/api";
import headerComponent from "./components/headerComponent.vue";
import { eventBus } from "./main";

export default {
  components: {
    headerComponent,
  },
  data() {
    return {
      allDiscussions: [],
      activeDiscussion: {},
    };
  },
  methods: {
    async testDsc() {
      let allDcs = [];
      const [error, data] = await api({ method: "get", URL: "/.json" });
      allDcs = await this.filterFirebaseKeys(data);
      console.log(allDcs);
      this.allDiscussions = await allDcs.map((dc) => ({
        ...dc,

        comments: this.filterFirebaseKeys(dc.comments),
      }));
      this.allDiscussions.forEach((dsc) => {
        dsc.comments.forEach((comment) => {
          comment.vote = this.filterFirebaseKeys(comment.vote);
        });
      });

      localStorage.setItem(
        "allDiscussions",
        JSON.stringify(this.allDiscussions)
      );
      console.log("aa", this.allDiscussions);
      // this.emitData()
      if (error) return; // !!!!
    },
    filterFirebaseKeys(data) {
      let arr = [];
      for (let key in data) {
        console.log(data[key]);
        data[key].key = key;
        arr.push(data[key]);
      }
      return arr;
    },
    handleUpdateDiscussionPage() {
      window.localStorage.setItem(
        "allDiscussions",
        JSON.stringify(this.allDiscussions)
      );
      eventBus.$emit("updateDiscussionPage");
      console.log("updated diss page")
    },
    handleUpdateDiscussionsPage() {
      window.localStorage.setItem(
        "allDiscussions",
        JSON.stringify(this.allDiscussions)
      );
      eventBus.$emit("updateDiscussionsPage");
    },
    // emitData(){

    //   eventBus.$emit("data", this.allDiscussions);
    // }
  },
  created() {
    this.testDsc();
    eventBus.$on("newComment", (comment) => {
     
      const index = this.allDiscussions.findIndex(
        (d) => d.key === comment.discussionKey
      );
      this.allDiscussions[index].comments.push(comment);
      this.handleUpdateDiscussionPage();
    });
    eventBus.$on("newDiscussion", (newDiscussion) => {
      newDiscussion.comments = [];
      this.allDiscussions.push(newDiscussion);
     this.handleUpdateDiscussionsPage()
    });

    eventBus.$on("deleteComment", (comment) => {
      const index = this.allDiscussions.findIndex(
        (d) => d.key === comment.discussionKey
      );

      const commentIndex = this.allDiscussions[index].comments.findIndex(
        (c) => c.key === comment.key
      );

      this.allDiscussions[index].comments.splice(commentIndex, 1);

      this.handleUpdateDiscussionPage();
    });
    eventBus.$on("newVote", (vote) => {
     
      console.log("vote executed", vote)
      let index = this.allDiscussions.findIndex(
        (d) => d.key === vote.discussionKey
      );
      console.log(this.allDiscussions[index]);
      let commentIndex = this.allDiscussions[index].comments.findIndex(
        (c) => c.key === vote.commentKey
      );
      console.log("the comment that will vote",this.allDiscussions[index].comments[commentIndex]);

      console.log("indexes are ",index,commentIndex)
      this.allDiscussions[index].comments[commentIndex].vote.push({...vote});
      // this.handleUpdateDiscussionPage();
    });





    eventBus.$on("deleteVote",(vote)=>{
      console.log("vote delete executed")
      const index = this.allDiscussions.findIndex(
        (d) => d.key === vote.discussionKey
      );
      console.log(this.allDiscussions[index]);
      const commentIndex = this.allDiscussions[index].comments.findIndex(
        (c) => c.key === vote.commentKey
      );
      const voteIndex = this.allDiscussions[index].comments[commentIndex].vote.findIndex((v)=>v.vote===vote.vote)
      console.log(this.allDiscussions[index].comments[commentIndex].vote[voteIndex])
      this.allDiscussions[index].comments[commentIndex].vote.splice(voteIndex,1)
      console.log(this.allDiscussions[index].comments[commentIndex])
      this.handleUpdateDiscussionPage()
    })

    // eventBus.$on("sendDiscussions",()=>{
    //   alert("wss")
    //   this.emitData()
    // })
    //  this.testDsc();
    //  eventBus.$emit("newTest",2)

    // console.log("ssss",this.allDiscussions)

    //  eventBus.$on("sendActiveDiscussion",()=>{
    //   console.log("sadsadsa")
    //  })
  },
};
</script>
