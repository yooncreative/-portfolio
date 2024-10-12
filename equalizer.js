{\rtf1\ansi\ansicpg949\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 // equalizer.js\
\
const audioContext = new (window.AudioContext || window.webkitAudioContext)();\
const audioElement = document.getElementById('background-music');\
const source = audioContext.createMediaElementSource(audioElement);\
\
const equalizer = [];\
const frequencies = [60, 170, 350, 1000, 3500, 10000]; // \uc0\u51452 \u54028 \u49688  \u45824 \u50669  \u49444 \u51221 \
\
frequencies.forEach((frequency) => \{\
    const band = audioContext.createBiquadFilter();\
    band.type = 'peaking'; // \uc0\u54588 \u53433  \u54596 \u53552  \u49324 \u50857 \
    band.frequency.value = frequency; // \uc0\u54596 \u53552  \u51452 \u54028 \u49688  \u49444 \u51221 \
    band.gain.value = 0; // \uc0\u52488 \u44592  \u44172 \u51064  \u49444 \u51221 \
    equalizer.push(band);\
\});\
\
// \uc0\u44033  \u54596 \u53552  \u50672 \u44208 \
source.connect(equalizer[0]);\
for (let i = 0; i < equalizer.length - 1; i++) \{\
    equalizer[i].connect(equalizer[i + 1]);\
\}\
equalizer[equalizer.length - 1].connect(audioContext.destination); // \uc0\u52572 \u51333  \u52636 \u47141  \u50672 \u44208 \
\
// \uc0\u49836 \u46972 \u51060 \u45908 \u47484  \u53685 \u54644  \u51452 \u54028 \u49688  \u51312 \u51221 \
document.querySelectorAll('.eq-slider').forEach((slider, index) => \{\
    slider.addEventListener('input', () => \{\
        equalizer[index].gain.value = slider.value; // \uc0\u49836 \u46972 \u51060 \u45908  \u44050 \u51004 \u47196  \u44172 \u51064  \u49444 \u51221 \
    \});\
\});\
}