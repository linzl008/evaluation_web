/**
 * Created by Linzl on 2017/11/20.
 */
import config from './config'
//重构交互
export default{
//登录模块
    login :`${config.baseUrl}/login`,
    loginout :`${config.baseUrl}/midlogin/loginout`,

//banner 模块
    getBannerList :`${config.baseUrl}/mid/bannerimg/findlist`,
    addBannerList : `${config.baseUrl}/mid/bannerimg/add`,
    updateBannerList :`${config.baseUrl}/mid/bannerimg/update`,
    deleteBannerList :`${config.baseUrl}/mid/bannerimg/delete`,
    moveBannerList: `${config.baseUrl}/mid/bannerimg/movePosition`,

//获取基金列表信息
    getFundList :`${config.baseUrl}/mid/fundallocation/findFund`,

//跑马灯公告资讯模块，
    getNewsMarFundList :`${config.baseUrl}/mid/notifycenter/findlist`,
    addNewsMarFundList :`${config.baseUrl}/mid/notifycenter/add`,
    updateNewsMarFundList :`${config.baseUrl}/mid/notifycenter/update`,
    deleteNewsMarFundList :`${config.baseUrl}/mid/notifycenter/delete`,

//页面基金配置
    getPageFunds :`${config.baseUrl}/mid/pageallocation/findFund`,
    getPageFundList :`${config.baseUrl}/mid/pageallocation/findpage`,
    addPageFundList :`${config.baseUrl}/mid/pageallocation/addFund`,
    deletePageFundList :`${config.baseUrl}/mid/pageallocation/deleteFund`,
    movePageFundList :`${config.baseUrl}/mid/pageallocation/moveFund`,
    //热门搜索
    getSearchList :`${config.baseUrl}/mid/pupoSearch/findlist`,
    addSearch :`${config.baseUrl}/mid/pupoSearch/add`,
    updateSearch :`${config.baseUrl}/mid/pupoSearch/update`,
    deleteSearch :`${config.baseUrl}/mid/pupoSearch/delete`,

    //基金经理
    getManagerList :`${config.baseUrl}/mid/fundmanager/findlist`,
    addManager :`${config.baseUrl}/mid/fundmanager/add`,
    updateManager :`${config.baseUrl}/mid/fundmanager/update`,
    deleteManager :`${config.baseUrl}/mid/fundmanager/delete`,

//系统管理
    //版本管理
    addVersion :`${config.baseUrl}/mid/version/add`,
    deleteVersion :`${config.baseUrl}/mid/version/delete`,
    getVersionList :`${config.baseUrl}/mid/version/findlist`,
    //用户管理
    addUser :`${config.baseUrl}/mid/userinfo/adduser`,
    deleteUser :`${config.baseUrl}/mid/userinfo/delete`,
    getUserList :`${config.baseUrl}/mid/userinfo/findlist`,
    resetUser :`${config.baseUrl}/mid/userinfo/updatepwd`,
    checkUser :`${config.baseUrl}/mid/userinfo/isSuperAdmin`,

//全部基金
    getFundRecomment :`${config.baseUrl}/mid/fundallocation/findRecomment`,
    updateFundRecomment :`${config.baseUrl}/mid/fundallocation/editFundComments`,
    getFundDetail :`${config.baseUrl}/mid/fundallocation/findFunddetail`,
    updateFundDetail :`${config.baseUrl}/mid/fundallocation/editFundDetail`,
    getFundRate :`${config.baseUrl}/mid/fundallocation/findFundrate`,
    updateFundRate :`${config.baseUrl}/mid/fundallocation/editFundRate`,
    //基金经理
    getFundManagerList :`${config.baseUrl}/mid/fundallocation/findFundManager`,
    addFundManager :`${config.baseUrl}/mid/fundallocation/addFundManager`,
    updateFundManager :`${config.baseUrl}/mid/fundallocation/updateFundManager`,
    getOtherFundManager :`${config.baseUrl}/mid/fundallocation/findFundOtherManager`,
    deleteFundManager :`${config.baseUrl}/mid/fundallocation/deleteFundManager`,



//交易渠道配置
    getChannelList :`${config.baseUrl}/mid/tradechannel/findlist`,
    updateChannel :`${config.baseUrl}/mid/tradechannel/update`,
    addChannel :`${config.baseUrl}/mid/tradechannel/add`,
    deleteChannel :`${config.baseUrl}/mid/tradechannel/delete`,

//提示性文字
    getRemindList :`${config.baseUrl}/mid/prompttext/findlist`,
    updateRemind :`${config.baseUrl}/mid/prompttext/update`,
    addRemind :`${config.baseUrl}/mid/prompttext/add`,

}