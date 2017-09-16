/**
 * Created by hautruong on 9/15/17.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {ListView, ScrollView, StyleSheet, View} from "react-native";
import {Actions} from "react-native-router-flux";
import {AppColors, AppStyles} from "../../theme/";
import {List, ListItem} from "../../components/ui/";

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
        };

        [
            'renderRow',
        ].forEach((method) => this[method] = this[method].bind(this));
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(nextProps.data),
        })
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

    render() {
        return (
            <View style={styles.tabContainer}>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    style={[AppStyles.container]}
                >
                    <List>
                        <ListView
                            renderRow={this.renderRow}
                            dataSource={this.state.dataSource}
                            enableEmptySections={true}
                        />
                    </List>
                </ScrollView>
            </View>
        );
    }
}

ThreadList.propTypes = {
    data: PropTypes.array
};

export default ThreadList;