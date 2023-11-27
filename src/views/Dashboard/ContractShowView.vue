<template>
    <b-container>
        <h2>Mes Contrats</h2>
        <!-- <div class="d-flex w-100 justify-content-end ">
            <div>
                <b-button  variant="primary">
                Creer une cotation
            </b-button>
            </div>
            
        </div> -->
  
        <div class="mt-5 rounded-2 overflow-hidden d-flex flex-column  bg-white px-3 py-2">
   
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
  export default class ContractShowView extends Vue {
    amount = 0
    coreEndpoint = api.core
    uploadRoot = api.uploadRoot
    tabIndex = 0
    isLoading = false
    avenant: any = null
  
    async mounted() {
    //   this.loadEngine()
    //   await this.loadContract()
    }
  
  
    // get willExpireSoon() {
    //   if (this.contract instanceof Contract) {
    //     const now = new Date()
    //     const diff = this.contract.expireAt.getTime() - now.getTime()
    //     let dayLeft = Math.ceil(diff / (1000 * 3600 * 24));
    //     if (dayLeft < 30) {
    //       return true
    //     }
    //     return false
    //   }
    //   return false
    // }
  
    // async loadReceipt(uuid: string) {
    //   const res = await api.get(api.core, 'payment/receipt/' + uuid)
    // }
  
    // async emitAvenant(avenant: Avenant) {
    //   // let timerInterval: any = null;
    //   const response = await Swal.fire({
    //     title: 'Emission de contrat',
    //     html: 'Êtes-vous sûr de vouloir emettre ce avenant sans encaissement ?',
    //     timer: 10000,
    //     timerProgressBar: true,
    //     showCancelButton: true,
    //     confirmButtonText: 'Emettre l\'avenant',
    //     didOpen: () => {
    //       // Swal.showLoading()
    //       // const b = Swal.getHtmlContainer().querySelector('b')
    //       // timerInterval = setInterval(() => {
    //       //     b.textContent = Swal.getTimerLeft()
    //       // }, 100)
    //     },
    //     willClose: () => {
    //       // clearInterval(timerInterval)
    //     }
    //   })
    //   if (response.isConfirmed) {
    //     this.$store.commit('loading')
    //     const res = await api.get(api.core, 'avenant/emit/' + avenant.uuid)
    //     this.$store.commit('stopLoading')
    //     this.loadContract()
    //   }
    // }
  
    // itemHasChildren(item: Item) {
    //   // let result = false
    //   return item.properties.some((p: Property) => p.children.length > 0)
    //   // item.properties.forEach((p: Property) => {
    //   //     if (p.children.length > 0) {
    //   //         result = true
    //   //     }
    //   // })
    //   // return result
    // }
  
    // toggleItemExpand(item: Item, evt: Event) {
    //   // console.log(evt)
    //   // console.log(evt instanceof Event)
    //   let value: any = evt
    //   if (evt instanceof Event) {
    //     value = (evt.target as any).checked as any
    //   } else {
    //     item.expand = value
    //     // console.log('hide ' + item.name)
    //   }
    //   item.properties.forEach((p: Property) => {
    //     p.children.forEach((c: Item) => {
    //       const index = this.itemList.findIndex((i: Item) => {
    //         return i.uuid === item.uuid
    //       })
    //       if (index !== -1) {
    //         this.itemList[index].expand = item.expand
    //         this.toggleItemExpand(c, value)
    //       }
    //     })
    //   })
    // }
  
    // previewPrintable(item: Item, printable: Printable) {
  
    // }
  
    // itemList: Item[] = []
    // isLoadingAvenant = false
  
    // async getAvenantData(avenant: Avenant) {
    //   this.isLoadingAvenant = true
    //   const res = await api.get(api.core, 'avenant/get/items/' + avenant.uuid)
    //   // console.log(res)
    //   this.isLoadingAvenant = false
  
    // }
  
    // get contractItems() {
    //   if (this.contract && this.contract.root) {
    //     // console.log(this.getItemByLines(this.contract.root))
    //     return this.getItemByLines(this.contract.root)
    //   } else {
    //     return []
    //   }
  
    // }
  
    // getItemByLines(item: Item, result?: Item[]) {
  
    //   if (!result) {
    //     result = []
    //   }
    //   if (!result.includes(item)) {
    //     result.push(item)
    //   }
    //   item.properties.forEach((p: Property) => {
    //     p.children.forEach((c: Item) => {
    //       c.parentItem = item
    //       c.level = item.level + 1
    //       this.getItemByLines(c, result)
    //     })
    //   })
    //   return result
    // }
  
    // setAvenant(avenant: Avenant) {
    //   this.avenant = avenant
    //   const result = this.getItemByLines(this.avenant.root)
    //   this.itemList = result
    // }
  
    // async payAvenant(avenant: Avenant) {
    //   // console.log(this.amount+' '+avenant.balance)
    //   // return
    //   if (Math.abs(avenant.balance) < this.amount) {
    //     const response = await Swal.fire({
    //       title: 'Erreur montant',
    //       html: 'Le montant du paiement est supérieur au montant dû',
    //       timer: 5000,
    //       timerProgressBar: true,
    //     })
    //     return
    //   }
  
    //   this.$store.commit('loading')
    //   const res = await api.get(api.core, 'checkout/pay/avenant/' + avenant.uuid + '/' + this.amount)
    //   if (res && res.data && res.data.status === 'success') {
    //     this.loadContract()
    //   }
    //   this.$store.commit('stopLoading')
    // }
  
    // async loadContract() {
    //   this.isLoading = true
    //   const res = await api.get(api.core, 'contract/get/data/' + this.$route.params.contractUuid)
    //   if (res && res.data && res.data.contract) {
    //     // console.log(res.data.contract.avenants[0].root.properties[0].children[0].properties[19].children[0].properties)
    //     this.contract = new Contract(res.data.contract)
    //     this.contract.avenants.reverse()
    //   }
    //   if (this.contract.status === CONSTANTS.CONTRACT_STATUS['QUOTATION']) {
    //     this.tabIndex = 0
    //   }
    //   if (this.contract.status === CONSTANTS.CONTRACT_STATUS['ONGOING']) {
    //     this.tabIndex = 1
    //   }
    //   this.isLoading = false
    //   // console.log(this.contract)
    //   // console.log(this.contract.avenants[0].root.properties[0].children[0].properties[1].children[0].properties[6].children[0])
    //   // console.log(this.contract.avenants[0].root.properties[0].children[0].properties[19].children[0].properties[0].model.link)
    // }
  
    // async loadEngine() {
    //   const module_path = api.core + 'engine/Auto/Engine.js';
    //   // const module_path = api.core + 'engine/EngineModule.js';
  
    //   // const Atlantique =
  
    //   // const Atlantique = await require(module_path)
    //   // console.log(Atlantique)
  
    //   // const plugin = document.createElement("script");
    //   // plugin.setAttribute(
    //   //     "type",
    //   //     'text/javascript'
    //   // );
    //   // plugin.setAttribute(
    //   //     "src",
    //   //     module_path
    //   // );
    //   // plugin.async = true;
    //   // document.head.appendChild(plugin);
    //   // plugin.addEventListener('load', () => {
    //   //     const r = new Atlantique()
    //   //     console.log(r)
    //   //
    //   // })
  
  
    //   // const module = await import(module_path).then(({default: engine}) => {
    //   //     console.log(engine)
    //   // })
    //   // console.log(module)
    //   // module.default();
    // }
  }
  </script>
  <style scoped>
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all .2s;
  }
  
  .slide-left-leave-from {
    transition: all .2s;
  }
  
  .slide-left-enter {
    opacity: 0;
    transform: translateY(50%);
  }
  
  .slide-leave-to {
    opacity: 0;
    transform: translateY(-50%);
  }
  
  .modal-xl .modal-content {
    height: 100%;
  }</style>
  