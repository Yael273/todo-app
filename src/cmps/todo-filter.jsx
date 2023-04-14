import { useEffect, useRef, useState } from "react"
import { todoService } from "../services/todo.service"
import { utilService } from "../services/util.service"

export function TodoFilter({ setFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(todoService.getDefaultFilter())

    setFilterBy = useRef(utilService.debounce(setFilterBy))

    useEffect(() => {
        setFilterBy.current(filterByToEdit)
    }, [filterByToEdit])

    function handleFilterChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return <section className="todo-filter">
        <input
            onChange={handleFilterChange}
            value={filterByToEdit.searchTxt}
            type='text'
            name='searchTxt'
            id='searchtxt'
            placeholder='Search todo...'
        />
    </section>
}