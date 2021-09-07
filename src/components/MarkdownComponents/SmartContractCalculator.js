import React, { useEffect, useState } from 'react'

export default function SmartContractCalculator() {
  const [perByteCost, setPerByteCost] = useState(44)
  const [perStepCost, setPerStepCost] = useState(0.0000721)
  const [perMemUnitCost, setMemUnitCost] = useState(0.0577)
  const [perTransactionCost, setPerTransactionCost] = useState(155381)
  const [showParams, setShowParams] = useState(false)

  const [transactions, setTransactions] = useState([
    {
      txSize: 0,
      cpuSteps: 0,
      memUnits: 0,
    },
  ])

  const [adaPrice, setAdaPrice] = useState()

  useEffect(() => {
    const getAdaPrice = async () => {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/cardano')
      const data = await res.json()
      const price = data?.market_data?.current_price?.usd
      setAdaPrice(price || 0)
    }

    if (!adaPrice) getAdaPrice()
  }, [adaPrice])

  const txPrice = (t) =>
    (
      ((perByteCost || 0) * (t.txSize || 0) +
        (perStepCost || 0) * (t.cpuSteps || 0) +
        (perMemUnitCost || 0) * (t.memUnits || 0) +
        (perTransactionCost || 0)) /
      1000000
    ).toFixed(6)

  const dappFee = () => {
    let fee = 0
    for (const t of transactions) fee = fee + txPrice(t)
    return fee
  }

  return adaPrice ? (
    <>
      {showParams ? (
        <>
          <button onClick={() => setShowParams(false)}>
            Hide network parameters
          </button>

          <label>
            Per Byte Cost
            <input
              type="number"
              min="0"
              value={perByteCost}
              onChange={(e) => setPerByteCost(parseInt(e.target.value))}
              onBlur={(e) => !e.target.value && setPerByteCost(0)}
            />
          </label>

          <label>
            Per Step Cost
            <input
              type="number"
              min="0"
              value={perStepCost}
              onChange={(e) => setPerStepCost(parseInt(e.target.value))}
              onBlur={(e) => !e.target.value && setPerStepCost(0)}
            />
          </label>

          <label>
            Per Mem Unit Cost
            <input
              type="number"
              min="0"
              value={perMemUnitCost}
              onChange={(e) => setMemUnitCost(parseInt(e.target.value))}
              onBlur={(e) => !e.target.value && setMemUnitCost(0)}
            />
          </label>

          <label>
            Per Transaction Cost
            <input
              type="number"
              min="0"
              value={perTransactionCost}
              onChange={(e) => setPerTransactionCost(parseInt(e.target.value))}
              onBlur={(e) => !e.target.value && setPerTransactionCost(0)}
            />
          </label>
        </>
      ) : (
        <button onClick={() => setShowParams(true)}>
          Show network parameters
        </button>
      )}
      <h2>Transactions:</h2>
      {transactions.map((t, i) => (
        <div>
          Transaction {i + 1}: <br />
          <label>
            {' '}
            Transaction Size:
            <input
              type="number"
              value={t.txSize}
              max="16384"
              min="0"
              onChange={(e) => {
                let txs = transactions
                const input = parseInt(e.target.value)

                txs[i].txSize = input > 16384 ? 16384 : input
                setTransactions([...txs])
              }}
              onBlur={(e) => {
                if (e.target.value) return null
                let txs = transactions
                txs[i].txSize = 0
                setTransactions([...txs])
              }}
            />
          </label>
          <br />
          <label>
            {' '}
            CPU Steps:
            <input
              type="number"
              value={t.cpuSteps}
              onChange={(e) => {
                let txs = transactions
                const input = parseInt(e.target.value)
                txs[i].cpuSteps = input > 10000000000 ? 10000000000 : input

                setTransactions([...txs])
              }}
              onBlur={(e) => {
                if (e.target.value) return null
                let txs = transactions
                txs[i].cpuSteps = 0
                setTransactions([...txs])
              }}
              min="0"
              max="10000000000"
            />
          </label>
          <br />
          <label>
            {' '}
            Memory Units:
            <input
              type="number"
              value={t.memUnits}
              onChange={(e) => {
                let txs = transactions
                const input = parseInt(e.target.value)
                txs[i].memUnits = input > 10000000 ? 10000000 : input
                setTransactions([...txs])
              }}
              onBlur={(e) => {
                if (e.target.value) return null
                let txs = transactions
                txs[i].memUnits = 0
                setTransactions([...txs])
              }}
              max="10000000"
            />
          </label>
          <br />
          <strong>
            Estimated Transaction Price (ADA):
            {txPrice(t)}
          </strong>
          <br />
          <br />
        </div>
      ))}
      <button
        onClick={() =>
          setTransactions([
            ...transactions,
            {
              txSize: 0,
              cpuSteps: 0,
              memUnits: 0,
            },
          ])
        }
      >
        Add Transaction
      </button>
      <h2>Total Estimated Dapp Fee</h2>
      {dappFee()} ADA <br />
      <br />${dappFee() * adaPrice} USD (1ADA = {adaPrice} - current price)
      <br />
      <br />${dappFee() * 5} USD (1ADA = $5)
      <br />${dappFee() * 10} USD (1ADA = $10)
      <br />${dappFee() * 32} USD (1ADA = $32)
      <br />
      <br />
      <button
        onClick={() =>
          setTransactions([
            {
              txSize: 0,
              cpuSteps: 0,
              memUnits: 0,
            },
          ])
        }
      >
        Reset
      </button>
    </>
  ) : (
    <div>Loading...</div>
  )
}
