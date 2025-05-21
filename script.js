const canvas = new fabric.Canvas('canvas');
let imgInstance;

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
    }, { crossOrigin: 'anonymous' });
  };
  reader.readAsDataURL(file);
});

document.getElementById('opacitySlider').addEventListener('input', function () {
  document.getElementById('opacityVal').textContent = this.value;
  if (imgInstance) {
    imgInstance.set('opacity', this.value / 100);
    canvas.renderAll();
  }
});

document.getElementById('brightnessSlider').addEventListener('input', function () {
  if (imgInstance) {
    imgInstance.filters = [new fabric.Image.filters.Brightness({ brightness: parseFloat(this.value) })];
    imgInstance.applyFilters();
    canvas.renderAll();
  }
});

document.getElementById('contrastSlider').addEventListener('input', function () {
  if (imgInstance) {
    imgInstance.filters = [new fabric.Image.filters.Contrast({ contrast: parseFloat(this.value) })];
    imgInstance.applyFilters();
    canvas.renderAll();
  }
});

document.getElementById('saturationSlider').addEventListener('input', function () {
  if (imgInstance) {
    imgInstance.filters = [new fabric.Image.filters.Saturation({ saturation: parseFloat(this.value) })];
    imgInstance.applyFilters();
    canvas.renderAll();
  }
});

function addText() {
  const text = new fabric.Textbox('Your Text Here', {
    left: 50,
    top: 50,
    fontSize: 20,
    fill: 'black'
  });
  canvas.add(text);
}

function addWatermark() {
  const watermark = new fabric.Text('Watermark', {
    left: 150,
    top: 150,
    fontSize: 16,
    fill: 'rgba(0,0,0,0.5)'
  });
  canvas.add(watermark);
}

function downloadImage() {
  const dataURL = canvas.toDataURL({
    format: 'png',
  });
  const link = document.createElement('a');
  link.download = 'edited-image.png';
  link.href = dataURL;
  link.click();
}

