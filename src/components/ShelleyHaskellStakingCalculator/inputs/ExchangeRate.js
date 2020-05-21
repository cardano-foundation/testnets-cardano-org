import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'

const Container = styled.div`
  p {
    margin: 0;
  }
`

const ExchangeRate = ({ value, onChange, label, helperText, symbol }) => (
  <Container>
    <TextField
      label={label}
      helperText={helperText}
      FormHelperTextProps={{
        component: 'div'
      }}
      value={`${value}`}
      type='number'
      min={0}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            {symbol}
          </InputAdornment>
        )
      }}
    />
  </Container>
)

ExchangeRate.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.node,
  symbol: PropTypes.node.isRequired
}

export default ExchangeRate
