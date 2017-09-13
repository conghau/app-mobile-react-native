import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
// Consts and Libs
import { AppStyles, AppSizes, AppColors } from '@theme/';

class VozHomePage extends Component {
    static componentName = 'VozHomePage';

    static propTypes = {
        data: PropTypes.array
    }

    static defaultProps = {
        data: []
    }

    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <View style={[AppStyles.containerCentered, AppStyles.container]}>
                <Text>A</Text>
            </View>
        )
    }
}

/* Redux ==================================================================== */
// What data from the store shall we send to the component?
const mapStateToProps = state => ({
});

// Any actions to map to the component?
const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(VozHomePage);