/**
 * Created by hautruong on 9/15/17.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {ListView, RefreshControl, ScrollView, StyleSheet, View} from "react-native";
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
        };

        [
            '_onRefresh',
            'onViewableItemsChanged',
            'renderRow',
        ].forEach((method) => this[method] = this[method].bind(this));
    }

    _onRefresh() {
        const {forumId, pageNumber} = this.props;
        this.setState({isRefreshing: true});
        console.log('before refresh');
        this.props.actions.getThreadList(forumId, pageNumber || 1);
        // console.log('end refresh');
        // this.setState({isRefreshing: false});
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
        });

    }

    onViewableItemsChanged = ({viewableItems, changed}) => this.setState({viewableItems})

    renderRow = (data, sectionID) => (
        <ListItem
            key={`list-row-${sectionID}`}
            onPress={() => Actions.vozPost({threadId: parseInt(data.id), pageNumber: 1})}
            title={data.title}
            subtitle={data.role || null}
            leftIcon={data.icon ? {name: data.icon} : null}
            avatar={data.avatar ? {uri: data.avatar} : null}
            roundAvatar={!!data.avatar}
        />
    );

    render = () => {
        if (this.state.loading) return <Loading />;
        const {isRefreshing, dataSource} = this.state;
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
                        <ListView
                            initialListSize={5}
                            renderRow={this.renderRow}
                            dataSource={dataSource}
                            enableEmptySections={true}
                            automaticallyAdjustContentInsets={false}
                        />
                    </List>
                </ScrollView>
                <Pagination maxPage={5} currentPage={1}/>
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
