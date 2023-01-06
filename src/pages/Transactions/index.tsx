import {TransactionContainer} from './styles'

import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'


export function Transaction(){
    return(
        <TransactionContainer>
            <Header/>
            <Summary/>
            
        </TransactionContainer>
    )
}