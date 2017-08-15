import React from 'react';
import { 
    FormControl,
    FormGroup,
    InputGroup,
    Button
 } from 'react-bootstrap'

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    componentDidUpdate() {
        this.props.onChange(this.state.value)
    }

    shouldComponentUpdate(props, state) {
        return state.value != this.state.value
    }

    increment() {
        this.setState({
            value: this.state.value + 1
        });
        //this.props.onChange(this.state.value)
    }

    decrement() {
        if(this.state.value == 1) return;
        this.setState({
            value: this.state.value - 1
        });
        
    }

    render() {
        //console.log(this.props.onChange)
        return (
            <FormGroup className='counter'>
                <InputGroup>
                    <InputGroup.Button>
                        <Button onClick={this.decrement} bsStyle='danger'>-</Button>
                    </InputGroup.Button>
                    <FormControl readOnly value={this.state.value} className='counter__input' type="text" /> 
                    <InputGroup.Button>
                        <Button onClick={this.increment} bsStyle='danger'>+</Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        );
    }
}

export default Counter;
