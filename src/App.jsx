import { useState } from 'react'
import './App.css'

const CURRENCIES = ['EUR', 'USD', 'GBP', 'CHF', 'JPY', 'CAD', 'AUD']

function App() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    recipientName: '',
    iban: '',
    bic: '',
    amount: '',
    currency: 'EUR',
    reference: '',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  function handleReset() {
    setSubmitted(false)
    setForm({ recipientName: '', iban: '', bic: '', amount: '', currency: 'EUR', reference: '' })
  }

  if (submitted) {
    return (
      <main className="container">
        <div className="success">
          <span className="success-icon">✓</span>
          <h1>Transfer submitted</h1>
          <p>Your payment to <strong>{form.recipientName || 'N/A'}</strong> for <strong>{form.amount || 'N/A'} {form.currency}</strong> has been submitted successfully.</p>
          <button type="button" onClick={handleReset}>New transfer</button>
        </div>
      </main>
    )
  }

  return (
    <main className="container">
      <h1>Bank Transfer</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="recipientName">Recipient name</label>
          <input
            id="recipientName"
            name="recipientName"
            type="text"
            value={form.recipientName}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <div className="field">
          <label htmlFor="iban">IBAN / Account number</label>
          <input
            id="iban"
            name="iban"
            type="text"
            value={form.iban}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <div className="field">
          <label htmlFor="bic">Bank / BIC code</label>
          <input
            id="bic"
            name="bic"
            type="text"
            value={form.bic}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <div className="field-row">
          <div className="field field-amount">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              name="amount"
              type="number"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={handleChange}
            />
          </div>
          <div className="field field-currency">
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              name="currency"
              value={form.currency}
              onChange={handleChange}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="reference">Payment reference / description</label>
          <input
            id="reference"
            name="reference"
            type="text"
            value={form.reference}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <button type="submit">Submit transfer</button>
      </form>
    </main>
  )
}

export default App
