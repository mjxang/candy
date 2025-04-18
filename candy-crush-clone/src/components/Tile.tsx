import React from 'react'
import { useAppDispatch } from '../store/hooks'
import { dragStart, dragDrop, dragEnd } from '../store'

function Tile({candy,candyId}: {candy: string, candyId: number}) {
  const dispatch = useAppDispatch();
  return (
    <div className="h-24 w-24 flex justify-center items-center m-0.5 rounded-lg select-none "
    style={{
        boxShadow:"inset 5px 5px 15px #062525, inset -5px -5px 15px #aaaab7bb",
    }}>
        {
            candy && (
            <img src={candy} 
            alt="candy" 
            className="h-20 w-20" 
            candy-id={candyId}
            
            draggable={true}
            onDragStart={() => dispatch(dragStart({ id: candyId, src: candy }))}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={() => dispatch(dragDrop({ id: candyId, src: candy }))}
            onDragEnd={() => dispatch(dragEnd())}
            />
        )}
    </div>

  )
}

export default Tile