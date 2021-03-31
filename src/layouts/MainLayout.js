import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserInfo } from '../redux/actions/webActions'
import { useEffect } from 'react'
const MainTemplateSelector = (props) => {
    const location = useLocation()
    const asPath = location.pathname || '/'
    
    useEffect(() => {
        props.getUserInfo()
    }, [])

    return (
        <>
            <Header asPath={asPath} />
            <div>
                {props.children}
            </div>
            <Footer />
        </>
    )
}

const MainTemplate = connect(null, { getUserInfo })(MainTemplateSelector)
export default MainTemplate