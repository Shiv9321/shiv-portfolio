//   // JavaScript to change text color when camera is near
//   var isWithinDistance = false;

//   AFRAME.registerComponent('distance-checker',
//   {
//       tick: function () {
//           var cameraEl = document.getElementById('camera');
//           var textEl = document.getElementById('projects-text-3');
//           var cameraPosition = cameraEl.getAttribute('position');
//           var textPosition = textEl.getAttribute('position');
//           var distance = cameraPosition.distanceTo(textPosition);

//           // Change the color if the camera is within 5 units of the text
//           if (distance < 15)
//           {
//               textEl.setAttribute('color', '#ad6a8a');
//               isWithinDistance = true;
//           }
//           else
//           {
//               textEl.setAttribute('color', '#FFFFFF'); // Revert if the distance increases
//               isWithinDistance = false;
//           }
//       }
//   });

//   document.addEventListener('keydown', function (event)
//   {
//       if (event.key === 'Enter' && isWithinDistance) {
//           // Redirect to the desired URL
//           window.open('https://clockadjustable.netlify.app/', '_blank');
//       }
//   });

//   document.querySelector('a-scene').setAttribute('distance-checker', '');

