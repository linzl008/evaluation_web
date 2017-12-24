/**
 * Created by Linzl on 2017/9/29.
 */
import Vue from'vue'

function confirm(_content,callback){
    var content = {
        title:"此操作将永久删除该列表, 是否继续?",
        remind:"提示",
        confirm_btn:'确定',
        cancel_btn:'取消',
        type:'warning',
        cancel:'已取消操作'
    }
    content = Object.assign(content,_content);
    Vue.prototype.$confirm(content.title, content.remind, {
        confirmButtonText: content.confirm_btn,
        cancelButtonText: content.cancel_btn,
        type: content.type
    }).then(() => {
        callback();
    }).catch((err) => {
        console.log(err)
        Vue.prototype.$message.info(content.cancel);
    });
}

//获取 params 的字符串
function getParams(params){
    var temp="";
    for(var key in params){
        temp+=`${key}=${params[key]}&`;
    }
    temp = temp.substring(0, temp.length-1)
    return `${temp}`;
}
function dateFormat(date,formatStr)
{
    var str = formatStr;
    var Week = ['日','一','二','三','四','五','六'];
    str=str.replace(/yyyy|YYYY/,date.getFullYear());
    str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():'0' + (date.getYear() % 100));
    str=str.replace(/MM/,date.getMonth()>9?date.getMonth().toString():'0' + date.getMonth());
    str=str.replace(/M/g,date.getMonth());
    str=str.replace(/w|W/g,Week[date.getDay()]);
    str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0' + date.getDate());
    str=str.replace(/d|D/g,date.getDate());
    str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():'0' + date.getHours());
    str=str.replace(/h|H/g,date.getHours());
    str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():'0' + date.getMinutes());
    str=str.replace(/m/g,date.getMinutes());
    str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():'0' + date.getSeconds());
    str=str.replace(/s|S/g,date.getSeconds());
    return str;
}
//处理返回码提示问题
function solve_res(res , message,error){
    var code = res.code || "";
    var msg = res.msg || "";
    // console.log(code,msg);
    //操作成功
    if(code == "0000"){
        if(message){
            Vue.prototype.$message({
                type: 'success',
                message: message,
                duration: 1000,
            })
        }
        // Vue.prototype.$message.success(message);
        return true;
    }else{//操作失败
        if(code == "0004"){ //
            Vue.prototype.$message({
                type: 'error',
                message: msg,
                duration: 1000,
            })
            // Vue.prototype.$router.push('/'); //登录超时
        }else{
            if(error){
                Vue.prototype.$message({
                    type: 'error',
                    message: error,
                    duration: 1000,
                })
            }
        }
        // Vue.prototype.$message.error(error);
        return false;
    }
}
//展示数据：数字 转成 中文
function changeNumToCN(config) {
    let desc = "";
    switch (config) {
        case "0":
            desc = "单位净值";
            break;
        case "1":
            desc = "累计净值";
            break;
        case "2":
            desc = "万份收益";
            break;
        case "3":
            desc = "七日年化";
            break;
        case "4":
            desc = "最近一日";
            break;
        case "5":
            desc = "最近一周";
            break;
        case "6":
            desc = "最近一月";
            break;
        case "7":
            desc = "最近三月";
            break;
        case "8":
            desc = "最近六月";
            break;
        case "9":
            desc = "最近一年";
            break;
        case "10":
            desc = "今年以来";
            break;
        case "11":
            desc = "成立以来";
            break;
        default:
            desc = "";
            break;
    }
    return desc;
}
//展示数据：数字 转成 中文
function changeCNToNum(config) {
    let desc = "";
    switch (config) {
        case "单位净值":
            desc = "0";
            break;
        case "累计净值":
            desc = "1";
            break;
        case "万份收益":
            desc = "2";
            break;
        case "七日年化":
            desc = "3";
            break;
        case "最近一日":
            desc = "4";
            break;
        case "最近一周":
            desc = "5";
            break;
        case "最近一月":
            desc = "6";
            break;
        case "最近三月":
            desc = "7";
            break;
        case "最近六月":
            desc = "8";
            break;
        case "最近一年":
            desc = "9";
            break;
        case "今年以来":
            desc = "10";
            break;
        case "成立以来":
            desc = "11";
            break;
        default:
            desc = "";
            break;
    }
    return desc;
}

export {
    confirm,
    solve_res,
    getParams,
    dateFormat,
    changeCNToNum,
    changeNumToCN
}