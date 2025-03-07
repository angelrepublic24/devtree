import React, { useState } from 'react'

export const useFrom = (initialObject = {}) => {
    const [form, setForm] = useState(initialObject)

    const changed = ({target}) => {
        const {name, value} = target;
        setForm({...form, [name]: value})
    }
    return {form, changed}
}