<template>
    <component :is="wrapper" :class="classes" @click="runAnimation">
        <span v-if="!text || !text.length" v-html="logoSvg"/>

        <!-- TODO: vanilla text -->
        <span v-else>
            {{ text }}
        </span>
    </component>
</template>

<script>
import logoSvg from './JanuaryLogo.svg'
import Velocity from 'velocity-animate'
require('velocity-animate/velocity.ui')

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
		},
		text: {
			type: String,
			default: ''
		}
	},
	computed: {
		logoOnly () {
			return !this.text || !this.text.length
		},
		classes () {
			return [
				'animating-word',
				{ 'logo-only': this.logoOnly },
				{ 'text-only': !this.logoOnly }
			]
		}
	},
	mounted () {
		this.runAnimation()
	},
	methods: {
		runAnimation () {
			// horizontal bar
			const horizontal = this.$el.querySelector('svg .horizontal')
			// bar wrapper
			const rectWrapper = this.$el.querySelector('svg .rect-wrapper')

			// measure word width
			const wordWrap = this.$el.querySelector('.word-wrap')
			const wrapWidth = wordWrap.getBoundingClientRect().width

			// overall duration & easing
			const duration = 1000
			const easing = [0.23, 0.44, 0, 1]

			const seq = [
				{
					// expand horizontal bar
					e: horizontal,
					p: {
						width: [35.3, 8],
						translateX: [0, -10]
					},
					o: { duration, easing }
				},
				{
					// move bars from left of word to right
					e: rectWrapper,
					p: {
						translateX: [0, -wrapWidth + 20]
					},
					o: {
						sequenceQueue: false,
						duration,
						easing
					}
				}
			]

			Velocity.RunSequence(seq)
		}
	}
}

</script>

<style lang="scss">

.animating-word {
    font-size: 56px;

    .word-wrap {
        opacity: 0;
    }
}

</style>
