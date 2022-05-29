import React, {Component} from "react";
import './style.css';
import {TailSpin} from 'react-loader-spinner'
import Info from "./Info";

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
        const response = await fetch(`http://ipwhois.app/json/${ip}`)
        return await response.json();

    }

    componentDidMount() {
        this.getInfo().then(data => {
            this.setState({
                info: data,
                isLoading: false
            })
        })
    }

    render() {
        const isLoading = this.state.isLoading
        return (
            <>
                {
                    isLoading ?
                        <TailSpin color="#00BFFF" height={80} width={80}/> :
                        <Info data={this.state.info}/>
                }
            </>
        )
    }
}