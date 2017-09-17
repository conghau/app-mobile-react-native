/**
 * Created by hautruong on 9/15/17.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {ListView, ScrollView, StyleSheet, View, RefreshControl} from "react-native";
import {Actions} from "react-native-router-flux";
import {AppColors, AppStyles} from "../../theme/";
import {List, ListItem} from "../../components/ui/";
import WelcomeText from "react-native/local-cli/templates/HelloNavigation/views/welcome/WelcomeText.ios";

const styles = StyleSheet.create({
    // Tab Styles
    tabContainer: {
        flex: 1,
    },
});

class ThreadList extends Component {
    static componentName = 'ThreadList';

    constructor(props) {
        super(props);

        // Setup ListViews
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows(this.props.data),
            isRefreshing: true,
        };

        [
            'renderRow',
            '_onRefresh'
        ].forEach((method) => this[method] = this[method].bind(this));
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            // dataSource: ds.cloneWithRows(nextProps.data),
            dataSource: this.state.dataSource.cloneWithRows(nextProps.data),
            isRefreshing: false,
        });

    }

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

    async _onRefresh() {
        console.log('onRefresh');

        if (this.props.reFetch) {
            this.setState({isRefreshing: true});
            console.log('before refresh');
            await this.props.reFetch(this.props.forumId, 1);
            console.log('end refresh');
            this.setState({isRefreshing: false});
        }
    }

    render() {
        const {isRefreshing, dataSource} = this.state;
        return (
            <View style={styles.tabContainer}>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    style={[AppStyles.container]}
                    refreshControl={
                        this.props.reFetch ?
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={this._onRefresh}
                                tintColor={AppColors.brand.primary}
                            />
                            : null
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
            </View>
        );
    }
}

ThreadList.propTypes = {
    data: PropTypes.array,
    reFetch: PropTypes.func,
    // isRefreshing: PropTypes.bool,
    // onRefresh: PropTypes.func,
};

export default ThreadList;
