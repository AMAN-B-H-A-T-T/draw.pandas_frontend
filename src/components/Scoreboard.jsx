import React from 'react'

const Scoreboard = ({scoreboard,setscoreboard}) => {
  return (
    <>
        <section
      className={`${
        scoreboard ? "translate-x-0" : "translate-x-full"
      } overflow-y-scroll  shadow-xl border ease-in-out fixed bg-white z-10 duration-500 right-0 group-hover:left-0 h-screen w-full sm:w-1/3`}
    >
      <div className="h-full relative mx-3">
      <button className="absolute top-5 right-5" onClick={() => {setscoreboard(false)}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>
        <div className="min-h-screen bg-gray-100 p-0 sm:p-12">
          <div className="mx-auto max-w-md px-6 py-6 bg-white border-0 shadow-lg sm:rounded-3xl">
            <h1 className="text-2xl font-bold mb-8">Scoreboard</h1>
            <table className='w-full text-center'>
                <thead>
                    <tr>
                        <td>Rank</td>
                        <td>Score</td>
                        <td>Name</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1st</td>
                        <td>700</td>
                        <td>xyz</td>
                    </tr>
                    <tr>
                        <td>2st</td>
                        <td>600</td>
                        <td>pqr</td>
                    </tr>
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Scoreboard