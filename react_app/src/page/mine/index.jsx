import {withAuth} from '../../component/hoc'
import React from 'react'
import './mine.scss'
import { Modal} from 'antd-mobile';
const alert = Modal.alert;

function Mine(props) {
    const msg = localStorage.getItem("INFO")
    return (
        <div className="mine">
            <div className="head">
            <a className="exit"
      onClick={() =>
        alert('','您确定要退出登录吗', [
          { text: '取消', onPress: () => console.log('cancel') },
          { text: '确定', onPress: () => {localStorage.clear(),
          props.history.push({
            pathname: '/login',
            // state: { name: user.username }
        })
        },
      }
        ])
      }
    >
      退出
    </a>
            <div className="head-user">
                <ol className="head-ol1">
                    <a className="pic1"><img className="pic1-1" src="https://image8.benlailife.com/images/avatar.png"></img></a>
    <a className="head-ol1-a2"><p className="head-ol1-a2-p">{msg}</p></a>
                </ol>
                <ul className="head-ul1">
                    <li className="head-ul1-li1">
                        <font>当前拥有</font>
                        <a>?</a>
                        <font>成长值</font>
                    </li>
                    <li className="head-ul1-li2">
                    <font>升级至绿卡所需</font>
                        <a>?</a>
                        <font>成长值</font>
                    </li>
                </ul>
            </div>
            </div>
        <div className="content">
            <div className="order">
                <div className="order-head">
                    <p>我的订单</p>
                    <a href="">查看全部订单&nbsp;&gt;</a>
                </div>

            </div>
        </div>
        </div>
    )
}
Mine = withAuth(Mine)
export default Mine