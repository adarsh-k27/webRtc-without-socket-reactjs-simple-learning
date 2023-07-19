import React from 'react'
import {browserCompactible} from '../../utils/browser'
import BrowserNotSupport from './error'
export default function BrowserSupport({children}) {
  return (
    <div>
      {
        browserCompactible ? <div>{children}</div> : <BrowserNotSupport />
      }
    </div>
  )
}
