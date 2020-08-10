<template>
	<div class="layout-menu-container">
		<LayoutSubmenu :items="model" class="layout-menu" :root="true" @menuitem-click="onMenuItemClick" />
	</div>
</template>

<script>
import LayoutSubmenu from './LayoutSubmenu';

export default {
	props: {
		model: Array
	},
    methods: {
        onMenuItemClick(event) {
            this.$emit('menuitem-click', event);
        }
    },
	components: {
		'LayoutSubmenu': LayoutSubmenu
	}
}
</script>

<style scoped>

</style>