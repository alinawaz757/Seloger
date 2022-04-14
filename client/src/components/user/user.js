import React from 'react'
import RenderProducts from '../SampleProducts/RenderProducts'

const User = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <div >
            <h1 style={{ textAlign: "center", marginTop: '20px' }}>Welcome {localStorage.getItem("name")}</h1>
            <button style={{width:'200px',color:"white",backgroundColor:"green",marginLeft:"20px" }}>List Item</button>
            <div style={{display:"flex", justifyContent:"center", flexWrap:"wrap" }}>
                {arr.map(item => <RenderProducts key={item} />)}
            </div>
        </div>
    )
}

export default User