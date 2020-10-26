// import { Carousel, WingBlank } from 'antd-mobile';
// import React from 'react'
// class carousel extends React.Component {
//     state = {
//         data: ['1', '2', '3', '4'],
//         // imgHeight: 300,
//     }
//     componentDidMount() {
//         // simulate img loading
//         setTimeout(() => {
//             this.setState({
//                 data: ['https://image1.benlailife.com/AppHomePageImage/5e65d768bc1f4aa3b327073ae3b1cc1d_n-n.jpg', 'https://image.benlailife.com/AppHomePageImage/9532c3fc65b24f1fa3e827e261c3061c_n-n.jpeg', 'https://image3.benlailife.com/AppHomePageImage/e02277e758474247bcb4506711b3e655_n-n.jpeg', 'https://image3.benlailife.com/AppHomePageImage/54bbf11143e64586965412035b42118f_n-n.jpg'],
//             });
//         }, 100);
//     }
//     render() {
//         return (
//             <WingBlank>
//                 <Carousel
//                     style={{ margin: 0 }}
//                     dotStyle={{ width: 12, height: 2 }}
//                     dotActiveStyle={{ width: 12, height: 2, background: '#abd13e' }}
//                     infinite
//                     cellSpacing={0}
//                     autoplay={true}  >
//                     {this.state.data.map(val => (
//                         <a
//                             key={val}
//                             href="#"
//                             style={{ display: 'inline-block', width: 350, height: 150 }}
//                         >
//                             <img
//                                 src={val}
//                                 alt=""
//                                 style={{ width: '100%', verticalAlign: 'top' }}
//                             />
//                         </a>
//                     ))}
//                 </Carousel>
//             </WingBlank>
//         );
//     }
// }
// export default carousel


import { Carousel, WingBlank } from 'antd-mobile';

import React from 'react'
class carousel extends React.Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }
    render() {
        return (
            <WingBlank>
                <Carousel
                    autoplay={false}
                    infinite
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
            </WingBlank>
        );
    }
}

export default carousel