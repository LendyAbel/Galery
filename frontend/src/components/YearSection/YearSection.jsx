import PropTypes from 'prop-types'

const YearSection = ({ year, count, children }) => (
  <div style={{ marginBottom: 32 }}>
    <div className='flex items-center gap-3' style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: 26, margin: 0 }}>{year}</h2>
      <span style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
      <span className='tag tag-neutral'>{count} foto{count === 1 ? '' : 's'}</span>
    </div>
    {children}
  </div>
)

YearSection.propTypes = {
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  count: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
}

export default YearSection
