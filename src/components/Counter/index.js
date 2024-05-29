import {Component} from 'react'

import './index.css'

class Counter extends Component {
  render() {
    const {onIncrement, onDecrement, count, totalCount} = this.props

    return (
      <div className="pagination-container">
        <button disabled={count === 1} type="button" onClick={onDecrement}>
          -
        </button>
        <div>
          <span data-testid="active-page-number">{count}</span> of {totalCount}.
        </div>
        <button
          disabled={count === Math.ceil(totalCount / 9)}
          type="button"
          onClick={onIncrement}
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
