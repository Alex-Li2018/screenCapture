import classnames from 'classnames'
import FabricPhoto from './index'
import consts from './consts'
//引入全局样式的方法
import './scss/index.scss'

// export component
export default {
  name: 'wrap-container',
  props: {
    imgObj: {
      type: Object
    }
  },
  created(){
    // console.log(this.imgObj)
  },
  data () {
    return {
      editState: consts.states.NORMAL,
      arrow: {
        color: '#FF3440',
        stroke: 4
      },
      freeDraw: {
        color: '#FF3440',
        stroke: 4
      },
      text: {
        color: '#FF3440'
      },
      mosaic: {
        stroke: '#FF3440'
      },
      color: '#FF3440',
      stroke: '#FF3440'
    }
  },
  methods: {
    activateShapeMode () {
      if (this.fp.getCurrentState() !== consts.states.SHAPE) {
        this.fp.endFreeDrawing()
        this.fp.endTextMode()
        this.fp.endLineDrawing()
        this.fp.endMosaicDrawing()
        this.fp.endCropping()
        this.fp.endArrowDrawing()
        this.fp.endPan()
        this.fp.startDrawingShapeMode()
      }
    },
    activateTextMode () {
      if (this.fp.getCurrentState() !== consts.states.TEXT) {
        this.fp.endFreeDrawing()
        this.fp.endLineDrawing()
        this.fp.endArrowDrawing()
        this.fp.endMosaicDrawing()
        this.fp.endCropping()
        this.fp.endDrawingShapeMode()
        this.fp.endTextMode()
        this.fp.endPan()
        this.fp.startTextMode()
      }
    },
    getWindowViewPort () {
      return {
        height: $(window).height(),
        width: $(window).width()
      }
    },
    getDialogViewPort () {
      const {height, width} = this.getWindowViewPort()
      return {
        width: width < 680 ? 680 : width > 900 ? 900 : width,
        height: height < 450 ? 450 : height > 600 ? 600 : height
      }
    },
    resetEditorState () {
      this.editState = consts.states.NORMAL
    },
    onArrowBtnClick () {
      this.fp.endAll() //this.fp.startLineDrawing();
      if (this.editState === consts.states.ARROW) {
        this.resetEditorState()
      } else {
        this.editState = consts.states.ARROW
        this.fp.startArrowDrawing({
          width: this.arrow.stroke,
          color: this.arrow.color
        })
      }
    },
    onFreeDrawBtnClick () {
      this.fp.endAll()
      if (this.editState === consts.states.FREE_DRAWING) {
        this.resetEditorState()
      } else {
        this.editState = consts.states.FREE_DRAWING
        this.fp.startFreeDrawing({
          width: this.freeDraw.stroke,
          color: this.freeDraw.color
        })
      }
    },
    onMosaicBtnClick () {
      this.fp.endAll()
      if (this.editState === consts.states.MOSAIC) {
        this.resetEditorState()
      } else {
        this.editState = consts.states.MOSAIC
        this.fp.startMosaicDrawing({
          dimensions: this.mosaic.stroke
        })
      }
    },
    onTextBtnClick () {
      if (this.fp.getCurrentState() === consts.states.TEXT) {
        this.fp.endAll()
        this.resetEditorState()
      } else {
        this.editState = consts.states.TEXT //this.activateTextMode();
        this.fp.endAll()
        this.fp.startTextMode()
      }
    },
    onRotationBtnClick () {
      this.fp.endAll()
      this.fp.rotate(90)
      this.resetEditorState()
    },
    onCropBtnClick () {
      this.fp.startCropping()
    },
    onClearBtnClick () {
      this.resetEditorState()
      this.fp.clearObjects()
    },
    onApplyCropBtn () {
      this.fp.endCropping(true)
    },
    onCancleCropBtn () {
      this.fp.endCropping()
    },
    onUndoBtn () {
      this.fp.undo()
    },
    onRedoBtn () {
      this.fp.redo()
    },
    onPanBtnClick () {
      this.fp.endAll()
      this.fp.startPan()
    },
    renderArrowMenus () {
      return (
        <div class="tools-panel">
          <div class="tools-panel-brush">
            <div>
              <span class="small-brush" onClick={() => {}}>
                {' '}
              </span>
            </div>
            <div>
              <span class="normal-brush" onClick={() => {}}>
                {' '}
              </span>
            </div>
            <div>
              <span class="big-brush" onClick={() => {}}>
                {' '}
              </span>
            </div>
          </div>
          <span class="tools-divider"> </span>
          <div class="tools-panel-color">
            <span class="color red" onClick={this.changeEditorColor('#FF3440')}>
              {' '}
            </span>
            <span class="color yellow" onClick={this.changeEditorColor('#FFCF50')}>
              {' '}
            </span>
            <span class="color green" onClick={this.changeEditorColor('#00A344')}>
              {' '}
            </span>
            <span class="color blue" onClick={this.changeEditorColor('#0DA9D6')}>
              {' '}
            </span>
            <span class="color grey" onClick={this.changeEditorColor('#999999')}>
              {' '}
            </span>
            <span class="color black" onClick={this.changeEditorColor('#ffffff')}>
              {' '}
            </span>
            <span class="color white" onClick={this.changeEditorColor('#000000')}>
              {' '}
            </span>
          </div>
        </div>
      )
    },
    renderFreeDrawMenus () {
      return (
        <div class="tools-panel">
          <div class="tools-panel-brush">
            <div>
              <span class="small-brush" onClick={() => {}}>
                {' '}
              </span>
            </div>
            <div>
              <span class="normal-brush" onClick={() => {}}>
                {' '}
              </span>
            </div>
            <div>
              <span class="big-brush" onClick={() => {}}>
                {' '}
              </span>
            </div>
          </div>
          <span class="tools-divider"> </span>
          <div class="tools-panel-color">
            <span class="color red" onClick={this.changeEditorColor('#FF3440')}>
              {' '}
            </span>
            <span class="color yellow" onClick={this.changeEditorColor('#FFCF50')}>
              {' '}
            </span>
            <span class="color green" onClick={this.changeEditorColor('#00A344')}>
              {' '}
            </span>
            <span class="color blue" onClick={this.changeEditorColor('#0DA9D6')}>
              {' '}
            </span>
            <span class="color grey" onClick={this.changeEditorColor('#999999')}>
              {' '}
            </span>
            <span class="color black" onClick={this.changeEditorColor('#ffffff')}>
              {' '}
            </span>
            <span class="color white" onClick={this.changeEditorColor('#000000')}>
              {' '}
            </span>
          </div>
        </div>
      )
    },
    renderMosaicMenus () {
      return (
        <div class="tools-panel">
          <div class="tools-panel-brush">
            <div>
              <span class="small-brush" onClick={() => {}}>
                {' '}
              </span>
            </div>
            <div>
              <span class="normal-brush" onClick={() => {}}>
                {' '}
              </span>
            </div>
            <div>
              <span class="big-brush" onClick={() => {}}>
                {' '}
              </span>
            </div>
          </div>
        </div>
      )
    },
    renderTextMenus () {
      return (
        <div class="tools-panel">
          <div class="tools-panel-color">
            <span class="color red" onClick={this.changeEditorColor('#FF3440')}>
              {' '}
            </span>
            <span class="color yellow" onClick={this.changeEditorColor('#FFCF50')}>
              {' '}
            </span>
            <span class="color green" onClick={this.changeEditorColor('#00A344')}>
              {' '}
            </span>
            <span class="color blue" onClick={this.changeEditorColor('#0DA9D6')}>
              {' '}
            </span>
            <span class="color grey" onClick={this.changeEditorColor('#999999')}>
              {' '}
            </span>
            <span class="color black" onClick={this.changeEditorColor('#ffffff')}>
              {' '}
            </span>
            <span class="color white" onClick={this.changeEditorColor('#000000')}>
              {' '}
            </span>
          </div>
        </div>
      )
    },
    renderCropMenus () {
      return (
        <div class="tools-panel">
          <div class="tools-panel-crop">
            <span class="tools-panel-crop-apply-btn" onClick={this.onApplyCropBtn.bind(this)}>
              {' '}
            </span>
            <span class="tools-panel-crop-cancel-btn" onClick={this.onCancleCropBtn.bind(this)}>
              {' '}
            </span>
          </div>
        </div>
      )
    },
    zoomOut (delta) {
      let nextZoom = this.fp.getZoom() + delta
      if (nextZoom > 4) {
        return
      }
      this.fp.setZoom(nextZoom)
    },
    zoomIn (delta) {
      let nextZoom = this.fp.getZoom() - delta
      if (nextZoom < 1) {
        return
      }
      this.fp.setZoom(nextZoom)
    },
    changeEditorColor (val) {
      return () => {}
    },
    //完成按钮
    onURL () {
      let url = this.fp.toDataURL('image/png')
      //生成图片并下载下来
      download(url, "测试", 'image/png');
      //关闭界面
      document.querySelector('.wrap_inner').style.display = "none"
    }
  },
  mounted () {
    window.fabricPhoto = this.fp = new FabricPhoto('#upload-file-image-preview', {
      cssMaxWidth: this.imgObj.width,
      cssMaxHeight: this.imgObj.height
    })

    this.fp.once('loadImage', oImage => {
      this.fp.clearUndoStack()
    }) 
    // 传入图片的base64
    this.fp.loadImageFromURL(this.imgObj.imgURL, 'image name') 
    
    this.fp.on('selectObject', obj => {
      //console.log('selectObject--->',obj);
      if (obj.type === 'rect' || obj.type === 'circle' || obj.type === 'triangle') {
        this.editState = consts.states.SHAPE
        this.activateShapeMode()
      } else if (obj.type === 'text') {
        this.editState = consts.states.TEXT
        this.activateTextMode()
      }
    })
    this.fp.on('activateText', obj => {
      //console.log('activateText----obj--->',obj);
      // add new text on cavas
      if (obj.type === 'new') {
        console.log('--activateText--new-->', obj)
        this.fp.addText('双击编辑', {
          styles: {
            fill: this.text.color,
            fontSize: 50
          },
          position: obj.originPosition
        })
      }
    })
    this.fp.on({
      emptyUndoStack: () => {
        // $btnUndo.addClass('disabled');
        // resizeEditor();
      },
      emptyRedoStack: () => {
        // $btnRedo.addClass('disabled');
        // resizeEditor();
      },
      pushUndoStack: () => {
        // $btnUndo.removeClass('disabled');
        // resizeEditor();
      },
      pushRedoStack: () => {
        // $btnRedo.removeClass('disabled');
        // resizeEditor();
      },
      endCropping: () => {
        // $cropSubMenu.hide();
        // resizeEditor();
      },
      endFreeDrawing: () => {
        //$freeDrawingSubMenu.hide();
      },
      adjustObject: (obj, type) => {
        if (obj.type === 'text' && type === 'scale') {
          //$inputFontSizeRange.val(obj.getFontSize());
        }
      }
    })
  },
  destroyed () {
    if (this.fp) {
      // this.fp.destory()
      this.fp = null
      $('#upload-file-image-preview-paper').empty()
    }
  },
  render () {
    let btnClassname = classnames({
      'file-button': true,
      'file-button--pc': process.env.APP_ENV === 'pc',
      'upload-success': true
    })
    let menus = null
    this.fp && console.log('editor state', this.fp.getCurrentState())
    if (this.fp && this.fp.getCurrentState() === consts.states.FREE_DRAWING) {
      menus = this.renderFreeDrawMenus()
    } else if (this.fp && this.fp.getCurrentState() === consts.states.ARROW) {
      menus = this.renderArrowMenus()
    } else if (this.fp && this.fp.getCurrentState() === consts.states.MOSAIC) {
      menus = this.renderMosaicMenus()
    } else if (this.fp && this.fp.getCurrentState() === consts.states.TEXT) {
      menus = this.renderTextMenus()
    } else {
      menus = null
    }
    return (
      <div class="wrap_inner">
        <div class="main">
          <div class="upload-file-image-preview" id="upload-file-image-preview" />
          <div class={btnClassname}>
            <div class="image-thumb-btns">
              <i class="dxicon dxicon-image-suoxiao" onClick={this.zoomIn.bind(this, 0.2)} />
              <div class="thumb-divider" />
              <i class="dxicon dxicon-image-fangda" onClick={this.zoomOut.bind(this, 0.2)} />
            </div>
            <div class="image-tools-btns">
              <i class="dxicon dxicon-image-jiantou" onClick={this.onArrowBtnClick.bind(this)} />
              <i class="dxicon dxicon-image-huabi" onClick={this.onFreeDrawBtnClick.bind(this)} />
              <i class="dxicon dxicon-image-text" onClick={this.onTextBtnClick.bind(this)} />
              <i class="dxicon dxicon-image-masaike" onClick={this.onMosaicBtnClick.bind(this)} />
              <i class="dxicon dxicon-image-xuanzhuan" onClick={this.onRotationBtnClick.bind(this)} />
              <i class="dxicon dxicon-image-jiancai" onClick={this.onCropBtnClick.bind(this)} />
              <i class="dxicon dxicon-image-jiancai" onClick={this.onPanBtnClick.bind(this)} />
              <span class="tools-divider"> </span>
              <span class="file-button-cancel" onClick={this.onClearBtnClick.bind(this)}>
                复原
              </span>
              <span class="file-button-cancel" onClick={this.onUndoBtn.bind(this)}>
                undo
              </span>
              <span class="file-button-cancel" onClick={this.onRedoBtn.bind(this)}>
                redo
              </span>
              <span class="file-button-cancel" onClick={this.onURL.bind(this)}>
                url
              </span>
              {menus}
            </div>
            <div class="ctn-btns" />
          </div>
        </div>
      </div>
    )
  }
}

