/**
 * Created by hautruong on 9/15/17.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {StyleSheet} from "react-native";
import * as VozActions from "../../redux/voz/VozActions";
import {AppColors, AppSizes, AppStyles} from "@theme/";
import Loading from "@components/general/Loading";
import PostsList from "../../components/voz/PostsList";

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    // Tab Styles
    tabContainer: {
        flex: 1,
    },
});

class VozPostPage extends Component {
    static componentName = 'VozPostPage';

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
    }

    componentWillMount() {
        const {threadId, pageNumber} = this.props;
        this.props.actions.getPostList(threadId, pageNumber);
        this.setState({
            loading: false,
        });
    }

    render() {
        if (this.state.loading) return <Loading />;
        const {posts} = this.props;
        return (
            <PostsList data={posts.items || []}/>
        )
    }
}

VozPostPage.propTypes = {
    threadId: PropTypes.number,
    pageNumber: PropTypes.number,
    data: PropTypes.object,
};

/* Redux ==================================================================== */
// What data from the store shall we send to the component?
const mapStateToProps = state => ({
    posts: state.voz.posts || [],
});

// Any actions to map to the component?
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(VozActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VozPostPage);
