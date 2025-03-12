import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Container from '../layout/Container'
import Loading from '../layout/Loading'

function Project() {
    const { id } = useParams()
    const [project, setProject] = useState({})
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:3001/projects/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })

                .then(response => response.json())
                .then(data => { setProject(data) })
                .catch(error => console.log(error))
        }, 5000)
    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    return (
        <>{project.name ? (
            < div className={styles.project_details} >
                <Container customClass="column">
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className= {styles.btn}onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria: </span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total Orçado: </span> {project.budget}
                                </p>
                                <p>
                                    <span>Total Realizado: </span> {project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <p>Project Form</p>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        ) : (<Loading />)
        }</>)
}



export default Project