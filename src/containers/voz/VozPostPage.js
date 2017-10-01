/**
 * Created by hautruong on 9/15/17.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {FlatList, RefreshControl, ScrollView, StyleSheet, View, WebView} from "react-native";
import * as VozActions from "../../redux/voz/VozActions";
import {AppColors, AppSizes, AppStyles} from "@theme/";
import Loading from "@components/general/Loading";
import Pagination from "../../components/voz/Pagination";
import {Card, List, Text} from "../../components/ui/";
import PostHeaderUserInfo from "../../components/voz/PostHeaderUserInfo";
import HTML from "react-native-render-html";
// import DisplayHTML from 'react-native-display-html';
// import HTMLText from 'react-native-htmltext';
import HTMLView from 'react-native-htmlview';

import {colors, normalize, ViewPropTypes, SearchBar} from "react-native-elements";
import AppWebView from "../../components/general/WebView";


/* Styles ==================================================================== */
const styles = StyleSheet.create({
    // Tab Styles
    tabContainer: {
        flex: 1,
    },
    title: {
        fontSize: normalize(14),
        color: colors.grey1,
    },
    titleStyle: {...AppStyles.baseText},
});

const stylesHtml = StyleSheet.create({
   imgStyle: {

   }
});

class VozPostPage extends Component {
    static componentName = 'VozPostPage';

    // static propTypes = {
    //     data: PropTypes.array
    // };

    static defaultProps = {
        data: {},
        pageNumber: 1,
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            currentPage: 1,
        };
        [
            '_onGoTo'
        ].forEach((method) => this[method] = this[method].bind(this));
    }

    componentWillMount() {
        const {threadId, pageNumber} = this.props;
        this.props.actions.getPostList(threadId, pageNumber);
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps');

        console.log(nextProps);
        this.setState({
            isRefreshing: false,
            loading: false,
        });

    }

    _onGoTo(pageNumber) {
        const {threadId} = this.props;
        this.setState({isRefreshing: true, loading: true, currentPage: pageNumber});
        this.props.actions.getPostList(threadId, pageNumber || 1);
    }

    renderHeader = () => {
        const {threadTitle} = this.props;
        return (
            <View>
                <SearchBar placeholder="Type Here..." lightTheme round/>
                {
                    (threadTitle !== null && (typeof threadTitle === 'string' || typeof threadTitle === 'number')) ?
                        <Text
                            numberOfLines={2}
                            style={[
                                styles.title,
                                styles.titleStyle,
                            ]}
                        >
                            {threadTitle}
                        </Text> : <View>{threadTitle}</View>
                }
            </View>
        );

    };

    render = () => {
        if (this.state.loading) return <Loading />;
        const {posts, threadTitle} = this.props;
        const {currentPage, isRefreshing} = this.state;
        return (
            <View style={styles.tabContainer}>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    style={[AppStyles.container]}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={this._onRefresh}
                            tintColor={AppColors.brand.primary}
                        />
                    }
                >
                    <List>
                        <FlatList
                            keyExtractor={item => item.id}
                            data={posts.items}
                            // renderItem={this.renderRow}
                            renderItem={({item}) => (
                                <Card>
                                    <View style={{marginLeft: 0}}>
                                        <PostHeaderUserInfo user={item.user} post={item}/>
                                    </View>

                                    {/*<HTML html={item.content.text} htmlStyles={{margin: 15}}/>*/}
                                    {/*<DisplayHTML htmlString={item.content.html} />*/}
                                    {/*<WebView*/}
                                        {/*source={{uri: 'https://github.com/facebook/react-native'}}*/}
                                        {/*style={{marginTop: 20, flex: 1}}*/}
                                    {/*/>*/}
                                    {/*<HTMLText html={item.content.html}/>*/}
                                    <HTMLView value={item.content.html} stylesheet={stylesHtml} attribs={{width: 300}}
                                              // renderNode={}
                                    />
                                </Card>
                            )}
                            ListHeaderComponent={
                                this.renderHeader
                            }
                        />
                    </List>
                </ScrollView>
                <Pagination
                    maxPage={posts.total || 0}
                    currentPage={currentPage}
                    onNextPageClick={() => this._onGoTo(currentPage + 1)}
                    onPrevPageClick={() => this._onGoTo(currentPage - 1)}
                    onFirstPageClick={() => this._onGoTo(1)}
                    onLastPageClick={() => this._onGoTo(posts.total || 0)}
                />
                <Pagination maxPage={10} currentPage={1}/>
            </View>
        );
    };
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
