

<template>
    <view class="test"
          @touchstart="touchstart"
          @touchmove="touchmove"
          @touchend="touchend"
    >
        <slot></slot>
    </view>
</template>

<script>
	export default {
		name:"slide-view",
		data() {
			return {
				isTouched:false,
				touchTime:'',
				points:[]
			};
		},
		props:{
			useDirection:{
				type: String,
				default: 'x'
			},
			slideMaxTime:{
				type: [String,Number],
				default: 500
			},
			data:{
				type:Object,
                default(){
					return {};
                }
            }
		},
		created(){

		},
		methods:{
			touchstart:function(e){
				this.isTouched = true;
				this.clearPoint();
				this.savePoint(e);
				this.touchTime = new Date().getTime();
			},
			touchmove:function(e){
				if(!this.isTouched){return;}

				this.savePoint(e);

				// if(this.points.length<2){return;}

				// let points = this.getStartAndEndPoint(),
				// 	move_x = Math.abs(points.move.x),
				// 	move_y = Math.abs(points.move.y);
                //
				// if(this.useDirection == "x"){
				// 	if(move_x > move_y){
				//
				// 	}
				// }else{
				// 	if(move_y > move_x){
				//
				// 	}
				// }
			},
			touchend:function(e){
				if(!this.isTouched){return;}
				this.isTouched = false;
				let time = new Date().getTime(),
					points = this.getStartAndEndPoint(),
					notSlide = (time - this.touchTime > this.slideMaxTime);

				//超时不触发滑动
				if(notSlide){return;}

				let m_x = points.move.x,
					m_y = points.move.y,
					is_x_long = (Math.abs(m_x) >= Math.abs(m_y));

				//右滑
				if(m_x>0 && is_x_long){
					if(this.useDirection != "y"){
						this.slideRightFn(e);
					}
				}
				//左滑
				if(m_x<0 && is_x_long){
					if(this.useDirection != "y") {
						this.slideLeftFn(e);
					}
				}
				//上滑
				if(m_y<0 && !is_x_long){
					if(this.useDirection != "x") {
						this.slideUpFn(e);
					}
				}
				//下滑
				if(m_y>0 && !is_x_long){
					if(this.useDirection != "x") {
						this.slideDownFn(e);
					}
				}
			},
			savePoint:function(e){
				let touch = (e.touches)? e.touches[0] : e;
				this.points.push({x:touch.clientX,y:touch.clientY});
			},
			clearPoint:function(){
				this.points = [];
			},
			getStartAndEndPoint:function(){
				let sPoint = this.points[0],
					len = this.points.length,
					ePoint = this.points[len-1],
					moveX = ePoint.x - sPoint.x,
					moveY = ePoint.y - sPoint.y;

				return {
					start:sPoint,
					end:ePoint,
					move:{
						x:moveX,
						y:moveY
					}
				}
			},

			slideRightFn(e){
				// var myEventDetail = {}; // detail对象，提供给事件监听函数
				// var myEventOption = {}; // 触发事件的选项
                // this.triggerEvent('slideright', myEventDetail, myEventOption)
				this.$emit('slideRight',this.data);
			},
			slideLeftFn(e){
				// var myEventDetail = {}; // detail对象，提供给事件监听函数
				// var myEventOption = {}; // 触发事件的选项
				// this.triggerEvent('slideleft', myEventDetail, myEventOption)
				this.$emit('slideLeft',this.data);
			},
			slideUpFn(e){
				// var myEventDetail = {}; // detail对象，提供给事件监听函数
				// var myEventOption = {}; // 触发事件的选项
				// this.triggerEvent('slideup', myEventDetail, myEventOption)
				this.$emit('slideUp',this.data);
			},
			slideDownFn(e){
				// var myEventDetail = {}; // detail对象，提供给事件监听函数
				// var myEventOption = {}; // 触发事件的选项
				// this.triggerEvent('slidedown', myEventDetail, myEventOption)
				this.$emit('slideDown',this.data);
			}
		}
	}
</script>

<style scoped>

    .test{
        width: 100%; height: auto; display: block;
    }


</style>
