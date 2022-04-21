import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { HOC } from '../HOC/HOC'
import RenderProducts from '../SampleProducts/RenderProducts'
import { default as api } from "../store/apiSlice"

const User = (props) => {
    const params = useParams()
    
    const { data, isFetching, isSuccess, isError } = api.useGetItemsQuery(params.userid)
    const res = api.useGetUserQuery(params.userid)
    if (isError) return "Failed to fetch data"
    if (isFetching) return "Loading..."
    if (isSuccess) {
        return (
            <div >
                <h1 style={{ textAlign: "center", marginTop: '20px' }}>Welcome {res && res?.data?.name}</h1>
                <Link to={`/users/${params.userid}/create`}  >
                    <button
                        style={{
                            width: '200px',
                            color: "white",
                            backgroundColor: "green",
                            marginLeft: "20px"
                        }}
                    >
                        List Item
                    </button>
                </Link>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                    {data?.length > 0 ? data.map((item, i) => (
                        <RenderProducts
                            key={i}
                            url={item.images[0]}
                            name={item.name}
                            price={item.price}
                            id={item._id}
                            renderDeleteButton={true}
                        />
                    )) : <h3>Please add items first</h3>}
                </div>
            </div>
        )
    }
}

export default HOC(User)