import {
    View, Text, TextInput, BackHandler,
    StyleSheet, TouchableOpacity, Alert, Image, ImageBackground, FlatList,
} from "react-native";

import Home from '../../../../app/screens/home/Home'
// import homeStore from '../../../../app/screens/home/homeStore'
import {Provider} from 'mobx-react'


describe('Home', () => {
    let wrapper
    let HomeJson
    let HomeScreen

    beforeEach(() => {

        // creates the accessible object of all the screen element by Enzyme
        wrapper = shallow(<Provider><Home/></Provider>)

        // creates the snapshot
        HomeJson = renderer.create(<Provider><Home/></Provider>).toJSON()

        // creates the accessible object of all the screen element by react-test-renderer
        HomeScreen = renderer.create(<Provider><Home/></Provider>)
    })


    it('renders correctly SnapShot works', () => {
        expect(HomeJson).toMatchSnapshot()
    })

    it('should render', () => {
        expect(wrapper).toBeDefined()
    })


    it('should render child Element', () => {
        expect(wrapper.containsMatchingElement([
                <View/>,
                <FlatList/>
            ])
        )
    })

    it('should have View', () => {

        const view = HomeScreen.root.findAllByType(View)

        expect(view).toHaveLength(2)
    })

    it('should have FlatList', () => {

        const flatLists = HomeScreen.root.findAllByType(FlatList)

        expect(flatLists).toHaveLength(1)
    })
})
