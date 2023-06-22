import React, {useEffect} from "react"
import classes from './header.module.css'
import icon_men from '../../img/Icon-man.png'
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {links} from "../../links/links"
import {setIsAuth} from "../../store/slices/userSlice"
import {getUploadedApi} from "../../axios/allApi"


function Header() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuth, user} = useSelector(state => state.userReducer)
    const logOut = () => {
        dispatch(setIsAuth(false))
    }
    const isAdmin = () => {
        navigate(links.admin)
    }
    const userCabinet = () => {
        navigate(`/user/${user.id}/`)
    }

    const base = () => {
        navigate(links.base)
    }

    useEffect(() => {
        dispatch(getUploadedApi())
    }, [dispatch])

    return (
        <div className={classes.wrapper}>
            <div className={classes.registor_type}>
                    <Link to={links.base}
                          className={classes.singn_text}
                    >Главная</Link>

                <Link to={links.contact}
                      className={classes.singn_text}
                >Контакты</Link>
                <div className={classes.block_meny}>
                    <div className={classes.block_registr_type}>
                        <ul className={classes.block_nav}>
                            {isAuth
                                ?
                                <>
                                    <li className={classes.buttom_block}
                                    onClick={userCabinet}>
                                        <span className={classes.text_svg}>Кабинет</span>
                                    </li>
                                    {user.role === "ADMIN"
                                        ?
                                        <button
                                            className={classes.btn_header}
                                            onClick={isAdmin}>Admin</button>
                                        :
                                        ''
                                    }
                                    <li className={classes.singn_text}>
                                        <button
                                            className={classes.btn_header}
                                            onClick={logOut}>Выход
                                        </button>
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <Link to={links.signup}
                                              className={classes.singn_text}
                                        >Регистрация</Link>
                                    </li>
                                    <li>
                                        <Link
                                            className={classes.singn_text}
                                            to={links.login}><img src={icon_men} alt="men"/><span className={classes.singn_text}>Вход</span></Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header