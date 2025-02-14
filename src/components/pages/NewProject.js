import { useNavigate } from 'react-router-dom'

import ProjectForm from '../project/ProjectForm'

import styles from './NewProject.module.css'

function NewProject() {

    const navigate = useNavigate()

    function createPost(projects) {

        //initialize const and services
        projects.cost = 0
        projects.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(projects),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                // redirecionando para projects
                navigate('/projects', {mensagem: 'Projeto criado com sucesso!'})
            })
            .catch(err => console.log(err))

    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projetos" />
        </div>
    )
}

export default NewProject