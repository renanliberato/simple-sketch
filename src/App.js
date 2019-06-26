import React, {useEffect, useState} from 'react';
import uuid from 'uuid/v4';
import './App.css';
import { useDiagramEvents } from './diagram';
import { Tools } from './Tools';
import { Colors } from './Colors';
import { ItemConfiguration } from './ItemConfiguration';
import { Line, Circle, Square } from './elements';

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
              return <Square key={item.id} item={item} onElementClick={onElementClick} />
            case 'circle':
                return <Circle key={item.id} item={item} onElementClick={onElementClick} />
            case 'line':
                return <Line key={item.id} item={item} onElementClick={onElementClick} />
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
      return <Square key={item.id} item={item}/>
    case 'circle':
      return <Circle key={item.id} item={item}/>
    case 'line':
      return <Line key={item.id} item={item}/>
  }
}

export default App;
