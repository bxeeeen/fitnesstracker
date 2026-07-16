import { useEffect, useRef, useState } from 'react'

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const DISMISS_DISTANCE = 120
const DISMISS_VELOCITY = 0.5

export default function Modal({ onClose, children }) {
  const [dragY, setDragY] = useState(0)
  const [dragging, setDragging] = useState(false)
  const touchState = useRef({ startY: 0, startTime: 0 })

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  // Swipe-to-close only tracks touches that start on the handle/header — the
  // content area below keeps native scrolling untouched.
  function handleTouchStart(e) {
    touchState.current = { startY: e.touches[0].clientY, startTime: Date.now() }
    setDragging(true)
  }

  function handleTouchMove(e) {
    const delta = e.touches[0].clientY - touchState.current.startY
    if (delta > 0) setDragY(delta)
  }

  function handleTouchEnd() {
    setDragging(false)
    const elapsed = Date.now() - touchState.current.startTime
    const velocity = dragY / Math.max(elapsed, 1)
    if (dragY > DISMISS_DISTANCE || velocity > DISMISS_VELOCITY) {
      onClose()
    } else {
      setDragY(0)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-sheet"
        style={{
          transform: dragY ? `translateY(${dragY}px)` : undefined,
          transition: dragging ? 'none' : undefined,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-drag-zone"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="modal-drag-handle" />
          <button type="button" className="modal-close" onClick={onClose} aria-label="Schließen">
            <CloseIcon />
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  )
}
