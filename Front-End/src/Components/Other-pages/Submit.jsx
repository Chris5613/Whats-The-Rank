import React, { useState } from 'react';

function Submit() {
  const [game, setGame] = useState('');

  const handleGameChange = (event) => {
    setGame(event.target.value);
  };

  return (
    <>
      <div className="select-game">
        <h2>Choose a game to submit a clip</h2>
        <select className="select" value={game} onChange={handleGameChange}>
          <option value="">-- Select a game --</option>
          <option value="lol">League of Legends</option>
          <option value="val">Valorant</option>
          <option value="csgo">CS:GO</option>
        </select>
        {game === 'lol' && <LeagueOfLegendsForm />}
        {game === 'val' && <ValorantForm />}
        {game === 'csgo' && <CSGOForm />}
      </div>
      <div className="text">
        Clips must be submitted in the following format or will be{' '}
        <span style={{ color: 'red' }}>REJECTED</span>
        <ul className="submission-list">
          <li>Must be from a ranked match</li>
          <li>Must be from 30 seconds to 1 min long</li>
          <li>No Smurfing</li>
          <li>At least be 720p</li>
        </ul>
      </div>
    </>
  );
}

function LeagueOfLegendsForm() {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [userName, setUserName] = useState('');
  const [playerInfo, setPlayerInfo] = useState('');
  const [selectedRank, setSelectedRank] = useState('');
  const [discordLink, setDiscordLink] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleYoutubeLinkChange = (event) => {
    setYoutubeLink(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePlayerInfoChange = (event) => {
    setPlayerInfo(event.target.value);
  };

  const handleRankChange = (event) => {
    setSelectedRank(event.target.value);
  };

  const handleDiscordLinkChange = (event) => {
    setDiscordLink(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission logic
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          YouTube link: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          className="form-input"
          type="text"
          value={youtubeLink}
          onChange={handleYoutubeLinkChange}
        />
        <br />

        <label className="form-label">
          User's Name: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          className="form-input"
          type="text"
          value={userName}
          onChange={handleUserNameChange}
        />
        <br />

        <label className="form-label">
          Player info: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <textarea value={playerInfo} onChange={handlePlayerInfoChange} />
        <br />

        <label className="form-label">
          {' '}
          Select a rank: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <select value={selectedRank} onChange={handleRankChange}>
          <option value="">Select a rank</option>
          <option value="Iron">Iron</option>
          <option value="Bronze">Bronze</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
          <option value="Platinum">Platinum</option>
          <option value="Diamond">Diamond</option>
          <option value="Immortal">Master</option>
          <option value="Radiant">Grandmaster</option>
          <option value="Challenger">Challenger</option>
        </select>
        <br />

        <label className="form-label">
          Tracker.gg Link: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          className="form-input"
          type="text"
          value={discordLink}
          onChange={handleDiscordLinkChange}
        />
        <br />

        <input
          type="checkbox"
          className="form-checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label className="form-label">
          I agree to the terms and conditions
        </label>
        <br />

        <button type="submit" disabled={!isChecked}>
          Submit
        </button>
      </form>
    </div>
  );
}

function ValorantForm() {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [userName, setUserName] = useState('');
  const [playerInfo, setPlayerInfo] = useState('');
  const [selectedRank, setSelectedRank] = useState('');
  const [discordLink, setDiscordLink] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleYoutubeLinkChange = (event) => {
    setYoutubeLink(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePlayerInfoChange = (event) => {
    setPlayerInfo(event.target.value);
  };

  const handleRankChange = (event) => {
    setSelectedRank(event.target.value);
  };

  const handleDiscordLinkChange = (event) => {
    setDiscordLink(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = {
      youtubeLink: youtubeLink,
      userName: userName,
      playerInfo: playerInfo,
      rank: selectedRank,
      trackerLink: discordLink,
    };
  
    try {
      const response = await fetch('http://localhost:3001/form/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        console.log('Form submitted successfully!');
        // perform any additional actions upon successful form submission
      } 
    } catch (error) {
      console.log('Error submitting form', error);
      // handle error case
    }
  };
  
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          YouTube link: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          className="form-input"
          type="text"
          value={youtubeLink}
          onChange={handleYoutubeLinkChange}
        />
        <br />

        <label className="form-label">
          User's Name: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          className="form-input"
          type="text"
          value={userName}
          onChange={handleUserNameChange}
        />
        <br />

        <label className="form-label">
          Player info: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <textarea value={playerInfo} onChange={handlePlayerInfoChange} />
        <br />

        <label className="form-label">
          {' '}
          Select a rank: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <select value={selectedRank} onChange={handleRankChange}>
          <option value="">Select a rank</option>
          <option value="Iron">Iron</option>
          <option value="Bronze">Bronze</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
          <option value="Platinum">Platinum</option>
          <option value="Diamond">Diamond</option>
          <option value="Immortal">Immortal</option>
          <option value="Radiant">Radiant</option>
        </select>
        <br />

        <label className="form-label">
          Tracker.gg Link: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          className="form-input"
          type="text"
          value={discordLink}
          onChange={handleDiscordLinkChange}
        />
        <br />

        <input
          type="checkbox"
          className="form-checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label className="form-label">
          I agree to the terms and conditions
        </label>
        <br />

        <button type="submit" disabled={!isChecked}>
          Submit
        </button>
      </form>
    </div>
  );
}

function CSGOForm() {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [userName, setUserName] = useState('');
  const [playerInfo, setPlayerInfo] = useState('');
  const [selectedRank, setSelectedRank] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleYoutubeLinkChange = (event) => {
    setYoutubeLink(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePlayerInfoChange = (event) => {
    setPlayerInfo(event.target.value);
  };

  const handleRankChange = (event) => {
    setSelectedRank(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission logic
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          YouTube link: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          className="form-input"
          type="text"
          value={youtubeLink}
          onChange={handleYoutubeLinkChange}
        />
        <br />

        <label className="form-label">
          User's Name: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          className="form-input"
          type="text"
          value={userName}
          onChange={handleUserNameChange}
        />
        <br />

        <label className="form-label">
          Player info: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <textarea value={playerInfo} onChange={handlePlayerInfoChange} />
        <br />

        <label className="form-label">
          {' '}
          Select a rank: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <select value={selectedRank} onChange={handleRankChange}>
          <option value="">Select a rank</option>
          <option value="Silver">Silver</option>
          <option value="Silver Elite">Silver Elite</option>
          <option value="Gold Nova">Gold Nova</option>
          <option value="aster Guradian">Master Guradian</option>
          <option value="Master Guardian Elite">Master Guardian Elite</option>
          <option value="DMG">DMG</option>
          <option value="Legendary Eagle">Legendary Eagle</option>
          <option value="Supreme">Supreme</option>
          <option value="Global Elite">Global Elite</option>
        </select>
        <br />

        <input
          type="checkbox"
          className="form-checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label className="form-label">
          I agree to the terms and conditions
        </label>
        <br />

        <button type="submit" disabled={!isChecked}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Submit;
