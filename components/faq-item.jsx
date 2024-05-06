const FAQItem = ({ summary, details }) => (
  <details className='group'>
    <summary className='flex items-center justify-between p-4 rounded-lg cursor-pointer bg-indigo-50'>
      <h2 className='font-medium'>{summary} </h2>

      <svg
        className='w-5 h-5 text-indigo-800 transition-transform duration-300 group-open:-rotate-180'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='3'
          d='M19 9l-7 7-7-7'
        />
      </svg>
    </summary>

    <div className='mt-4 bg-indigo-50 rounded-lg'>
      <div className='p-8 mx-4 leading-relaxed text-gray-700'>
        {Array.isArray(details)
          ? details.map((detail, index) => (
              <div key={index}>
                {index === 0 && detail}
                <ul className='list-disc'>
                  {index !== 0 && <li>{detail}</li>}
                </ul>
              </div>
            ))
          : details}
      </div>
    </div>
  </details>
);

export default FAQItem;
