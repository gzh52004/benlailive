import React, { useEffect, useState } from 'react'
import { TabBar } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';


const menu = [
    {
        name: 'Home',
        text: '首页',
        path: '/home',
        icon: "https://image1.benlailife.com/500d8808-704a-468a-8eb2-3b804bd8e64d",
        selectedIcon: "https://image2.benlailife.com/ea2c8fce-9fc4-4969-b148-fe979f2b3f9d"
    },
    {
        name: 'List',
        text: '分类',
        path: '/list',
        icon: "https://image3.benlailife.com/d94ef328-0596-420b-9f41-312f78b8818b",
        selectedIcon: "https://image.benlailife.com/7aed8b69-0479-4c72-b5c0-caedb24415a4"
    },
    {
        name: 'Newcomer',
        text: '新人',
        path: '/newcomer',
        icon: "https://image2.benlailife.com/4ff23b92-f737-429b-8968-fb3ed31d6fb9",
        selectedIcon: "https://image.benlailife.com/7aed8b69-0479-4c72-b5c0-caedb24415a4"
    },
    {
        name: 'Cart',
        text: '购物车',
        path: '/cart',
        icon: "https://image2.benlailife.com/e5cff5dc-90ea-455d-bc4f-249ab3febb58",
        selectedIcon: "https://image.benlailife.com/7aed8b69-0479-4c72-b5c0-caedb24415a4"
    },
    {
        name: 'Mine',
        text: '我的本来',
        path: '/mine',
        icon: "https://image.benlailife.com/feb10bfc-319c-4fc8-b44f-18feca888190",
        selectedIcon: "https://image2.benlailife.com/923e6878-98f0-4f69-ad9a-38645e077862"
    },
]
function Nav(props) {
    const [active, activechange] = useState('/home')//设置高亮
    useEffect(() => {//刷新后高亮不回到初始设置
        if (menu)
            activechange(props.props.location.pathname)
    })
    return (
        <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#80d13e"
                barTintColor="white"
            >
                {
                    menu.map((item, idx) => <TabBar.Item
                        title={item.text}
                        key={item.name}
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${item.icon}) center center /  26px 26px no-repeat`
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${item.selectedIcon}) center center /  26px 26px no-repeat`
                        }}
                        />

                        }
                        selected={active == item.path}//设置高亮
                        onPress={() => {
                            // console.log(props.props);
                            // console.log(idx);
                            //对应组件高亮
                            activechange(item.path)
                            //跳转到对应的组件
                            props.props.history.push(item.path)
                        }}

                    >
                    </TabBar.Item>)
                }

            </TabBar>
        </div>
    );
}


export default Nav