import { motion } from 'framer-motion'

const IconButton = ({ children, danger, ...props }) => (
  <motion.button
    type='button'
    className='btn btn-icon'
    style={{ background: 'color-mix(in srgb, var(--color-bg) 88%, transparent)' }}
    onMouseEnter={e => {
      e.currentTarget.style.color = danger ? '#9c2f22' : 'var(--color-accent-700)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.color = ''
    }}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.92 }}
    {...props}
  >
    {children}
  </motion.button>
)

export default IconButton
