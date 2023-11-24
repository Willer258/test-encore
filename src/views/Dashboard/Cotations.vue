<template>
    <div>
        <h2>Mes cotations</h2>
        <div class="d-flex w-100 justify-content-end ">
            <div>
                <b-button variant="primary" :href="'https://comparer.wia.ci/'">
                    Nouvelle cotation
                </b-button>
            </div>

        </div>

        <div class="mt-5 rounded-2 overflow-hidden d-flex flex-column  bg-white px-3 py-2">
            <b-table :fields="fields" :per-page="10" head-variant="light" id="my-table" :tbody-transition-props="transProps"
                :current-page="currentPage" sticky-header hover :items="items">



                <template #cell(id)="data">

                    <b-button class="mr-2" variant="info" style="height: 40px; width: 40px; padding: 5px;" :id="data.id">
                        <img style="object-fit: contain; width: 100%; height: 100%;" src="../../assets/icons/todo-line.svg"
                            alt="">
                    </b-button>

                    <!-- <b-button class="ms-3" variant="danger" style="height: 40px; width: 40px; padding: 5px;"> 
                      <img style="object-fit: contain; width: 100%; height: 100%;" src="../../assets/icons/delete.svg"
                            alt=""> 
                    </b-button> -->


                </template>


            </b-table>



            <b-pagination class="align-self-end mt-3" v-model="currentPage" :total-rows="rows()" :per-page="perPage"
                aria-controls="my-table"></b-pagination>
        </div>
    </div>
</template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { auth } from "@/services/Auth";
import { api } from '@/services/Api';
import { CONTRACT_STATUS , helper } from '@/services/Helper';

@Options({
    components: {
        HelloWorld,
    },

})
export default class CotationView extends Vue {
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

    perPage = 10
    currentPage = 1

    transProps = {
        // Transition name
        name: 'flip-list'
    }

    items = [
        // { id: '1', type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald', action: 'd' },
        // { id: '1', type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald', action: 'd' },
        // { id: '1', type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald', action: 'd' },
        // { id: '1', type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald', action: 'd' },
        // { id: '1', type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald', action: 'd' },
        // { id: '1', type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald', action: 'd' },
        // { id: '1', type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald', action: 'd' },
        // { id: '1', type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald', action: 'd' },
        // { id: '1', type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald', action: 'd' },
        // { id: '1', type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald', action: 'd' },
        // { id: '1', type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald', action: 'd' },
        // { id: '1', type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald', action: 'd' },
        // { id: '1', type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald', action: 'd' },
        // { id: '1', type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald', action: 'd' },
        // { id: '1', type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald', action: 'd' },
        //   { age: 21, first_name: 'Larsen', last_name: 'Shaw', action:'' },
        //   { age: 89, first_name: 'Geneva', last_name: 'Wilson', action:'' },
        //   { age: 38, first_name: 'Jami', last_name: 'Carney', action:'' }
    ]

    fields = [
        { key: 'type_de_cotation', label: 'Cotations' },
        // { key: 'status', label: 'Status' },
        { key: 'derniere_modification', label: 'Derniere modification' },
        { key: 'id', label: '' },

    ]

    mounted() {
        // auth.logout();
        this.loadBranchCategories();
        this.loadContract();
        console.log(this.items);
    }

    rows() {
        return this.items.length
    }
    async loadContract() {
        try {
            const res = await api.get(api.form, 'selfcare/load/response/groups');

            if (res && res.data && res.data.responseGroups) {
                // console.log(res.data.responseGroups);

                const dataFiltered = res.data.responseGroups.map((item: any) => ({

                    id: item.uuid,
                    type_de_cotation: item.survey.label,
                    status: item.status,
                    derniere_modification: helper.readable(item.updatedAt)  ,
                }))
                
                this.items = dataFiltered


                // this.items = res.data.responseGroups
            }
            // console.log(res)



            //console.log(res.data)

        } catch (e) {
            console.log(e);
        }
    }
    async loadBranchCategories() {
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

}
</script>
  