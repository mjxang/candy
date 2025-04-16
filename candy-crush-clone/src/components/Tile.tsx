import React from 'react'

function Tile({candy,candyId}: {candy: string, candyId: number}) {
  return (
    <div>
        {
            candy && <img src={candy} alt="candy" className="h-20 w-20" candy-id={candyId}/>
        }
    </div>
  )
}

export default Tile