import React, { useRef, useEffect, useState } from "react"

const Canvas = ({ board_size, size, stones, markers, on_click, ...props }) => {
  const canvasRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const draw = (ctx) => {
    const cell_size = size / (board_size + 1)
    const alth = "ABCDEFGHJKLMNOPQRST"

    ctx.fillStyle = "#212529"
    ctx.fillRect(0, 0, size, size)
    ctx.strokeStyle = "#F0F0F0"
    ctx.lineWidth = 1
    ctx.font = `${Math.round(cell_size / 1.8)}px serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.beginPath()
    for (let i = 1; i <= board_size; i++) {
      ctx.moveTo(i * cell_size, cell_size)
      ctx.lineTo(i * cell_size, size - cell_size)
      ctx.moveTo(cell_size, i * cell_size)
      ctx.lineTo(size - cell_size, i * cell_size)
      ctx.fillStyle = "#F0F0F0"
      ctx.fillText(`${i}`, 0.5 * cell_size, i * cell_size)
      ctx.fillText(`${i}`, size - 0.5 * cell_size, i * cell_size)
      ctx.fillText(alth[i - 1], i * cell_size, 0.5 * cell_size)
      ctx.fillText(alth[i - 1], i * cell_size, size - 0.5 * cell_size)
    }
    ctx.stroke()

    ctx.fillStyle = "#F0F0F0"
    ctx.beginPath()
    ctx.arc(4 * cell_size, 4 * cell_size, cell_size / 8, 0, 2 * Math.PI)
    ctx.arc(
      Math.ceil(board_size / 2) * cell_size,
      4 * cell_size,
      cell_size / 8,
      0,
      2 * Math.PI
    )
    ctx.arc(size - 4 * cell_size, 4 * cell_size, cell_size / 8, 0, 2 * Math.PI)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(
      4 * cell_size,
      Math.ceil(board_size / 2) * cell_size,
      cell_size / 8,
      0,
      2 * Math.PI
    )
    ctx.arc(
      Math.ceil(board_size / 2) * cell_size,
      Math.ceil(board_size / 2) * cell_size,
      cell_size / 8,
      0,
      2 * Math.PI
    )
    ctx.arc(
      size - 4 * cell_size,
      Math.ceil(board_size / 2) * cell_size,
      cell_size / 8,
      0,
      2 * Math.PI
    )
    ctx.fill()
    ctx.beginPath()
    ctx.arc(4 * cell_size, size - 4 * cell_size, cell_size / 8, 0, 2 * Math.PI)
    ctx.arc(
      Math.ceil(board_size / 2) * cell_size,
      size - 4 * cell_size,
      cell_size / 8,
      0,
      2 * Math.PI
    )
    ctx.arc(
      size - 4 * cell_size,
      size - 4 * cell_size,
      cell_size / 8,
      0,
      2 * Math.PI
    )
    ctx.fill()

    stones.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col !== 0) {
          ctx.beginPath()
          ctx.fillStyle = col === -1 ? "#F0F0F0" : "#212529"
          ctx.arc(
            (1 + colIndex) * cell_size,
            (1 + rowIndex) * cell_size,
            cell_size / 2,
            0,
            2 * Math.PI
          )
          ctx.fill()
          ctx.beginPath()
          ctx.strokeStyle = col === 1 ? "#F0F0F0" : "#212529"
          ctx.arc(
            (1 + colIndex) * cell_size,
            (1 + rowIndex) * cell_size,
            cell_size / 2,
            0,
            2 * Math.PI
          )
          ctx.stroke()
        } else if (
          mousePos.x > (0.5 + colIndex) * cell_size &&
          mousePos.x < (1.5 + colIndex) * cell_size &&
          mousePos.y > (0.5 + rowIndex) * cell_size &&
          mousePos.y < (1.5 + rowIndex) * cell_size
        ) {
          ctx.globalAlpha = 0.5
          ctx.beginPath()
          ctx.fillStyle = "#212529"
          ctx.arc(
            (1 + colIndex) * cell_size,
            (1 + rowIndex) * cell_size,
            cell_size / 2,
            0,
            2 * Math.PI
          )
          ctx.fill()
          ctx.globalAlpha = 1
        }
      })
    })

    markers.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const center_pos = {
          x: (1 + colIndex) * cell_size,
          y: (1 + rowIndex) * cell_size,
        }
        if (col !== 0) {
          switch (col.type) {
            case "triangle": {
              ctx.fillStyle = col.color
              ctx.beginPath()
              ctx.moveTo(
                center_pos.x - (Math.cos(Math.PI / 6) * cell_size) / 2,
                center_pos.y + cell_size / 4
              )
              ctx.lineTo(
                center_pos.x + (Math.cos(Math.PI / 6) * cell_size) / 2,
                center_pos.y + cell_size / 4
              )
              ctx.lineTo(center_pos.x, center_pos.y - cell_size / 2)
              ctx.fill()
              break
            }
            case "gradient": {
              ctx.globalAlpha = 0.7
              const gradient = ctx.createRadialGradient(
                center_pos.x,
                center_pos.y,
                (cell_size / 4) * col.multiplier,
                center_pos.x,
                center_pos.y,
                (cell_size / 2) * col.multiplier
              )
              gradient.addColorStop(1, "#20E7C1")
              gradient.addColorStop(0, "#9FE7DA")
              ctx.fillStyle = gradient
              ctx.beginPath()
              ctx.arc(
                center_pos.x,
                center_pos.y,
                (cell_size / 2) * col.multiplier,
                0,
                2 * Math.PI
              )
              ctx.fill()
              ctx.globalAlpha = 1
              break
            }
            case "circle": {
              ctx.fillStyle = col.color
              ctx.strokeStyle = col.color
              ctx.lineWidth = 3
              ctx.beginPath()
              ctx.arc(
                center_pos.x,
                center_pos.y,
                cell_size / 2.5,
                0,
                2 * Math.PI
              )
              if (col.fill) {
                ctx.fill()
              } else {
                ctx.stroke()
              }
              if (col.text) {
                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                ctx.font = `${Math.round(cell_size / 1.8)}px fantasy`
                ctx.fillStyle = col.textColor
                ctx.fillText(col.text, center_pos.x, center_pos.y)
              }
              break
            }
            case "probability": {
              if (col.probability !== 0) {
                ctx.fillStyle = col.probability < 0 ? "#F0F0F0" : "#212529"
                ctx.strokeStyle = col.probability > 0 ? "#F0F0F0" : "#212529"
                ctx.fillRect(
                  center_pos.x - (Math.abs(col.probability) * cell_size) / 2,
                  center_pos.y - (Math.abs(col.probability) * cell_size) / 2,
                  Math.abs(col.probability) * cell_size,
                  Math.abs(col.probability) * cell_size
                )
                ctx.strokeRect(
                  center_pos.x - (Math.abs(col.probability) * cell_size) / 2,
                  center_pos.y - (Math.abs(col.probability) * cell_size) / 2,
                  Math.abs(col.probability) * cell_size,
                  Math.abs(col.probability) * cell_size
                )
              }
            }
          }
        }
      })
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    draw(context)
  }, [draw, mousePos])

  const canvasClick = () => {
    let clickPos = []
    const cell_size = size / (board_size + 1)
    stones.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        if (
          mousePos.x > (0.5 + colIndex) * cell_size &&
          mousePos.x < (1.5 + colIndex) * cell_size &&
          mousePos.y > (0.5 + rowIndex) * cell_size &&
          mousePos.y < (1.5 + rowIndex) * cell_size
        ) {
          clickPos = [rowIndex, colIndex]
        }
      })
    })
    if(clickPos.length){
      on_click(clickPos)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()

    const canvasMouseMove = (e) => {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    canvas.addEventListener("mousemove", canvasMouseMove)
    return () => {
      canvas.removeEventListener("mousemove", canvasMouseMove)
    }
  }, [])

  return <canvas onClick={canvasClick} width={size} height={size} ref={canvasRef} {...props} />
}

export default Canvas
