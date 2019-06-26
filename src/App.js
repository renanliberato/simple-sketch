import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [tool, setTool] = useState(null);
  const [color, setColor] = useState(null);
  const [diagram, setDiagram] = useState([]);
  const [creatingDiagram, setCreatingDiagram] = useState(null);
  const [mousePos, setMousePos] = useState(null);
  
  useEffect(() => {
    var containerElement = document.getElementsByClassName('diagram-container')[0];
    var mouseEnterSub = containerElement.onmousedown = function(e) {
      if (e.target != containerElement) {
        return
      }

      setMousePos({
        xStart: e.pageX,
        yStart: e.pageY
      })
    }
    
    var mouseMoveSub = containerElement.onmousemove = function(e) {
      if (mousePos) {
        setCreatingDiagram({
          type: tool,
          x: mousePos.xStart,
          y: mousePos.yStart,
          height: e.pageY - mousePos.yStart,
          width: e.pageX - mousePos.xStart,
          backgroundColor: color
        })
      }
    }

    var mouseLeaveSub = containerElement.onmouseup = function(e) {
      if (!mousePos || e.pageX - mousePos.xStart < 50) {
        return
      }
      setDiagram([
        ...diagram,
        {
          type: tool,
          x: mousePos.xStart,
          y: mousePos.yStart,
          height: e.pageY - mousePos.yStart,
          width: e.pageX - mousePos.xStart,
          backgroundColor: color
        }
      ])
      setCreatingDiagram(null)
      setMousePos(null)
    }

    return () => {
      mouseEnterSub = null;
      mouseMoveSub = null;
      mouseLeaveSub = null;
    }
  })

  console.log(diagram);

  return (
    <div className='container'>
      <h1>Simple Sketch</h1>

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
          onClick={() => setTool('square')}
          style={{
            border: '1px solid black',
            backgroundColor: tool == 'square' ? 'lightgray' : 'white',
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
      <div style={{
        position: 'absolute',
        top: 210,
        left: 30,
        width: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <span>Colors</span>
        <button
          onClick={() => setColor('red')}
          style={{
            borderWidth: 3,
            borderColor: color == 'red' ? 'white' : 'red',
            borderRadius: 15,
            backgroundColor: 'red',
            width: 30,
            height: 30,
          }}></button>
        <button
          onClick={() => setColor('blue')}
          style={{
            marginTop: 10,
            borderWidth: 3,
            borderColor: color == 'blue' ? 'white' : 'blue',
            borderRadius: 15,
            backgroundColor: 'blue',
            width: 30,
            height: 30,
          }}></button>
      </div>
      <div className='diagram-container'>
        {renderCreatingObject(creatingDiagram)}
        {diagram.map(item => {
          switch (item.type) {
            case 'square':
              return createSquare(item)
            case 'circle':
              return createCircle(item)
          }
        })}
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
  }
}

function createSquare(item) {
  return (
    <div key={`x${item.x}y${item.y}`} style={{
      height: item.height,
      width: item.width,
      backgroundColor: item.backgroundColor,
      position: 'absolute',
      top: item.y,
      left: item.x
    }}>
    </div>
  )
}

function createCircle(item) {
  return (
    <div key={`x${item.x}y${item.y}`} style={{
      borderRadius: item.height / 2,
      height: item.height,
      width: item.height,
      backgroundColor: item.backgroundColor,
      position: 'absolute',
      top: item.y,
      left: item.x,
    }}>
    </div>
  )
}

export default App;
