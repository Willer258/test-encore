<template>
  <b-container>
      <h2>Mes Contrats</h2>
      <div class="d-flex w-100 justify-content-end ">
        <div>
          <b-dropdown id="dropdown-1" :text="filterText" class="m-md-2" variant="primary" v-model="selectedOption">
            <b-dropdown-item  v-for="(item, index) in filterOptions" :key="index" @click="selectOption(item)" >{{item.label}}</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <div class="mt-5 rounded-2 overflow-hidden d-flex flex-column  bg-white px-3 py-2">
        <b-table head-variant="light" :fields="fields" :current-page="currentPage" id="my-table"
            :tbody-transition-props="transProps"  sticky-header hover :items="dataFiltered">
            
            <template #cell(photo)="data" >
                <img :src="data.item.photo" alt="" style="width: 13%; height: 13%;" class="img-fluid">
                <span class="m-5">{{ data.item.label }}</span>
            </template>

          <!-- <template #cell(id)="data" >
            <div class="w-50 d-flex">
              <b-button  class="mr-2">
                  Continuer
              </b-button>

              <b-button class="ms-3" variant="danger" :id="data.value"> 
                 Supprimer
              </b-button>
            </div>
          </template> -->
          <template #cell(id)="data">
            
              <router-link :to="'dashboard/contract/show/'+data.item.id"
              class="mr-2 btn btn-info" style="height: 40px; width: 40px; padding: 5px;" :id="data.item.uuid">
                <img style="object-fit: contain; width: 100%; height: 100%;" src="../../assets/icons/eyes.svg" alt="">
                <!-- {{ data.item }} -->
              </router-link>
<!-- {{ data.item.id }} -->
           

            <!-- <b-button class="ms-3" variant="danger" style="height: 40px; width: 40px; padding: 5px;"> 
              <img style="object-fit: contain; width: 100%; height: 100%;" src="../../assets/icons/delete.svg"
                    alt=""> 
            </b-button> -->
          </template>
        </b-table>
        <b-pagination class="align-self-end mt-3" v-model="currentPage" :total-rows="rows()" :per-page="perPage"
                aria-controls="my-table">
        </b-pagination>
      </div>
      <b-modal id="my-modal">Hello From My Modal!</b-modal>
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
  dataFiltered: any[] = [];
  filterOptions: any[] = [
    {label:"Tous les contrats", data: "all"}
  ];
  filterText:any = "Tous les contrats";
  selectedOption:any = ""
  transProps= {
  name: 'flip-list'
  }
  fields = [
      { key: 'photo', label: 'Contrat' },
      { key: 'insurer', label: 'Assureur' },
      { key: 'duration', label: 'Période' },
      { key: 'id', label: '' },
  ]
  perPage = 10
  currentPage = 1

  // items:any[] = [
  //   {
  //     photo:"https://master.wia.ci/uploads/63a8186c-c6ba-4c97-ab82-1a75ae5d7d98.svg",
  //     insurer:"ATLANTA",
  //     duration:"20 Sept 23 - 19 Déc 23",
  //     status:"",
  //     label:"Auto",
  //     id:"1ee57e2e-e5d1-6b8c-8219-00505646c51f",
  //   },
  //   {
  //     photo:"https://master.wia.ci/uploads/6eeed4f3-d2f7-4569-b180-4ae408c189bb.svg",
  //     insurer:"ATLANTA",
  //     duration:"20 Sept 23 - 19 Déc 23",
  //     status:"",
  //     label:"Voyage",
  //     id:"1ee57e2e-e5d1-6b8c-8219-00505646c51f",
  //   },
  //   {
  //     photo:"https://master.wia.ci/uploads/63a8186c-c6ba-4c97-ab82-1a75ae5d7d98.svg",
  //     insurer:"ATLANTA",
  //     duration:"20 Sept 23 - 19 Déc 23",
  //     status:"",
  //     label:"Auto",
  //     id:"1ee57e2e-e5d1-6b8c-8219-00505646c51f",
  //   },
  //   {
  //     photo:"https://master.wia.ci/uploads/6eeed4f3-d2f7-4569-b180-4ae408c189bb.svg",
  //     insurer:"ATLANTA",
  //     duration:"20 Sept 23 - 19 Déc 23",
  //     status:"",
  //     label:"Voyage",
  //     id:"1ee57e2e-e5d1-6b8c-8219-00505646c51f",
  //   },
  //   {
  //     photo:"https://master.wia.ci/uploads/63a8186c-c6ba-4c97-ab82-1a75ae5d7d98.svg",
  //     insurer:"ATLANTA",
  //     duration:"20 Sept 23 - 19 Déc 23",
  //     status:"",
  //     label:"Auto",
  //     id:"1ee57e2e-e5d1-6b8c-8219-00505646c51f",
  //   },
  //   {
  //     photo:"https://master.wia.ci/uploads/6eeed4f3-d2f7-4569-b180-4ae408c189bb.svg",
  //     insurer:"ATLANTA",
  //     duration:"20 Sept 23 - 19 Déc 23",
  //     status:"",
  //     label:"Voyage",
  //     id:"1ee57e2e-e5d1-6b8c-8219-00505646c51f",
  //   },
  // ];

  mounted() {
    this.loadBranchCategories();
    this.loadContracts();
    this.dataFiltered = this.contrats
  }
  selectOption(item:any){
    this.filtering(item)
  }
  rows() {
    return this.contrats.length
  }

  async loadContracts(){
    try {
      const res = await api.get(api.core, "selfcare/contracts");
      //console.log(res.data)
      if (res && res.data && res.data.contracts) {
        let branch:any = []
        res.data.contracts.forEach((cont: any) => {
          console.log(cont)
          if (!branch.includes(cont.branch.label)) {
            this.filterOptions.push({label:cont.branch.label, data:(cont.branch.label).toLowerCase()})
            branch.push(cont.branch.label)
          }
          // console.log(this.filterOptions)
          const data:any = {}
          data.photo = process.env.VUE_APP_MASTER_URL+"uploads/"+cont.branch.photo
          data.insurer = cont.insurer.label
          data.duration = helper.readable(cont.startAt, 'dMy') +" - "+helper.readable(cont.expireAt, 'dMy')
          data.status = cont.status
          data.label = cont.branch.label
          data.id = cont.uuid

          // console.log(data)
          // console.log(cont)
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

  filtering(filter: any){
    let results:any[] = [...this.dataFiltered];
    if (filter) {
      results = results.filter((c) => {
        return c.label === filter.label;
      });
    }

    if (results.length <= 0) {
      this.dataFiltered = this.contrats
    } else {
      this.dataFiltered = []
      results.forEach((f:any) => {
        this.dataFiltered.push(f);
      });
    }
    this.filterText = filter.label
    results = []
  };

}
</script>
