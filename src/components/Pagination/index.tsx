import { useEffect, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionContext'

import { PaginationContainer } from './styles'

interface PaginationProps {
  totalPages: number
  currentPage: number
  // setCurrentPage: () => void
  transferPerPage: number
}

export function Pagination({
  totalPages,
  currentPage,
  // setCurrentPage,
  transferPerPage,
}: PaginationProps) {
  const [pages, setPages] = useState<Number[]>([])

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
    setPages([...Array(result).keys()])
  }, [totalTransactions])

  function handleButtonClick(pageValue: Number) {
    // fetchTransactions()
    console.log(pageValue)
  }

  return (
    <PaginationContainer>
      <div>
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleButtonClick(page)}
            >
              {`${page + 1}`}
            </button>
          )
        })}
      </div>
    </PaginationContainer>
  )
}
