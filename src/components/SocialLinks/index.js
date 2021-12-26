import './style.scss'

import instagramLogo from '../../assets/img/instagram-logo.svg'
import youtubeLogo from '../../assets/img/youtube-logo.svg'
import twitterLogo from '../../assets/img/twitter-logo.svg'
import facebookLogo from '../../assets/img/facebook-logo.svg'

function SocialLinks() {
    return (
        <div className="social">
            <img src={facebookLogo} alt="Rustica" />
            <img src={twitterLogo} alt="Rustica" />
            <img src={youtubeLogo} alt="Rustica" />
            <img src={instagramLogo} alt="Rustica" />
        </div>
    )
}

export default SocialLinks