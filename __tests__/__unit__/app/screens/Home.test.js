import {
    View, FlatList,
} from "react-native";

import Home from '../../../../app/screens/home/Home'
import homeStore from '../../../../app/screens/home/homeStore'
import {Provider} from 'mobx-react'

jest.mock('axios')

describe('Home', () => {
    let wrapper
    let HomeJson
    let HomeScreen
    const createTestProps = (props) => ({
        navigation: {
            navigate: jest.fn(),
            setOptions: jest.fn()
        },
        ...props
    })
    const props = createTestProps({})
    beforeEach(() => {
        // creates the accessible object of all the screen element by Enzyme
        wrapper = shallow(<Provider homeStore={homeStore}><Home {...props}/></Provider>)

        // creates the snapshot
        HomeJson = renderer.create(<Provider homeStore={homeStore}><Home {...props}/></Provider>).toJSON()

        // creates the accessible object of all the screen element by react-test-renderer
        HomeScreen = renderer.create(<Provider homeStore={homeStore}><Home {...props}/></Provider>)
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

        expect(view).toHaveLength(20)
    })

    it('should have FlatList', () => {

        const flatLists = HomeScreen.root.findAllByType(FlatList)

        expect(flatLists).toHaveLength(1)
    })
})
