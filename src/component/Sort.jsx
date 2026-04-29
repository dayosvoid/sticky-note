import React, { useState } from 'react'

const Sort = ({onFilterChange}) => {
    const [filter, setFilter] = useState("All")
    const categories = ["All", "Personal", "Business", "Other"]

    const handleFilter = (c)=>{
        setFilter(c)
        onFilterChange(c)
    }

    return (
        <div className="flex w-full sm:w-[60%] justify-start overflow-hidden gap-2 mb-4">
            {categories.map((c, index) => (
                <button 
                    key={index} 
                    onClick={() => handleFilter(c)} 
                    className={`cursor-pointer sm:px-3 px-1 py-2 rounded-md transition-all flex-1 font-semibold md:font-bold ${
                        filter === c 
                        ? 'bg-purple-600 text-white shadow-lg' // Active style
                        : 'text-gray-400 hover:bg-purple-500 hover:text-white' // Inactive style
                    }`}
                >
                    {c}
                </button>
            ))}
        </div>
    )
}

export default Sort
