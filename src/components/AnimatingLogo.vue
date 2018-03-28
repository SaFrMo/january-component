<template>
    <component :is="wrapper" class="animating-word">
        <span v-html="logoSvg"/>
    </component>
</template>

<script>
import logoSvg from './JanuaryLogo.svg'

export default {
	data () {
		return {
			logoSvg
		}
	},
	props: {
		wrapper: {
			type: String,
			default: 'div'
		}
	}
}

</script>

<style lang="scss">

.animating-word {
    font-size: 64px;
}

</style>
