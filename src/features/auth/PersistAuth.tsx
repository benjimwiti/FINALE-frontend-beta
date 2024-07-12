import React, { ReactNode, useEffect, useRef, useState } from 'react'
import usePersist from '../../hooks/usePersist'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice'
import { useRefreshMutation } from './authApiSlice'

export interface ReactChildNode {
    children: ReactNode
}

const PersistAuth: React.FC<ReactChildNode> = ({children}) => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()


    useEffect(() => {

        // ENSURES SIDE-EFFECT RUNS ON REACT-18'S SECOND RE-RENDER THUS REFRESHING TOKEN ONLY ONCE
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { 

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    //const response = 
                    await refresh('')
                    //const { accessToken } = response.data
                    //console.log(`here's your token ${accessToken}`)
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        effectRan.current = true
        return () => {} 

        //
    }, [])
    console.log({
        isUninitialized : isUninitialized,
        "isLoading": isLoading,
        isSuccess: isSuccess,
        isError: isError,
        error : error
    })

    return ( 
    <>
    <>Testing Persist Auth</>
    {children}
    </>
)
    
    }

export default PersistAuth