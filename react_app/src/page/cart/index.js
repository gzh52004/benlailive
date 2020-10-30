import {withAuth} from '../../component/hoc'
import React from 'react'

function Cart(props) {
    return (
        <div className="cart">Cart</div>
        // console.log(Cart.props)
    )
}
Cart = withAuth(Cart)
export default Cart