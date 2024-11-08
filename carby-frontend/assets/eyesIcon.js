import React from "react";
import Svg, { Ellipse, Rect, Path } from "react-native-svg";

const EyesIcon = ({ width, height, ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 250 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Ellipse
      cx="57.6456"
      cy="50.3704"
      rx="15.1699"
      ry="14.8148"
      fill="#D9D9D9"
    />
    <Ellipse cx="184.466" cy="64" rx="65.534" ry="64" fill="white" />
    <Rect
      x="50.9709"
      y="34.3704"
      width="30.3398"
      height="59.2593"
      fill="#D9D9D9"
    />
    <Ellipse cx="65.534" cy="64" rx="65.534" ry="64" fill="white" />
    <Rect
      x="50.9709"
      y="49.7778"
      width="30.3398"
      height="29.6296"
      fill="black"
    />
    <Ellipse cx="66.1408" cy="78.8148" rx="15.1699" ry="14.8148" fill="black" />
    <Ellipse cx="66.1408" cy="49.1852" rx="15.1699" ry="14.8148" fill="black" />
    <Rect
      x="168.689"
      y="49.7778"
      width="30.3398"
      height="29.6296"
      fill="black"
    />
    <Ellipse cx="183.859" cy="78.8148" rx="15.1699" ry="14.8148" fill="black" />
    <Ellipse cx="183.859" cy="49.1852" rx="15.1699" ry="14.8148" fill="black" />
    <Ellipse cx="80.7039" cy="64.5926" rx="15.1699" ry="14.8148" fill="white" />
    <Path
      d="M214.806 64.5926C214.806 72.7746 208.014 79.4074 199.636 79.4074C191.258 79.4074 184.466 72.7746 184.466 64.5926C184.466 56.4106 191.258 49.7778 199.636 49.7778C208.014 49.7778 214.806 56.4106 214.806 64.5926Z"
      fill="white"
    />
  </Svg>
);

export default EyesIcon;
