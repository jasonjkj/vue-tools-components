<template>
	<div class="RouterList">
		<div v-for="(item,index) in routeList">
			<router-link :to="item.path">
				<el-link type="primary">{{ item.name }}</el-link>
			</router-link>
		</div>
	</div>
</template>

<script>
    import routeList from '../router/routes.js'

    export default {
        name: "RouterList",
        data() {
            return {
                routeList: routeList
            }
        }

    }
</script>

<style scoped>

</style>
