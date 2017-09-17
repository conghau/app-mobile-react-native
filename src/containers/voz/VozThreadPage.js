/**
 * Created by hautruong on 9/15/17.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {StyleSheet} from "react-native";
import * as VozActions from "../../redux/voz/VozActions";
// Consts and Libs
import {AppColors, AppSizes, AppStyles} from "@theme/";
import ThreadList from "../../components/voz/ThreadList";
import Loading from "@components/general/Loading";

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    // Tab Styles
    tabContainer: {
        flex: 1,
    },
});

class VozThreadPage extends Component {
    static componentName = 'VozThreadPage';

    // static propTypes = {
    //     data: PropTypes.array
    // };

    static defaultProps = {
        data: {},
        pageNumber: 1
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
        console.log(this);
        // this.props.actions.getThreadList(33, 1);
        const {forumId, pageNumber} = this.props;
        this.props.actions.getThreadList(forumId, pageNumber);
        [
            'handleRefresh',
        ].forEach((method) => this[method] = this[method].bind(this));
    }

    handleRefresh(forumId, pageNumber = 1) {
        return this.props.actions.getThreadList(forumId, pageNumber || 1);
    }

    componentWillMount() {
        this.setState({
            loading: false,
        });
    }

    render = () => {
        if (this.state.loading) return <Loading />;
        const {threads, forumId} = this.props;
        return (
            <ThreadList data={threads.items || []} reFetch={this.handleRefresh} forumId={forumId}/>
        )
    }
}

VozThreadPage.propTypes = {
    forumId: PropTypes.number,
    pageNumber: PropTypes.number,
    data: PropTypes.object,
};

/* Redux ==================================================================== */
// What data from the store shall we send to the component?
const mapStateToProps = state => ({
    threads: state.voz.threads || [],
});

// Any actions to map to the component?
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(VozActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VozThreadPage);
