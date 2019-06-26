import React from 'react'

export function Tools({tool, setTool}) {
  return (
    <div style={{
      position: 'absolute',
      top: 100,
      left: 30,
      width: 50,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <span>Elements</span>
      <button
        onClick={() => setTool('line')}
        style={{
          border: '1px solid black',
          backgroundColor: tool == 'line' ? 'lightgray' : 'white',
          width: 50,
          height: 30,
        }}>
        Line
      </button>
      <button
        onClick={() => setTool('square')}
        style={{
          border: '1px solid black',
          backgroundColor: tool == 'square' ? 'lightgray' : 'white',
          marginTop: 10,
          width: 50,
          height: 30,
        }}>
        Square
      </button>
      <button
        onClick={() => setTool('circle')}
        style={{
          border: '1px solid black',
          backgroundColor: tool == 'circle' ? 'lightgray' : 'white',
          marginTop: 10,
          width: 50,
          height: 30,
        }}>
        Circle
      </button>
    </div>
  )
}