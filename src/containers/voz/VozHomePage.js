import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {FlatList, ScrollView, StyleSheet, View} from "react-native";
import * as VozActions from "../../redux/voz/VozActions";
import {AppStyles} from "../../theme/";
import Loading from "../../components/general/Loading";
import {List, ListItem} from "../../components/ui/";
import {Actions} from "react-native-router-flux";
import {SearchBar} from  'react-native-elements';

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
            searchKey: '',
            forums: [],

        };

        [
            'handleFilter',
        ].forEach((method) => this[method] = this[method].bind(this));
    }

    componentWillMount() {
        // this.props.actions.getForumList().then(res => {
        this.props.actions.getForumList();
        this.setState({
            loading: true,
        });
        // });
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps');
        console.log(nextProps);
        this.setState({
            isRefreshing: false,
            loading: false,
            forums: nextProps.forums || []
        });

    }

    handleFilter(val) {
        console.log(val);
        if (this.props.forums) {
            let filter = this.props.forums.filter((forum) => {
                return (`${forum.id}`.includes(val));
            });
            this.setState({
                forums: filter,
            })
        }
    }

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round onChangeText={this.handleFilter}/>;
    };

    render = () => {
        if (this.state.loading) return <Loading />;
        const {forums} = this.state;
        return (
            <View style={styles.tabContainer}>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    style={[AppStyles.container]}
                >
                    <List>
                        <FlatList
                            keyExtractor={item => item.id}
                            data={forums}
                            renderItem={({item}) => (
                                <ListItem
                                    key={`list-row-${item.id}`}
                                    // onPress={Actions.comingSoon}
                                    onPress={() => {
                                        Actions.vozThreadList({forumId: item.id || 0})
                                    }}
                                    title={`${item.title} - ${item.id} `}
                                    // subtitle={item.role || null}
                                    // leftIcon={item.icon ? {name: item.icon} : null}
                                    // avatar={item.avatar ? {uri: item.avatar} : null}
                                    // roundAvatar={!!item.avatar}
                                />
                            )}
                            ListHeaderComponent={this.renderHeader}
                        />
                    </List>
                </ScrollView>
            </View>
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
