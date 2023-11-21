<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    DeadLine View
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { auth } from "@/services/Auth";
import { api } from '@/services/Api';
import { CONTRACT_STATUS } from '@/services/Helper';

@Options({
  components: {
    HelloWorld,
  },
  
})
export default class ParrainageView extends Vue {
  fileuls: any[] = [];

  mounted() {
    console.log(this.fileuls.length, " fieuls count");
  }


  async loadSponsoring(){
    const res = await api.get(api.auth, "selfcare/get/sponsoring/data");
    if (res && res.data && res.data.fileuls) {
      res.data.fileuls.forEach((fileul:any) => {
        this.fileuls.push(fileul);
      });
    }
  };

}
</script>
