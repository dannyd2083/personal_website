'use client'

import {useEffect,useState,useRef} from "react";

const SearchBar = ({onSearch, onClear, isLoading}) => {
    const [value, setValue] = useState('')
    const debounceRef = useRef(null)
    useEffect(() => {
        clearTimeout(debounceRef.current)
        if(!value.trim()){
            onClear()
            return
        }
        debounceRef.current = setTimeout(() => {
            onSearch(value)
        }, 500)
        return () => clearTimeout(debounceRef.current)
    }, [value,onSearch,onClear])

    return (
        <div className="bg-clay-court-light px-4 py-3">
            <div className="max-w-xl mx-auto relative">
                <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder='Search by mood — try "rainy", "golden hour"'
                    className="w-full bg-clay-court text-clay-cream placeholder:text-clay-dust placeholder:opacity-60 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2
  focus:ring-clay-dust"
                />
                {!isLoading && value && (
                    <button
                        onClick={() => { setValue(''); onClear() }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-clay-cream opacity-60 hover:opacity-100 text-lg"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    )

}

export default SearchBar;