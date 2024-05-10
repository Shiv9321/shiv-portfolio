//   // JavaScript to change text color when camera is near
//   var isWithinDistance = false;

//   AFRAME.registerComponent('distance-checker-2',
//   {
//       tick: function () {
//           var cameraEl = document.getElementById('camera');
//           var textEl = document.getElementById('project-2-text');

//           if (!cameraEl || !textEl)
//           {
//             console.error('Elements not found.',error);
//             return; // Exit if elements are not found
//           }

//           var cameraPosition = cameraEl.getAttribute('position');
//           var textPosition = textEl.getAttribute('position');

//           if (!cameraPosition || !textPosition)
//           {
//               console.error('Positions not available.',error);
//               return; // Exit if positions are not available
//           }

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
//           window.open('https://github.com/Shiv9321/enigma', '_blank');
//       }
//   });

//   document.querySelector('a-scene').setAttribute('distance-checker-2', '');

// JavaScript to change text color based on camera distance and redirect on key press
var cameraNear = false;

AFRAME.registerComponent('distance-checker-2', {
    tick: function () {
        var cameraEl = document.getElementById('camera');
        var textEl = document.getElementById('project-2-text');

        if (!cameraEl || !textEl) {
            console.error('Elements not found.');
            return; // Exit if elements are not found
        }

        var cameraPosition = cameraEl.getAttribute('position');
        var textPosition = textEl.getAttribute('position');

        if (!cameraPosition || !textPosition) {
            console.error('Positions not available.');
            return; // Exit if positions are not available
        }

        var distance = cameraPosition.distanceTo(textPosition);

        // Change the color if the camera is within 5 units of the text
        if (distance < 15) {
            textEl.setAttribute('color', '#ad6a8a'); // Change color to #ad6a8a
            cameraNear = true;
        } else {
            textEl.setAttribute('color', '#FFFFFF'); // Revert color to white
            cameraNear = false;
        }
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && cameraNear) {
        // Redirect to the desired URL when Enter is pressed and camera is near
        window.open('https://github.com/Shiv9321/enigma', '_blank');
    }
});

document.querySelector('a-scene').setAttribute('distance-checker-2', '');
