import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor() {
        super();
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }

    componentDidCatch(error, info) {
        console.log("Error : ",error);
        console.log("Error Info : ",info);
    }

    render(){
        if(this.state.hasError){
            return (
                <h1>Something went Wrong ! Contact Admin.</h1>
            );
        }
        else{
            return this.props.children;
        }
    }
}