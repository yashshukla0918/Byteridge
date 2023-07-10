import { useSelector } from 'react-redux';
import { TablePagination } from "@material-ui/core";
//import { useState } from 'react';
export { SubNav };

function SubNav({ length,setSort, page,rowsPerPage,setPage,setRowsPerPage , searchFor,setSearchFor }) {

    
    const auth = useSelector(x => x.auth.value);
    // only show nav when logged in

    //for changing pages on pagination bar
    const handleChangePage = (e,value)=>{
        setPage(value)
    }

    //selecting rows per page
    const handleChangeRowsPerPage = (event)=>{
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    if (!auth) return null;
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item active mx-2 ">
                            {/* Sorting date in order of their firstname */}
                            <select onChange={(e) => { setSort(parseInt(e.target.value)) }} name="" id="" className="w-70 form-control">
                                <option>Sort by</option>
                                <option value="0" >Ascending By Name</option>
                                <option value="1">Descending By Name</option>
                            </select>
                        </li>
                        <li className="nav-item">
                            <form className="d-flex">
                                {/* Search input */}
                                <input className="form-control me-2" value={searchFor===null?"":searchFor} onChange={(e)=>{setSearchFor(e.target.value)}} type="search" placeholder="Search" aria-label="Search" />
                                &nbsp;
                                {/* Reset button for searched data */}
                                <button className="btn btn-success " type="button" onClick={()=>{setSearchFor(null)}}>Reset</button>
                            </form>
                        </li>
                    </ul>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            {/* Material Ui Table Pagination */}
                            <TablePagination
                                className='p-0'
                                style={{
                                    color: 'white',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    overflow: 'hidden'

                                }}
                               
                                component='div'
                                count={length}
                                rowsPerPageOptions={[10,15,20,25]}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}




