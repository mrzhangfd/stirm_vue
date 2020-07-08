<template>
    <div>
        <h1>演进信息提取及可视化</h1>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="objectId"
                    label="id"
                   >
            </el-table-column>
            <el-table-column
                    prop="realName"
                    label="真实姓名"
                    >
            </el-table-column>
            <el-table-column
                    prop="rawInfo"
                    label="简介"
                   >
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small" @click="editObject(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>

</template>

<script>
    export default {
        name: "PageTwo",
        methods: {
            handleClick(row) {
                console.log(row);
            },
            editObject(row){
                const _this = this
            }
        },

        data() {
            return {
                data:'',
                tableData: [{
                    objectId:'',
                    realName: '',
                    rawInfo:'',
                    params:{},
                    events:[],

                },]
            }
        },
        created() {
            const _this = this
            _this.tableData = _this.$route.params.data
            console.log(_this.$route.params)
        }
    }
</script>

<style scoped>

</style>
