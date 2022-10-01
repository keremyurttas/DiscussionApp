<template>
  <div>
    <header-component class=""></header-component>
    <router-view class="pt-20" ></router-view>
  </div>
</template>
<script>
  import headerComponent from './components/headerComponent.vue';
  export default{
    components:{
      headerComponent,
    }
  }
</script>