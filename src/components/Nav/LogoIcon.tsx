import React from "react";

export function LogoIcon() {
  return (
    <svg
      id="eqgAZWxbHQJ1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 300 300"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      width="35"
      height="35"
    >
      <defs>
        <filter
          id="eqgAZWxbHQJ2-filter"
          x="-150%"
          y="-150%"
          width="400%"
          height="400%"
        >
          <feGaussianBlur
            id="eqgAZWxbHQJ2-filter-drop-shadow-0-blur"
            in="SourceAlpha"
            stdDeviation="1,1"
          />
          <feOffset
            id="eqgAZWxbHQJ2-filter-drop-shadow-0-offset"
            dx="0"
            dy="0"
            result="tmp"
          />
          <feFlood
            id="eqgAZWxbHQJ2-filter-drop-shadow-0-flood"
            floodColor="#000"
          />
          <feComposite
            id="eqgAZWxbHQJ2-filter-drop-shadow-0-composite"
            operator="in"
            in2="tmp"
          />
          <feMerge id="eqgAZWxbHQJ2-filter-drop-shadow-0-merge" result="result">
            <feMergeNode id="eqgAZWxbHQJ2-filter-drop-shadow-0-merge-node-1" />
            <feMergeNode
              id="eqgAZWxbHQJ2-filter-drop-shadow-0-merge-node-2"
              in="SourceGraphic"
            />
          </feMerge>
        </filter>
        <linearGradient
          id="eqgAZWxbHQJ2-fill"
          x1="0.5"
          y1="0.5"
          x2="0.5001"
          y2="0.5"
          spreadMethod="pad"
          gradientUnits="objectBoundingBox"
          gradientTransform="translate(0 0)"
        >
          <stop id="eqgAZWxbHQJ2-fill-0" offset="0%" stopColor="#41e6ff" />
          <stop id="eqgAZWxbHQJ2-fill-1" offset="50%" stopColor="#fb85ff" />
        </linearGradient>
      </defs>
      <path
        d="M255.121341,149.722076c0,55.700393-44.706441,100.854476-99.854626,100.854476v-.00001c-55.148184,0-99.854626-45.154083-99.854626-100.854476s44.706441-100.854476,99.854626-100.854476v.00001c55.148184,0,99.854626,45.154083,99.854626,100.854476Zm-50.246481.561801c0-27.691573-22.203178-50.144953-49.608144-50.187063v-.00001c-27.404967.04211-49.608144,22.49549-49.608144,50.187063s22.203178,50.144943,49.608144,50.187063v.00001c27.404967-.04212,49.608144-22.49549,49.608144-50.187063Z"
        transform="matrix(1.452111 0 0 1.437715-75.464505-65.257667)"
        filter="url(#eqgAZWxbHQJ2-filter)"
        fill="url(#eqgAZWxbHQJ2-fill)"
        strokeWidth="0"
      />
    </svg>
  );
}
