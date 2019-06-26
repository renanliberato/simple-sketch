import React, {useEffect, useState} from 'react';
import uuid from 'uuid/v4';
import './App.css';
import { useDiagramEvents } from './diagram';
import { Tools } from './Tools';
import { Colors } from './Colors';
import { ItemConfiguration } from './ItemConfiguration';

function App() {
  const [tool, setTool] = useState('square');
  const [color, setColor] = useState('#000000');
  const [diagram, setDiagram] = useState([]);
  const [creatingDiagram, setCreatingDiagram] = useState(null);
  const [mousePos, setMousePos] = useState(null);
  
  const onElementClick = (id) => setDiagram(diagram.map(i => ({
    ...i,
    selected: i.id == id
  })))

  useDiagramEvents(mousePos, setMousePos, tool, color, diagram, setDiagram, setCreatingDiagram, onElementClick)
  

  const selectedItem = diagram.find(i => i.selected)

  const updateSelectedItem = (update) => setDiagram(diagram.map(i => {
    if (i.id == selectedItem.id) {
      return update(i)
    }

    return i
  }))

  const deleteElement = id => setDiagram(diagram.filter(i => i.id != id))

  return (
    <div className='container'>
      <h1>Simple Sketch</h1>

      <Tools tool={tool} setTool={setTool} />
      <Colors color={color} setColor={setColor} />
      <div className='diagram-container'>
        {renderCreatingObject(creatingDiagram)}
        {diagram.map(item => {
          switch (item.type) {
            case 'square':
              return createSquare(item, onElementClick)
            case 'circle':
              return createCircle(item, onElementClick)
            case 'line':
              return createLine(item, onElementClick)
          }
        })}
        <ItemConfiguration selectedItem={selectedItem} updateSelectedItem={updateSelectedItem} deleteElement={deleteElement} />
      </div>
    </div>
  );
}

function renderCreatingObject(item) {
  if (!item) {
    return
  }

  switch (item.type) {
    case 'square':
      return createSquare(item)
    case 'circle':
      return createCircle(item)
    case 'line':
      return createLine(item)
  }
}

function createSquare(item, onElementClick) {
  return (
    <div onClick={() => onElementClick(item.id)}
      key={item.id}
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

function createCircle(item, onElementClick) {
  return (
    <div onClick={() => onElementClick(item.id)}
      key={item.id}
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

function createLine(item, onElementClick) {
  return (
    <div onClick={() => onElementClick(item.id)}
      key={item.id}
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

export default App;
