import React from 'react'
import ReactDOM from 'react-dom'

import Card from './card'

export default class ContentWrapper extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <section className="content-wrapper">
                {this.props.categories.map((e, i) => {
                    return <div key={e.toString()} className="content-wrapper__card">{e.toString()}</div>
                })}
            </section>
        );
    }
};
