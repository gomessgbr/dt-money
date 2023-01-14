import { useEffect, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionContext'

import { PaginationContainer, PaginationContent } from './styles'

export function Pagination() {
  const [pages, setPages] = useState<number[]>([])

  const totalTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.totalTransaction
    },
  )

  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => context.fetchTransactions,
  )

  useEffect(() => {
    const totalTransactionsNumber: number = Number(totalTransactions)
    const result: number = Math.ceil(totalTransactionsNumber / 10)
    setPages([...Array<number>(result).keys()])
  }, [totalTransactions])

  async function handleButtonClick(pageValue: number) {
    await fetchTransactions('', pageValue)
  }

  return (
    <PaginationContainer>
      <PaginationContent>
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleButtonClick(page)}
            >
              {`${page}`}
            </button>
          )
        })}
      </PaginationContent>
    </PaginationContainer>
  )
}
