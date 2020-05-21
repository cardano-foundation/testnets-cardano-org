import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Delegator from '../ShelleyHaskellStakingCalculator/Delegator'
import Operator from '../ShelleyHaskellStakingCalculator/Operator'
import ADASymbol from '../ShelleyHaskellStakingCalculator/ADASymbol'
import BTCSymbol from '../ShelleyHaskellStakingCalculator/BTCSymbol'
import CardanoLogo from '../ShelleyHaskellStakingCalculator/CardanoLogo'
import DelegatorIcon from '../ShelleyHaskellStakingCalculator/DelegatorIcon'
import OperatorIcon from '../ShelleyHaskellStakingCalculator/OperatorIcon'
import GlobalContentQuery from '../../queries/GlobalContentQuery'

const Container = styled.div`
  max-width: 60rem;
`

const Introduction = styled(Box)`
  p {
    margin: 0;
    font-size: 1.8rem;

    &:first-of-type {
      font-weight: 600;
      font-size: 2.2rem;
      margin-bottom: 0.6rem;
    }
  }
`

const CalculatorPicker = styled.div`
  display: flex;

  > div {
    flex: 1;
    margin: 2rem;
    overflow: hidden;
    position: relative;

    button {
      border-radius: 0.4rem;
      padding: 3rem 1.5rem;
      height: 100%;

      &.MuiButton-contained {
        padding: 3.1rem 1.6rem;
      }

      > .MuiButton-label {
        font-weight: 900;
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 2;

        svg {
          height: 4rem;
          margin-bottom: 1rem;
        }
      }
    }

    > div {
      position: absolute;
      bottom: 0;

      svg {
        width: 13rem;
      }
    }

    &:first-of-type > div {
      left: 0;
      transform: translate(-45%, 45%);
    }

    &:last-of-type > div {
      right: 0;
      transform: translate(45%, 45%);
    }
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;

    > div {
      max-width: 25rem;
      width: 100%;
      margin: 2rem auto;
    }
  }
`

const Actions = styled.div`
  display: flex;

  > div {
    flex: 1;
    margin: 2rem;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;

    > div {
      max-width: 25rem;
      width: 100%;
      margin: 1rem auto;
    }
  }
`

const HalfWidthGroup = styled.div`
  width: 100%;
  margin: 4rem 0;

  > div {
    display: inline-block;
    width: 50%;
    padding-left: 2rem;
    vertical-align: text-top;

    &:first-of-type {
      padding-right: 2rem;
      padding-left: 0;
    }
  }
`

const FullWidthGroup = styled.div`
  width: 100%;
  margin: 6rem 2rem;
`

const Inputs = styled.div`
`

const Results = styled.div`
`

const DEFAULT_VALUES = {
  ada: '0',
  participationRate: 0.35,
  stakePoolControl: 0.01,
  operatorsStake: 0.01,
  stakePoolMargin: 0.1,
  stakePoolPerformance: 1,
  totalStakePools: 100,
  totalADA: 45e9,
  totalADAInCirculation: 31690410958.90
}

function getDefaultValues (currency) {
  return {
    ...DEFAULT_VALUES,
    currency,
    stakePoolFixedFee: `${parseFloat(currency.exchangeRate) * 250}`
  }
}

const Calculator = ({ currencies, content }) => {
  const [ allCurrencies, setAllCurrencies ] = useState(JSON.parse(JSON.stringify(currencies)))
  const [ values, setValues ] = useState(getDefaultValues(allCurrencies[0]))
  const [ type, setType ] = useState('delegator')
  const [ showAdvancedOptions, setShowAdvancedOptions ] = useState(false)

  const setValue = (key, value) => setValues({ ...values, [key]: value })
  const updateType = (type) => (e) => {
    e.preventDefault()
    setType(type)
  }

  const fromADA = (amount) => {
    return amount * parseFloat(values.currency.exchangeRate)
  }

  const toADA = (amount) => {
    return amount / parseFloat(values.currency.exchangeRate)
  }

  const toggleShowAdvancedOptions = (e) => {
    e.preventDefault()
    setShowAdvancedOptions(!showAdvancedOptions)
  }

  const reset = () => {
    const currency = currencies.filter(currency => currency.key === values.currency.key).shift()
    setAllCurrencies(JSON.parse(JSON.stringify(currencies)))
    setValues(getDefaultValues(currency))
  }

  const onReset = (e) => {
    e.preventDefault()
    reset()
  }

  const getCurrencySymbol = (key) => (currencies.filter(currency => currency.key === key).shift() || {}).symbol || null
  const normalizeLargeNumber = (number, dp = 0) => {
    const normalizedNumber = (number || 0).toFixed(dp)
    const asStringArray = `${normalizedNumber}`.split('.')
    const n = asStringArray[0].split('').reverse()
    let i = 3
    while (i < n.length) {
      n.splice(i, 0, ',')
      i += 4
    }

    let finalNumber = n.reverse().join('').concat(asStringArray[1] ? `.${asStringArray[1]}` : '')
    if (finalNumber.indexOf('.') > -1) {
      while (finalNumber[finalNumber.length - 1] === '0') {
        finalNumber = finalNumber.substring(0, finalNumber.length - 1)
      }
    }

    return finalNumber
  }

  const CalculatorComponent = type === 'delegator' ? Delegator : Operator
  return (
    <Container>
      <Introduction paddingBottom={1} textAlign='center'>
        <p>{content.staking_calculator.select_a_calculator}</p>
        <p>{content.staking_calculator.i_want_to}</p>
      </Introduction>
      <CalculatorPicker>
        <div>
          <Button
            variant={type === 'delegator' ? 'contained' : 'outlined'}
            onClick={updateType('delegator')}
            color='primary'
            fullWidth
          >
            <DelegatorIcon active={type === 'delegator'} />
            <span>{content.staking_calculator.delegate_my_stake}</span>
          </Button>
          <CardanoLogo active={type === 'delegator'} />
        </div>
        <div>
          <Button
            variant={type === 'operator' ? 'contained' : 'outlined'}
            onClick={updateType('operator')}
            color='primary'
            fullWidth
          >
            <OperatorIcon active={type === 'operator'} />
            <span>{content.staking_calculator.run_a_stake_pool}</span>
          </Button>
          <CardanoLogo active={type === 'operator'} />
        </div>
      </CalculatorPicker>
      <Actions>
        <div>
          <Button
            color='primary'
            variant={showAdvancedOptions ? 'contained' : 'outlined'}
            onClick={toggleShowAdvancedOptions}
            fullWidth
          >
            {content.staking_calculator.show_advanced_options}
          </Button>
        </div>
        <div>
          <Button
            color='primary'
            variant='outlined'
            onClick={onReset}
            fullWidth
          >
            {content.staking_calculator.reset}
          </Button>
        </div>
      </Actions>
      <Inputs>
        <CalculatorComponent
          values={values}
          setValue={setValue}
          content={content}
          toADA={toADA}
          fromADA={fromADA}
          showAdvancedOptions={showAdvancedOptions}
          HalfWidthGroup={HalfWidthGroup}
          FullWidthGroup={FullWidthGroup}
          getCurrencySymbol={getCurrencySymbol}
          currencies={currencies}
          normalizeLargeNumber={normalizeLargeNumber}
        />
      </Inputs>
      <Results>
        <p>Results</p>
      </Results>
    </Container>
  )
}

Calculator.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.shape({
    symbol: PropTypes.node.isRequired,
    key: PropTypes.string.isRequired,
    exchangeRate: PropTypes.string.isRequired
  })),
  content: PropTypes.object.isRequired
}

export default () => {
  const [ currencies, setCurrencies ] = useState(null)

  const parseCurrencies = (data) => {
    const currencies = [
      { symbol: <ADASymbol />, key: 'ADA', exchangeRate: '1' },
      { key: 'USD', symbol: '$' },
      { key: 'BTC', symbol: <BTCSymbol /> },
      { key: 'EUR', symbol: '€' },
      { key: 'GBP', symbol: '£' },
      { key: 'JPY', symbol: '¥' }
    ]

    const currentPrice = data.market_data.current_price
    return currencies.map(currency => ({ exchangeRate: `${currentPrice[currency.key.toLowerCase()]}`, ...currency })).filter(({ exchangeRate }) => Boolean(exchangeRate))
  }

  const loadCardanoData = async () => {
    const storageKey = window.btoa('___react-ada-staking-calculator___coingecko-result')
    try {
      const cachedResult = window.localStorage.getItem(storageKey)
      if (cachedResult && cachedResult.expires > Date.now()) {
        setCurrencies(parseCurrencies(cachedResult.result))
      } else {
        const result = await fetch('https://api.coingecko.com/api/v3/coins/cardano')
        const jsonResult = await result.json()
        window.localStorage.setItem(storageKey, JSON.stringify({
          result: jsonResult,
          expires: Date.now() + 1000 * 60 * 60
        }))

        setCurrencies(parseCurrencies(jsonResult))
      }
    } catch (err) {
      console.error('Unable to fetch Cardano data', err)
      setCurrencies([
        { symbol: 'ADA', key: 'ADA', exchangeRate: 1 }
      ])
    }
  }

  useEffect(() => {
    loadCardanoData()
  }, [])

  return (
    <GlobalContentQuery
      render={content => (
        <Box position='relative'>
          {currencies === null &&
            <Box textAlign='center' paddingTop={4} paddingBottom={4}>
              <CircularProgress />
            </Box>
          }
          {currencies !== null &&
            <Calculator currencies={currencies} content={content} />
          }
        </Box>
      )}
    />
  )
}
