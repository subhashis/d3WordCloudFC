GROUP MEMBERS:
1) Subhashis Hazarika.
2) Wenbin He.
3) Cheng Li.
==============================================
FILE DESCRIPTION:
1) index.html: main html file
2) d3.js, d3.layout.cloud.js: d3 library for word cloud created by jason davis(https://github.com/jasondavies/d3-cloud).
3) fisheye.js: the exploration lens for F+C visualization.
4) world-cloud.js: file to integrate d3.layout.cloud.js and fisheye.js functions.
5) tags.js: the word frequencies
6) lab.py: word scrapper
7) pubdata.txt: publication dataset.

===============================================
INTERACTION:
1) Word Frequency slider helps control the amount of words we want to project in the canvas, the slider indicates the lowest frequency that gets projected.
2) Lens Control: allows F+C visualization of words not clearly visible due to low font size. Of the selected text the texts with smaller font is displayed with bigger font and the ones with bigger font is reduced in size to preserve the context of the text layout.
3) Activate Lens: turns the lens probe on, default is off.
4) Disable Text Rotation: To disable rotation of the text selected by the lens probe.
5) Aperture: The radius of the lens, if the text clutter is too high increase the aperture and play around to view the texts properly.  
6) Distortion: Controls the amount of distortion of the lens, again high distortion is good for highly clutter layouts.

**You need to play around with the aperture and distortion values depending on the screen size you are viewing the word-cloud on.