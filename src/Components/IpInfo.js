import React, {Component} from "react";
import './style.css';
import {TailSpin} from 'react-loader-spinner'
import Info from "./Info";
import getInfo from "../services/getInfo";

export default class IpInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: null,
            isLoading: true
        }
    }


    componentDidMount() {
        getInfo().then(data => {
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