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
export default class DeadlineView extends Vue {
  contrats: any[] = [];
  categories: any[] = [];
  defaultFilter = [
    {
      label: "Tous mes contrats",
      filter: {
        status: CONTRACT_STATUS.ONGOING,
        branch: ""
      },
    },
    {
      label: "Expiré",
      filter: {
        status: CONTRACT_STATUS.TERMINATED,
        branch: ""
      },
    },
  ];
  mounted() {
    // auth.logout();
    this.loadBranchCategories();
    this.loadContract();
    this.resetFilters();
    console.log(this.defaultFilter)
  }

  async loadContract(){
    try {
      const res = await api.get(api.core, "selfcare/contracts");
      //console.log(res.data)
      if (res && res.data && res.data.contracts) {
        res.data.contracts.forEach((cont: any) => {
          this.contrats.push(cont);
        })
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
        res.data.categories.forEach((cat: any) => {
          this.categories.push(cat);
        })
      }
    } catch (e) {
      console.log(e);
    }
  }

  resetFilters() {
    const f = this.defaultFilter;
    for (let cat of this.categories) {
      for (let branch of cat.branches) {
        // console.log("checking " + branch.label);
        const match = f.find((filter) => {
          return filter.filter.branch === branch.slug;
        });
        if (!match) {
          const contractExpire = this.contrats.find((c) => {
            return c.branch.slug === branch.slug;
          });
          if (contractExpire) {
            // console.log("match = " + match);
            f.push({
              label: branch.label,
              filter: {
                status:"",
                branch: branch.slug,
              },
            });
            break;
          }
        }
      }
    }
    f.forEach((f:any) => {
      this.defaultFilter.push(f);
    });
  };

  filtering(filter: any){
    const status = filter.filter.status;
    const branch = filter.filter.branch;
    let results = [...this.contrats];

    // console.log(results.length);
    // console.log(filter);
    if (status) {
      results = results.filter((c) => {
        return c.status === status;
      });
    }
    if (branch) {
      results = results.filter((c) => {
        return c.branch.slug === branch;
      });
    }
    // console.log(results.length);
    results.forEach((f:any) => {
      this.defaultFilter.push(f);
    });
  };

}
</script>
