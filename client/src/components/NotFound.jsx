import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <div className="container">
        <div className="content">
          <h1>404</h1>
          <p>The page you are looking for cannot be found</p>
          <Link to="/" className="home-button">
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFound