import uuid from 'uuid/v4'
import { useEffect, useState } from 'react'

export const useDiagramEvents = (mousePos, setMousePos, tool, color, diagram, setDiagram, setCreatingDiagram, onElementClick) => {
  useEffect(() => {
    var containerElement = document.getElementsByClassName('diagram')[0];
    var mouseEnterSub = containerElement.onmousedown = function(e) {
      if (e.target != containerElement) {
        return
      }

      setMousePos({
        xStart: e.offsetX,
        yStart: e.offsetY
      })
    }
    
    var mouseMoveSub = containerElement.onmousemove = function(e) {
      if (!mousePos) {
        return
      }
      var element = {
        id: uuid(),
        type: tool,
        x: mousePos.xStart,
        y: mousePos.yStart,
        height: Math.abs(e.offsetY - mousePos.yStart),
        width: Math.abs(e.offsetX - mousePos.xStart),
        backgroundColor: color
      }

      setCreatingDiagram(element)
    }

    var mouseLeaveSub = containerElement.onmouseup = function(e) {
      if (e.target.className == 'diagram') {
        onElementClick(null)
      }

      if (!mousePos || (Math.abs(e.offsetX - mousePos.xStart) < 50 && Math.abs(e.offsetY - mousePos.yStart < 50))) {
        return
      }

      const element = {
        id: uuid(),
        type: tool,
        x: mousePos.xStart,
        y: mousePos.yStart,
        height: Math.abs(e.offsetY - mousePos.yStart),
        width: Math.abs(e.offsetX - mousePos.xStart),
        backgroundColor: color
      };

      setDiagram([
        ...diagram,
        element
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
}

export function useDiagram() {
  var localDiagram = JSON.parse(localStorage.getItem('diagram'));
  const [diagram, setDiagram] = useState(localDiagram ? localDiagram : []);

  const setDiagramAndSave = newDiagram => {
    setDiagram(newDiagram)
    localStorage.setItem('diagram', JSON.stringify(newDiagram))
  };

  return [diagram, setDiagramAndSave]
}