import { parse, v4 as uuidv4 } from 'uuid'
import styles from '..project/Project.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'

import Container from '../layout/Container'
import Loading from '../layout/Loading'
import { create } from 'json-server'

function Project() {
    const { id } = useParams()
    const [project, setProject] = useState({})
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const response = await fetch(`http://localhost:3001/projects/${id}`);
                const data = await response.json();
                setProject(data);
            } catch (error) {
                console.error("Erro ao buscar o projeto:", error);
            }
        }, 2000);

        return () => clearTimeout(timer); // Limpa o timeout se o componente desmontar
    }, [id]);

    function editPost(project) {
        setMessage('')
        setType('')
        //budget validation
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project),
        })
            .then(response => response.json())
            .then(data => {
                setProject(data)
                setShowProjectForm(false)
                setMessage('Projeto Atualizado')
                setType('success')
                //toggleProjectForm()
            })
            .catch(error => console.log(error))
    }

        function createService(project) {
            const lastService = project.services[project.services.length - 1]
            lastService.id = uuidv4()
            
            const lastServiceCost = lastService.cost
            
            const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
            
            // maximum cost validation
            
            if (newCost > parseFloat(project.budget)) {
                setMessage('Orçamento ultrapassado, verifique o valor do serviço')
                setType('error')
                project.services.pop()
                return false
            }

            //add service cost to project total cost
            project.cost = newCost

            //update project
            fetch(`http://localhost:5000/projects/${project.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project),
            })
                .then(response => response.json())
                .then(data => {
                    setProject(data)
                    setShowServiceForm(false)
                })
                .catch(error => console.log(error))
        }
    
        function toggleProjectForm() {
            setShowProjectForm(!showProjectForm)
        }
        function toggleServiceForm() {
            setShowServiceForm(!showServiceForm)
        }

        return (
            <>{project.name ? (
                < div className={styles.project_details} >
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
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
                                    <ProjectForm handleSubmit={editPost} btnText="Concluir Edição" projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um Serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && < ServiceForm
                                    handleSubmit={createService}
                                    btnText="Adicionar Serviço"
                                    projectData={project}
                                />}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            <p>Itens de Serviço</p>
                        </Container>
                    </Container>
                </div>
            ) : (<Loading />)
            }</>)
    }



    export default Project