
const Loader = ({signIn, component}) => {
  return (
    <div className={`${component && "bg-white dark:bg-white"} ${signIn ? "h-[500px]" : "min-h-screen"} flex justify-center items-center text-center`}>
      <div className="">
        <div
          className={`${component ? "text-blue-600" : "text-black dark:text-white"} text-black dark:text-white inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]`}
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default Loader