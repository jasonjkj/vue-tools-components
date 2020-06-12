<template>
    <div class="WS">

    </div>
</template>

<script>
    //import hotHead from './components/matchPage/myHead.vue'
    import Ws from './Ws.js'
    export default {
        props:{
        },
        created:function(){
            var ws=new Ws({
                url:"ws://localhost:8080",
                receiveMsg:(event)=>{
                    console.log(event);
                }
            })
            setTimeout(()=>{
                ws.send('asdasd')
            },1000)

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
