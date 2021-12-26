import './style.scss'

function Footer() {
    return (
        <footer>
            <div className="container mb-4">
                <div className="row">
                    <div className="footer-wrapper">
                        <div className="site-info">
                            <small>© Rock Paper Scissors</small>
                        </div>
                        <div className="site-info">
                            <small>A+ Full Stack Developer | <a href="https://github.com/lopezrunco/Rock-Paper-Scissors-Front-End" target="_blank" rel="noreferrer">Github repo</a></small>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer