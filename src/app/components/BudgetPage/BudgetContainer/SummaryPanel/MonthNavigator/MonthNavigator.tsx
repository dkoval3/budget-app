import UseBudget from "@/app/components/Hooks/UseBudget";
import {months} from "@/Constants";

export default function MonthNavigator({ className }: MonthNavigatorProps) {
    const {currentMonth, currentYear, setCurrentMonth, setCurrentYear} = UseBudget();
    const onHoverStyle = 'text-blue1 hover:text-blue1Hover';

    return (
      <div className={`flex items-center min-h-12 ${className}`}>
          <button>
              <i
                  className={`${onHoverStyle} bi bi-arrow-left-circle mx-3 text-3xl`}
                  onClick={() => {
                      const newMonth = Math.trunc(((currentMonth - 1) % 12) + 12);
                      setCurrentMonth(newMonth % 12);
                      setCurrentYear(currentYear + (newMonth === 11 ? -1 : 0));
                  }} />
          </button>
          <button className='flex items-center'>
              <div className='text-2xl font-bold'>{`${months[currentMonth]} ${currentYear}`}</div>
              {/*<i className={`${onHoverStyle} bi bi-caret-down-fill text-xl ml-2`} />*/}
          </button>
          <button>
              <i
                  className={`${onHoverStyle} bi bi-arrow-right-circle mx-3 text-3xl`}
                  onClick={() => {
                      setCurrentMonth(Math.trunc((currentMonth + 1) % 12));
                      setCurrentYear(currentYear + Math.trunc((currentMonth + 1) / 12));
                  }} />
          </button>
      </div>
  );
}

interface MonthNavigatorProps {
    className?: string,
}