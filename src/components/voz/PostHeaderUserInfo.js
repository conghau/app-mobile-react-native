/**
 * Created by hautruong on 9/16/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Alerts, Button, Card, FormInput, FormLabel, List, ListItem, Spacer, Text} from "../../components/ui/";

const FORUM_URL = 'https://vozforums.com';

class PostHeaderUserInfo extends Component {
    static componentName = 'PostHeaderUserInfo';

    constructor(props) {
        super(props);
    }

    render() {
        const {user} = this.props;
        return <ListItem
            key={`list-row-${user.id}`}
            // onPress={Actions.comingSoon}
            title={user.name || null}
            subtitle={user.title || (user.role || null)}
            // leftIcon={user.img ? { name: user.img } : null}
            avatar={user.avt ? {uri: `${FORUM_URL}/${user.avt}`} : null}
            roundAvatar={!!user.avt}
        />
    }


}
PostHeaderUserInfo.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        joinDate: PropTypes.string,
        posts: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        avt: PropTypes.string,
        role: PropTypes.string,
        img: PropTypes.string,
        title: PropTypes.string
    })
};

export default PostHeaderUserInfo;