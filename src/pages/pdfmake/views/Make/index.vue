<template>
  <div class="Make" id="container">
      <h1> hello </h1>
    <el-button @click="handleClick">下载按钮</el-button>
    <template v-for="item in 8">
      <div>
        <img src="./222.png" alt="">
      </div>
    </template>
  </div>
</template>

<script>
  import html2canvas from 'html2canvas'
  import { jsPDF } from "jspdf";
  import { Html2Pdf } from './pdf.js'
  export default {
    name: "Make",
    methods:{

      aa(){
        var dom = document.querySelector("#container")
        html2canvas(dom, {
          allowTaint: true,
          useCORS: true,
          dpi: 120, // 图片清晰度问题
          background: '#FFFFFF', //如果指定的div没有设置背景色会默认成黑色,这里是个坑
        }).then(canvas => {
          var pageData = canvas.toDataURL('image/jpeg', 1.0)

          //为生成pdf的html页面高度
          var leftHeight = canvas.height
          //A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
          var a4Width = 595.28
          var a4Height = 841.89
          // REF是Reference的缩写,为参考尺寸的意思  为什么 这么算 ? 算的是固定的宽高比 (缩放  是不会修改宽高比的)
          //一页pdf显示html页面生成的canvas高度;
          var a4HeightRef = Math.floor((canvas.width / a4Width) * a4Height)

          var pdf = new jsPDF('p', 'pt', 'a4') //A4纸，纵向
          pdf.setDisplayMode('fullwidth', 'continuous', 'FullScreen')
          var title='asdasd'
          var pdfName = title


          var index = 1
          var canvasPart = document.createElement('canvas')
          var height=0
          //pdf页面偏移
          var position = 0
          //implement   实现的意思
          function createImpl(canvas) {
            console.log('canvas总高度 :  '+leftHeight, '单页面高度:  ' + a4HeightRef);
            //如果存在 canvas 高度
            if (leftHeight > 0) {
              index++;
              var checkCount = 0;
              if (leftHeight > a4HeightRef) {
                var i = position + a4HeightRef;
                //判断空白行
                for (i = position + a4HeightRef; i >= position; i--) {
                  var isWrite = true;
                  for (var j = 0; j < canvas.width; j++) {
                    var c = canvas.getContext('2d').getImageData(j, i, 1, 1).data;
                    if (c[0] != 0xff || c[1] != 0xff || c[2] != 0xff) {
                      isWrite = false
                      break
                    }
                  }
                  if (isWrite) {
                    checkCount++
                    if (checkCount >= 10) {   //空白行距离再10px左右  就  可以分页
                      break
                    }
                  } else {
                    checkCount = 0
                  }
                }
                height = Math.round(i - position) || Math.min(leftHeight, a4HeightRef)
                if (height <= 0) {
                  height = a4HeightRef
                }
              } else {
                height = leftHeight
              }

              //一段一段 剪切canvas 图片
              console.log('第'+index+'页', '高度:', height, '位置偏移量', position)
              canvasPart.width = canvas.width
              canvasPart.height = height
              var ctx = canvasPart.getContext('2d')
              ctx.drawImage(
                canvas,
                0,
                position,
                canvas.width,
                height,
                0,
                0,
                canvas.width,
                height,
              )

              var pageHeight = Math.round((a4Width / canvas.width) * height)
              // pdf.setPageSize(null, pageHeight)
              if (position != 0) {
                pdf.addPage()
              }
              pdf.addImage(
                canvasPart.toDataURL('image/jpeg', 1.0),
                'JPEG',
                10,
                10,
                a4Width,
                (a4Width / canvasPart.width) * height,
              )
              leftHeight -= height
              position += height
              if (leftHeight > 0) {
                setTimeout(createImpl, 500, canvas)
              } else {
                pdf.save(pdfName + '.pdf')
              }
            }
          }

          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < a4HeightRef) {
            pdf.addImage(
              pageData,
              'JPEG',
              0,
              0,
              a4Width,
              (a4Width / canvas.width) * leftHeight,
            )
            pdf.save(pdfName + '.pdf')
          } else {
            try {
              pdf.deletePage(0)
              setTimeout(createImpl, 500, canvas)
            } catch (err) {
              // console.log(err);
            }
          }
        })
      },
      handleClick(){
        new Html2Pdf('#container','文件名').getpdf()
      },
       createCanvas(callback){
        var dom = document.querySelector("#container")
         html2canvas(dom, {
          dpi: 200, // 设置dpi，会使图片高清一些
          allowTaint: true, //是否允许跨域图像污染画布
          scale: 4,   //用于规模呈现。默认浏览器设备像素比例
          // width:"",   //  canvas 元素的宽
          // height:"",
        }).then(function (canvas) {
          let pageData = canvas.toDataURL("image/jpeg", 1.0);
          callback && callback(pageData)
        })
      },
      createPdf(){
        //用于创建pdf  ...

      },
      downloadPDF (imgload) {
        const doc = new jsPDF({
          orientation: "landscape",
          unit: "in",
          format: [4, 2]
        });
        doc.save("two-by-four.pdf");
      }
    }
  }
</script>

<style lang="" scoped>

</style>
