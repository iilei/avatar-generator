import React from 'react';
import reactDom from 'react-dom/server';
import svgx from 'svgx';


export default class SVG {
  constructor() {
    // const svg = SvgJs(window);
    // const { document } = window;
    // const draw = svg(document.documentElement);
    // draw.rect(100,100).fill('yellow').move(50,50)
  }
  toString = () => {
    const render = svgx(reactDom.renderToStaticMarkup);

    const jsx = (
      <svg width={200} height={200}>
        <circle cx={100} cy={10} r={50} bg="#bada55" />
      </svg>
    );

    const svgOutput = render(jsx);

    return (svgOutput);
  }
}
