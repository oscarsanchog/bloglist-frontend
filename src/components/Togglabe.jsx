import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglabe = forwardRef(({ showLabel, hideLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return visible === false ? (
    <button onClick={toggleVisibility}>{showLabel === undefined ? 'View' : showLabel}</button>
  ) : (
    <span className='togglabeContent'>
      {children}
      <button onClick={toggleVisibility}>{hideLabel === undefined ? 'Hide' : hideLabel}</button>
    </span>
  )
})

Togglabe.propTypes = {
  showLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([undefined])
  ]),
  hideLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([undefined])
  ])
}

export default Togglabe
