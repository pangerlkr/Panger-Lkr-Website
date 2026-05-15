'use client'

import { useEffect, useRef } from 'react'
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

// 106 frames: frame_000 → frame_105
const FRAME_COUNT = 106
const FRAME_PATH = (i: number) =>
  `/sequence1/frame_${String(i).padStart(3, '0')}_delay-0.04s.png`

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
    // Image is taller — focus on the UPPER section (sy = 0)
    sh = img.naturalWidth / canvasAspect
    sy = 0 // Top-aligned crop
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
}

export default function SectionScrollyCanvas({ scrollYProgress }: { scrollYProgress: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const loadedCountRef = useRef(0)

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const setSize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'

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

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = FRAME_PATH(i)
      img.onload = () => {
        loadedCountRef.current++
        if (i === 0 && ctx) {
          drawImageCover(ctx, img, canvas)
        }
      }
      imagesRef.current[i] = img
    }

    return () => {
      window.removeEventListener('resize', setSize)
    }
  }, [])

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
    <div className="absolute inset-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ background: '#121212' }}
      />
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Gradients to blend with section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#121212] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#121212] to-transparent" />
    </div>
  )
}
