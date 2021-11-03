<template>
    <div class="child">
        <h3>我是Child组件(子)</h3>
        <Son></Son>
    </div>
</template>

<script>
import Son from './Son.vue';
export default {
    name: 'child',
    components: { Son },
};
</script>

<style>
.child {
    background-color: burlywood;
    padding: 10px;
}
</style>