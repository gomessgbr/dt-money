import { ThemeProvider } from "styled-components";
import { Transaction } from "./pages/Transactions";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./contexts/TransactionContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionsProvider>
        <Transaction />
      </TransactionsProvider>
    </ThemeProvider>
  );
}
