import "bootstrap-icons/font/bootstrap-icons.css";
import BudgetPage from "@/app/components/BudgetPage/BudgetPage";
import {BudgetProvider} from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/UseBudget";

export default function Home() {
  return (
      <BudgetProvider>
        <BudgetPage />
      </BudgetProvider>
  );
}
