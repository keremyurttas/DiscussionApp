<template>
  <div>
    <div
      class="flex items-center justify-between flex-col mt-10 absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4"
    >
      <div
        class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div class="bg-gray-200 animate-pulse w-48 h-64"></div>
        <div class="flex flex-col justify-between p-4 leading-normal w-96 h-64">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            <div class="bg-gray-200 w-9/12 h-5 mb-1 animate-pulse"></div>
          </h5>
          <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <div class="bg-gray-200 w-9/12 h-3 mb-1 animate-pulse"></div>
            <div class="bg-gray-200 w-9/12 h-3 mb-1 animate-pulse"></div>
            <div class="bg-gray-200 w-9/12 h-3 mb-1 animate-pulse"></div>
            <div class="bg-gray-200 w-9/12 h-3 mb-1 animate-pulse"></div>
            <div class="bg-gray-200 w-9/12 h-3 mb-1 animate-pulse"></div>
            <div class="bg-gray-200 w-9/12 h-3 mb-1 animate-pulse"></div>
            <div class="bg-gray-200 w-9/12 h-3 mb-1 animate-pulse"></div>
            <div class="bg-gray-200 w-9/12 h-3 mb-1 animate-pulse"></div>
            <div class="bg-gray-200 w-9/12 h-3 mb-1 animate-pulse"></div>

            <div class="bg-gray-200 w-6/12 h-3 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div
        class="mt-4 p-6 max-w-xl bg-blue-100 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 md:min-w-xl  "
      >
        <span
          class=" text-2xl font-light tracking-tight text-gray-900 dark:text-white"
          ><strong class="">
            
          </strong>
          <strong>
             </strong
        ></span>
        <p
          class="font-normal text-gray-700 dark:text-gray-400 "
        >
          <span class=" w-52 flex justify-between">
            <div class="bg-gray-200 w-4/12 h-10 animate-pulse "></div>
            <div class="bg-gray-200 w-4/12 h-10 animate-pulse"></div>
          </span>
          <span></span>
        </p>
      </div>

      <router-link
        class="mt-8 border-solid border-2 p-2 bg-blue-300 rounded-lg w-32 h-8"
        tag="button"
        to="/"
      >
        <div class="bg-gray-200 w-10/12 h-2 animate-pulse text-center"></div>
      </router-link>
    </div>
  </div>
</template>
<script></script>
<style scoped></style>
