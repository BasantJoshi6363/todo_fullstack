import React from 'react'
import ActionButton from '../component/ActionButton'
import Sidebar from '../component/Sidebar'
import Header from '../component/Header'

const Format = ({ children }) => {
    return (
        <div className=''>
            <Header />
            <div className="flex">
                <Sidebar />
                {children}
            </div>

        </div>
    )
}

export default Format