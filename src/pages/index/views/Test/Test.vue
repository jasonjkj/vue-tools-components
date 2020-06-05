<template>
    <div class="Test">
        <h1> index </h1>
        Test 测试组件
        <h3> {{ $store.state.name }} </h3>
        <h3> {{ $store.state.sex }} </h3>
    </div>
</template>

<script>
    //import hotHead from './components/matchPage/myHead.vue'
    export default {
        name: "Test",
        props:{
        },
        created:function(){
            debugger
            this.$store.state.name = "Index"

            console.log(this.$store.state.name);
            setTimeout(()=>{
                this.$store.state.name = "Index"
                console.log(this.$store.state);
            },3000)
        },
        mounted(){

        },
        data:function () {
            return {

            }
        },
        methods:{

        },
        computed: {

        },
        watch:{

        },
        components: {

        },
    }
</script>
<style scoped >


</style>
