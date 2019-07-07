import React, { useState } from 'react'

export function Square({item, onElementClick}) {
  const [moving, setMoving] = useState(null)
  return (
    <rect onClick={() => onElementClick(item.id)}
      className={'diagram-element'}
      height={item.height}
      width={item.width}
      strokeWidth={item.selected ? 3 : 0}
      stroke={'#ccc'}
      fill={item.backgroundColor}
      x={item.selected ? item.x - 3 : item.x}
      y={item.selected ? item.y - 3 : item.y} />
  )
}

export function Circle({item, onElementClick}) {
  return (
    <circle onClick={() => onElementClick(item.id)}
      className={'diagram-element'}
      strokeWidth={item.selected ? 3 : 0}
      stroke={'#ccc'}
      r={item.height}
      fill={item.backgroundColor}
      cx={item.selected ? item.x - 3 : item.x}
      cy={item.selected ? item.y - 3 : item.y} />
  )
}

export function Line({item, onElementClick}) {
  return (
    <line onClick={() => onElementClick(item.id)}
      className={'diagram-element'}
      x1={item.selected ? item.x - 3 : item.x}
      x2={item.x + item.width}
      y1={item.selected ? item.y - 3 : item.y}
      y2={item.y + item.height}
      strokeWidth={item.selected ? 6 : 3}
      stroke={item.backgroundColor} />
  )
}