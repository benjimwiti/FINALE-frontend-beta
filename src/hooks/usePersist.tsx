import React, { useEffect, useState } from 'react'

const usePersist = () => {

    const localPersist = JSON.parse(localStorage.getItem('persist') ?? 'false')
    const [persist, usePersist] = useState(localPersist || false)

    useEffect(()=> {
        localStorage.setItem(`persist`, JSON.stringify(persist))
    }, [persist])


    return [persist, usePersist]
}

export default usePersist