import './style.scss'

function PageTitle(props) {
    return (
        <div className="page-title mb-5">
            <p className="subtitle">{props.subtitle}</p>
            <h3>{props.title}</h3>
        </div>
    )
}

export default PageTitle