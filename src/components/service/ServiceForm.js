import styles from '../project/Project.module.css';
import Input from '../layout/Input';
import SubmitButton from '../layout/SubmitButton';

import { useState } from 'react'

function ServiceForm({ handleSubmit, btnText, projectData}) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }
    function handleChange(event) {
        setService({ ...service, [event.target.name]: event.target.value })
    }

    return (
        <form
            className={styles.form}
            onSubmit={submit}
            action={`/services/${service.id}`}
            method="POST">
            <Input
                type="text"
                text="Nome do Serviço"
                name="name"
                placeholder="Insira o nome do Serviço"
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                text="Preço do Serviço"
                name="cost"
                placeholder="Insira o preço do Serviço"
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Descrição do Serviço"
                name="descriotion"
                placeholder="Insira a descrição do Serviço"
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ServiceForm