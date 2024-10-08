'use client'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { BannerQuery } from '@/graphql/generated/graphql'
import { ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Progress from './Progress'
import Triangle from './Triangle'

type Props = {
  banner: BannerQuery['banner']
}

const Slider: FC<Props> = ({ banner }) => {
  const [bannerIndex, setBannerIndex] = useState(0)

  const currentSlide = useMemo(() => {
    const slide = banner?.contents?.at(bannerIndex)
    return slide
  }, [bannerIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      if (banner?.contents?.length) {
        if (bannerIndex === banner.contents.length - 1) {
          setBannerIndex(0)
        } else {
          setBannerIndex((prev) => prev + 1)
        }
      }
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  })

  return (
    <div
      className='w-full p-5 lg:p-24 xl:p-32 2xl:p-48 xl:px-52 2xl:px-72 relative bg-cover bg-center bg-opacity-50 max-h-[50vh]'
      style={{
        backgroundImage: currentSlide?.background_image?.url
          ? `url("${process.env.NEXT_PUBLIC_BASE_URL}${currentSlide.background_image.url}")`
          : undefined,
      }}
    >
      <div className='absolute inset-0 bg-white opacity-80'></div>
      <AnimatePresence>
        <motion.div
          className='relative z-10'
          key={bannerIndex}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'keyframes', duration: 0.5 }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
        >
          <div className='flex items-center gap-2'>
            <Triangle />
            <h1 className='text-4xl font-medium'>{currentSlide?.heading}</h1>
          </div>
          <p className='text-2xl pt-5 text-neutral-700 font-light'>
            {currentSlide?.sub_heading}
          </p>
          {currentSlide?.cta_button ? (
            <button className='rounded-lg px-5 py-3 bg-orange-500 hover:bg-orange-600 mt-7 text-white font-medium flex items-center gap-2'>
              {currentSlide.cta_button.title}
              <ArrowRight />
            </button>
          ) : null}
        </motion.div>
      </AnimatePresence>
      <div className='mt-10 flex items-center gap-10 relative z-20'>
        {banner?.contents?.map((content, index) => (
          <Progress
            key={content?.id}
            title={content?.name}
            active={index === bannerIndex}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider
