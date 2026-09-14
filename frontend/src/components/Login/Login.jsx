import { useState } from 'react'
import PropTypes from 'prop-types'
import { Images } from 'lucide-react'
import { motion } from 'framer-motion'

const Login = ({ onEnter }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    onEnter(email)
  }

  return (
    <div
      className='relative overflow-hidden min-h-screen flex items-center'
      style={{ background: 'var(--color-bg)' }}
    >
      <span
        className='absolute rounded-full'
        style={{ width: 420, height: 420, right: -140, top: -120, background: 'var(--color-accent-200)' }}
      />
      <span
        className='absolute rounded-full'
        style={{ width: 320, height: 320, right: 120, bottom: -180, background: 'var(--color-accent-2-200)' }}
      />

      <motion.form
        onSubmit={handleSubmit}
        className='relative flex flex-col'
        style={{ maxWidth: 460, padding: '48px 28px', gap: 20 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className='flex items-center gap-2'>
          <span
            className='flex items-center justify-center rounded-full'
            style={{ width: 40, height: 40, background: 'var(--color-accent)' }}
          >
            <Images size={20} strokeWidth={2.75} color='var(--color-bg)' />
          </span>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 20 }}>Galería</span>
        </div>

        <h1 style={{ fontSize: 'clamp(38px, 6vw, 60px)', lineHeight: 1.02 }}>Tus fotos, sólo tuyas.</h1>

        <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--color-neutral-800)', maxWidth: '40ch' }}>
          Un rincón privado para subir, ordenar y descargar tus recuerdos. Sin feeds, sin miradas ajenas.
        </p>

        <div className='flex flex-col' style={{ maxWidth: 380, gap: 12 }}>
          <div className='field'>
            <label htmlFor='login-email'>Correo</label>
            <input
              id='login-email'
              type='email'
              className='input'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='tucorreo@ejemplo.com'
            />
          </div>
          <div className='field'>
            <label htmlFor='login-password'>Contraseña</label>
            <input
              id='login-password'
              type='password'
              className='input'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='••••••••'
            />
          </div>
        </div>

        <div className='flex items-center gap-3 flex-wrap'>
          <button type='submit' className='btn btn-primary' style={{ padding: '12px 26px', fontSize: 15 }}>
            Entrar
          </button>
          <button
            type='button'
            className='btn btn-ghost'
            style={{ whiteSpace: 'nowrap' }}
            onClick={() => onEnter(email)}
          >
            Crear cuenta
          </button>
        </div>
      </motion.form>
    </div>
  )
}

Login.propTypes = {
  onEnter: PropTypes.func.isRequired,
}

export default Login
