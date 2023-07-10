import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SubNav } from '_components';
import { userActions } from '_store';
import { dateFormater} from '_helpers';
import { findSomething } from '_helpers';
export { Audit };

function Audit() {

    const [sort, setSort] = useState(0)
    const users = useSelector(x => x.users.list);
   
   //user data array
    const [data, setData] = useState([])
    
    //laoding spinner
    const [loading, setLoading] = useState(true);
    
    //searching for this data
    const [searchFor, setSearchFor] = useState(null)
    
    //Page number count
    const [page, setPage] = useState(0);
    //Initially rows per pages
    const [rowsPerPage, setRowsPerPage] = useState(10);
    //Initially date is formatted in 12 HR format
    const [format, setFormat] = useState('12')

    const dispatch = useDispatch();


    //Initial sorting data
    async function sortData(data) {
        return [...data].sort(function (a, b) {
            if (a.firstName > b.firstName) {
                return 1
            }
            if (a.firstName < b.firstName) {
                return -1
            }
            return 0
        })
    }
    //sortng async data
    async function sortAsyn() {
        const u = await users;
        const arr = await [...u.value];
        if (arr) {
            const sortArr = await sortData([...arr]);
            setData(sortArr)
            setLoading(false)
        }
    }

    //handling date format
    const handleFormatChange= (e)=>{
        setFormat(e.target.value)
    }

    useEffect(() => {
        dispatch(userActions.getAll());
        sortAsyn()
    }, []);



    return (
        <div>
            <h1>Auditor Page</h1>
            {/* Pagination Filter and Search Bar */}
            <SubNav
                setSort={setSort}
                length={data?.length}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                searchFor={searchFor}
                setSearchFor={setSearchFor}
            />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Role</th>
                        <th style={{ width: '20%' }}>First Name</th>
                        <th style={{ width: '20%' }}>Last Name</th>
                        <th style={{ width: '20%' }}>Username</th>
                        <th style={{ width: '20%' }}>Login Time&nbsp;
                        {<select onChange={handleFormatChange} className=' className="w-70 form-control"'>
                            <option value="12">12 hr format</option>
                            <option value="24">24 hr format</option>
                        </select>}</th>

                    </tr>
                </thead>
                {loading ? <td colSpan="4" className="text-center">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </td> : <tbody>
                    {

                        data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort(function (a, b) {
                            //Slicing whole array in chunks
                            let x = a.firstName.toLowerCase()
                            let y = b.firstName.toLowerCase()
                            if (sort === 0) {
                                if (x > y) { return 1 }
                                if (x < y) { return -1 }
                                return 0
                            }
                            else {
                                if (y > x) { return 1 }
                                if (y < x) { return -1 }
                                return 0
                            }
                        }).filter(user => {
                            //this filter is searching for desired data
                            if (searchFor !== null) {
                                return findSomething(user,searchFor)
                            }
                            return user
                        }).map(user =>
                            <tr key={user.id}>
                                <td>{user.role}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.username}</td>

                                <td>{dateFormater(user.createdDate, format)}</td>
                            </tr>
                        )}
                    {users?.loading &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>}
            </table>
        </div>
    );
}
