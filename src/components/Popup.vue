<template>
    <div id="notifications">
        <transition-group name="slideRight" tag="div">
            <div :class="'bg-' + popup.type + ' text-inverse-' + popup.type" :key="popup.id"
                class="notification card bgi-no-repeat card-xl-stretch" style="text-align: left"
                v-for="popup in $store.state.popups">
                <div class="card-body p-3 d-flex align-items-center">
                    <div class="card-body p-3 d-flex align-items-center" v-if="popup.keepAlive">
                        <div class="position-relative w-30px h-30px d-flex justify-content-center align-items-center">
                            <i :class="'text-inverse-' + popup.type + ' ' + popup.icon"></i>
                            <div :class="'spinner position-absolute text-inverse-' + popup.type"></div>
                        </div>
                    </div>
                    <div v-else>
                        <i :class="'text-inverse-' + popup.type + ' ' + popup.icon" class="icon px-2"></i>
                    </div>
                    <div class="flex-grow-1 px-2">
                        <span class="card-title fw-bolder text-hover-primary" style="text-transform: uppercase">
                            {{ popup.title }}
                        </span>
                        <p class="fw-bold m-0">
                            {{ popup.message }}
                        </p>
                    </div>
                    <div>
                        <a class="btn btn-sm btn-icon">
                            <span @click.prevent="$store.commit('removePopup', popup.id)" class="svg-icon svg-icon-1">
                                <i :class="'text-inverse-' + popup.type" class="fad fa-times"></i>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </transition-group>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {

  },
  
})
export default class Popup extends Vue {
}
</script>
<style scoped>
#notifications {
    position: fixed;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    bottom: 0;
    right: 0;
    padding: 20px;
    z-index: 2000;
}

.notification {
    position: relative;
    pointer-events: auto;
    box-shadow: 0 0 5Px gainsboro;
    max-width: 90%;
    min-width: 250px;
    overflow: hidden;
    margin: 10px auto;
}

.spinner {
    top: 0;
    left: 0;
    border: 2px transparent solid;
    border-top: 2px white solid;

    width: 30px;
    height: 30px;
    border-radius: 30px;
}

.bg-primary .spinner,
.bg-danger .spinner,
.bg-warning .spinner {
    border-top: 2px white solid;
}

.icon {
    /*position: absolute;*/
    font-size: 20px;
    /*padding-right: 10px;*/
    /*opacity: .1;*/
    /*left: -25px;*/
    /*top: -50px;*/
    /*z-index: 0;*/
}

.slideRight-enter-active,
.slideRight-leave-active {
    transition: all .5s ease;
}

.slideRight-enter,
.slideRight-leave-to {
    transform: translateX(100%);
    opacity: 0;
}</style>
