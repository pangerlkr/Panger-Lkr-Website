'use client'

import { useEffect, useRef } from 'react'
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

// 66 frames: frame_00 → frame_65
const FRAME_COUNT = 66
const FRAME_PATH = (i: number) =>
  `/sequence/frame_${String(i).padStart(2, '0')}_delay-0.066s.png`

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const canvasAspect = canvas.width / canvas.height
  const imgAspect = img.naturalWidth / img.naturalHeight

  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight

  if (imgAspect > canvasAspect) {
    // Image is wider — crop sides
    sw = img.naturalHeight * canvasAspect
    sx = (img.naturalWidth - sw) / 2
  } else {
    // Image is taller — crop top/bottom
    sh = img.naturalWidth / canvasAspect
    sy = (img.naturalHeight - sh) / 2
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
}

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const loadedCountRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1])

  // Preload all frames
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Initial canvas size
    const setSize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'

      // Re-draw current frame on resize
      const img = imagesRef.current[currentFrameRef.current]
      if (img?.complete) {
        const ctx = canvas.getContext('2d')
        if (ctx) drawImageCover(ctx, img, canvas)
      }
    }

    setSize()
    window.addEventListener('resize', setSize)

    const ctx = canvas.getContext('2d')
    imagesRef.current = new Array(FRAME_COUNT)

    let allLoaded = false
    loadedCountRef.current = 0

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = FRAME_PATH(i)
      img.onload = () => {
        loadedCountRef.current++
        // Draw first frame immediately once available
        if (i === 0 && ctx) {
          drawImageCover(ctx, img, canvas)
        }
        if (loadedCountRef.current === FRAME_COUNT) {
          allLoaded = true
        }
      }
      imagesRef.current[i] = img
    }

    return () => {
      window.removeEventListener('resize', setSize)
    }
  }, [])

  // Sync scroll → canvas frame
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const idx = Math.round(Math.min(Math.max(latest, 0), FRAME_COUNT - 1))
    currentFrameRef.current = idx
    const img = imagesRef.current[idx]
    if (img?.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawImageCover(ctx, img, canvas)
    }
  })

  return (
    <div ref={containerRef} className="relative" style={{ height: '500vh' }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ background: '#121212' }}
        />

        {/* Dark vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(18,18,18,0.7) 100%)',
          }}
        />

        {/* Bottom fade to page background */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, #121212)',
          }}
        />
      </div>
    </div>
  )
}
