import Navbar from '../components/Navbar'
import './MeetTheBears.css'
import meetOurBearsTitle from '../assets/images/meet_the_bears/meetOurBears_Title.png'
import bingsuAboutMe from '../assets/images/meet_the_bears/bingsu_aboutme.svg'
import bingsuProfile from '../assets/images/meet_the_bears/bingsu_profile.svg'
import pipAboutMe from '../assets/images/meet_the_bears/pip_aboutme.svg'
import pipProfile from '../assets/images/meet_the_bears/pip_profile.svg'
import powdaAboutMe from '../assets/images/meet_the_bears/powda_aboutme.svg'
import powdaProfile from '../assets/images/meet_the_bears/powda_profile.svg'
import sunsetAboutMe from '../assets/images/meet_the_bears/sunset_aboutme.svg'
import sunsetProfile from '../assets/images/meet_the_bears/sunset_profile.svg'

function MeetTheBears() {
  return (
    <div className="meet-the-bears">
      <Navbar />
      <div className="meet-the-bears-content">
        <div className="title-container">
          <img src={meetOurBearsTitle} alt="Meet Our Bears" className="title-image" />
        </div>
        <div className="bears-collage">
          <div className="bear-row">
            <img src={bingsuAboutMe} alt="Bingsu About Me" className="bear-image bear-about" />
            <img src={bingsuProfile} alt="Bingsu Profile" className="bear-image bear-profile" />
          </div>
          <div className="bear-row">
            <img src={pipAboutMe} alt="Pip About Me" className="bear-image bear-about" />
            <img src={pipProfile} alt="Pip Profile" className="bear-image bear-profile" />
          </div>
          <div className="bear-row">
            <img src={powdaAboutMe} alt="Powda About Me" className="bear-image bear-about" />
            <img src={powdaProfile} alt="Powda Profile" className="bear-image bear-profile" />
          </div>
          <div className="bear-row">
            <img src={sunsetAboutMe} alt="Sunset About Me" className="bear-image bear-about" />
            <img src={sunsetProfile} alt="Sunset Profile" className="bear-image bear-profile" />
          </div>
        </div>
      </div>
      <footer className="meet-the-bears-footer">
        <p className="footer-verse">
          "Love is patient and kind; love does not envy or boast; it is not arrogant or rude.
          It does not insist on its own way; it is not irritable or resentful; it does not rejoice
          at wrongdoing, but rejoices with the truth. Love bears all things, believes all things,
          hopes all things, endures all things. Love never ends. As for prophecies, they will pass away;
          as for tongues, they will cease; as for knowledge, it will pass away."
        </p>
        <p className="footer-reference">‭‭1 Corinthians‬ ‭13‬:‭4‬-‭8‬ ‭ESV‬‬</p>
      </footer>
    </div>
  )
}

export default MeetTheBears
