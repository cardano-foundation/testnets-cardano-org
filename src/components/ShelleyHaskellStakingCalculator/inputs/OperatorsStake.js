import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Slider from '@material-ui/core/Slider'

const Container = styled.div`
  text-align: center;

  .MuiFormHelperText-root {
    text-align: center;
  }
`

const InputLabel = styled.label`
  font-size: 1.2rem;

  span {
    margin-top: 0.4rem;
    display: block;
  }
`

const OperatorsStake = ({ value, label, onChange, helperText, totalADA, totalADAInCirculation, stakePoolControl, adaSymbol, participationRate, normalizeLargeNumber }) => {
  const getMaxValue = (stakePoolControl, totalADA) => {
    let ada = parseFloat(totalADA)
    if (isNaN(ada)) ada = 0
    const stakeInPool = totalADAInCirculation * stakePoolControl * participationRate
    const stakeAvailable = Math.max(0, stakeInPool - ada)
    const maxValue = stakeAvailable === 0 ? 0 : Math.round(stakeAvailable / stakeInPool * 1e8) / 1e8
    const dp = (maxValue.toString().split('.')[1] || '').length
    if (dp > 8) return maxValue.toFixed(8)
    if (maxValue === 1 && ada > 0) return 0.99999999
    return maxValue
  }

  useEffect(() => {
    const maxValue = getMaxValue(stakePoolControl, totalADA)
    if (maxValue < value) onChange(maxValue)
  }, [ stakePoolControl, totalADA, value ])

  const maxValue = getMaxValue(stakePoolControl, totalADA)
  const getPercentageLabel = (value) => {
    if (value === maxValue) {
      const label = value * 100
      const dp = (label.toString().split('.')[1] || '').length
      if (dp > 6) return label.toFixed(6)
      return label
    }

    return Math.round(value * 100)
  }

  const getADAAmount = () => {
    if (value === maxValue) {
      let ada = parseFloat(totalADA)
      if (isNaN(ada)) ada = 0
      const stakeInPool = totalADAInCirculation * stakePoolControl * participationRate
      return Math.round(Math.max(0, stakeInPool - ada))
    } else {
      return normalizeLargeNumber(Math.round(value * stakePoolControl * totalADAInCirculation * participationRate))
    }
  }

  return (
    <Container>
      <FormControl fullWidth>
        <InputLabel shrink>
          {label} ({getPercentageLabel(value)}%)
          <span>{adaSymbol} {getADAAmount()}</span>
        </InputLabel>
        <Slider
          value={value}
          min={0}
          max={1}
          step={0.01}
          onChange={(_, v) => {
            if (v === value) return
            onChange(v > maxValue ? maxValue : v)
          }}
          marks={[
            {
              value: 0,
              label: '0%'
            },
            {
              value: maxValue || 0.000001,
              label: `${getPercentageLabel(maxValue)}%`
            }
          ]}
        />
        <FormHelperText>
          {helperText}
        </FormHelperText>
      </FormControl>
    </Container>
  )
}

OperatorsStake.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  normalizeLargeNumber: PropTypes.func.isRequired,
  helperText: PropTypes.string.isRequired,
  totalADAInCirculation: PropTypes.number.isRequired,
  totalADA: PropTypes.string.isRequired,
  participationRate: PropTypes.number.isRequired,
  stakePoolControl: PropTypes.number.isRequired,
  adaSymbol: PropTypes.node.isRequired
}

export default OperatorsStake
