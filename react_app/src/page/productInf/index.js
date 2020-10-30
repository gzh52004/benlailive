import React,{useEffect} from 'react';
import {useHistory} from "react-router-dom"
import request from "../../utils/request"


function productInf () {
const history = useHistory();
    useEffect(() => {
     
        let arr = history.location.pathname.split("/")
        let result =  request.get("/good/selectGood",{params:{
            findQuery:{
                _id:arr[2]
            }
         }}).then(res => {
             console.log(res.data.msg.list[0])
         })
        //  console.log(result)
    },[])
    return (
        <div>123</div>
    )
}

export default productInf