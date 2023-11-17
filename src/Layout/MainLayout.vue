<template>
  <div class="min-vh-100 layout d-flex p-3" >
    <SideBarComponent />
    <div class="ms-5 d-flex flex-column w-100">

      
      <div style="align-self: flex-end;" class="self-end me-3 mt-3"><Profile/></div>
      

      <router-view></router-view>

      
    </div>
  </div>
</template>
  
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import SideBarComponent from './SideBarComponent.vue'
import Profile from './Profile.vue';

@Options({

  components: {
    SideBarComponent,
    Profile
  }
})
export default class HelloWorld extends Vue {

}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.layout{

  background: #F6EEF3;
}
</style>
  