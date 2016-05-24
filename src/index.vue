<template>
  <div class="mt-range" :class="{ 'mt-range__disabled': disabled }">
    <slot name="start"></slot>
    <div class="mt-range--content" v-el:content>
      <div class="mt-range--progress" :style="{ width: progress + '%' }"></div>
      <div class="mt-range--thumb" v-el:thumb :style="{ left: progress + '%' }"></div>
    </div>
    <slot name="end"></slot>
  </div>
</template>

<style>
  .mt-range {
    position: relative;
    display: flex;
    height: 30px;
    line-height: 30px;
  }

  .mt-range__disabled {
    opacity: 0.5;
  }

  .mt-range > * {
    display: flex;
    display: -webkit-box;
  }

  .mt-range *[slot=start] {
    margin-right: 5px;
  }

  .mt-range *[slot=end] {
    margin-left: 5px;
  }

  .mt-range--content {
    position: relative;
    flex: 1;
    margin-right: 30px;
  }

  .mt-range--content::before {
    position: absolute;
    content: "";
    top: 50%;
    left: 0;
    right: -30px;
    border-top: 1px solid #a9acb1;
  }

  .mt-range--thumb {
    background-color: #fff;
    position: absolute;
    left: 0;
    top: 0;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    cursor: move;
    box-shadow: 0 1px 3px rgba(0,0,0,.4);
  }

  .mt-range--progress {
    position: absolute;
    display: block;
    height: 1px;
    background-color: #04be02;
    top: 50%;
    width: 0;
  }
</style>

<script type="text/ecmascript-6">
  import draggable from './draggable';

  export default {
    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 10
      },
      step: {
        type: Number,
        default: 1
      },
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: Number
      }
    },
    computed: {
      progress() {
        const value = this.value;
        if (typeof value === 'undefined' || value === null) return 0;
        return Math.floor((value - this.min) / (this.max - this.min) * 100);
      }
    },
    ready() {
      const { thumb, content } = this.$els;

      const getThumbPosition = () => {
        const contentBox = content.getBoundingClientRect();
        const thumbBox = thumb.getBoundingClientRect();

        return {
          left: thumbBox.left - contentBox.left,
          top: thumbBox.top - contentBox.top
        };
      };

      let dragState = {};
      draggable(thumb, {
        start: () => {
          if (this.disabled) return;
          const position = getThumbPosition();
          dragState = {
            thumbStartLeft: position.left,
            thumbStartTop: position.top
          };
        },
        drag: (event) => {
          if (this.disabled) return;
          const contentBox = content.getBoundingClientRect();
          const deltaX = event.pageX - contentBox.left - dragState.thumbStartLeft;
          const stepCount = Math.ceil((this.max - this.min) / this.step);
          const newPosition = (dragState.thumbStartLeft + deltaX) - (dragState.thumbStartLeft + deltaX) % (contentBox.width / stepCount);

          let newProgress = newPosition / contentBox.width;

          if (newProgress < 0) {
            newProgress = 0;
          } else if (newProgress > 1) {
            newProgress = 1;
          }

          this.value = Math.round(this.min + newProgress * (this.max - this.min));
        },
        end: () => {
          if (this.disabled) return;
          dragState = {};
        }
      });
    }
  };
</script>
