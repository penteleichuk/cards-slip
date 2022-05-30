import './Dialog.scss';

export type DialogPropsType = {
    children?: JSX.Element
    image: string
    title: string
    subtitle?: string
}

export const Dialog: React.FC<DialogPropsType> = (props) => {
    const {children, image, title, subtitle} = props;

    return <>
        <div className="dialog">
            <div className="dialog__container">
                <div className="dialog__present">
                    <img src={image} alt=""/>
                </div>
                <div className="dialog__form">
                    <div className="dialog__wrapper">
                        <div className="dialog__header">
                            <h3 className="dialog__title">{title}</h3>
                            {subtitle && <p className="dialog__subtitle">{subtitle}</p>}
                        </div>
                        <div className="dialog__content">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}