const prettifyXml = require('prettify-xml');

module.exports = string => prettifyXml(string, { indent: 2, newline: '\n' });
