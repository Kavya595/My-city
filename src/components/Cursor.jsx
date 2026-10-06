import { useCursor } from '../hooks'

export default function Cursor() {
  useCursor()

  return (
    <div id="cursor" style={{ position: 'fixed', top: 0, left: 0, zIndex: 99999, pointerEvents: 'none', mixBlendMode: 'difference' }}>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
    </div>
  )
}
