<template>
  <b-container>
      <h2>Mes contrats</h2>
      <div class="d-flex w-100 justify-content-end ">
          <div>
              <b-button  variant="primary">
              Creer une cotation
          </b-button>
          </div>
          
      </div>

      <div class="mt-5 rounded-2 overflow-hidden">
        <b-table head-variant="light" 
            :tbody-transition-props="transProps"  sticky-header hover :items="contrats">

          <template #cell(action)="data" >
            <div class="w-50 d-flex">
              <b-button  class="mr-2">
                  Continuer
              </b-button>

              <b-button class="ms-3" variant="danger" :id="data.value"> 
                 Supprimer
              </b-button>
            </div>
          </template>
    
        </b-table>
      </div>
  </b-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { api } from '@/services/Api';
import { CONTRACT_STATUS, helper } from '@/services/Helper';

@Options({
  components: {
    HelloWorld,
  },
  
})
export default class ContractView extends Vue {
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

  transProps= {
          // Transition name
          name: 'flip-list'
        }


    //  items =  [
    //       { type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald' , action:'d'},
    //       { type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald' , action:'d'},
    //       { type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald' , action:'d'},
    //       { type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald' , action:'d'},
    //     //   { age: 21, first_name: 'Larsen', last_name: 'Shaw', action:'' },
    //     //   { age: 89, first_name: 'Geneva', last_name: 'Wilson', action:'' },
    //     //   { age: 38, first_name: 'Jami', last_name: 'Carney', action:'' }
    //     ]

  mounted() {
    this.loadBranchCategories();
    this.loadContract();
    // console.log(this.categories);
  }

  async loadContract(){
    try {
      const res = await api.get(api.core, "selfcare/contracts");
      //console.log(res.data)
      if (res && res.data && res.data.contracts) {
        res.data.contracts.forEach((cont: any) => {
            const data:any = {}
            data.photo = process.env.VUE_APP_MASTER_URL+"uploads/"+cont.branch.photo
            const marque = cont.assetAliases[0]
            if (marque) {
              data.marque = marque
            } else {
              const parts = (cont.alias).split(" ")
              if (parts.length > 0){
                data.marque = parts[0]+" "+parts[1]
              }
            }
            const immat = cont.assetsIdentifiers[0]
            if (immat) {
              data.immat = immat
            } else {
              const parts = (cont.alias).split(" ")
              if (parts.length > 0){
                data.immat = parts[2]
              }
            }
            
            data.insurer = cont.insurer.label
            data.duration = helper.readable(cont.startAt, 'dMy') +" - "+helper.readable(cont.expireAt, 'dMy')
            data.action = cont.uuid

          console.log(data)
          console.log(cont)
          this.contrats.push(data);
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

  // resetFilters() {
  //   const f = this.defaultFilter;
  //   for (let cat of this.categories) {
  //     for (let branch of cat.branches) {
  //       // console.log("checking " + branch.label);
  //       const match = f.find((filter) => {
  //         return filter.filter.branch === branch.slug;
  //       });
  //       if (!match) {
  //         const contractExpire = this.contrats.find((c) => {
  //           return c.branch.slug === branch.slug;
  //         });
  //         if (contractExpire) {
  //           // console.log("match = " + match);
  //           f.push({
  //             label: branch.label,
  //             filter: {
  //               status:"",
  //               branch: branch.slug,
  //             },
  //           });
  //           break;
  //         }
  //       }
  //     }
  //   }
  //   f.forEach((f:any) => {
  //     this.defaultFilter.push(f);
  //   });
  // };

  // filtering(filter: any){
  //   const status = filter.filter.status;
  //   const branch = filter.filter.branch;
  //   let results = [...this.contrats];

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
  //   results.forEach((f:any) => {
  //     this.defaultFilter.push(f);
  //   });
  // };

}
</script>
