const canvas = new fabric.Canvas('canvas', {
  backgroundColor: '#ffffff' // နောက်ခံအဖြူရောင်ထည့်ထား
});
let imgInstance;

// ပုံတင်ခြင်း
document.getElementById('imgLoader').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    fabric.Image.fromURL(event.target.result, function (img) {
      img.scaleToWidth(280);
      canvas.clear();
      imgInstance = img;
      canvas.add(img);
      canvas.renderAll(); // အလိုအလျောက် render
    }, { crossOrigin: 'anonymous' });
  };
  reader.readAsDataURL(file);
});

// Filter Controls
const controls = [
  { id: 'opacitySlider', filter: 'opacity', factor: 100 },
  { id: 'brightnessSlider', filter: 'Brightness', prop: 'brightness' },
  { id: 'contrastSlider', filter: 'Contrast', prop: 'contrast' },
  { id: 'saturationSlider', filter: 'Saturation', prop: 'saturation' }
];

controls.forEach(control => {
  document.getElementById(control.id).addEventListener('input', function() {
    if (!imgInstance) return;
    
    if (control.id === 'opacitySlider') {
      document.getElementById('opacityVal').textContent = this.value;
      imgInstance.set('opacity', this.value / control.factor);
    } else {
      imgInstance.filters = [new fabric.Image.filters[control.filter]({ [control.prop]: parseFloat(this.value) })];
      imgInstance.applyFilters();
    }
    canvas.renderAll();
  });
});

// Text & Watermark
function addText() {
  const text = new fabric.Textbox('Edit Me', {
    left: 50,
    top: 50,
    fontSize: 20,
    fill: '#000000',
    editable: true
  });
  canvas.add(text).setActiveObject(text);
}

function addWatermark() {
  const watermark = new fabric.Text('Watermark', {
    left: 150,
    top: 150,
    fontSize: 16,
    fill: 'rgba(0,0,0,0.3)',
    selectable: false
  });
  canvas.add(watermark);
}

// Download
function downloadImage() {
  if (!canvas.getObjects().length) {
    alert('Please add an image first!');
    return;
  }
  
  const link = document.createElement('a');
  link.download = 'pixeltune-pro-edited.png';
  link.href = canvas.toDataURL({ format: 'png', quality: 1 });
  link.click();
}

