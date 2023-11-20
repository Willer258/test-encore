<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    HomeView
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { auth } from "@/services/Auth";

@Options({
  components: {
    HelloWorld,
  },
  
})
export default class HomeView extends Vue {
  // mounted() {
  //   auth.logout();
  // }
}
</script>
