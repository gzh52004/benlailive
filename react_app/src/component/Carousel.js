import { Carousel, WingBlank } from 'antd-mobile';
import React from 'react'
class carousel extends React.Component {

    state = {
        data: ["http://47.115.142.170:60005/uploads/homeImg/1535f4e286d54c73832ad69f326089cb_n-n.jpg", "http://47.115.142.170:60005/uploads/homeImg/1b9c86f60b9b48768c16263b9998bbf8_n-n.jpg"],
        imgHeight: 300,
    }
    componentDidMount() {
        // simulate img loading

        setTimeout(() => {
            this.setState({
                data: ["http://47.115.142.170:60005/uploads/homeImg/1535f4e286d54c73832ad69f326089cb_n-n.jpg", "http://47.115.142.170:60005/uploads/homeImg/1b9c86f60b9b48768c16263b9998bbf8_n-n.jpg"]
            });
        }, 100);
    }
    UNSAFE_componentWillReceiveProps(a, b) {
        // console.log(a, b);
        if (this.props.databanner.list) {
            console.log(this.props.databanner.list.map(item => item.img));
            // this.setState({
            //     data: this.props.databanner.list.map(item => item.img)
            // })

            setTimeout(() => {
                this.setState({
                    data: this.props.databanner.list.map(item => item.img)
                });
            }, 100);
        }

    }
    render() {
        // console.log(this.props.databanner.list);
        return (
            <WingBlank>
                <Carousel
                    style={{ margin: 0 }}
                    dotStyle={{ width: 12, height: 2 }}
                    dotActiveStyle={{ width: 12, height: 2, background: '#abd13e' }}
                    infinite
                    cellSpacing={0}
                    autoplay  >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            href="#"
                            style={{ display: 'inline-block', width: 350, height: 150 }}
                        >
                            <img
                                src={val}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top', height: '100%' }}
                            />
                        </a>
                    ))}
                </Carousel>
            </WingBlank>
        );
    }
}
export default carousel