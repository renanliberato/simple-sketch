import uuid from 'uuid/v4'
import { useEffect } from 'react'

export const useDiagramEvents = (mousePos, setMousePos, tool, color, diagram, setDiagram, setCreatingDiagram, onElementClick) => {
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
      if (!mousePos) {
        return
      }
      var element = {
        id: uuid(),
        type: tool,
        x: mousePos.xStart,
        y: mousePos.yStart,
        height: e.pageY - mousePos.yStart,
        width: e.pageX - mousePos.xStart,
        backgroundColor: color
      }

      if (tool == 'line') {
        const isVertical = element.height > element.width;
        element = {
          ...element,
          height: isVertical ? element.height : 3,
          width: isVertical ? 3 : element.width,
        }
      }

      setCreatingDiagram(element)
    }

    var mouseLeaveSub = containerElement.onmouseup = function(e) {
      
      if (e.target.className == 'diagram-container') {
        onElementClick(null)
      }

      if (!mousePos || (e.pageX - mousePos.xStart < 50 && e.pageY - mousePos.yStart < 50)) {
        return
      }

      const element = {
        id: uuid(),
        type: tool,
        x: mousePos.xStart,
        y: mousePos.yStart,
        height: e.pageY - mousePos.yStart,
        width: e.pageX - mousePos.xStart,
        backgroundColor: color
      };

      if (tool == 'line') {
        const isVertical = element.height > element.width;
        setDiagram([
          ...diagram,
          {
            ...element,
            height: isVertical ? element.height : 3,
            width: isVertical ? 3 : element.width,
          }
        ])
      } else {
        setDiagram([
          ...diagram,
          element
        ])
      }
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