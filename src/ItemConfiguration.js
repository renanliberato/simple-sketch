import React from 'react'

export function ItemConfiguration({selectedItem, updateSelectedItem, deleteElement}) {
  if (!selectedItem) {
    return null
  }

  return (
    <div style={{
      zIndex: 999,
      backgroundColor: '#ffffff',
      position: 'absolute',
      top: selectedItem.y,
      left: selectedItem.x + selectedItem.width + 20,
      width: 150,
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: '#000000'
    }}>
      <button onClick={() => deleteElement(selectedItem.id)}>Delete</button>
      <label>Height</label>
      <input value={selectedItem.height}
        type='number'
        onChange={(e) => updateSelectedItem(i => ({...i, height: parseInt(e.target.value)}))} />
      <label>Width</label>
      <input value={selectedItem.width}
        type='number'
        onChange={(e) => updateSelectedItem(i => ({...i, width: parseInt(e.target.value)}))} />
    </div>
  )
}