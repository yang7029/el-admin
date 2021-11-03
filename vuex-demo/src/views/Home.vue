<template>
    <!-- 直接使用vuex    $store.state.count -->
    <div>
        <!-- count:{{ $store.state.count }} -->
        count:{{ $store.state.home.count }}
        <button @click="addcount">加法</button>
        <button @click="inccount">减法</button>
        getters：派生属性测试
        <input type="text" v-model="$store.getters.desc" />
    </div>
</template>
<script>
export default {
    methods: {
        addcount() {
            // console.log(this.$store.state.count);
            // this.$store.commit('increase', 10);
            this.$store.dispatch('add', 5);
        },
        inccount() {
            console.log(this.$store.state.home.count);
            this.$store.commit('subtraction', 3);
        },
    },
};
</script>