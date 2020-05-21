import React from 'react'
import PropTypes from 'prop-types'

const Operator = ({
  values,
  setValue,
  content,
  toADA,
  fromADA,
  showAdvancedOptions,
  HalfWidthGroup,
  FullWidthGroup,
  getCurrencySymbol,
  currencies,
  distributableReward
}) => {
  return (
    <div>
      {console.log({ values, setValue, content, toADA, fromADA, showAdvancedOptions, HalfWidthGroup, FullWidthGroup, getCurrencySymbol, currencies, distributableReward })}
      <p>Operator</p>
    </div>
  )
}

Operator.propTypes = {
  values: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  toADA: PropTypes.func.isRequired,
  fromADA: PropTypes.func.isRequired,
  HalfWidthGroup: PropTypes.object.isRequired,
  FullWidthGroup: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  showAdvancedOptions: PropTypes.bool.isRequired,
  getCurrencySymbol: PropTypes.func.isRequired,
  currencies: PropTypes.array.isRequired,
  distributableReward: PropTypes.number.isRequired
}

export default Operator
