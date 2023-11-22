<template>
  <b-container>
      <h2>Mes contrats</h2>
      <!-- <div class="d-flex w-100 justify-content-end ">
          <div>
              <b-button  variant="primary">
              Creer une cotation
          </b-button>
          </div>
          
      </div> -->

      <div class="mt-5 rounded-2 overflow-hidden d-flex flex-column  bg-white px-3 py-2">
        <b-table head-variant="light" :fields="fields" :current-page="currentPage" id="my-table"
            :tbody-transition-props="transProps"  sticky-header hover :items="contrats">
            
            <template #cell(photo)="data" >
                <img :src="data.item.photo" alt="" style="width: 13%; height: 13%;" class="img-fluid">
                <span class="m-5">{{ data.item.label }}</span>
            </template>

          <template #cell(id)="data">

            <b-button class="mr-2" variant="info" style="height:  padding: 5px;" :id="data.item.id">
                <!-- <img style="object-fit: contain; width: 100%; height: 100%;" src="../../assets/icons/eyes.svg"
                    alt=""> -->
                    <div>Renouveller</div>
                    {{ data.item.primeTTC }}
            </b-button>

            {{ data.id }}

            <!-- <b-button class="ms-3" variant="danger" style="height: 40px; width: 40px; padding: 5px;"> 
              <img style="object-fit: contain; width: 100%; height: 100%;" src="../../assets/icons/delete.svg"
                    alt=""> 
            </b-button> -->
          </template>
        </b-table>
        <b-pagination class="align-self-end mt-3" v-model="currentPage" :total-rows="rows()" :per-page="perPage"
                aria-controls="my-table"></b-pagination>
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
export default class DeadlineView extends Vue {
  contrats: any[] = [];
  perPage:any = 10
  currentPage:any = 1
  transProps:any = {
  name: 'flip-list'
  }
  fields = [
      { key: 'photo', label: 'Contrat' },
      { key: 'insurer', label: 'Assureur' },
      { key: 'duration', label: 'Période' },
      { key: 'status', label: 'Status' },
      { key: 'id', label: '' },
  ]

  mounted() {
    this.loadContract();
    // console.log(this.categories);
  }
  
  rows() {
    return this.contrats.length
  }

  async loadContract(){
    try {
      const res = await api.get(api.core, "selfcare/contracts");
      //console.log(res.data)
      if (res && res.data && res.data.contracts) {
        res.data.contracts.forEach((cont: any) => {
            const data:any = {}
            data.photo = process.env.VUE_APP_MASTER_URL+"uploads/"+cont.branch.photo
            // const marque = cont.assetAliases[0]
            // if (marque) {
            //   data.marque = marque
            // } else {
            //   const parts = (cont.alias).split(" ")
            //   if (parts.length > 0){
            //     data.marque = parts[0]+" "+parts[1]
            //   }
            // }
            // const immat = cont.assetsIdentifiers[0]
            // if (immat) {
            //   data.immat = immat
            // } else {
            //   const parts = (cont.alias).split(" ")
            //   if (parts.length > 0){
            //     data.immat = parts[2]
            //   }
            // }
            
            data.insurer = cont.insurer.label
            data.duration = helper.readable(cont.startAt, 'dMy') +" - "+helper.readable(cont.expireAt, 'dMy')
            data.status = cont.status
            data.label = cont.branch.label
            data.primeTTC = helper.currencyFormat(cont.primeTTC,true, true)
            data.id = cont.uuid

          console.log(data)
          console.log(cont)
          this.contrats.push(data);
        })
      }
    } catch (e) {
      console.log(e);
    }
  }

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
