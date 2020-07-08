<template>
    <div>
        <h1>常规操作：基础数据（信息对象、演进信息、关联信息）的增删改操作。</h1>

        <el-form :inline="true">
            <el-form-item>
                <el-input
                        type="textarea"
                        autosize
                        placeholder="曹操"
                        v-model="prefix"
                        style="width: 200px">
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="searchObject()">搜索</el-button>
                <el-button type="primary" icon="el-icon-search" @click="addObject()">新增</el-button>
            </el-form-item>
        </el-form>

        <br>
        <br>

        <el-form ref="form" :model="form" label-width="80px" v-if="showAddView" inline="true">
            <el-form-item label="对象名称" label-width="100px">
                <el-input v-model="form.name" style="width: auto"></el-input>
            </el-form-item>
            <el-form-item label="对象描述" label-width="100px">
                <el-input v-model="form.desc" style="width: auto"></el-input>
            </el-form-item>
            <el-form-item label="对象简介" label-width="100px">
                <el-input v-model="form.intro" type="textarea" style="width: auto"></el-input>
            </el-form-item>

            <!--                <el-form-item label="活动形式">-->
            <!--                    <el-input type="textarea" v-model="form.desc"></el-input>-->
            <!--                </el-form-item>-->
            <el-form-item>
                <el-button type="primary" @click="onSubmit(form)">添加</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>


    </div>

</template>

<script>
    export default {
        name: "MainView",
        data() {
            return {
                prefix: '',
                showAddView: false,
                form: {
                    name: '',
                    desc: '',
                    intro: '',
                }
            }
        },
        methods: {
            /*检索对象*/
            searchObject() {
                const _this = this
                axios.get("http://localhost:8080/getobjectlist", {
                    params: {
                        prefix: _this.prefix
                    }
                }).then(function (resp) {
                    //console.log(resp.data)
                    if (resp.data.code === 200) {
                        _this.$router.push({
                            path: '/p2',
                            //此处的应该用单引号
                            //https://www.cnblogs.com/toonezhr/p/10325457.html
                            //由于动态路由也是传递params的，所以在 this.$router.push() 方法中path不能和params一起使用，
                            // 否则params将无效。需要用name来指定页面。
                            name: '展示检索结果', params: {
                                data: resp.data.data
                            }
                        })
                        //页面刷新
                        //window.location.reload();
                    }
                })
            },

            /*添加对象*/
            addObject() {
                const _this = this
                _this.showAddView = true
                // _this.$router.push({path:'/addobject',
                //     //此处的应该用单引号
                //     //https://www.cnblogs.com/toonezhr/p/10325457.html
                //     //由于动态路由也是传递params的，所以在 this.$router.push() 方法中path不能和params一起使用，
                //     // 否则params将无效。需要用name来指定页面。
                //     name: '添加对象', params: {
                //         data: _this.prefix
                //     }
                // })
            },
            /*添加对象的提交按钮*/
            onSubmit(form) {
                alert(form.intro)
                console.log(form.name)
                // axios.post("http://localhost:8080/addobjectlist", {
                //     params: {
                //         prefix: _this.prefix
                //     }
                //
                // })
            }
            // axios.post("http://localhost:8080/addobjectlist", {
            //     params: {
            //         prefix: _this.prefix
            //     }
            //
            // })
        }

    }
</script>

<style scoped>

</style>
