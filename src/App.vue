<template>
  <div>
    <div id="sel">
      <img src="./test.jpg" class="display" alt="">
    </div>
    <button @click="shortcut">截屏</button>
    <photo-editor v-if="displayFlag" :imgObj="imgObj"></photo-editor>
  </div>
</template>

<script>
  import html2canvas from "html2canvas"
  import photoEditor from "./components/photoEditor.js"

  export default {
    components: {
      photoEditor
    },
    data(){
      return {
        displayFlag: false,
        imgObj: {}, //图片对象
      }
    },
    methods: {
      //截屏功能
      shortcut(){
        var that = this //保存this的指向
        // 坐标
        var coord = {
          leftX0: 0,
          topY0: 0,
          leftX1: 0,
          topY1: 0,
          leftX2: 0,
          topY2: 0,
        }
        // 尺寸
        var size = {
          width: 0,
          height: 0
        }
        // 标志
        var flag = {
          mouseMoveFlag: false
        }

        var createEle = {
          //创建一个遮罩层
          createMask() {
            // 如果有遮罩层了推出程序
            if( document.querySelector('#mask')) return false
            var maskDiv = document.createElement("div")
            //给div设置属性样式
            maskDiv.id = "mask"
            maskDiv.style.width = document.body.offsetWidth + "px"
            maskDiv.style.height = document.body.offsetHeight + "px"
            maskDiv.style.position = "absolute"
            maskDiv.style.zIndex = 1000
            maskDiv.style.left = "0px"
            maskDiv.style.top = "0px"
            maskDiv.style.backgroundColor = "#fff"
            maskDiv.style.opacity = "0.5"
            
            //追加到页面上
            document.body.appendChild(maskDiv)

            //添加事件 
            document.body.addEventListener("mousedown",eventFN.mouseDown)
            document.body.addEventListener("mousemove",eventFN.mouseMove)
            document.body.addEventListener("mouseup",eventFN.mouseUp) 
            
          },

          //创建一个区域选择的盒子
          createSelectDiv() {
            var div = document.createElement("div")
            //给div设置属性样式
            div.className = "short-cut"
            div.style.width = "0px"
            div.style.height = "0px"
            div.style.position = "absolute"
            div.style.backgroundColor = "#999"
            div.style.border = "1px solid blue"
            div.style.position = "absolute"
            div.style.zIndex = 10000

            //追加到页面上
            document.body.appendChild(div)
          },

          //创建确认取消按钮
          createconfirmBtnAndcancelBtn(){
            var confrimBtn = document.createElement('button')
            var cancelBtn = document.createElement('button')
            // 给button设置样式
            confrimBtn.innerHTML = "确认"
            confrimBtn.id = "confrim"
            confrimBtn.style.width = "50px"
            confrimBtn.style.height = "30px"
            confrimBtn.style.position = "absolute"
            confrimBtn.style.right = "0px"
            confrimBtn.style.bottom = "-30px"

            cancelBtn.innerHTML = "取消"
            cancelBtn.id = "cancel"
            cancelBtn.style.position = "absolute"
            cancelBtn.style.width = "50px"
            cancelBtn.style.height = "30px"
            cancelBtn.style.right =  "50px"
            cancelBtn.style.bottom = "-30px"

            //追加到页面上
            document.querySelector(".short-cut").appendChild(confrimBtn)
            document.querySelector(".short-cut").appendChild(cancelBtn)
          }
        }

        var eventFN = {
          //点击确认事件
          confrimBtn(event) {
            if(event.target.id != "confrim") return     
            //设置参数
            var opt = {
              allowTaint: true,
              scale: 1,
              height: size.height,
              width: size.width,
              x: coord.leftX0,
              y: coord.topY0
            }
            
            //调用html2canvas的方法生成图片
            tools.html2canvasFN(opt)

            //删除页面上所有新增的元素
            document.body.removeChild( document.querySelector('#mask'))
            document.body.removeChild( document.querySelector('.short-cut'))
          },
          
          //点击取消事件
          cancelBtn(event) {
            if(event.target.id != "cancel") return 
            //删除页面上所有新增的元素
            document.body.removeChild( document.querySelector('#mask'))
            document.body.removeChild( document.querySelector('.short-cut'))
          },

          //鼠标按下事件
          mouseDown (event) { 
            // 鼠标左键按下
            if(event.button != 0 || event.target.id != "mask") return false
            console.log("鼠标按下")
            //判断页面上是否存在了区域选择的框
            if(document.querySelector('.short-cut')) {
              // 删除区域选择的盒子
              document.body.removeChild(document.querySelector('.short-cut'))
            }

            //开启鼠标移动事件
            flag.mouseMoveFlag = true
            
            //获取鼠标的位置
            coord.leftX0 = event.pageX
            coord.topY0 = event.pageY

            //创建选择区域的盒子
            createEle.createSelectDiv()          

            //设置盒子的定位
            document.querySelector('.short-cut').style.left = coord.leftX0 + "px"
            document.querySelector('.short-cut').style.top = coord.topY0 + "px"
          },

          //鼠标移动事件
          mouseMove (event) {
            // 如果禁止鼠标移动,就退出函数
            if(!flag.mouseMoveFlag || event.button != 0) return false
            console.log("鼠标移动")
            // 设置盒子的大小
            coord.leftX1 = event.pageX
            coord.topY1 = event.pageY
            size.width = coord.leftX1 - coord.leftX0
            size.height = coord.topY1 - coord.topY0
            //设置盒子的大小
            document.querySelector('.short-cut').style.width = size.width + "px"
            document.querySelector('.short-cut').style.height = size.height + "px" 
          },

          //鼠标弹起事件
          mouseUp(event) { 
            // 鼠标左键按下
            if(event.button != 0) return false
            console.log("鼠标弹起")
            // 设置盒子的大小
            coord.leftX2 = event.pageX
            coord.topY2 = event.pageY
            size.width = coord.leftX2 - coord.leftX0
            size.height = coord.topY2 - coord.topY0
            //设置盒子的大小
            document.querySelector('.short-cut').style.width = size.width + "px"
            document.querySelector('.short-cut').style.height = size.height + "px" 
            
            //关闭鼠标移动事件
            flag.mouseMoveFlag = false

            //创建确认按钮取消按钮
            if(document.getElementById('#confrim') || document.getElementById('#cancel')) {
              document.body.removeChild(document.getElementById('#confrim'))
              document.body.removeChild(document.getElementById('#cancel'))
            }
            //创建确认,取消按钮
            createEle.createconfirmBtnAndcancelBtn()

            //给确定,取消按钮注册点击事件
            document.body.addEventListener("click",eventFN.confrimBtn,false)
            document.body.addEventListener("click",eventFN.cancelBtn,false)
          },
        }

        var tools = {
          // 截图方法
          html2canvasFN(opt) {
            html2canvas(document.body,opt).then(function(canvas) {
              // 图片生成base64
              var imgURL = canvas.toDataURL()
              //展示组件
              that.displayFlag = true

              //传递数据给photoEditor组件
              let { height,width } = opt
              that.imgObj = {
                height,
                width,
                imgURL
              }
            });
          }
        }

        createEle.createMask()
      }
    }
  }
</script>

<style>
  #sel {
    margin: 50px 400px; 
  }

  .display {
    width: 500px;
    margin: 50px auto;
  }

</style>
