import React from 'react'

type LayoutProps = {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="page-layout">
      {children}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-size: 18px;
          font-weight: 500;
          background-color: whitesmoke;
          color: #333;
          font-family: sans -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
            sans-serif;
        }
        h1 {
          font-weight: 800;
        }
        p {
          margin-bottom: 0px;
        }
      `}</style>
    </div>
  )
}

export default Layout
