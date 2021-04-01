<template>
    <div>
        <h1>添加信息对象</h1>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="信息对象名称" label-width="100px">
              <el-col :span="8">
                <el-input v-model="form.name"  ></el-input>
              </el-col>

            </el-form-item>
            <el-form-item label="对象描述">
              <el-col :span="8">
                <el-input v-model="form.intro" ></el-input>
              </el-col>

            </el-form-item>

            <el-form-item label="对象简介">
              <el-col :span="8">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-col>

            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">添加</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>


</template>

<script>
    export default {
        name: "AddObject",
        methods: {
            handleClick(row) {
                console.log(row);
            },
            onSubmit() {
                console.log('submit!');
            }
        },
        data() {
            return {
                prefix:'',
                form: {
                    name: '',
                    intro: '',
                    desc: ''
                }
            }
        },
        created() {
            const _this = this
            _this.prefix = _this.$route.params.data
            //console.log(_this.$route.params)
        }
    }
</script>

<style scoped>

</style>


