'use client'

import { useEffect, useRef, useState, RefObject } from 'react'
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

const FRAME_COUNT = 106
const FRAME_PATH = (i: number) =>
  `/sequence1/frame_${String(i).padStart(3, '0')}_delay-0.04s.png`

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  if (!img.naturalWidth || !img.naturalHeight || !canvas.width || !canvas.height) return

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
    sy = 0 
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
}

export default function SectionScrollyCanvas({ scrollYProgress }: { scrollYProgress: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const [isReady, setIsReady] = useState(false)

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1])

  // Preload images
  useEffect(() => {
    const images = new Array(FRAME_COUNT)
    let loadedCount = 0

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = FRAME_PATH(i)
      img.onload = () => {
        loadedCount++
        if (loadedCount === 1) setIsReady(true)
        
        // If this is the current frame, draw it immediately
        if (i === currentFrameRef.current) {
          const canvas = canvasRef.current
          const ctx = canvas?.getContext('2d')
          if (canvas && ctx) drawImageCover(ctx, img, canvas)
        }
      }
      images[i] = img
    }
    imagesRef.current = images

    return () => {
      imagesRef.current = []
    }
  }, [])

  // Handle resize and initial draw
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'

      const img = imagesRef.current[currentFrameRef.current]
      if (img?.complete && img.naturalWidth > 0) {
        const ctx = canvas.getContext('2d')
        if (ctx) drawImageCover(ctx, img, canvas)
      }
    }

    setSize()
    window.addEventListener('resize', setSize)
    return () => window.removeEventListener('resize', setSize)
  }, [isReady])

  // Scroll handler
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const idx = Math.round(Math.min(Math.max(latest, 0), FRAME_COUNT - 1))
    if (idx === currentFrameRef.current) return
    
    currentFrameRef.current = idx
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = imagesRef.current[idx]

    if (canvas && ctx && img?.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawImageCover(ctx, img, canvas)
    } else if (img) {
      img.onload = () => {
        if (idx === currentFrameRef.current && canvas && ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          drawImageCover(ctx, img, canvas)
        }
      }
    }
  })

  return (
    <div className="absolute inset-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block"
        style={{ background: '#121212' }}
      />
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-transparent to-[#121212] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(18,18,18,0.2)_100%)]" />
    </div>
  )
}
