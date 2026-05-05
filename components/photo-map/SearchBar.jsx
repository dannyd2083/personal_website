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
        <div style={{ maxWidth: 576, margin: '0 auto', background: 'rgba(166,124,90,0.92)', borderRadius: 12, padding: '10px 14px', boxShadow: '0 2px 12px rgba(0,0,0,0.18)', backdropFilter: 'blur(4px)' }}>
            <div className="relative">
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