import React, { Fragment, useEffect, useState } from 'react'
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
import TransactionFeesPerEpoch from './inputs/TransactionFeesPerEpoch'
import AnticipatedSystemPerformance from './inputs/AnticipatedSystemPerformance'
import InfluenceFactor from './inputs/InfluenceFactor'
import Rewards from './Rewards'

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
  currencies,
  getDistributableReward,
  containerRef
}) => {
  const [ rewards, setRewards ] = useState([
    {
      daily: { ada: normalizeLargeNumber(0, 6), currency: normalizeLargeNumber(0, 6), yield: normalizeLargeNumber(0, 2) },
      epoch: { ada: normalizeLargeNumber(0, 6), currency: normalizeLargeNumber(0, 6), yield: normalizeLargeNumber(0, 2) },
      monthly: { ada: normalizeLargeNumber(0, 6), currency: normalizeLargeNumber(0, 6), yield: normalizeLargeNumber(0, 2) },
      yearly: { ada: normalizeLargeNumber(0, 6), currency: normalizeLargeNumber(0, 6), yield: normalizeLargeNumber(0, 2) }
    }
  ])

  useEffect(() => {
    let stakePoolFixedFee = toADA(parseFloat(values.stakePoolFixedFee))
    let operatorsStake = parseFloat(values.operatorsStake)
    let ada = parseFloat(values.ada)
    if (isNaN(stakePoolFixedFee)) stakePoolFixedFee = 0
    if (isNaN(operatorsStake)) operatorsStake = 0
    if (isNaN(ada)) ada = 0

    const distributableReward = getDistributableReward()
    const sigmaPrime = Math.min(values.stakePoolControl, 1 / Math.max(values.targetStakePools, values.totalStakePools))
    const sPrime = Math.min(ada / values.totalADAInCirculation, 1 / Math.max(values.targetStakePools, values.totalStakePools))
    const z = 1 / values.totalStakePools
    const stakedADA = values.totalADAInCirculation * values.participationRate
    const totalStakeInPool = stakedADA * Math.min(1 / values.totalStakePools, values.stakePoolControl)
    const delegatedStake = Math.max(totalStakeInPool - operatorsStake, 0)
    let grossPoolReward = distributableReward * (sigmaPrime + sPrime * values.influenceFactor * (sigmaPrime - sPrime * (z - sigmaPrime) / z) / z)
    const penalty = (1 - values.stakePoolPerformance) * grossPoolReward
    grossPoolReward = grossPoolReward - penalty
    grossPoolReward -= values.epochDurationInDays * stakePoolFixedFee
    const netReward = grossPoolReward * (1 - values.stakePoolMargin)
    const operatorsReward = netReward * (Math.min(operatorsStake / totalStakeInPool, 1))
    const delegatorsRewards = Math.max(0, netReward - operatorsReward)
    const epochReward = Math.max(delegatorsRewards * Math.min(ada / delegatedStake, 1), 0)

    const dailyReward = epochReward / values.epochDurationInDays
    const monthlyReward = dailyReward * 30
    const yearlyReward = dailyReward * 365

    const getPercentage = (n) => {
      if (n === Infinity) return 'N/A'
      return `${normalizeLargeNumber(n, 4, true)}%`
    }

    setRewards([
      {
        daily: {
          ada: normalizeLargeNumber(dailyReward, 6, true),
          currency: normalizeLargeNumber(fromADA(dailyReward), 6, true),
          yield: getPercentage(dailyReward / ada * 100)
        },
        epoch: {
          ada: normalizeLargeNumber(epochReward, 6, true),
          currency: normalizeLargeNumber(fromADA(epochReward), 6, true),
          yield: getPercentage(epochReward / ada * 100)
        },
        monthly: {
          ada: normalizeLargeNumber(monthlyReward, 6, true),
          currency: normalizeLargeNumber(fromADA(monthlyReward), 6, true),
          yield: getPercentage(monthlyReward / ada * 100)
        },
        yearly: {
          ada: normalizeLargeNumber(yearlyReward, 6, true),
          currency: normalizeLargeNumber(fromADA(yearlyReward), 6, true),
          yield: getPercentage(yearlyReward / ada * 100)
        }
      }
    ])
  }, [ values ])

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
                        : content.staking_calculator.fixed_fee_descriptor.replace(/{{\s?amount\s?}}/g, normalizeLargeNumber(parseFloat(toADA(values.stakePoolFixedFee)), 6))
                    }
                  />
                }
                symbol={getCurrencySymbol(values.currency.key)}
              />
            </div>
          </HalfWidthGroup>
          <HalfWidthGroup>
            <div>
              <TransactionFeesPerEpoch
                value={values.transactionFeesPerEpoch}
                onChange={value => setValue('transactionFeesPerEpoch', value)}
                label={content.staking_calculator.transaction_fees_per_epoch_label}
                adaSymbol={getCurrencySymbol('ADA')}
                helperText={content.staking_calculator.transaction_fees_per_epoch_descriptor}
              />
            </div>
            <div>
              <OperatorsStake
                value={values.operatorsStake}
                onChange={value => setValue('operatorsStake', value)}
                label={content.staking_calculator.operators_stake_label}
                helperText={content.staking_calculator.operators_stake_descriptor}
                adaSymbol={getCurrencySymbol('ADA')}
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
              normalizeLargeNumber={normalizeLargeNumber}
              minValue={0}
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
          <FullWidthGroup>
            <AnticipatedSystemPerformance
              value={values.anticipatedSystemPerformance}
              onChange={value => setValue('anticipatedSystemPerformance', value)}
              label={content.staking_calculator.system_performance_label}
              helperText={content.staking_calculator.system_performance_descriptor}
            />
          </FullWidthGroup>
          <FullWidthGroup>
            <InfluenceFactor
              value={values.influenceFactor}
              onChange={value => setValue('influenceFactor', value)}
              label={content.staking_calculator.influence_factor_label}
              helperText={content.staking_calculator.influence_factor_descriptor}
            />
          </FullWidthGroup>
        </Fragment>
      }
      <Rewards
        fixedRewardsIndex={0}
        containerRef={containerRef}
        rewards={rewards.map((reward) => ({
          title: content.staking_calculator.delegation_rewards,
          labels: {
            ada: 'ADA',
            currency: values.currency.key,
            currencySymbol: getCurrencySymbol(values.currency.key),
            adaSymbol: getCurrencySymbol('ADA'),
            yield: content.staking_calculator.delegation_rewards,
            daily: content.staking_calculator.daily,
            monthly: content.staking_calculator.monthly,
            yearly: content.staking_calculator.yearly,
            perEpoch: content.staking_calculator.per_epoch
          },
          breakdown: reward
        }))}
      />
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
  currencies: PropTypes.array.isRequired,
  getDistributableReward: PropTypes.func.isRequired,
  containerRef: PropTypes.object.isRequired
}

export default Delegator
