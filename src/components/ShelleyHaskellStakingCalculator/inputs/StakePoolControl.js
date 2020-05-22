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

const StakePoolControl = ({ value, label, helperText, adaInPool, onChange, adaSymbol, minValue, normalizeLargeNumber }) => {
  useEffect(() => {
    if (value < minValue) onChange(minValue)
  }, [ minValue ])

  return (
    <Container>
      <FormControl fullWidth>
        <InputLabel shrink>
          {label} ({normalizeLargeNumber(value * 100, 6)}%)
          <span>{adaSymbol} {adaInPool}</span>
        </InputLabel>
        <Slider
          value={Math.min(Math.sqrt(value), Math.sqrt(0.3))}
          min={0}
          max={Math.sqrt(0.3)}
          step={0.001}
          onChange={(_, v) => {
            const calculatedValue = Math.pow(v, 2)
            if (calculatedValue === value) return
            if (calculatedValue < minValue) {
              onChange(minValue)
            } else if (calculatedValue > Math.sqrt(0.3)) {
              onChange(Math.sqrt(0.3))
            } else {
              onChange(calculatedValue)
            }
          }}
          marks={[
            {
              value: 0,
              label: '0%'
            },
            {
              value: Math.sqrt(0.004),
              label: '0.4%'
            },
            {
              value: Math.sqrt(0.015),
              label: '1.5%'
            },
            {
              value: Math.sqrt(0.04),
              label: '4%'
            },
            {
              value: Math.sqrt(0.08),
              label: '8%'
            },
            {
              value: Math.sqrt(0.15),
              label: '15%'
            },
            {
              value: Math.sqrt(0.3),
              label: '30%'
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

StakePoolControl.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  adaInPool: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  adaSymbol: PropTypes.node.isRequired,
  minValue: PropTypes.number.isRequired,
  normalizeLargeNumber: PropTypes.func.isRequired
}

export default StakePoolControl
