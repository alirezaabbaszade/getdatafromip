import React, {Component} from "react";
import './style.css';
import {TailSpin} from 'react-loader-spinner'

export default class IpInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: null,
            isLoading: true
        }
    }

    async getIp() {
        const response = await fetch('https://api.ipify.org?format=json')
        return (await response.json()).ip;
    }

    async getInfo() {
        const ip = await this.getIp();
        const response = await fetch(`http://ipwho.is/${ip}`)
        return await response.json();

    }

    componentDidMount() {
        this.getInfo().then(data => {
            this.setState({
                info: data
            })
        })
    }

    render() {
        return (
            <>
                {this.state.isLoading &&
                    <TailSpin color="#00BFFF" height={80} width={80}/>
                }
                {!this.state.isLoading &&
                    <div className="card-container">
                        <span className="info">Info</span>
                        {/*<img className="round" src="./br.svg" alt="brazil"/>*/}
                        <h3>Brazil</h3>
                        <h6>Guarulhos</h6>
                        <p>isp: Akamai International B.V.</p>
                        <div className="footer">
                            <p>IP: 2.21.90.0</p>
                            <p>latitude: -23.4543395</p>
                            <p>longitude: -46.5336678</p>
                        </div>
                    </div>
                }
            </>
        )
    }
}