<template>
  <div class="banner">
      <el-tabs v-model="activeTabsName" >
        <el-tab-pane label="首页banner" name="first">
          <el-button class="add"  size="mini" type="primary" @click="homeBannerAdd">新增</el-button>
          <el-table border :data="homeBanner" class="table" v-loading="loading1" element-loading-text="拼命加载中">
            <el-table-column label="序号"  prop="imgid" width="70" align="center"></el-table-column>
            <el-table-column label="预览图" style="overflow-y: hidden" width="236"  align="center">
              <template slot-scope="scope">
                <!--<img src="scope.row.image">-->
                <img :src="debugHead+scope.row.imgurl"/>
                <!--{{debugHead+scope.row.imgurl}}-->
              </template>
            </el-table-column>
            <el-table-column label="链接"  prop="imglink" align="center"></el-table-column>
            <el-table-column label="位置调整"  align="center" >
              <template slot-scope="scope" class="operate">
                <el-button size="mini" @click="homeBannerMove(scope.$index,scope.row,'top')">置顶</el-button>
                <el-button size="mini" @click="homeBannerMove(scope.$index, scope.row,'up')">上移</el-button>
                <el-button size="mini" @click="homeBannerMove(scope.$index,scope.row,'down')">下移</el-button>
                <el-button size="mini" @click="homeBannerMove(scope.$index,scope.row,'bottom')">置底</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作"  prop="title" width="180" align="center">
              <template slot-scope="scope" class="operate">
                <el-button type="primary" size="mini" @click="homeBannerEdit(scope.$index,scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="homeBannerDel(scope.$index,scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="标签页banner" name="second">
          <el-button class="add"  type="primary" size="mini" @click="tabBannerAdd" >新增</el-button>
          <el-table border :data="tabBanner" class="table" v-loading="loading2" element-loading-text="拼命加载中">
            <el-table-column label="序号"  prop="imgid" width="70" align="center"></el-table-column>
            <el-table-column label="预览图" style="overflow-y: hidden" width="236"  align="center">
              <template slot-scope="scope">
                <!--<img src="scope.row.image">-->
                <img :src="debugHead+scope.row.imgurl"/>
              </template>
            </el-table-column>
            <el-table-column label="链接"  prop="imglink" align="center"></el-table-column>
            <el-table-column label="操作"  prop="title" align="center">
              <template slot-scope="scope" class="operate">
                <el-button type="primary" size="mini" @click="tabBannerEdit(scope.$index,scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="tabBannerDel(scope.$index,scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    <imageUpload-edit :edit="editData"  :type='type' :visible="editVisible" @upadteOrAdd="upadteOrAdd" @close="closeEdit" ></imageUpload-edit>
  </div>
</template>

<script>

  import ImageUploadEdit from './imageUpload-edit.vue';
  import { DebugHead } from '@/config/base_config';
  import { confirm ,solve_res ,getParams} from '@/tool/utils';
  import api from '@/api/restful-api'

  export default {
    name:'',
    components: {
      ImageUploadEdit
    },
    created(){
      console.log("created")
      this.debugHead = DebugHead;
      console.log(this.debugHead)
      this.updateList(1)
      this.updateList(2)
    },
    data(){
      return {
        type:'',
        debugHead:'',
        editVisible: false,
        editData:{},
        loading1:true,
        loading2:true,
        activeTabsName: 'first',
        homeBanner:[],
        tabBanner:[],
      }
    },
    methods:{
      homeBannerAdd(){
        this.editData={
          uploadfile:'',
          bannername:"",
          imglink:'',
          bannertype:'1',
        }
        this.type='home';
        this.editVisible = true
      },
      homeBannerMove(index,row,operate){
        var type = this.checkActiveName();
        var params = {
          sortflag1:row.sortflag,
          sortflag2:row.sortflag,
          bannertype:row.bannertype
        }
        params.sortflag1 = Number(params.sortflag1);

        var end = Number(this.homeBanner[this.homeBanner.length-1].sortflag);
        if(operate == 'top'){
          if(params.sortflag1<=1){
            return ;
          }else{
            params.sortflag2 = 1;
          }
        }
        if(operate == 'up'){
          if(params.sortflag1<=1){
            return ;
          }else{
            params.sortflag2 = params.sortflag1 - 1;
          }
        }
        if(operate == 'down'){
          if(params.sortflag1>=end){
            return ;
          }else{
            params.sortflag2 = params.sortflag1 + 1;
          }
        }
        if(operate == 'bottom'){
          if(params.sortflag1>=end){
            return ;
          }else{
            params.sortflag2 = end;
          }
        }
        console.log("home move:",row,params);
        this.$http.get(api.moveBannerList +`?${getParams(params)}`).then(res=>{
          if(solve_res(res,"移动成功","移动失败")){
            this.updateList(type)
          }
        }).catch(err=>{
          this.$message.error("移动失败");
        })
      },
      homeBannerEdit(index,row){
        console.log("edit");
        this.editData = row;
        this.type='home';
        this.editVisible = true;
      },
      homeBannerDel(index,row){
        console.log("del",row);
        var params={
          imgid:row.imgid,
          bannertype:row.bannertype
        }
        var type = this.checkActiveName();
        confirm({title:'确定删除该广告图？'},()=> {
          this.$http.delete(api.deleteBannerList+`?${getParams(params)}`).then(res=>{
            if(solve_res(res,"删除成功","删除失败")){
             this.updateList(type);
            }
          }).catch(err=>{
            this.$message.error('删除失败!');
          })
        })
      },

      tabBannerAdd(){
        //弹框
        this.editData={
          uploadfile:'',
          bannername:"",
          imglink:'',
          bannertype:'2',
        }
        this.type='tab';
        this.editVisible = true
      },
      tabBannerEdit(index,row){
        console.log("edit");
        this.editData = row;
        this.type='tab';
        this.editVisible = true;
      },
      tabBannerDel(index,row){
        console.log("tabBannerDel",row);
        var params={
          imgid:row.imgid,
          bannertype:row.bannertype
        }
        var type = this.checkActiveName();
        confirm({title:'确定删除该广告图？'},()=> {
          this.$http.delete(api.deleteBannerList+`?${getParams(params)}`).then(res=>{
            if(solve_res(res,"删除成功","删除失败")){
              this.updateList(type);
            }
          }).catch(err=>{
            this.$message.error('删除失败!');
          })
        })

      },
      updateList(type){
        var params={
          bannertype:type
        }
        if(type=='1'){
          this.loading1 = true;
          this.$http.get(api.getBannerList+`?${getParams(params)}`).then(res=>{
            if(solve_res(res,"","查询失败")){
              this.homeBanner=res.rows;
            }
            this.loading1 = false;
          })
         }
        if(type == '2'){
          this.loading2 = true;
          this.$http.get(api.getBannerList+`?${getParams(params)}`).then(res=>{
            if(solve_res(res,"","查询失败")) {
              this.tabBanner = res.rows;
            }
            this.loading2 = false;
          })
        }
      },
      upadteOrAdd(data){
//        setTimeout(()=>location.reload(),1000);
        console.log(data);
        var formData =new FormData();
        formData.append('imglink', data.data.imglink);
        formData.append('bannertype', data.data.bannertype);

        if( !data.data.imgid){//执行增加操作
          formData.append('uploadfile', data.file);
          this.$http.post(api.addBannerList,formData).then(res=>{
            if(solve_res(res,'添加成功',"添加失败")){
              this.updateList(data.data.bannertype);
              this.closeEdit();
            }
          }).catch(err=>{
            this.$message.error("添加失败");
          })
        }else{//执行更新操作
          if(data.file.uid){ //如果选择了文件，就上传否则不上传
            formData.append('uploadfile', data.file);
          }
          formData.append('imgid', data.data.imgid);
          this.$http.post(api.updateBannerList,formData).then(res=>{
            if(solve_res(res,'更新成功',"更新失败")){
              this.updateList(data.data.bannertype);
              this.closeEdit();
            }
          }).catch(err=>{
            this.$message.error("更新失败");
          })
        }
      },
      closeEdit () {
        this.editVisible = false;
      },
      checkActiveName(){
        if(this.activeTabsName == "first"){
          return 1;
        }
        if(this.activeTabsName == 'second'){
          return 2
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .banner {
    text-align:left;

    .add{
      padding-left: 15px;
      padding-right: 15px;
    }
    img {
      max-width: 200px;
      max-height: 200px;
      height:auto;
      /*zoom:expression( function(e) {*/
/*if(e.width>e.height) {if (e.width>200) { e.height = e.height*(200 /e.width); e.width=200; }}*/
/*else {if (e.height>200) { e.width = e.width*(200 /e.height); e.height=200; }}*/
/*e.style.zoom = '1';     }(this));*/
      overflow:hidden;
    }
  }

</style>
