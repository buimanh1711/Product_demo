import { Link } from 'react-router-dom'

const Footer = () => {

    return (
        <>
            <div id='footer'>
                <div className='footer-container'>
                    <div className='footer-data'>
                        <div className='footer-logo'>
                            <Link to='/'>
                                <img src='/images/pageLogo.png' alt='logo' />
                            </Link>
                        </div>
                        <p className='footer-desc'>
                            A minimal, functional theme for running a paid-membership publication on Ghost.
                        </p>
                        <div className='footer-networks'>
                            <Link to='/'>
                                <i className="fab fa-facebook"></i>
                            </Link>
                            <Link to='/'>
                                <i className="fab fa-youtube"></i>
                            </Link>
                            <Link to='/'>
                                <i className="fab fa-instagram"></i>
                            </Link>
                            <Link to='/'>
                                <i className="fab fa-twitter"></i>
                            </Link>
                        </div>
                    </div>
                    <div className='footer-menu'>
                        <ul>
                            <li className='title'>About</li>
                            <li>
                                <Link to='/'>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    About
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            <li className='title'>About</li>
                            <li>
                                <Link to='/'>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    About
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            <li className='title'>About</li>
                            <li>
                                <Link to='/'>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    About
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            <li className='title'>About</li>
                            <li>
                                <Link to='/'>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <p className='footer-copyright'> © 2021. All Right Reserved.
		Published with  _mb1o4er</p>
            </div>
        </>
    )
}

export default Footer