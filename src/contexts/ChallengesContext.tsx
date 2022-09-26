import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type:'body' | 'eve';
    description:string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExpience:number;
    challengesCompleted: number;
    levelUp:() => void;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void; 
    experienceToNextLevel:number;
    completeChallenge: () => void;
    closeLevelUpModal:() => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level:number;
  currentExpience:number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children,
...rest
 }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExpience, setCurrentExpience] = useState(rest.currentExpience ?? 0);
    const[challengesCompleted, setChallengeCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null)


    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1)* 4, 2)

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExpience', String(level));
        Cookies.set('challengesCompleted', String(level));
    }, [level, currentExpience,challengesCompleted]);
      
    function levelUp() {
        setLevel(level +1);
        setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);

    }

    function startNewChallenge() {
        const randomChallengesIndex = Math.floor(Math.random() *challenges.length)
        const challenge= challenges[randomChallengesIndex];

            setActiveChallenge(challenge);
            new Audio('/notification.mp3').play();

            toast(
                <div>
                    <h4>Novo desafio</h4>
                    <br />
                    <p>{`valendo ${challenge.amount}xp!`}</p>
                </div>
            );
    }

    function resetChallenge() {
         setActiveChallenge(null);
    }
    
    function completeChallenge() {
        if(!activeChallenge) {
            return;
        }
       const{amount} = activeChallenge;
       let finalExpience = currentExpience + amount;
       if (finalExpience > experienceToNextLevel) {
           finalExpience= finalExpience- experienceToNextLevel
           levelUp();
       }
       
       setCurrentExpience(finalExpience);
       setActiveChallenge(null);
       setChallengeCompleted(challengesCompleted + 1);
    
    }
    
    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExpience,
                challengesCompleted,
                levelUp, 
                startNewChallenge,
                activeChallenge,
                resetChallenge, 
                experienceToNextLevel,
                completeChallenge,
                closeLevelUpModal,

            }}
        >
            {children}
          {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}