import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { MyContext } from '../../store/store'
import request from '../../utils/request'
import '../../assets/public/common.css'
import './index.scss'


function GoodSelect(props) {

    const { state, dispatch } = useContext(MyContext);
    const [goodList, getGood] = useState([])
    const history = useHistory()
    useEffect(() => {
        (async () => {
            let num = parseInt((Math.random() * 15) + 1)
            let result = await request.get("/good/selectGood", {
                params: {
                    page: num,
                    pageSize: 20
                }
            })
            // 

            getGood(result.data.msg.list)

        })()
    }, []);
    const add_cart = useCallback((item) => {
        dispatch({ type: "add_to_cart", item })
    }, [state])
    return (

        <div className="good_Select" style={props.del ? null : { display: "none" }}>
            3145631321321
        </div>
    )
}

export default GoodSelect;