import React from 'react'

import { ForbiddenIcon } from '../icons'

function Page404() {
  return (
    <div className="flex flex-col items-center">
      <ForbiddenIcon className="w-12 h-12 mt-8 text-brandRed" aria-hidden="true" />
      <h1 className="text-6xl font-semibold text-gray-700 dark:text-gray-200">404</h1>
      <p className="text-gray-700 dark:text-gray-300">
        Page not found. Check the address or{' '}
        <a className="text-brandRed hover:underline dark:text-brandRed" href="../index.html">
          go back
        </a>
        .
      </p>
    </div>
  )
}

export default Page404
