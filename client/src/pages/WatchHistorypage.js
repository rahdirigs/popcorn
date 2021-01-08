import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const WatchHistorypage = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=watch-history')
    }
  }, [userInfo, history])

  return (
    <div>
      <h2>Watch History</h2>
    </div>
  )
}

export default WatchHistorypage
