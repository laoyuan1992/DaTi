let Util = require('Util');
let HomeUtil = require('HomeUtil');
cc.Class({
  extends:cc.Component,
  properties:{
    chanceCardNum:cc.Label,//答题卡数量
    tipsNode:cc.Node,//提示node
    prtLinkCon:cc.Label,
    prtTips:cc.Node,//身份提示、
    smallEwmNode:cc.Node,//小二维码node
  },
  onLoad(){
    Util.hideLoading();
    this.initPage();
  },
  start(){
    registShare();
    Util.showTips('请在微信中邀请好友,或者复制链接或二维码发送给好友');
    //this.copyPrtCode();
  },
  //邀请好友-提示点击右上角
  inviteFriends(){
    if(Util.checkEquipment()=='WX'){
      this.showShareTip();
    }else{
      Util.showTips('请在微信中邀请好友,或者复制链接或二维码发送给好友');
    }
  },
  //复制推广码
  copyPrtCode(){
    let prtLink = cc.sys.localStorage.getItem('prtLink');
    $("#copyAddress").attr('data-clipboard-text',prtLink);
    $("#copyAddress").trigger('click');
    Util.showTips('复制成功,快去发送给好友吧.');
  },
  hideShareTip(){
    this.tipsNode.active = false;
  },
  showShareTip(){
    this.tipsNode.active = true;
  },
  initPage(){
    this.prtTips.active = cc.sys.localStorage.getItem('prtCode')==0;
    this.prtLinkCon.string = cc.sys.localStorage.getItem('prtLink');
    HomeUtil.getIndexData().then((res)=>{
      if(!res.success){
        Util.showTips(res.msg);
      }else{
        let nums = res.obj.singleCnt+res.obj.singleFreeCnt;
        this.chanceCardNum.string = 'x '+nums;
        this.isBind = res.obj.bindBank!="0";
        this.promoteLink = cc.sys.localStorage.getItem('prtLink');
        //如果绑定了生成小的推广码
        this.createSmallQCode();
      }
    });
  },
  createSmallQCode(){
    var qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
    qrcode.addData(this.promoteLink);
    // qrcode.addData('dati');
    qrcode.make();
    var ctx = this.smallEwmNode.getComponent(cc.Graphics);
    ctx.fillColor = cc.Color.BLACK;
    // compute tileW/tileH based on node width and height
    var tileW = this.smallEwmNode.width / qrcode.getModuleCount();
    var tileH = this.smallEwmNode.height / qrcode.getModuleCount();
    // draw in the Graphics
    for (var row = 0; row < qrcode.getModuleCount(); row++) {
      for (var col = 0; col < qrcode.getModuleCount(); col++) {
        if (qrcode.isDark(row, col)) {
          // ctx.fillColor = cc.Color.BLACK;
          var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
          var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
          ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
          ctx.fill();
        } else {
          // ctx.fillColor = cc.Color.WHITE;
        }
        var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
        // var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
        // ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
        // ctx.fill();
      }
    }
  },
  //返回主界面
  backHome(){
    cc.director.loadScene('Home',()=>{

    });
  },
  onDestroy(){

  }
});
