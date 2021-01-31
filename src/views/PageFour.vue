<template>
    <div>
        <h1></h1>
        <viewer :images="handImg">
            <img v-for="src in handImg" :src="src" :key="src" width="50" height="50px">
        </viewer>
    </div>

</template>

<script>
    export default {
        name: "PageFour",
        data() {
            return {
                handImg: []
            }
        }
    }
</script>



<style scoped>

</style>
