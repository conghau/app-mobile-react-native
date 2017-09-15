import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import * as VozActions from '../../redux/voz/VozActions';
// Consts and Libs
import {AppStyles, AppSizes, AppColors} from '@theme/';
import ForumList from '../../components/voz/ForumList';
import Loading from '@components/general/Loading';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    // Tab Styles
    tabContainer: {
        flex: 1,
    },
});

class VozHomePage extends Component {
    static componentName = 'VozHomePage';

    static propTypes = {
        data: PropTypes.array
    };

    static defaultProps = {
        data: []
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
        console.log(this);
        this.props.actions.getForumList();
    }

    componentWillMount() {
        // this.props.actions.getForumList().then(res => {
        this.setState({
            loading: false,
        });
        // });
    }

    render = () => {
        if (this.state.loading) return <Loading />;
        const {forums} = this.props;
        return (
            <ForumList data={forums}></ForumList>
        )
    }
}

/* Redux ==================================================================== */
// What data from the store shall we send to the component?
const mapStateToProps = state => ({
    forums: state.voz.forums || [],
});

// Any actions to map to the component?
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(VozActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VozHomePage);
