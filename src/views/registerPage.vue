<template>
  <div class="">
    <form
      class="flex flex-col h-72 justify-between p-4 border items-center w-96 m-auto bg-gray-200"
      @submit.prevent="register"
    >
      <span class="text-center text-xl tracking-wide">Register</span>
      <div class="e-mail">
        <span class="block mb-2">E-mail : </span>
        <input
          class="border border-gray-700 px-2 py-1"
          type="email"
          name=""
          v-model="email"
          id=""
          placeholder="abcde123@example.com"
        />
      </div>
      <div class="password">
        <span class="block mb-2">Password : </span>
        <input
          class="border border-gray-700 px-2 py-1"
          type="password"
          name=""
          id=""
          v-model="password"
          placeholder="*********"
        />
      </div>
      <button class="p-2 bg-blue-500 text-white rounded-lg">Register!</button>
    </form>
  </div>
</template>
<script>
import firebase from "firebase";
import { eventBus } from '../main';

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)

        .then((userRecord) => {
          localStorage.setItem("activeUser", userRecord.email);
          console.log(userRecord.uid);
          this.$router.push("/discussions");
          eventBus.$emit("sendDiscussions")
        })

        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
