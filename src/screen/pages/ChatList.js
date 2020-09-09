import React from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import IMG from '../../assets/img/logo2.jpg';
import { Layout, TopNavigation, Divider, ListItem, Button, Icon, List, Avatar } from '@ui-kitten/components'
import { connect } from 'react-redux';

const ChatList = ({navigation, user, chats}) => {
    
    const AvatarImage = props => (
        <Avatar source={IMG} defaultSource={IMG} resizeMode="cover" />
      );

    const renderItem = ({ item, index }) => {
        const id = item.participant1._id === user._id ? item.participant2: item.participant1 
        return (<ListItem
                key={index}
                title={`${item.participant1._id === user._id ? item.participant2.name : item.participant1.name}`}
                description={`${item.message[0].body}`}
                accessoryLeft={AvatarImage}
                onPress={() => navigation.navigate('chat', id)}
                // accessoryRight={() => renderItemAccessory(item.user._id)}
            />)
    };
    

    return (
        <Layout style={{flex: 1}}>
            <SafeAreaView>
                <TopNavigation />
                <Divider />
                <ScrollView>
                    <List data={chats} ItemSeparatorComponent={Divider} renderItem={renderItem} />
                </ScrollView>
            </SafeAreaView>
        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        chats: state.chatlist.chatlist
    };
  };

export default connect(mapStateToProps)(ChatList)
