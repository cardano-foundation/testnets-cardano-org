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
import StakePoolMargin from './inputs/StakePoolMargin'
import StakePoolPerformance from './inputs/StakePoolPerformance'
import TransactionFeesPerEpoch from './inputs/TransactionFeesPerEpoch'
import PrivateStakePoolSwitch from './inputs/PrivateStakePoolSwitch'
import AnticipatedSystemPerformance from './inputs/AnticipatedSystemPerformance'
import InfluenceFactor from './inputs/InfluenceFactor'
import Rewards from './Rewards'

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
  normalizeLargeNumber,
  currencies,
  getDistributableReward,
  containerRef
}) => {
  const [ privateStakePool, setPrivateStakePool ] = useState(false)
  const [ rewards, setRewards ] = useState([
    {
      daily: { ada: normalizeLargeNumber(0, 6), currency: normalizeLargeNumber(0, 6), yield: normalizeLargeNumber(0, 2) },
      epoch: { ada: normalizeLargeNumber(0, 6), currency: normalizeLargeNumber(0, 6), yield: normalizeLargeNumber(0, 2) },
      monthly: { ada: normalizeLargeNumber(0, 6), currency: normalizeLargeNumber(0, 6), yield: normalizeLargeNumber(0, 2) },
      yearly: { ada: normalizeLargeNumber(0, 6), currency: normalizeLargeNumber(0, 6), yield: normalizeLargeNumber(0, 2) }
    }
  ])

  useEffect(() => {
    let stakePoolFixedFee = privateStakePool ? 0 : toADA(parseFloat(values.stakePoolFixedFee))
    let ada = parseFloat(values.ada)
    const stakePoolMargin = privateStakePool ? 0 : values.stakePoolMargin
    if (isNaN(stakePoolFixedFee)) stakePoolFixedFee = 0
    if (isNaN(ada)) ada = 0

    const distributableReward = getDistributableReward()
    const stakedADA = values.totalADAInCirculation * values.participationRate
    const totalStakeInPool = privateStakePool
      ? ada
      : stakedADA * Math.min(1 / values.totalStakePools, values.stakePoolControl)

    const sigmaPrime = Math.min(values.stakePoolControl, 1 / values.totalStakePools)
    const sPrime = Math.min(ada / values.totalADAInCirculation, 1 / values.totalStakePools)
    const z = 1 / values.totalStakePools
    let grossPoolReward = distributableReward * (sigmaPrime + sPrime * values.influenceFactor * (sigmaPrime - sPrime * (z - sigmaPrime) / z) / z)
    console.log({ grossPoolReward })
    grossPoolReward -= grossPoolReward * (Math.max(0, 1 - values.stakePoolPerformance))
    grossPoolReward -= values.epochDurationInDays * stakePoolFixedFee
    if (grossPoolReward < 0) grossPoolReward = 0
    const margin = stakePoolMargin * grossPoolReward
    const netReward = grossPoolReward - margin

    const epochReward = netReward * Math.min(1, ada / totalStakeInPool)
    const dailyReward = epochReward / values.epochDurationInDays
    const monthlyReward = dailyReward * 30
    const yearlyReward = dailyReward * 365

    const dailyRunningCosts = stakePoolFixedFee
    const epochRunningCosts = stakePoolFixedFee * values.epochDurationInDays
    const monthlyRunningCosts = dailyRunningCosts * 30
    const yearlyRunningCosts = dailyRunningCosts * 365

    const epochMargin = margin
    const dailyMargin = epochMargin / values.epochDurationInDays
    const monthlyMargin = dailyMargin * 30
    const yearlyMargin = dailyMargin * 365

    const getPercentage = (n) => {
      if (n === Infinity) return 'N/A'
      return `${normalizeLargeNumber(n, 4, true)}%`
    }

    setRewards([
      // Running costs
      {
        type: 'running_costs',
        daily: {
          ada: normalizeLargeNumber(dailyRunningCosts, 6, true),
          currency: normalizeLargeNumber(fromADA(dailyRunningCosts), 6, true),
          yield: getPercentage(dailyRunningCosts / ada * 100)
        },
        epoch: {
          ada: normalizeLargeNumber(epochRunningCosts, 6, true),
          currency: normalizeLargeNumber(fromADA(epochRunningCosts), 6, true),
          yield: getPercentage(epochRunningCosts / ada * 100)
        },
        monthly: {
          ada: normalizeLargeNumber(monthlyRunningCosts, 6, true),
          currency: normalizeLargeNumber(fromADA(monthlyRunningCosts), 6, true),
          yield: getPercentage(monthlyRunningCosts / ada * 100)
        },
        yearly: {
          ada: normalizeLargeNumber(yearlyRunningCosts, 6, true),
          currency: normalizeLargeNumber(fromADA(yearlyRunningCosts), 6, true),
          yield: getPercentage(yearlyRunningCosts / ada * 100)
        }
      },
      // Margin rewards
      {
        type: 'margin_rewards',
        daily: {
          ada: normalizeLargeNumber(dailyMargin, 6, true),
          currency: normalizeLargeNumber(fromADA(dailyMargin), 6, true),
          yield: getPercentage(dailyMargin / ada * 100)
        },
        epoch: {
          ada: normalizeLargeNumber(epochMargin, 6, true),
          currency: normalizeLargeNumber(fromADA(epochMargin), 6, true),
          yield: getPercentage(epochMargin / ada * 100)
        },
        monthly: {
          ada: normalizeLargeNumber(monthlyMargin, 6, true),
          currency: normalizeLargeNumber(fromADA(monthlyMargin), 6, true),
          yield: getPercentage(monthlyMargin / ada * 100)
        },
        yearly: {
          ada: normalizeLargeNumber(yearlyMargin, 6, true),
          currency: normalizeLargeNumber(fromADA(yearlyMargin), 6, true),
          yield: getPercentage(yearlyMargin / ada * 100)
        }
      },
      // Delegation rewards
      {
        type: 'delegation_rewards',
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
      },
      // Combined rewards
      {
        type: 'combined_rewards',
        daily: {
          ada: normalizeLargeNumber(dailyReward + dailyMargin, 6, true),
          currency: normalizeLargeNumber(fromADA(dailyReward + dailyMargin), 6, true),
          yield: getPercentage((dailyReward + dailyMargin) / ada * 100)
        },
        epoch: {
          ada: normalizeLargeNumber(epochReward + epochMargin, 6, true),
          currency: normalizeLargeNumber(fromADA(epochReward + epochMargin), 6, true),
          yield: getPercentage((epochReward + epochMargin) / ada * 100)
        },
        monthly: {
          ada: normalizeLargeNumber(monthlyReward + monthlyMargin, 6, true),
          currency: normalizeLargeNumber(fromADA(monthlyReward + monthlyMargin), 6, true),
          yield: getPercentage((monthlyReward + monthlyMargin) / ada * 100)
        },
        yearly: {
          ada: normalizeLargeNumber(yearlyReward + yearlyMargin, 6, true),
          currency: normalizeLargeNumber(fromADA(yearlyReward + yearlyMargin), 6, true),
          yield: getPercentage((yearlyReward + yearlyMargin) / ada * 100)
        }
      }
    ])
  }, [ values, privateStakePool ])

  function getTitle (type) {
    if (type === 'running_costs') return content.staking_calculator.running_costs
    if (type === 'margin_rewards') return content.staking_calculator.stake_pool_operation_rewards
    if (type === 'delegation_rewards') return content.staking_calculator.delegation_rewards
    if (type === 'combined_rewards') return content.staking_calculator.combined_rewards
    return 'N/A'
  }

  function isHidden (type) {
    if (type === 'combined_rewards') return true
    if (privateStakePool && type === 'margin_rewards') return true
    if (privateStakePool && type === 'running_costs') return true
    return false
  }

  function getStakePoolControlMinValue () {
    let ada = parseFloat(values.ada)
    if (isNaN(ada)) ada = 0
    return Math.min(ada === 0 ? 0 : ada / values.totalADAInCirculation / values.participationRate, 0.3)
  }

  return (
    <Fragment>
      <HalfWidthGroup>
        <div>
          <PrivateStakePoolSwitch
            checked={privateStakePool}
            onChange={(value) => setPrivateStakePool(value)}
            label={content.staking_calculator.private_stake_pool_label}
            helperText={content.staking_calculator.private_stake_pool_descriptor}
          />
        </div>
        <div />
      </HalfWidthGroup>
      <HalfWidthGroup>
        <div>
          <ADAAmount
            value={values.ada}
            onChange={value => setValue('ada', value)}
            label={content.staking_calculator.ada_label_operator}
            helperText={content.staking_calculator.ada_descriptor_operator}
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
      {(showAdvancedOptions || !privateStakePool) &&
        <Fragment>
          <HalfWidthGroup>
            {showAdvancedOptions && values.currency.key !== 'ADA' &&
              <div>
                <ExchangeRate
                  value={values.currency.exchangeRate}
                  onChange={value => setValue('currency', { ...values.currency, exchangeRate: value })}
                  label={content.staking_calculator.exchange_rate_label}
                  helperText={<Markdown source={content.staking_calculator.exchange_rate_descriptor.replace(/{{\s?currency\s?}}/g, values.currency.key)} />}
                  symbol={getCurrencySymbol(values.currency.key)}
                />
              </div>
            }
            {!privateStakePool &&
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
                          : content.staking_calculator.fixed_fee_descriptor.replace(/{{\s?amount\s?}}/g, normalizeLargeNumber(toADA(parseFloat(values.stakePoolFixedFee)), 6))
                      }
                    />
                  }
                  symbol={getCurrencySymbol(values.currency.key)}
                />
              </div>
            }
            {!showAdvancedOptions && <div />}
            {showAdvancedOptions && privateStakePool &&
              <div>
                <TransactionFeesPerEpoch
                  value={values.transactionFeesPerEpoch}
                  onChange={value => setValue('transactionFeesPerEpoch', value)}
                  label={content.staking_calculator.transaction_fees_per_epoch_label}
                  adaSymbol={getCurrencySymbol('ADA')}
                  helperText={content.staking_calculator.transaction_fees_per_epoch_descriptor}
                />
              </div>
            }
          </HalfWidthGroup>
          {showAdvancedOptions && !privateStakePool &&
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
            </HalfWidthGroup>
          }
        </Fragment>
      }
      {showAdvancedOptions &&
        <Fragment>
          {!privateStakePool &&
            <FullWidthGroup>
              <StakePoolControl
                value={values.stakePoolControl}
                onChange={value => setValue('stakePoolControl', value)}
                label={content.staking_calculator.stake_pool_control_label}
                helperText={content.staking_calculator.stake_pool_control_descriptor}
                adaInPool={normalizeLargeNumber(values.totalADAInCirculation * values.participationRate * values.stakePoolControl)}
                adaSymbol={getCurrencySymbol('ADA')}
                minValue={getStakePoolControlMinValue()}
                normalizeLargeNumber={normalizeLargeNumber}
              />
            </FullWidthGroup>
          }
          {!privateStakePool &&
            <FullWidthGroup>
              <StakePoolMargin
                value={values.stakePoolMargin}
                onChange={value => setValue('stakePoolMargin', value)}
                label={content.staking_calculator.stake_pool_margin_label}
                helperText={content.staking_calculator.stake_pool_margin_descriptor}
              />
            </FullWidthGroup>
          }
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
        containerRef={containerRef}
        fixedRewardsIndex={privateStakePool ? 2 : 3}
        rewards={rewards.map((reward) => ({
          title: getTitle(reward.type),
          hidden: isHidden(reward.type),
          labels: {
            ada: 'ADA',
            currency: values.currency.key,
            currencySymbol: getCurrencySymbol(values.currency.key),
            adaSymbol: getCurrencySymbol('ADA'),
            yield: reward.type === 'running_costs' ? null : content.staking_calculator.yield,
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
  normalizeLargeNumber: PropTypes.func.isRequired,
  currencies: PropTypes.array.isRequired,
  getDistributableReward: PropTypes.func.isRequired,
  containerRef: PropTypes.object.isRequired
}

export default Operator
