AFRAME.registerComponent('boundaries',
{
    tick: function ()
    {
        var position = this.el.getAttribute('position');
        position.x = Math.max(-20, Math.min(20, position.x));
        position.z = Math.max(-20, Math.min(20, position.z));
        this.el.setAttribute('position', position);
    }
});

document.querySelector('#camera').setAttribute('boundaries', '');