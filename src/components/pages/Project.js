import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Project() {
    const { id } = useParams()
    const [project, setProject] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3001/projects/${id}`,
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
        },

        )
            .then(response => response.json())
            .then(data => {setProject(data)})
            .catch(error => console.log(error))
    }, [id])

    return (
        <div className={styles.project}>
            <h2>{project.name}</h2>
            <p>
                <span>Orçamento:</span> R$ {project.budget}
            </p>
            <p>
                <span>Categoria:</span> {project.category}
            </p>
            <p>
                <span>Descrição:</span> {project.description}
            </p>
        </div>
    )
}

export default Project
