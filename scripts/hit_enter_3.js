// document.addEventListener('DOMContentLoaded', () => {
//     const cameraEl = document.getElementById('camera');
//     const textEl = document.getElementById('hit-enter-text-3');
//     const targetPosition = textEl.object3D.position;
//     const minDistance = 15; // Minimum distance to show text

//     cameraEl.addEventListener('componentchanged', function(evt) {
//         if (evt.detail.name === 'position') {
//             const cameraPosition = cameraEl.object3D.position;
//             const distance = cameraPosition.distanceTo(targetPosition);
//             textEl.setAttribute('visible', distance <= minDistance);
//         }
//     });
// });
