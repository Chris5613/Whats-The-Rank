/* eslint-disable no-unused-vars */
import Iron from '../../Assets/Val-Ranks/Iron.png';
import Bronze from '../../Assets/Val-Ranks/Bronze.png';
import Silver from '../../Assets/Val-Ranks/Sliver.png';
import Gold from '../../Assets/Val-Ranks/Gold.png';
import Platinum from '../../Assets/Val-Ranks/Plat.png';
import Diamond from '../../Assets/Val-Ranks/Diamond.png';
import Ascendant from '../../Assets/Val-Ranks/Ascendant.png';
import Immortal from '../../Assets/Val-Ranks/Immortal.png';
import Radiant from '../../Assets/Val-Ranks/Radiant.png';
import check from '../../Assets/Modal-Icons/Check.png';
import wrong from '../../Assets/Modal-Icons/Wrong.png';
import { useEffect, useCallback,useState } from 'react';
import VideoPlayer from '../Youtube';
import RankImage from './RankImage';
import { useSelector, useDispatch } from 'react-redux';
import { valorantActions } from '../store/ValorantSlice';
import ReportButton from '../Other-Pages/reportButton';
import API from '../../api';
import BackButton from '../Other-Pages/BackButton';

const Valorant = () => {
  const dispatch = useDispatch();
  const selectedRank = useSelector((state) => state.valorant.selectedRank);
  const isButtonDisabled = useSelector(
    (state) => state.valorant.isButtonDisabled
  );
  const url = useSelector((state) => state.valorant.url);
  const showModal = useSelector((state) => state.valorant.showModal);
  const rank = useSelector((state) => state.valorant.rank);
  const result = useSelector((state) => state.valorant.result);
  const player = useSelector((state) => state.valorant.player);
  const score = useSelector((state) => state.valorant.score) || 0;
  const point = useSelector((state) => state.valorant.point);
  const userId = useSelector((state) => state.settings.userId);
  const [index, setIndex] = useState(0);
  const [videoId, setVideoId] = useState('')
  const [votes, setVotes] = useState({})

  const handleModal = () => {
    dispatch(valorantActions.toggleShowModal());
  };

  useEffect(() => {
    dispatch(valorantActions.setIsButtonDisabled(selectedRank === null));
  }, [selectedRank, dispatch]);

  const handleRankClick = (rank) => {
    dispatch(valorantActions.setSelectedRank(rank));
  };

  const youtubeUrl = url;
  const rankImages = {
    Iron: Iron,
    Bronze: Bronze,
    Silver: Silver,
    Gold: Gold,
    Platinum: Platinum,
    Diamond: Diamond,
    Ascendant: Ascendant,
    Immortal: Immortal,
    Radiant: Radiant,
  };

  const pic = rankImages[rank];
  const submittedRank = rankImages[selectedRank];

  const getYoutubeUrl = useCallback(async () => {
    const response = await fetch(API.GetValorantData);
    const data = await response.json();
    const MAX_CONSECUTIVE_SAME_INDICES = 10;
    const buffer = new Array(MAX_CONSECUTIVE_SAME_INDICES);
    buffer.fill(-1);

    let randomIndex = Math.floor(Math.random() * data.form.length);
    while (buffer.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * data.form.length);
    }

    buffer.push(randomIndex);
    buffer.shift();
    dispatch(valorantActions.setUrl(data.form[randomIndex].youtubeLink));
    dispatch(valorantActions.setRank(data.form[randomIndex].rank));
    dispatch(valorantActions.setPlayer(data.form[randomIndex].playerInfo));
    setIndex(randomIndex)
  }, [dispatch]);


  const refresh = () => {
    getYoutubeUrl();
    dispatch(valorantActions.setSelectedRank(null));
    dispatch(valorantActions.setIsButtonDisabled(true));
    dispatch(valorantActions.hideShowModal());
  };

  useEffect(() => {
    dispatch(valorantActions.setIsButtonDisabled(selectedRank === null));
    
    const fetchVideos = async () => {
      const response = await fetch(`${API.GetAllVideos}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setVideoId(data[index]._id); 
    };
  
    if (index >= 0) {
      fetchVideos();
    }
  
    const getOneUser = async (uuid) => {
      const response = await fetch(`${API.GetUserByUuid}/${uuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch(valorantActions.setScore(data.points));
    };
  
    if (userId) {
      getOneUser(userId);
    }
  }, [selectedRank, dispatch, index, userId]);

  useEffect(() => {
    getYoutubeUrl();
  }, [getYoutubeUrl]);

  useEffect(() => {
    const createRecord = async () => {
      if (!videoId) return; 
      try {
        const response = await fetch(`${API.CreateVideoRecord}`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            valFormId: videoId, 
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
      } catch (error) {
        console.error('Error creating video vote:', error);
      }
    };

    createRecord();
  }, [videoId]);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const url = `${API.GetVotes}`; 
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const videoVotes = data[index]?.votes; 
        if (videoVotes) {
          setVotes(videoVotes);
  
          const totalVotes = Object.values(videoVotes).reduce((acc, count) => acc + count, 0);
          
          // Calculate and log vote percentages for each rank
          const votePercentages = {};
          Object.entries(videoVotes).forEach(([rank, count]) => {
            votePercentages[rank] = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(2) : '0';
          });
  
          console.log("votes",votePercentages); // Contains percentages for each rank
        } else {
          console.log("No votes data found at the specified index.");
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    if (videoId) {
      fetchVotes();
    }
  }, [videoId, index]);
  

  const videoVote = async () => {
    try {
      const response = await fetch(`${API.VoteVideo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: videoId,
          rank: selectedRank,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const updatePoints = async (point, uuid) => {
    try {
      const response = await fetch(`${API.UpdatePoints}/${uuid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          points: point,
        }),
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const checkAnswer = () => {
    const rankList = [
      'Iron',
      'Bronze',
      'Silver',
      'Gold',
      'Platinum',
      'Diamond',
      'Ascendant',
      'Immortal',
      'Radiant',
    ];
    const rankIndex = rankList.indexOf(rank);
    const selectedRankIndex = rankList.indexOf(selectedRank);
    const distance = Math.abs(rankIndex - selectedRankIndex);

    let newPoint = 0;
    if (rank === selectedRank) {
      dispatch(valorantActions.setResult(check));
      newPoint = 2;
      updatePoints(2, userId);
    } else if (distance === 1) {
      dispatch(valorantActions.setResult(wrong));
      newPoint = 1;
      updatePoints(1, userId);
    }
    else {
      dispatch(valorantActions.setResult(wrong));
    }
    const newScore = score + newPoint;
    dispatch(valorantActions.setPoint(newPoint));
    dispatch(valorantActions.setScore(newScore));
  };

  return (
    <>
      <BackButton />
      <ReportButton
        youtubeLink={youtubeUrl}
        playerInfo={player}
        reportedBy={userId}
      />
      <div>
        <VideoPlayer url={youtubeUrl} />
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <br />
            <div className="modal-example">
              <div>
                <div className="modal-example-heading">Correct Rank</div>
                <img
                  className="modal-example-image"
                  src={pic}
                  alt="Radiant"
                  width={100}
                />
              </div>
              <div>
                <div className="modal-example-heading">Your Guess</div>
                <img
                  className="modal-example-image"
                  src={submittedRank}
                  alt="rank"
                  width={100}
                />
              </div>
              <div>
                <div className="modal-example-heading result-title">Result</div>
                <img
                  className="modal-example-image wrong"
                  src={result}
                  alt="wrong"
                  width={70}
                />
                <p className="modal-example-wrong">{point} Point</p>
              </div>
            </div>
            <br />
            <br />
            <p className="text">You currently have {score} points</p>
            <br />
            <p className="text">Credit: {player}</p>
            <button onClick={refresh} className="submit-btn">
              Next Video
            </button>
          </div>
        </div>
      )}
      <div className="ranks">
        <RankImage
          rank="Iron"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={Iron}
        />
        <RankImage
          rank="Bronze"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={Bronze}
        />
        <RankImage
          rank="Silver"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={Silver}
        />
        <RankImage
          rank="Gold"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={Gold}
        />
        <RankImage
          rank="Platinum"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={Platinum}
        />
        <RankImage
          rank="Diamond"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={Diamond}
        />
        <RankImage
          rank="Ascendant"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={Ascendant}
        />
        <RankImage
          rank="Immortal"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={Immortal}
        />
        <RankImage
          rank="Radiant"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={Radiant}
        />
      </div>
      <div className="submit-btn-container" onClick={videoVote}>
        <button
          className="submit"
          onClick={() => {
            handleModal();
            checkAnswer();
            
          }}
          disabled={isButtonDisabled}
        >
          {selectedRank ? `Submit: ${selectedRank}` : 'Select a Rank'}
        </button>
      </div>
    </>
  );
};

export default Valorant;
