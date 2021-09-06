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
    (perByteCost * t.txSize +
      perStepCost * t.cpuSteps +
      perMemUnitCost * t.memUnits +
      perTransactionCost) /
    1000000

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
              value={perByteCost}
              onChange={(e) => setPerByteCost(parseInt(e.target.value))}
            />
          </label>

          <label>
            Per Step Cost
            <input
              type="number"
              value={perStepCost}
              onChange={(e) => setPerStepCost(parseInt(e.target.value))}
            />
          </label>

          <label>
            Per Mem Unit Cost
            <input
              type="number"
              value={perMemUnitCost}
              onChange={(e) => setMemUnitCost(parseInt(e.target.value))}
            />
          </label>

          <label>
            Per Transaction Cost
            <input
              type="number"
              value={perTransactionCost}
              onChange={(e) => setPerTransactionCost(parseInt(e.target.value))}
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
              onChange={(e) => {
                let txs = transactions
                txs[i].txSize = parseInt(e.target.value)
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
                txs[i].cpuSteps = parseInt(e.target.value)
                setTransactions([...txs])
              }}
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
                txs[i].memUnits = parseInt(e.target.value)
                setTransactions([...txs])
              }}
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
