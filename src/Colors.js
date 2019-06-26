import React from 'react'

export function Colors({color, setColor}) {
  return (
    <div style={{
      position: 'absolute',
      top: 250,
      left: 30,
      width: 50,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <span>Colors</span>
      <input type='color'
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{
          width: 30,
          height: 30,
        }} />
    </div>
  )
}