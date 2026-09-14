import PropTypes from 'prop-types'
import { Images } from 'lucide-react'
import { motion } from 'framer-motion'

const EmptyState = ({ onReset }) => (
  <motion.div
    className='flex flex-col items-center text-center'
    style={{ padding: '70px 20px', gap: 14 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <span
      className='flex items-center justify-center rounded-full'
      style={{ width: 120, height: 120, background: 'var(--color-accent-200)' }}
    >
      <Images size={52} strokeWidth={2.75} color='var(--color-accent-700)' />
    </span>
    <h3 style={{ fontSize: 24 }}>Aquí no hay nada… todavía</h3>
    <p style={{ color: 'var(--color-neutral-700)', maxWidth: '38ch' }}>
      Ninguna foto coincide con lo que buscas. Prueba otro álbum o sube un recuerdo nuevo.
    </p>
    <button type='button' className='btn btn-primary' onClick={onReset}>
      Ver todas las fotos
    </button>
  </motion.div>
)

EmptyState.propTypes = {
  onReset: PropTypes.func.isRequired,
}

export default EmptyState
