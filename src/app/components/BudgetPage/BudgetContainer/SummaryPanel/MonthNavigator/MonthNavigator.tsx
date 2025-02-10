export default function MonthNavigator({ month, year}: MonthNavigatorProps) {
    const onHoverStyle = 'text-blue1 hover:text-blue1Hover';

    return (
      <div className='flex items-center h-16 border-2 border-fuchsia-500'>
          <button>
              <i className={`${onHoverStyle} bi bi-arrow-left-circle mx-3 text-3xl`}></i>
          </button>
          <button className='flex items-center'>
              <div className='text-2xl font-bold'>{`${month} ${year}`}</div>
              <i className={`${onHoverStyle} bi bi-caret-down-fill text-xl ml-2`}></i>
          </button>
          <button>
              <i className={`${onHoverStyle} bi bi-arrow-right-circle mx-3 text-3xl`}></i>
          </button>
      </div>
  );
}

interface MonthNavigatorProps {
    month: string,
    year: string
}