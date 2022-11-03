
import { useState, useEffect, useLayoutEffect } from 'react'
import axios from 'axios'
import { NotFound } from '../General/NotFound'
import { getCookie, getCountry, countries, timezones } from '@fl/utils'
import {Button, Form, Modal} from 'react-bootstrap'
import './Settings.css'

const playerId = getCookie('playerId')
const discordId = getCookie('discordId')
const discordPfp = getCookie('discordPfp')
const googlePfp = getCookie('googlePfp')

export const Settings = () => {
  const [player, setPlayer] = useState({})
  const [detectedCountry, setDetectedCountry] = useState(null)
  const [detectedTimeZone, setDetectedTimeZone] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)

    // SAVE PROFILE
    const saveProfile = async () => {
        try {
            const {data} = await axios.put(`/api/players/update/${player.id}`, {
                name: document.getElementById('name').value,
                duelingBook: document.getElementById('duelingbook').value,
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                country: document.getElementById('country').value,
                timeZone: document.getElementById('time-zone').value,
                youtube: document.getElementById('youtube').value,
                twitch: document.getElementById('twitch').value,
                twitter: document.getElementById('twitter').value
            })

            setPlayer(data)
            alert('Saved Profile!')
            setShowEditModal(false)
        } catch (err) {
            console.log(err)
            if (!document.getElementById('name').value || !document.getElementById('name').value.length) {
                alert('Display Name cannot be blank.')
            } else if (document.getElementById('youtube').value && document.getElementById('youtube').value.length && !document.getElementById('youtube').value.includes('youtube.com/channel/')) {
                alert('Invalid YouTube channel link.')
            } else {
                alert('Error Saving Profile.')
            }
        }
    }

  // USE LAYOUT EFFECT
  useLayoutEffect(() => window.scrollTo(0, 0))

  // USE EFFECT SET PLAYER
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/players/${playerId}`)
        setPlayer(data)
      } catch (err) {
        console.log(err)
        setPlayer(null)
      }
    }

    fetchData()
  }, [])

  if (player === null) return <NotFound /> 
  const {id, name, firstName, lastName, discordName, discriminator, country, timeZone, youtube, twitch, twitter, duelingBook, email} = player
  const regionNames = new Intl.DisplayNames(['en'], {type: 'region'})
  if (!id) return <div/>
  return (
    <>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous"/>
        <link rel="stylesheet" href="/styles.css" />
        <div className="body">
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Edit Profile:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{width: '640px'}}>
                        <Form style={{width: '640px'}}>
                            <Form.Group className="mb-3">
                                <Form.Label>Display Name:</Form.Label>
                                <Form.Control
                                    type="name"
                                    id="name"
                                    defaultValue={name}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>DuelingBook:</Form.Label>
                                <Form.Control
                                    type="name"
                                    id="duelingbook"
                                    defaultValue={duelingBook}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control
                                    type="name"
                                    id="first-name"
                                    defaultValue={firstName}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control
                                    type="name"
                                    id="last-name"
                                    defaultValue={lastName}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Country: </Form.Label>
                                <Form.Select 
                                    id="country" 
                                    style={{width: '300px'}} 
                                    value={detectedCountry || country} 
                                    onChange={(e) => setDetectedCountry(e.target.value)}
                                >  
                                {
                                    Object.entries(countries).sort((a, b) => b[1] > a[1] ? -1 : 1).map((e) => <option key={e[0]} value={e[0]}>{e[1]}</option>)
                                }
                                </Form.Select>
                                <div className="show-cursor detect-button" onClick={() => setDetectedCountry(getCountry(Intl.DateTimeFormat().resolvedOptions().timeZone))}>Auto Detect</div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Time Zone: </Form.Label>
                                <div className="horizontal-flex">
                                    <Form.Control
                                        id="time-zone"
                                        style={{width: '300px'}} 
                                        value={detectedTimeZone || timeZone}
                                        disabled={true}
                                    >
                                </Form.Control>
                                <div className="show-cursor detect-button" onClick={() => setDetectedTimeZone(new Date().toString().match(/([A-Z]+[+-][0-9]+.*)/)[1])}>Auto Detect</div>
                                </div>
                            </Form.Group>
                            <br/>
                            <Form.Group className="mb-3">
                                <Form.Label>YouTube:</Form.Label>
                                <Form.Control
                                    type="name"
                                    id="youtube"
                                    defaultValue={youtube}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Twitch:</Form.Label>
                                <Form.Control
                                    type="name"
                                    id="twitch"
                                    defaultValue={twitch}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Twitter:</Form.Label>
                                <Form.Control
                                    type="name"
                                    id="twitter"
                                    defaultValue={twitter}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => saveProfile()}>
                        Save
                    </Button>
                    </Modal.Footer>
                </Modal>        

            <div className="player-profile-flexbox">
                <div className="player-info">
                    <div className="player-profile-title">{name}</div>
                    <img
                        className="player-pfp"
                        src={
                            googlePfp ? `https://lh3.googleusercontent.com/a/${googlePfp}` :
                            discordPfp && discordId ? `https://cdn.discordapp.com/avatars/${discordId}/${discordPfp}.webp` :
                            `https://formatlibrary.s3.us-east-2.amazonaws.com/images/pfps/${discordId || name}.png`}
                        onError={(e) => {
                                e.target.onerror = null
                                e.target.src="https://cdn.discordapp.com/embed/avatars/1.png"
                            }
                        }
                        alt="your pfp"
                    />
                    <div className="profile-info"> 
                        <div className="profile-line"><b>Name:</b> {firstName && lastName ? `${firstName} ${lastName}` : ''}</div>
                        <div className="profile-line"><b>Email:</b> {email || ''}</div>
                        <div className="profile-line"><b>DuelingBook:</b> {duelingBook || ''}</div>
                        <div className="profile-line"><b>Discord:</b> {discordName && discriminator ? (<><span>{discordName}</span><span style={{ color: 'gray' }}>#{discriminator}</span></>): 'N/A'}</div>
                        <div className="profile-line"><b>Country:</b> {country ? regionNames.of(country) : ''} {country ? <img className="country" src={`https://www.worldometers.info/img/flags/${country.toLowerCase()}-flag.gif`} alt={country + '-flag'}/> : ''}</div>
                        <div className="profile-line"><b>Time Zone:</b> {timeZone || ''}</div>
                        <div className="profile-line"><b>YouTube:</b> {youtube ? <a href={youtube} target="_blank" rel="noopener noreferrer"><img className="social-icon" src="https://formatlibrary.s3.us-east-2.amazonaws.com/images/logos/youtube.png" alt="YouTube"/></a>: ''}</div>
                        <div className="profile-line"><b>Twitch:</b> {twitch || ''}</div>
                        <div className="profile-line"><b>Twitter:</b> {twitter || ''}</div>
                    </div>
                </div>
            </div>
            <div 
                className="show-cursor deck-button"
                onClick={() => setShowEditModal(true)}
                style={{width: '180px', margin: '15px auto', textAlign: 'center'}}
            >
                <b style={{padding: '0px 6px'}}>Edit Profile</b>
                <img style={{width:'28px'}} src={`https://formatlibrary.s3.us-east-2.amazonaws.com/images/emojis/edit.png`} alt="edit"/>
            </div>
        </div>
    </>
  )
}
