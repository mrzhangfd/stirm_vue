<template>

    <div>
        <h2>
            TestCanvas
        </h2>

        <!--            <img src="../assets/2.jpg"-->
        <!--                 v-show="false"-->
        <!--                 ref="myImg"-->
        <!--            >-->

        <img src="../assets/2.jpg"
             v-show="false"
             ref="myImg1"
        >
        <canvas id="downCanvas"
                class="canvas"
                ref="downCanvas"
                style="border:1px solid #c3c3c3;"
        >
            您的浏览器不支持 HTML5 canvas 标签。
        </canvas>

        <!--            <canvas-->
        <!--                    ref="upCanvas"-->
        <!--                    class="canvas"-->
        <!--                    id="upCanvas"-->
        <!--                    style="border:1px solid #c3c3c3;"-->
        <!--            >-->
        <!--                您的浏览器不支持 HTML5 canvas 标签。-->
        <!--            </canvas>-->

<!--        <button-->
<!--                @click="mounted">-->
<!--            下载-->
<!--        </button>-->
    </div>


</template>
<script>
    export default {
        data() {
            return {
                width: 200,
                points: [[10, 10], [20, 20], [30, 30], [40, 40]]
            }
        },
        methods: {}, mounted() {
            console.log("挂载成功");
            //获取元素
            var c = this.$refs.downCanvas;
            //获取绘图工具
            const ctx = c.getContext("2d");
            //const img = this.$refs.myImg;
            // const img = new Image()
            // img.src="../assets/logo.png"
            // img.onload=
            var img1 = this.$refs.myImg1;
            console.log(img1)
            // 贴图
            ctx.drawImage(img1, 0, 0 ,4000,2333,0,0,800,480);
            //ctx.drawImage(img1,200,200)
            //ctx.fillRect(250, 250, 1, 1)
            // for (const index in this.points) {
            //     console.log(this.points[index])
            //     ctx.fillRect(this.points[index][0], this.points[index][1], 5, 5)
            // }
            //ctx.font = "10px Arial";
            // 打水印
            // ctx.fillText("zfd", 160, 90);
        }
    }

</script>
<style>
    /*元素选择器直接写 如：div{}；id选择器用#canvas{}，class选择器用.canvas{}*/
    #downCanvas {
        position: relative;
        z-index: 1;
        width: 1000px;
        height: 500px;

    }

    #upCanvas {

        position: relative;
        top: -506px;
        /*opacity: 0;*/
        z-index: 2;
        width: 600px;
        height: 600px;
    }

</style>
