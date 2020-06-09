<template>
	<div class="RouterList">
			<div v-for="(item,index) in routeList">
				<el-button>asdasd</el-button>
				 <el-button type="primary">主要按钮</el-button>
				<el-link type="primary">
					<router-link :to="item.path"> {{ item.name }} </router-link>
				</el-link>
			</div>
	</div>
</template>

<script>
		import routeList from  '../router/routes.js'
    export default {
        name: "RouterList",
		    data(){
            return {
                routeList:routeList
            }
		    }

    }
</script>

<style  scoped>

</style>
