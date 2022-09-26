import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/componets/Profile.module.css';


export function Profile() {
    const { level } = useContext(ChallengesContext)
    return( 
        <div className={styles.profileContainer}>
            <img src= "https://github.com/vitoriamartins12.png" alt="Vitoria Martins " />
            <div>
                <strong>Vitoria Martins</strong>
                <p>
                <img src="icons/level.svg" alt="Level"/>
                Level {level}
             </p>  
            </div>
        </div>
    );
}