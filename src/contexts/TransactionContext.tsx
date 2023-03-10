import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  totalTransaction: string | undefined
  transactions: Transaction[]
  fetchTransactions: (query?: string, page?: number) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  deleteTransaction: (id: number) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [totalTransaction, setTotalTransactions] = useState<string>('')

  const fetchTransactions = useCallback(
    async (query?: string, page?: number) => {
      let response
      query
        ? (response = await api.get('/transactions', {
            params: {
              _sort: 'createdAt',
              _order: 'desc',
              _limit: 10,
              _page: page,
              q: query,
            },
          }))
        : (response = await api.get('/transactions', {
            params: {
              _sort: 'createdAt',
              _order: 'desc',
              _limit: 10,
              _page: page,
            },
          }))

      setTotalTransactions(response.headers['x-total-count'] ?? '')
      setTransactions(response.data)
    },
    [],
  )

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { category, description, price, type } = data

      const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [...state, response.data])
    },
    [],
  )

  async function deleteTransaction(id: number) {
    const response = await api.delete(`transactions/${id}`)
    if (response.statusText === 'OK') fetchTransactions()
    else return alert('Transi????o n??o encontrada')
  }

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        totalTransaction,
        transactions,
        fetchTransactions,
        createTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
