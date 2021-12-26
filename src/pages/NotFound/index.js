import './style.scss'
import notFoundImg from '../../assets/img/404.png'

function NotFound() {
    return (
        <div>
            <main className="page-not-found">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-3 img-col">
                            <img src={notFoundImg} alt='Pagina no encontrada' />
                        </div>
                        <div className="col-md-6 text-col">
                            <h3>404!</h3>
                            <h2>Oops! Nothing to do here!</h2>
                            <p>
                                It seems that you are lost.<br />
                                We couldn't find the page you're looking for.<br />
                                Please, go back home and try again.
                            </p>
                            <a className="primary-button" href="/"><i class="fas fa-home"></i>Home</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default NotFound