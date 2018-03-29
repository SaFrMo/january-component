<template>
    <component :is="wrapper" :class="classes">

        <!-- Logo SVG -->
        <span v-if="logoOnly" v-html="logoSvg" class="logo-svg"/>

        <!-- Typed text -->
        <span v-else class="typed-text">

            <span class="text">{{ cmpText }}</span>

            <svg v-if="typedLength" xmlns="http://www.w3.org/2000/svg" class="cursor" width="45" height="80" viewBox="0 0 45 80">
                <rect x="9.7" y="35" width="35.3" height="6"/>
                <rect y="45" width="6" height="35"/>
            </svg>

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
			logoSvg,
			typedLength: 0
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
		},
		cmpText () {
			return this.text.slice(0, this.typedLength)
		}
	},
	mounted () {
		if (this.logoOnly) {
			this.runLogoAnimation()
		} else {
			setTimeout(this.nextLetter, this.getNextLetterTimeout())
		}
	},
	methods: {
		getNextLetterTimeout () {
			return Math.random() * 100 + 50
		},
		nextLetter () {
			this.typedLength++

			if (this.typedLength < this.text.length) {
				setTimeout(this.nextLetter, this.getNextLetterTimeout())
			}
		},
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

    // Logo
    .logo-svg path:not(.visible) {
        opacity: 0;
    }

    // Typed text
    .typed-text {
        position: relative;

        .cursor {
            position: absolute;
            bottom: -24px;
        }
    }
}

</style>
