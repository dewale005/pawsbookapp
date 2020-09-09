import React from 'react'
import { View, SafeAreaView } from 'react-native'
import { Layout, Text, TopNavigation, Divider } from '@ui-kitten/components'

const Love = () => {
    return (
        <Layout style={{flex: 1}}>
            <SafeAreaView>
                <TopNavigation title="Activity" />
                <Divider />
                <Text>Love</Text>
            </SafeAreaView>
        </Layout>
    )
}

export default Love
