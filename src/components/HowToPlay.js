import React, {useState} from "react";
import arrowRightIcon from "../assets/images/icon/arrow-right.png";
import ExpansionPanel from "./ExpansionPanel";

const HowToPlay = ({gameToExplain, setDifficulty, botDifficulty}) =>  {
    const [isClick, setIsClick] = useState(false);

    return (
        <div>
            {isClick ? (
                <>
                    <button onClick={() => setIsClick(false)} className='howToPlayButton button'>
                        <img className="iconArrowRightButtonHowToPlay" src={arrowRightIcon} alt="Arrow Right"/>
                    </button>
                    <ExpansionPanel gameToExplain={gameToExplain} setDifficulty={setDifficulty}
          botDifficulty={botDifficulty}/>
                </>
            ) : (
                <button onClick={() => setIsClick(true)} className='howToPlayButton button'>Comment jouer ?</button>
            )}
        </div>
    );
}

export default HowToPlay;