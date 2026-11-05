import { useState } from "react";

import VotingAgreement from "./Subpart/VotingAgreement";
import VotingForm from "./Subpart/VotingForm";
import VotingEnd from "./Subpart/VotingEnd";
import VotingDisabled from "./Subpart/VotingDisabled";

type POSSIBLE_STATES = "agreement" | "voting" | "vote_success" | "vote_error" | "disabled";

export default function VotingMain(){
    const [currentState, setCurrentState] = useState<POSSIBLE_STATES>("agreement")
    return(
        <div>
            {currentState === "agreement" && <VotingAgreement onAgree={()=>setCurrentState("voting")}/>}
            {currentState === "voting" && <VotingForm onSuccess={()=>setCurrentState("vote_success")} onError={()=>setCurrentState("vote_error")}/>}
            {(currentState === "vote_success" || currentState === "vote_error") && <VotingEnd onReturn={()=>setCurrentState("voting")} status={currentState}/>}
            {currentState === "disabled" && <VotingDisabled onActivated={()=>setCurrentState("voting")}/>}
        </div>
    )
}