import TableHead from './TableHead.jsx'
import TableBody from './TableBody.jsx'

function Table({fakeUserData}){

    return(
        <table className="table table-striped">
            <TableHead />
            <TableBody fakeUserData={fakeUserData} />
        </table>
    )
}

export default Table