AFRAME.registerComponent('restrict-camera-pitch', {
    tick: function () {
        var cameraEl = this.el;
        var rotation = cameraEl.getAttribute('rotation');

        if (rotation.x < 0) {
            rotation.x = 0;
        } else if (rotation.x > 0) {
            rotation.x = 0;
        }
        cameraEl.setAttribute('rotation', rotation);
    }
});