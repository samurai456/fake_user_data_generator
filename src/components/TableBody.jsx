function TableBody({fakeUserData}){
    return(
        <tbody>
            {fakeUserData.map(i=>{
                return (
                    <tr key={i.index}>
                        <td>{i.index}</td>
                        <td>{i.uuid}</td>
                        <td>{i.name}</td>
                        <td>{i.address}</td>
                        <td>{i.phone}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default TableBody