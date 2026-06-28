import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  title?: string
}

interface State {
  hasError: boolean
}

export class SectionErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('SectionErrorBoundary:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className="py-6 text-center text-red-600">
          {this.props.title ?? 'This section failed to load.'}
        </p>
      )
    }
    return this.props.children
  }
}