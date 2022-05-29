import {Button, Checkbox, InputText} from '../../components/components'
import './Example.css'

export const ExamplePage = () => {
    return <>
        <section className="content example">
            <div className="container">
                <div className="paper">
                    <div>
                        <Checkbox name={'enabled'}>Enabled toggle label</Checkbox>
                        <Checkbox name={'disabled'} disabled>Disabled toggle label</Checkbox>
                    </div>
                    <div>
                        <InputText name="login" placeholder="Login"/>
                        <InputText name="password" placeholder="Password" error={"required"}/>
                    </div>
                    <div className="example__button">
                        <Button>Primary</Button>
                        <Button color={'secondary'}>Secondary</Button>
                        <Button color={'success'}>Success</Button>
                        <Button color={'warning'}>Warning</Button>
                        <Button color={'error'}>Error</Button>
                    </div>
                </div>
            </div>
        </section>
    </>
}