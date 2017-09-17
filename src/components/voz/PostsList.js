/**
 * Created by hautruong on 9/15/17.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {ListView, ScrollView, StyleSheet, View, WebView} from "react-native";
import HTML from 'react-native-render-html'


// Consts and Libs
import {AppColors, AppStyles} from "../../theme/";
// Components
import {Alerts, Button, Card, FormInput, FormLabel, List, ListItem, Spacer, Text} from "../../components/ui/";
import PostHeaderUserInfo from "./PostHeaderUserInfo";

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    // Tab Styles
    tabContainer: {
        flex: 1,
    },
});

class PostsList extends Component {
    static componentName = 'PostsList';

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
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(nextProps.data),
        })
    }

    renderRow(data, sectionID) {
        const {title, content, user} = data;
        const htmlContent = `<p><a href="http://jsdf.co">&hearts; nice job!</a></p>`;

        return (
            <Card>

                {/*<HTMLView*/}
                {/*value={htmlContent}*/}
                {/*/>*/}
                <View style={{marginLeft: 0}}>
                    <PostHeaderUserInfo user={user}/>
                </View>
                <WebView style={styles.tabContainer}
                         source={{html: htmlContent}}
                         startInLoadingState={false}/>
                <HTML html={content.text} htmlStyles={{margin: 15}}/>

            </Card>

        )

    }

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
                            dataSource={this.state.dataSource || []}
                            enableEmptySections={true}
                        />
                    </List>
                </ScrollView>
            </View>
        );
    }
}

PostsList.propTypes = {
    data: PropTypes.array
};

export default PostsList;
