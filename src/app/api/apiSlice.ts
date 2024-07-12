import { createApi, fetchBaseQuery, BaseQueryFn, FetchBaseQueryError, FetchArgs } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { setCredentials } from '../../features/auth/authSlice';
// import { setCredentials } from '../../features/auth/authSlice'

interface Headers {
    [key: string]: string;
    } 

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState
        const token = state.auth.token

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    // console.log(args) // request url, method, body
    // console.log(api) // signal, dispatch, getState()
    // console.log(extraOptions) //custom like {shout: true}

    let result = await baseQuery(args, api, extraOptions)

    //IF ACCESS TOKEN HAS EXPIRED
    if (result?.error?.status === 403) {
        console.log('sending refresh token in cookie')

        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions) as any

        //IF ACCESS TOKEN HAS EXPIRED
        if (refreshResult?.data) {

            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data }))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            //REFRESH TOKEN HAS EXPIRED
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired."
                alert(`your Login has expired`)
                //navigate('/login')
            }
            return refreshResult
        }
    }

    return result
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    //tagTypes: [],
    endpoints: builder => ({})
})