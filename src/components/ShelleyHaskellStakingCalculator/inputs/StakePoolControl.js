import React from 'react'
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

const StakePoolControl = ({ value, label, helperText, adaInPool, onChange, adaSymbol }) => (
  <Container>
    <FormControl fullWidth>
      <InputLabel shrink>
        {label} ({(value * 100).toFixed(1)}%)
        <span>{adaSymbol} {adaInPool}</span>
      </InputLabel>
      <Slider
        value={value}
        min={0}
        max={0.1}
        step={0.001}
        onChange={(_, v) => {
          if (v === value) return
          onChange(v)
        }}
        marks={[
          {
            value: 0,
            label: '0%'
          },
          {
            value: 0.02,
            label: '2%'
          },
          {
            value: 0.04,
            label: '4%'
          },
          {
            value: 0.06,
            label: '6%'
          },
          {
            value: 0.08,
            label: '8%'
          },
          {
            value: 0.1,
            label: '10%'
          }
        ]}
      />
      <FormHelperText>
        {helperText}
      </FormHelperText>
    </FormControl>
  </Container>
)

StakePoolControl.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  adaInPool: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  adaSymbol: PropTypes.node.isRequired
}

export default StakePoolControl
