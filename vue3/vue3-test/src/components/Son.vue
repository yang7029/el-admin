<template>
    <div class="son">
        <h3>我是Son组件(孙),{{ car.name }}---{{ car.price }}</h3>
    </div>
</template>

<script>
import { inject } from 'vue';
export default {
    name: 'Son',
    setup() {
        let car = inject('car');
        // console.log('car', car.name, car.price);
        return {
            car,
        };
    },
};
</script>

<style>
.son {
    background-color: salmon;
    padding: 10px;
}
</style>