<template>
    <canvas
            class="ec-canvas"
            :canvas-id="canvasId"
            @init="init"
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd"
            :style="customStyle"
    >
    </canvas>
</template>

<script>
	import WxCanvas from './wx-canvas'
	import * as echarts from './echarts'

	function wrapTouch(event) {
		for (let i = 0; i < event.touches.length; ++i) {
			const touch = event.touches[i]
			touch.offsetX = touch.x
			touch.offsetY = touch.y
		}
		return event
	}

	let ctx;

	export default {
		props: {
			canvasId: {
				type: String,
				value: 'ec-canvas'
			},
			ec: {
				type: Object
			},
			customStyle: {
				type: String,
				default: 'width: 100%;height: 100%;'
			}
		},
		data() {
			return {
				// 只能用 $ 开头的变量名，否则报 JSON 循环错误？
				$chart: {}
			};
		},
		methods: {
			init(callback) {
				const version = wx.version.version.split('.').map(n => parseInt(n, 10));
				const isValid = version[0] > 1 || (version[0] === 1 && version[1] > 9) ||
					(version[0] === 1 && version[1] === 9 && version[2] >= 91);
				if (!isValid) {
					console.error('微信基础库版本过低，需大于等于 1.9.91。' +
						'参见：https://github.com/ecomfe/echarts-for-weixin' +
						'#%E5%BE%AE%E4%BF%A1%E7%89%88%E6%9C%AC%E8%A6%81%E6%B1%82');
					return;
				}

				ctx = wx.createCanvasContext(this.canvasId, this);

				const canvas = new WxCanvas(ctx, this.canvasId);

				echarts.setCanvasCreator(() => {
					return canvas;
				});

				var query = wx.createSelectorQuery().in(this);
				query.select('.ec-canvas').boundingClientRect(res => {
					// fixed by xy
					this.$chart = this._initChart(canvas, res.width, res.height);
				}).exec();
			},
			// created by xy 修改图表的数据
			updateOption(value) {
				this.$chart.setOption(value);
			},
			// created by xy 将初始化 charts 放在组件内
			_initChart(canvas, width, height) {
				const chart = echarts.init(canvas, null, {
					width,
					height
				});
				canvas.setChart(chart);
				chart.setOption(this.ec.option);
				return chart;
			},
			canvasToTempFilePath(opt) {
				if (!opt.canvasId) {
					opt.canvasId = this.canvasId;
				}

				ctx.draw(true, () => {
					wx.canvasToTempFilePath(opt, this);
				});
			},
			touchStart(e) {
				if (this.ec.stopTouchEvent) {
					e.preventDefault()
					e.stopPropagation()
					return
				}
				if (this.$chart && e.touches.length > 0) {
					var touch = e.touches[0];
					var handler = this.$chart.getZr().handler;
					handler.dispatch('mousedown', {
						zrX: touch.x,
						zrY: touch.y
					});
					handler.dispatch('mousemove', {
						zrX: touch.x,
						zrY: touch.y
					});
					handler.processGesture(wrapTouch(e), 'start');
				}
			},
			touchMove(e) {
				if (this.ec.stopTouchEvent) {
					e.preventDefault()
					e.stopPropagation()
					return
				}
				if (this.$chart && e.touches.length > 0) {
					var touch = e.touches[0];
					var handler = this.$chart.getZr().handler;
					handler.dispatch('mousemove', {
						zrX: touch.x,
						zrY: touch.y
					});
					handler.processGesture(wrapTouch(e), 'change');
				}
			},
			touchEnd(e) {
				if (this.ec.stopTouchEvent) {
					e.preventDefault()
					e.stopPropagation()
					return
				}
				if (this.$chart) {
					const touch = e.changedTouches ? e.changedTouches[0] : {};
					var handler = this.$chart.getZr().handler;
					handler.dispatch('mouseup', {
						zrX: touch.x,
						zrY: touch.y
					});
					handler.dispatch('click', {
						zrX: touch.x,
						zrY: touch.y
					});
					handler.processGesture(wrapTouch(e), 'end');
				}
			}
		},
		created() {
			if (!this.ec) {
				console.warn('组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" ' +
					'canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>');
				return;
			}

			if (!this.ec.lazyLoad) {
				this.init();
			}
		}
	}
</script>

<style>
    .ec-canvas {
        width: 100%;
        height: 100%;
    }
</style>
