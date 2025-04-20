"use client";
import { FC } from 'react';
import './hamster.css';

interface HamsterProps {
    isEscaped: boolean;
}

export const Hamster: FC<HamsterProps> = ({ isEscaped = false }) => {
    return (
        <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
            <div className="wheel"></div>
            {!isEscaped && (
                <div className="hamster">
                    <div className="hamster__body">
                        <div className="hamster__head">
                            <div className="hamster__ear"></div>
                            <div className="hamster__eye"></div>
                            <div className="hamster__nose"></div>
                        </div>
                        <div className="hamster__limb hamster__limb--fr"></div>
                        <div className="hamster__limb hamster__limb--fl"></div>
                        <div className="hamster__limb hamster__limb--br"></div>
                        <div className="hamster__limb hamster__limb--bl"></div>
                        <div className="hamster__tail"></div>
                    </div>
                </div>)}
            <div className={`spoke ${!isEscaped ? 'spoke-animation' : ''}`}></div>
        </div>
    );
};