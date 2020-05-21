import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import Slider from '@material-ui/core/Slider'

const Container = styled.div`
  text-align: center;
`

const InputLabel = styled.label`
  font-size: 1.2rem;
`

const TotalStakePools = ({ value, label, onChange }) => (
  <Container>
    <FormControl fullWidth>
      <InputLabel shrink>
        {label} ({value})
      </InputLabel>
      <Slider
        value={value}
        min={50}
        max={150}
        step={1}
        onChange={(_, v) => {
          if (v === value) return
          onChange(v)
        }}
        marks={[
          {
            value: 50,
            label: '50'
          },
          {
            value: 100,
            label: '100'
          },
          {
            value: 150,
            label: '150'
          }
        ]}
      />
    </FormControl>
  </Container>
)

TotalStakePools.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TotalStakePools
