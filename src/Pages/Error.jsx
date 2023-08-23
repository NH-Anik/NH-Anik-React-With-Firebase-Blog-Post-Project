import Lottie from "lottie-react";
import groovyWalkAnimation from "../Lotianimation/animation_ll99bp28.json";

const Error = () => {
    return (
        <div className="flex justify-around items-center mt-20">
            <Lottie animationData={groovyWalkAnimation} loop={true} />
        </div>
    );
};

export default Error;