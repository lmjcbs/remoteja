import { useEffect, useRef, useState } from 'react'
import { FaChevronUp } from 'react-icons/fa'
import theme from '../styles/theme'

const ScrollButton = () => {
  const [showScroll, setShowScroll] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  const checkScroll = (): void => {
    if (!showScroll && window.pageYOffset > 100) {
      setShowScroll(true)
      if (ref.current !== null) {
        ref.current.focus()
      }
    } else if (showScroll && window.pageYOffset <= 100) {
      setShowScroll(false)
    }
  }

  const handleKeyPress = (e: KeyboardEvent): void => {
    if (showScroll && e.key === 'Enter') {
      scrollToTop()
    }
  }

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', checkScroll)
    window.addEventListener('keypress', handleKeyPress)

    return () => {
      window.removeEventListener('scroll', checkScroll)
      window.removeEventListener('keypress', handleKeyPress)
    }
  })

  return (
    <div ref={ref} onClick={scrollToTop} className="base">
      <i className="icon" aria-label="scroll up button">
        <FaChevronUp size={30} />
      </i>

      <style jsx>
        {`
          .base {
            display: flex;
            z-index: 100;
            align-items: center;
            justify-content: middle;
            position: fixed;
            bottom: 25px;
            right: 25px;
            border-radius: 50%;
            height: 40px;
            width: 40px;
            background-color: #eeeeee;
            color: ${theme.colors.primary};
            box-shadow: 0 0 3pt 1.5pt ${theme.colors.primary};
            cursor: pointer;
          }
          .icon {
            margin: 0 auto;
          }
        `}
      </style>
      <style jsx>
        {`
          .base {
            opacity: ${showScroll ? '1' : '0'};
          }
        `}
      </style>
    </div>
  )
}

export default ScrollButton
