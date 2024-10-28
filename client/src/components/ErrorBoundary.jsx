import { Link } from 'react-router-dom'


function ErrorBoundary() {
    return (
        <>
      <div className="error-container">
        <div className="error-content">
          <h1 className="error-code">500</h1>
          <p className="error-message">Something wrong happened ;)</p>
          <Link
            to="/"
            className="error-button"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </>
    )
}

export default ErrorBoundary