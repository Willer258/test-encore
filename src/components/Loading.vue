<!-- <template>
    <div :style="{ 'background' : background}" id="filter">
        <div :style="{'width': width, 'height' : width}" class="water"
             id="container">
            <div class="typing">
                <div class="point"></div>
                <div class="point two"></div>
                <div class="point three"></div>
            </div>
        </div>
    </div>

</template> -->
<script lang="ts">
    /* eslint-disable */
    import { Vue, Options } from "vue-class-component";

    // @Component({})
    export default class Loading extends Vue {
        // @Prop({default:'200px'}) width!: string;
        // @Prop({default:'200px'}) background!: string;

    }
</script>
<style scoped>
    #filter {
        position: relative;
        /*top: 0;*/
        /*left: 0;*/
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, .75);
        /*z-index: 9999;*/
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        background-color: #17e1e6;
        width: 200px;
        height: 200px;
        margin: 20px;
        border-radius: 100%;
        overflow: hidden;
    }


    .typing {
        margin-top: 20px;
        display: flex;
        justify-content: center;

    }

    .typing .point {
        width: 20Px;
        height: 20px;
        background: #f8069c;
        background: radial-gradient(circle at 5px 5px, #f8069c, #396066);
        margin: 0 20px;
        border-radius: 100%;
        animation: bounce 1s ease infinite;
    }

    .typing .two {
        animation: bounce 1s ease .1s infinite;
    }

    .typing .three {
        animation: bounce 1s ease .2s infinite;
    }

    @keyframes bounce {
        0% {
            transform: scale(0) translateY(0)
        }
        20% {
            transform: scale(1) translateY(-10px)
        }
        40% {
            transform: scale(1) translateY(0)
        }
        80% {
            transform: scale(1) translateY(10px)
        }
        100% {
            transform: scale(0) translateY(0)
        }
    }


    .water:before,
    .water:after {
        content: "";
        position: absolute;
        width: 300px;
        height: 300px;
        top: -150px;
        background-color: #fff;
    }

    .water:before {
        border-radius: 45%;
        background: rgba(255, 255, 255, 0.7);
        animation: wave 5s linear infinite;
    }

    .water:after {
        border-radius: 35%;
        background: rgba(255, 255, 255, 0.3);
        animation: wave 5s linear infinite;
    }

    @keyframes wave {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>
