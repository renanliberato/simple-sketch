import React from 'react'

export function Square({item, onElementClick}) {
  return (
    <div onClick={() => onElementClick(item.id)}
      className={'diagram-element'}
      style={{
        height: item.height,
        width: item.width,
        borderWidth: item.selected ? 3 : 0,
        borderStyle: 'solid',
        borderColor: '#ccc',
        backgroundColor: item.backgroundColor,
        position: 'absolute',
        top: item.selected ? item.y - 3 : item.y,
        left: item.selected ? item.x - 3 : item.x
      }}></div>
  )
}

export function Circle({item, onElementClick}) {
  return (
    <div onClick={() => onElementClick(item.id)}
      className={'diagram-element'}
      style={{
        borderRadius: item.height / 2,
        borderWidth: item.selected ? 3 : 0,
        borderStyle: 'solid',
        borderColor: '#ccc',
        height: item.height,
        width: item.height,
        backgroundColor: item.backgroundColor,
        position: 'absolute',
        top: item.selected ? item.y - 3 : item.y,
        left: item.selected ? item.x - 3 : item.x
      }}></div>
  )
}

export function Line({item, onElementClick}) {
  return (
    <div onClick={() => onElementClick(item.id)}
      className={'diagram-element'}
      style={{
        height: item.height,
        width: item.width,
        borderWidth: item.selected ? 3 : 0,
        borderStyle: 'solid',
        borderColor: '#ccc',
        backgroundColor: item.backgroundColor,
        position: 'absolute',
        top: item.selected ? item.y - 3 : item.y,
        left: item.selected ? item.x - 3 : item.x
      }}></div>
  )
}