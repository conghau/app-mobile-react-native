/**
 * Created by hautruong on 9/15/17.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {ListView, RefreshControl, ScrollView, StyleSheet, View, FlatList} from "react-native";
import * as VozActions from "../../redux/voz/VozActions";
import {AppColors, AppSizes, AppStyles} from "@theme/";
import Loading from "@components/general/Loading";
import Pagination from "../../components/voz/Pagination";
import {List, ListItem} from "../../components/ui/";
import {Actions} from "react-native-router-flux";


/* Styles ==================================================================== */
const styles = StyleSheet.create({
    // Tab Styles
    tabContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    footer: {
        height: 40,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#8BC34A'
    }
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
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows([]),
            isRefreshing: true,
            currentPage: 1,
            data: [],
        };

        [
            '_onRefresh',
            'onViewableItemsChanged',
            'renderRow',
            '_onGoTo'
        ].forEach((method) => this[method] = this[method].bind(this));
    }

    _onRefresh() {
        const {forumId, pageNumber} = this.props;
        this.setState({isRefreshing: true, currentPage: pageNumber});
        console.log('before refresh');
        this.props.actions.getThreadList(forumId, pageNumber || 1);
        // console.log('end refresh');
        // this.setState({isRefreshing: false});
    }

    _onGoTo(pageNumber) {
        const {forumId} = this.props;
        this.setState({isRefreshing: true, currentPage: pageNumber});
        this.props.actions.getThreadList(forumId, pageNumber || 1);
    }

    componentWillMount() {
        const {forumId, pageNumber} = this.props;
        console.log(this.props);
        this.props.actions.getThreadList(forumId, pageNumber);
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps');

        console.log(nextProps);
        const {threads} = nextProps;
        this.setState({
            // dataSource: ds.cloneWithRows(nextProps.data),
            dataSource: this.state.dataSource.cloneWithRows(threads.items || []),
            isRefreshing: false,
            data: threads.items,
        });

    }

    onViewableItemsChanged = ({viewableItems, changed}) => this.setState({viewableItems})

    renderRow(data, sectionID) {
        console.log(data);
        return (
            <ListItem
                key={`list-row-${sectionID}`}
                onPress={() => Actions.vozPost({threadId: parseInt(data.id), pageNumber: 1})}
                title={data.title}
                subtitle={data.role || null}
                leftIcon={data.icon ? {name: data.icon} : null}
                avatar={data.avatar ? {uri: data.avatar} : null}
                roundAvatar={!!data.avatar}
            />);
    }

    render = () => {
        if (this.state.loading) return <Loading />;
        const {isRefreshing, dataSource, currentPage} = this.state;
        const {threads} = this.props;
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
                        {/*<ListView*/}
                        {/*initialListSize={5}*/}
                        {/*renderRow={this.renderRow}*/}
                        {/*dataSource={dataSource}*/}
                        {/*enableEmptySections={true}*/}
                        {/*automaticallyAdjustContentInsets={false}*/}
                        {/*/>*/}
                        <FlatList
                            keyExtractor={item => item.id}
                            data={threads.items}
                            // renderItem={this.renderRow}
                            renderItem={({ item }) => (
                                <ListItem
                                key={`list-row-${item.id}`}
                                onPress={() => Actions.vozPost({threadId: parseInt(item.id), pageNumber: 1})}
                                title={item.title}
                                subtitle={item.role || null}
                                leftIcon={item.icon ? {name: item.icon} : null}
                                avatar={item.avatar ? {uri: item.avatar} : null}
                                roundAvatar={!!item.avatar}
                                />
                            )}
                        />
                    </List>
                </ScrollView>
                <Pagination
                    maxPage={threads.total}
                    currentPage={currentPage}
                    onNextPageClick={() => this._onGoTo(currentPage + 1)}
                    onPrevPageClick={() => this._onGoTo(currentPage - 1)}
                    onFirstPageClick={() => this._onGoTo(1)}
                    onLastPageClick={() => this._onGoTo(threads.total)}
                />
                <Pagination maxPage={10} currentPage={1}/>
            </View>
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
