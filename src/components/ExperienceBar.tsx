import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/componets/ExperienceBar.module.css';

export function ExperienceBar() {
    const {currentExpience, experienceToNextLevel} = useContext(ChallengesContext)
    const perceToNextLevel = Math.round(currentExpience * 100) / experienceToNextLevel;
    return (
        <header className= {styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{width: `${perceToNextLevel}%`}} /> 
                <span className={styles.currentExperience} style={{left: `${perceToNextLevel}%`}}>
                {currentExpience}xp</span>
            </div>
            <span>{experienceToNextLevel} xp</span>
       
        </header>
    );
}