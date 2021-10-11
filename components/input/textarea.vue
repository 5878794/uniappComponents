
<template>
    <view class="box_slc" style="height:100%;">
        <view class="box_hlc body">
            <view class="input_body box_hlt boxflex1" :class="disabledClass">

                <!--            判断是否有图标-->
                <image v-if="icon" class="icon_" :src="icon"></image>

                <view v-if="name" class="name textarea_name">{{name}}</view>

                <textarea
                        :style="textAlign__"
                        placeholder-class="placeholder_style"
                        :disabled="disabled"
                        class="__input_textarea__ boxflex1"
                        :placeholder="placeholder"
                        :value="val"
                        :rule="rule"
                        @input="onInput"
                />


                <view v-if="unit" class="unit">{{unit}}</view>

            </view>
        </view>
        <!--    <view class="err">{{err}}</view>-->
    </view>
</template>


<script>
    import mixinFn from "./mixin/mixin";
	export default {
		mixins:[mixinFn]
	}
</script>

<style scoped>
    @import "../../publish/box.css";
    @import "./mixin/publish.css";
</style>
