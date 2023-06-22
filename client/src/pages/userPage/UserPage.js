import React, {useEffect} from "react"
import moment from 'moment';
import classes from '../userPage/User.module.css'
import {useDispatch, useSelector} from "react-redux"
import AddUpload from "../../components/addUpload/AddUpload"
import {getUploadedApi} from "../../axios/allApi"
import {Link} from "react-router-dom"


function UserPage() {

    const dispatch = useDispatch()

    const {user} = useSelector(state => state.userReducer)
    const {uploaded} = useSelector(state => state.allReducer)
    console.log(uploaded)
    console.log(uploaded.author)

    useEffect(() => {
        dispatch(getUploadedApi())
    }, [dispatch])

    return (
        <div className={classes.wrapper}>
            <div className={classes.conteiner}>
                <AddUpload/>
                <main className={classes.block_content}>
                    <div className={classes.block_registr_border}>
                        <section className={classes.content}>
                            <div className={classes.active_useers}>
                                <div>
                                    <div className={classes.block_activ_use}>
                                        <h2>Profile Information</h2>
                                    </div>
                                    <div className={classes.users_active}>
                                        <div className={classes.line_user}></div>
                                        <ul className={classes.lest_users}>
                                            <li className={classes.block_users}>
                                                <h3>Full Name:</h3> <span>{user.login}</span>
                                            </li>
                                            <li className={classes.block_users}>
                                                <h3>Mobile:</h3> <span>{user.phone}</span>
                                            </li>
                                            <li className={classes.block_users}>
                                                <h3>Email:</h3> <span>{user.email}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.block_progect}>
                                <div className={classes.head_progect}>
                                    <h3>Authors Table</h3>
                                </div>
                                <div className={classes.block_table}>
                                    <table className={classes.table}>
                                        <tr>
                                            <th>AUTHOR</th>
                                            <th>ROLE</th>
                                            <th>FILE</th>
                                            <th>Date</th>
                                            <th></th>
                                        </tr>
                                        {uploaded.map(item => (
                                            <tr key={item.id}>
                                                <td className={classes.block_avtor}>
                                                    <div className={classes.img_file}>
                                                        <div className={classes.circle}>

                                                        </div>
                                                    </div>
                                                    <div className={classes.text_avtor_file}>
                                                        <h3>{item.author}</h3>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={classes.text_function}>
                                                        <h3>{item.role} </h3>
                                                        <p>Organization</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={classes.status}>
                                                        <Link
                                                            to={process.env.REACT_APP_API_URL + item.uploadedFile}
                                                            className={classes.text_status}
                                                            target="_blank"
                                                        >Файл </Link>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p>{moment(item.createdAt).format("DD.MM.YYYY HH:mm")}</p>
                                                </td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default UserPage