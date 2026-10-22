import { Component } from 'react'

// Error boundaries still have to be class components.
// It catches the error when the promise given to use() is rejected.
export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return <p className="error-box">Something went wrong: {this.state.error.message}</p>
    }
    return this.props.children
  }
}
