<template>
    <component :is="wrapper" :class="classes">

        <!-- Logo SVG -->
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
		if (this.logoOnly) {
			this.runLogoAnimation()
		}
	},
	methods: {
		runLogoAnimation () {
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

			// animation vars
			const letterOffsetStart = -100

			const seq = [
				{
					// expand horizontal bar
					e: horizontal,
					p: {
						width: [35.3, 8],
						translateX: [0, -10]
					},
					o: { duration: duration / 2, easing }
				},
				{
					// move bars from left of word to right
					e: rectWrapper,
					p: {
						translateX: [0, -wrapWidth - 45]
					},
					o: {
						sequenceQueue: false,
						duration: duration + 10,
						easing
					}
				}
			]

			// Apply animation to letters if logo-only
			const letters = [...this.$el.querySelectorAll('.word-wrap > *')]
			letters.map(letter => letter.classList.remove('visible'))

			letters.map((letter, i) => {
				seq.push({
					e: letter,
					p: {
						translateX: [0, letterOffsetStart - (i * 5)]
					},
					o: {
						begin: ([el]) => {
							setTimeout(() => {
								el.classList.add('visible')
							}, 20 * i)
						},
						sequenceQueue: false,
						duration,
						easing,
						delay: i === 0 ? 80 : 0
					}
				})
			})

			Velocity.RunSequence(seq)
		}
	}
}

</script>

<style lang="scss">

.animating-word {
    font-size: 56px;

    .word-wrap > *:not(.visible) {
        opacity: 0;
    }
}

</style>
