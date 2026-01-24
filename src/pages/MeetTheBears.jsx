import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
import './MeetTheBears.css'
import meetOurBearsTitle from '../assets/images/meet_the_bears/meetOurBears_Title.png'
import bingsuAboutMe from '../assets/images/meet_the_bears/bingsu_aboutme.svg'
import bingsuProfile from '../assets/images/meet_the_bears/bingsu_profile.svg'

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
            <img src={bingsuAboutMe} alt="Bingsu About Me" className="bear-image about-me" />
            <img src={bingsuProfile} alt="Bingsu Profile" className="bear-image profile" />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default MeetTheBears
