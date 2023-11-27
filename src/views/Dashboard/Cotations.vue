<template>
    <div>
        <h2>Mes cotations</h2>
        <div class="d-flex w-100 justify-content-end ">
            <div>
                <a href="https://comparer.wia.ci/" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Nouvelle cotation</a>
            </div>

        </div>

        <div class="mt-5 rounded-2 overflow-hidden d-flex flex-column  bg-white px-3 py-2">
            <b-table :fields="fields" :per-page="10" head-variant="light" id="my-table" :tbody-transition-props="transProps"
                :current-page="currentPage" sticky-header hover :items="items">
                
                <template #cell(photo)="data" >
                    <img :src="data.item.photo" alt="" style="width: 13%; height: 13%;" class="img-fluid">
                    <span class="m-5">{{ data.item.label }}</span>
                </template>

                <template #cell(id)="data">
                    <a :href="data.item.link" target="_blank" rel="noopener noreferrer" class="btn btn-info" >
                        <img style="object-fit: contain; width: 50%; height: 50%;" src="../../assets/icons/todo-line.svg" alt="">
                    </a>
                    <!-- <router-link :to="data.item.link"
                    class="mr-2 btn btn-info" style="height: 40px; width: 40px; padding: 5px;" >
                        <img style="object-fit: contain; width: 100%; height: 100%;" src="../../assets/icons/todo-line.svg" alt="">
                    </router-link> -->
                    <!-- <b-button class="mr-2" variant="info" style="height: 40px; width: 40px; padding: 5px;" :id="data.id">
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
import {  comparatorFunction } from '@/services/ComparatorFunction';

@Options({
    components: {
        HelloWorld,
    },

})
export default class CotationView extends Vue {
    contrats: any[] = [];
    surveys: any[] = [];
    categories: any[] = [];
    perPage = 10
    currentPage = 1
    pathCotation:any = "https://comparer.wia.ci/questionnaire/"

    transProps = {
        // Transition name
        name: 'flip-list'
    }
    items:any[] = []


    fields = [
        { key: 'photo', label: 'Cotations' },
        // { key: 'type_de_cotation', label: 'Cotations' },
        // { key: 'status', label: 'Status' },
        { key: 'derniere_modification', label: 'Derniere modification' },
        { key: 'progress', label: 'Progression' },
        { key: 'id', label: '' },

    ]

    mounted() {
        this.loadCotation();
        this.loadBranchCategories();
        this.loadSurveys()
        // console.log(this.categories);
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

    rows() {
        return this.items.length
    }

    async loadCotation() {
        try {
            const res = await api.get(api.form, 'selfcare/load/response/groups');

            if (res && res.data && res.data.responseGroups) {
            // console.log(res.data.responseGroups);
            // console.log(comparatorFunction.getRgState(res.data.responseGroups[0], this.surveys));
            const dataFiltered = res.data.responseGroups.map((item: any) =>{
                console.log(item)
                const progress = comparatorFunction.getRgState(item, this.surveys)+"%"
                let photo = process.env.VUE_APP_MASTER_URL+"uploads/";
                for (let cat of this.categories) {
                    for (let branch of cat.branches) {
                        if (branch.slug === item.branchSlug) {
                            photo += branch.photo
                        }
                    }
                }
                const link = this.pathCotation+item.branchSlug+"/"+item.uuid
                console.log(link)
                return {
                        id: item.uuid,
                        photo: photo,
                        label: item.survey.label,
                        progress: progress,
                        link: link,
                        derniere_modification: helper.readable(item.updatedAt),
                    }
                })
                
                this.items = dataFiltered
            }

        } catch (e) {
            console.log(e);
        }
    }
    async loadSurveys() {
        const surveys = localStorage.getItem("surveys");
        if (!surveys) {
            try {
                const res = await api.get(api.form, "api/init/comparator/" + api.platform);
    
                if (res && res.data && res.data.surveys) {
                    //console.log(res.data.surveys);
                    localStorage.setItem("surveys", JSON.stringify(res.data.surveys));
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            const dataSurveys = JSON.parse(surveys) 
            dataSurveys.forEach((survey: any) => {
                this.surveys.push(survey)
            });
        }
    }

}
</script>


<style scoped>
*,*:after,*:before{ 
	-webkit-box-sizing: border-box; 
	-moz-box-sizing: border-box; 
	-ms-box-sizing: border-box; 
	box-sizing: border-box; 
}  

svg{ 
	width: 150px; 
	height: 150px;	 
	transform: rotate(-90deg); 
	overflow: initial; 
} 

circle{ 
	stroke-width:10px; 
	fill:none;	 
} 
circle:nth-child(1){ stroke: #fff } 
circle:nth-child(2){ 
	stroke: #f00; 
	position: relative; 
	z-index: 1;	 
} 
/* Permet d'ajuster le contenu */
.circle_box:nth-child(1) circle:nth-child(2){ 
	stroke-dashoffset:calc(100 * 6); 
	stroke-dasharray:calc(100 * 6); 
	stroke-dashoffset:calc((100 * 6) - ((100 * 6) * 90) / 100); 
	stroke-position: inside; 
} 
.circle_box:nth-child(2) circle:nth-child(2){ 
	stroke-dashoffset:calc(100 * 6); 
	stroke-dasharray:calc(100 * 6); 
	stroke-dashoffset:calc((100 * 6) - ((100 * 6) * 75) / 100); 
	stroke: rgb(37, 224, 109); 
} 
.circle_box:nth-child(3) circle:nth-child(2){ 
	stroke-dashoffset:calc(100 * 6); 
	stroke-dasharray:calc(100 * 6); 
	stroke-dashoffset:calc((100 * 6) - ((100 * 6) * 40) / 100); 
	stroke: rgb(227, 241, 25); 
} 
.circle_box{ 
	font-size: 36px; 
	color: #232121; 
	text-align: center; 
} 
.circle_box div{ 
	position: relative; 
} 
.circle_box span{ 
	position: absolute; 
	left: 50%; 
	top:50%; 
	transform: translate(-25%,-25%); 
	color: #2a2929; 
	font-size: 40px; 
} 

</style>
