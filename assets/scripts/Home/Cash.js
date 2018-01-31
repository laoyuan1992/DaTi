let Util = require('Util');
let HomeUtil = require('HomeUtil');
cc.Class({
  extends:cc.Component,
  properties:{
    canUseMonet:cc.Label,//可用余额label
    cashNum:cc.EditBox,//提现金额输入框
  },
  onLoad(){
    Util.hideLoading();
    this.cashDatas = {
      amt:'',
    };
    this.initPage();
  },
  initPage(){
    HomeUtil.getIndexData().then((res)=>{
      if(!res.success){
        Util.showTips(res.msg);
      }else{
        let obj = res.obj;
        this.canUseMonet.string = obj.gold;
      }
    });
  },
  //点击全部提现给输入框赋值
  allCash(){
    let cahsNum = this.canUseMonet.string;
    //调用接口获取市场token
    HomeUtil.getMarketToken().then((res)=>{
      if(!res.success){
        Util.showTips(res.msg);
      }else{
        let token = res.obj.tokenType+' '+res.obj.accessToken;
        token = encodeURI(token);
        //带参数跳转到市场提现页面
        cc.sys.openURL('http://www.senchen.vip/html/gold-cash.html?link=gold-cash&token='+token+"&gold="+cahsNum);
      }
    });
  },
  //返回主页
  backHome(){
    cc.director.loadScene('Home',()=>{

    });
  },
  //去提现
  toCash(){
    let cahsNum = Util.trim(this.cashNum.string);
    this.cashDatas.amt = cahsNum;
    if(!cahsNum){
      Util.showTips('请输入提现数额');
      return;
    }else if(isNaN(cahsNum)){
      Util.showTips('提现金额需为数字');
      return;
    }else if(cahsNum<=0){
      Util.showTips('提现金额需大于零');
      return;
    }else if(parseInt(this.canUseMonet.string)<parseInt(this.cashNum.string)){
      Util.showTips('提现金额不能大于总金额');
      return;
    }
    //调用接口获取市场token
    HomeUtil.getMarketToken().then((res)=>{
      if(!res.success){
        Util.showTips(res.msg);
      }else{
        let token = res.obj.tokenType+' '+res.obj.accessToken;
        token = encodeURI(token);
        //带参数跳转到市场提现页面
        cc.sys.openURL('http://www.senchen.vip/html/gold-cash.html?link=gold-cash&token='+token+"&gold="+cahsNum);
      }
    });
  },
  onDestroy(){

  }
});
