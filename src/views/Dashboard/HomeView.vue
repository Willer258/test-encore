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
import { api } from '@/services/Api';
import { CONTRACT_STATUS } from '@/services/Helper';

@Options({
  components: {
    HelloWorld,
  },
  
})
export default class HomeView extends Vue {
  contrats: any[] = [];
  categories: any[] = [];
  defaultFilter = [
    {
      label: "Tous mes contrats", 
      filter: {
        status: CONTRACT_STATUS.ONGOING,
      },
    },
    {
      label: "Expiré", 
      filter: {
        status: CONTRACT_STATUS.TERMINATED,
      },
    },
  ];
  mounted() {
    // auth.logout();
    this.loadBranchCategories();
    this.loadContract();
    console.log(this.contrats, this.categories);
  }

  async loadContract(){
    try {
      const res = await api.get(api.core, "selfcare/contracts");
      //console.log(res.data)
      if (res && res.data && res.data.contracts) {
        //console.log(res.data.contracts.length + " contracts loaded");
        this.contrats = res.data.contracts
      }
    } catch (e) {
      console.log(e);
    }
  }
  async loadBranchCategories(){
    try {
      const res = await api.get(api.core, "api/branch/list");
      //console.log(res.data)
      if (res && res.data && res.data.categories) {
        this.categories = res.data.categories
        //console.log(res.data.categories.length + " categories loaded");
      }
    } catch (e) {
      console.log(e);
    }
  }

  // resetFilters() {
  //   const f = this.defaultFilter;
  //   for (let cat of categories) {
  //     for (let branch of cat.branches) {
  //       // console.log("checking " + branch.label);
  //       const match = f.find((filter) => {
  //         return filter.filter.branch === branch.slug;
  //       });
  //       if (!match) {
  //         const contractExpire = contracts.find((c) => {
  //           return c.branch.slug === branch.slug;
  //         });
  //         if (contractExpire) {
  //           // console.log("match = " + match);
  //           f.push({
  //             label: branch.label,
  //             filter: {
  //               branch: branch.slug,
  //             },
  //           });
  //           break;
  //         }
  //       }
  //     }
  //   }
  //   setFilters(f);
  // };

  // filtering(filter: any){
  //   const status = filter.filter.status;
  //   const branch = filter.filter.branch;
  //   let results = [...contracts];

  //   // console.log(results.length);
  //   // console.log(filter);
  //   if (status) {
  //     results = results.filter((c) => {
  //       return c.status === status;
  //     });
  //   }
  //   if (branch) {
  //     results = results.filter((c) => {
  //       return c.branch.slug === branch;
  //     });
  //   }
  //   // console.log(results.length);
  //   setFiltered(results);
  // };
}
</script>
