/**
 * Created by hautruong on 9/16/17.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {ListItem} from "../../components/ui/";
import {Platform, StyleSheet, TouchableHighlight, View} from "react-native";
import {Avatar, colors, normalize, Text, ViewPropTypes} from "react-native-elements";
import fonts from "react-native-elements/src/config/fonts";
import {AppColors, AppStyles} from "../../theme/";


const FORUM_URL = 'https://vozforums.com';

const styles = StyleSheet.create({
    avatar: {
        width: 34,
        height: 34,
    },
    container: {
        paddingTop: 5,
        paddingRight: 0,
        paddingBottom: 5,
        marginBottom: 5,
        borderBottomColor: colors.greyOutline,
        borderBottomWidth: 1,
        backgroundColor: 'transparent',
    },
    wrapper: {
        flexDirection: 'row',
        marginLeft: 0,
    },
    iconStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginRight: 8,
    },
    title: {
        fontSize: normalize(14),
        color: colors.grey1,
    },
    subtitle: {
        color: colors.grey3,
        fontSize: normalize(12),
        marginTop: 1,
        ...Platform.select({
            ios: {
                fontWeight: '600',
            },
            android: {
                ...fonts.android.bold,
            },
        }),
    },
    titleSubtitleContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    rightTitleContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    rightTitleStyle: {
        marginRight: 5,
        color: colors.grey4,
    },

    containerStyle: {
        backgroundColor: AppColors.listItemBackground,
        borderTopColor: AppColors.border,
        borderBottomColor: AppColors.border,
    },
    titleStyle: {...AppStyles.baseText},
    subtitleStyle: {...AppStyles.subtext},
});

class PostHeaderUserInfo extends Component {
    static componentName = 'PostHeaderUserInfo';

    constructor(props) {
        super(props);
    }

    renderLine(props) {
        const {
            user,
            onPress,
            leftIcon,
            onLongPress,
            ...attributes,
        } = props;

        const {

            avatarStyle,
            avatarContainerStyle,
            avatarOverlayContainerStyle,
            underlayColor,
            subtitleStyle,
            containerStyle,
            wrapperStyle,
            titleNumberOfLines,
            titleStyle,
            titleContainerStyle,
            fontFamily,
            rightTitleContainerStyle,
            rightTitleStyle,
            subtitleContainerStyle,
            titleSubtitleContainer,
        } = styles;

        let avatar = user.avt ? {uri: `${FORUM_URL}/${user.avt}`} : null;
        let title = user.name;
        let subtitle = user.role;
        let {joinDate, posts} = user;
        let roundAvatar = true;
        let Component = onPress || onLongPress ? TouchableHighlight : View;

        return (
            <Component
                onLongPress={onLongPress}
                onPress={onPress}
                underlayColor={underlayColor}
                style={[styles.container, containerStyle]}
                {...attributes}
            >
                <View style={[styles.wrapper, wrapperStyle && wrapperStyle]}>
                    {avatar &&
                    <View style={styles.avatar}>
                        {React.isValidElement(avatar)
                            ? avatar
                            : <Avatar
                                avatarStyle={avatarStyle && avatarStyle}
                                containerStyle={avatarContainerStyle && avatarContainerStyle}
                                overlayContainerStyle={
                                    avatarOverlayContainerStyle && avatarOverlayContainerStyle
                                }
                                rounded={roundAvatar}
                                source={avatar}
                            />}
                    </View>}
                    <View style={titleSubtitleContainer}>
                        <View style={titleContainerStyle}>
                            {title !== null &&
                            (typeof title === 'string' || typeof title === 'number')
                                ? <Text
                                    numberOfLines={titleNumberOfLines}
                                    style={[
                                        styles.title,
                                        !leftIcon && {marginLeft: 10},
                                        titleStyle && titleStyle,
                                        fontFamily && {fontFamily},
                                    ]}
                                >
                                    {title}
                                </Text>
                                : <View>
                                    {title}
                                </View>}
                        </View>
                        <View style={subtitleContainerStyle}>
                            {subtitle !== null &&
                            (typeof subtitle === 'string' || typeof subtitle === 'number')
                                ? <Text
                                    numberOfLines={0}
                                    style={[
                                        styles.subtitle,
                                        !leftIcon && {marginLeft: 10},
                                        subtitleStyle && subtitleStyle,
                                        fontFamily && {fontFamily},
                                    ]}
                                >
                                    {subtitle}
                                </Text>
                                : <View>
                                    {subtitle}
                                </View>}
                        </View>
                    </View>
                    {joinDate &&
                    <View style={[styles.rightTitleContainer, rightTitleContainerStyle]}>
                        <Text
                            style={[styles.rightTitleStyle, rightTitleStyle]}>
                            JD: {joinDate.toString()}
                        </Text>
                        <Text style={[styles.rightTitleStyle, rightTitleStyle]}>
                            posts : {posts || 0}
                        </Text>
                    </View>
                    }
                </View>
            </Component>
        );
    };

    render() {
        return (
            <View>
                {this.renderLine(this.props)}
            </View>
        )
    }
}

PostHeaderUserInfo.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        joinDate: PropTypes.date,
        posts: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        avt: PropTypes.string,
        role: PropTypes.string,
        img: PropTypes.string,
        title: PropTypes.string
    })
};

export default PostHeaderUserInfo;