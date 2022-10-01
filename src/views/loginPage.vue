<template>
  <div class="">
    <form
      class="flex flex-col h-72 justify-between p-4 border items-center w-96 m-auto bg-gray-200"
      @submit.prevent="login"
    >
      <span class="text-center text-xl tracking-wide">Log-in</span>
      <div class="e-mail">
        <span class="block mb-2">E-mail : </span>
        <input
          v-model="user.email"
          class="border border-gray-700 px-2 py-1"
          type="email"
          name=""
          id=""
          placeholder="abcde123@example.com"
        />
      </div>
      <div class="password">
        <span class="block mb-2">Password : </span>
        <input
          v-model="user.password"
          class="border border-gray-700 px-2 py-1"
          type="password"
          name=""
          id=""
          placeholder="*********"
        />
      </div>
      <button class="p-2 bg-blue-500 text-white rounded-lg">Log-in</button>
    </form>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        const val = await firebase
          .auth()
          .signInWithEmailAndPassword(this.user.email, this.user.password);

        this.$router.push("/discussions");
        localStorage.setItem("activeUser", val.user.email);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
