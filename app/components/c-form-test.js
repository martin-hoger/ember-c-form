import Component from '@ember/component';

export default Component.extend({

  tagName  : '',
  formSizes: ['mini', 'tiny', 'small', 'large', 'huge'],
  highlightColors: {
    "": "#ffffff",
    "red": "#FC9272",
    "pink": "#C994C7",
    "blue": "#9EBCDA",
    "green": "#A1D99B",
    "yellow": "#FEE391",
    "gray": "#BDBDBD"
  },
  educationTypes: {
    "0": "",
    "10": "No education",
    "20": "Primary school",
    "30": "High school",
    "40": "University"
  },

  radioOptions: [
    {'id': '10', value: 'No education'},
    {'id': '20', value: 'Primary school'},
    {'id': '30', value: 'High school'},
    {'id': '40', value: 'University'},
  ],
});
