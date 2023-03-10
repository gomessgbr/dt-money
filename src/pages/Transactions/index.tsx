import {
  PriceHighlight,
  TransactionContainer,
  TransactionTable,
  TransactionsButtons,
} from './styles'

import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'

import { TransactionsContext } from '../../contexts/TransactionContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'
import { Trash } from 'phosphor-react'
import { Pagination } from '../../components/Pagination'

export function Transaction() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const deleteTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransaction
    },
  )

  function handleDeleteTransactions(id: number) {
    deleteTransactions(id)
  }

  return (
    <div>
      <Header />
      <Summary />

      <TransactionContainer>
        <SearchForm />
        <TransactionTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                  <td>
                    <TransactionsButtons>
                      <button
                        type="button"
                        className="trashButtton"
                        onClick={() => handleDeleteTransactions(transaction.id)}
                      >
                        <Trash size={20} color="#fa0000" weight="fill" />
                      </button>
                    </TransactionsButtons>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionTable>
      </TransactionContainer>

      <Pagination />
    </div>
  )
}
