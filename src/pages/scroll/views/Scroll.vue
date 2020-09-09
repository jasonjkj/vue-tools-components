<template>
  <div class="Scroll" >
    <RecycleScroller
      class="scroller"
      :items="list"
      :item-size="32"
      key-field="id"
      v-slot="{item,index}"
    >
      <div class="user">
        {{ item.name }}{{ index }}
      </div>
    </RecycleScroller>
  </div>
</template>

<script>
    export default {
        name: "Scroll",
        data(){
            return {
                list:[

                    ]
            }
        },
        mounted() {
            for(var i=0;i<100000 ;i++){
                this.list.push(
                    {
                        name:"jkj",
                        id:i
                    }
                )
            }

        }
    }
</script>

<style scoped>
  .scroller {
    height: 100px
  }

  .user {

  }
</style>
