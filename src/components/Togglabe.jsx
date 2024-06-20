import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglabe = forwardRef(({ showLabel, hideLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return visible === false ? (
    <button onClick={toggleVisibility}>{showLabel === undefined ? 'View' : showLabel}</button>
  ) : (
    <div>
      {children}
      <button onClick={toggleVisibility}>{hideLabel === undefined ? 'Hide' : hideLabel}</button>
    </div>
  )
})
export default Togglabe
