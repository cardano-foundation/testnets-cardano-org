import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'
import ADAAmount from './inputs/ADAAmount'
import SelectCurrency from './inputs/SelectCurrency'
import ExchangeRate from './inputs/ExchangeRate'
import StakePoolFixedFee from './inputs/StakePoolFixedFee'
import StakePoolControl from './inputs/StakePoolControl'
import TotalStakePools from './inputs/TotalStakePools'
import ParticipationRate from './inputs/ParticipationRate'
import OperatorsStake from './inputs/OperatorsStake'
import StakePoolMargin from './inputs/StakePoolMargin'
import StakePoolPerformance from './inputs/StakePoolPerformance'

const Delegator = ({
  values,
  setValue,
  content,
  toADA,
  fromADA,
  showAdvancedOptions,
  HalfWidthGroup,
  FullWidthGroup,
  getCurrencySymbol,
  normalizeLargeNumber,
  currencies
}) => {
  return (
    <Fragment>
      <HalfWidthGroup>
        <div>
          <ADAAmount
            value={values.ada}
            onChange={value => setValue('ada', value)}
            label={content.staking_calculator.ada_label}
            helperText={content.staking_calculator.ada_descriptor}
            adaSymbol={getCurrencySymbol('ADA')}
          />
        </div>
        <div>
          <SelectCurrency
            value={values.currency}
            onChange={value => setValue('currency', value)}
            label={content.staking_calculator.currency_label}
            helperText={content.staking_calculator.currency_descriptor}
            currencies={currencies}
          />
        </div>
      </HalfWidthGroup>
      {showAdvancedOptions &&
        <Fragment>
          <HalfWidthGroup>
            <div>
              <ExchangeRate
                value={values.currency.exchangeRate}
                onChange={value => setValue('currency', { ...values.currency, exchangeRate: value })}
                label={content.staking_calculator.exchange_rate_label}
                helperText={<Markdown source={content.staking_calculator.exchange_rate_descriptor} />}
                symbol={getCurrencySymbol(values.currency.key)}
              />
            </div>
            <div>
              <StakePoolFixedFee
                toADA={toADA}
                fromADA={fromADA}
                value={values.stakePoolFixedFee}
                onChange={value => setValue('stakePoolFixedFee', value)}
                label={content.staking_calculator.fixed_fee_label}
                helperText={
                  <Markdown
                    source={
                      values.currency.key === 'ADA'
                        ? content.staking_calculator.fixed_fee_descriptor_ada
                        : content.staking_calculator.fixed_fee_descriptor.replace(/{{\s?amount\s?}}/g, normalizeLargeNumber(values.stakePoolFixedFee, 6))
                    }
                  />
                }
                symbol={getCurrencySymbol(values.currency.key)}
              />
            </div>
          </HalfWidthGroup>
          <FullWidthGroup>
            <StakePoolControl
              value={values.stakePoolControl}
              onChange={value => setValue('stakePoolControl', value)}
              label={content.staking_calculator.stake_pool_control_label}
              helperText={content.staking_calculator.stake_pool_control_descriptor}
              adaInPool={normalizeLargeNumber(values.totalADAInCirculation * values.participationRate * values.stakePoolControl)}
              adaSymbol={getCurrencySymbol('ADA')}
            />
          </FullWidthGroup>
          <FullWidthGroup>
            <TotalStakePools
              value={values.totalStakePools}
              onChange={value => setValue('totalStakePools', value)}
              label={content.staking_calculator.total_stake_pools_label}
            />
          </FullWidthGroup>
          <FullWidthGroup>
            <ParticipationRate
              value={values.participationRate}
              onChange={value => setValue('participationRate', value)}
              label={content.staking_calculator.participation_rate_label}
              helperText={content.staking_calculator.participation_rate_descriptor}
              totalADAInCirculation={values.totalADAInCirculation}
              adaSymbol={getCurrencySymbol('ADA')}
              normalizeLargeNumber={normalizeLargeNumber}
            />
          </FullWidthGroup>
          <FullWidthGroup>
            <OperatorsStake
              value={values.operatorsStake}
              onChange={value => setValue('operatorsStake', value)}
              label={content.staking_calculator.operators_stake_label}
              helperText={content.staking_calculator.operators_stake_descriptor}
              totalADAInCirculation={values.totalADAInCirculation}
              participationRate={values.participationRate}
              totalADA={values.ada || '0'}
              stakePoolControl={values.stakePoolControl}
              adaSymbol={getCurrencySymbol('ADA')}
              normalizeLargeNumber={normalizeLargeNumber}
            />
          </FullWidthGroup>
          <FullWidthGroup>
            <StakePoolMargin
              value={values.stakePoolMargin}
              onChange={value => setValue('stakePoolMargin', value)}
              label={content.staking_calculator.stake_pool_margin_label}
              helperText={content.staking_calculator.stake_pool_margin_descriptor}
            />
          </FullWidthGroup>
          <FullWidthGroup>
            <StakePoolPerformance
              value={values.stakePoolPerformance}
              onChange={value => setValue('stakePoolPerformance', value)}
              label={content.staking_calculator.stake_pool_performance_label}
              helperText={content.staking_calculator.stake_pool_performance_descriptor}
            />
          </FullWidthGroup>
        </Fragment>
      }
    </Fragment>
  )
}

Delegator.propTypes = {
  values: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  toADA: PropTypes.func.isRequired,
  fromADA: PropTypes.func.isRequired,
  HalfWidthGroup: PropTypes.object.isRequired,
  FullWidthGroup: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  showAdvancedOptions: PropTypes.bool.isRequired,
  getCurrencySymbol: PropTypes.func.isRequired,
  normalizeLargeNumber: PropTypes.func.isRequired,
  currencies: PropTypes.array.isRequired
}

export default Delegator
