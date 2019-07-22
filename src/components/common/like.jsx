import React, { Component } from 'react';

class Like extends Component {
    getClassName = () => {
        if (this.props.isLike)
            return "fa fa-heart-o"
        return "fa fa-heart"
    }
    render() { 
        return (<i className={this.getClassName()} aria-hidden="true" onClick={this.props.onClick} style={{cursor: 'pointer'}}></i> );
    }
}
 
export default Like;