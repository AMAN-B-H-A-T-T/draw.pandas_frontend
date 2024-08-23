import { Table } from 'flowbite-react'
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
        <div className="min-h-screen p-0">
          <div className='w-full'>
          <h1 className="text-2xl font-bold mb-5 pt-3">Scoreboard</h1>
          <Table>
                                    <Table.Head>
                                      <Table.HeadCell>Rank</Table.HeadCell>
                                        <Table.HeadCell>Player Name</Table.HeadCell>
                                        <Table.HeadCell>Score</Table.HeadCell>
                                        
                                        
                                    </Table.Head>
                                    
                                    <Table.Body className="divide-y">
                                    {/* {
                                        playerLists && playerLists.map((player,index)=>{
                                            const data = JSON.parse(player)
                                            return (
                                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {index + 1}
                                            </Table.Cell>
                                            <Table.Cell>{data.player_name}</Table.Cell>
                                            <Table.Cell>{data.score}</Table.Cell>
                                            
                                        </Table.Row>    
                                            )
                                        })
                                    } */}

                                    <Table.Row>
                                      <Table.Cell>1.</Table.Cell>
                                        <Table.Cell>
                                            <div className='flex w-full items-center'>
                                              <img src="https://api.dicebear.com/8.x/fun-emoji/svg?seed=" className='w-7 h-7 rounded-full'></img>
                                              <span className='w-full text-sm px-2'>Xyz</span>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span className='w-full'>200</span>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                    <Table.Cell>2.</Table.Cell>
                                        <Table.Cell>
                                            <div className='flex w-full'>
                                              <img src="https://api.dicebear.com/8.x/fun-emoji/svg?seed=" className='w-7 h-7 rounded-full'></img>
                                              <span className='w-full text-sm px-2'>Xyz</span>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span className='w-full'>200</span>
                                        </Table.Cell>
                                    </Table.Row>
                                    </Table.Body>
                                </Table>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Scoreboard