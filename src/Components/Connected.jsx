import React from "react";

const Connected = (props) => {
    return (
        <div className='connected-conatiner'>
            <h1 className="connected-account">You are connected to metamask</h1>
            <p className="connected-contract-address">Metamask Account: {props.account}</p>

            { props.showButton ? (
                <p className="connected-account">You have already voted</p>
            ): (
                <div>
                    <input type="text" placeholder="Enter candidate name" value = {props.name} onChange={props.handleCandidateNameChange}></input>
                    <br />
                    <button className="connected-button" onClick={props.voteFunction}>Vote</button>
                </div>
            )}

            <table id="myTable" className="candidates-table">
                <thead>
                <tr>
                    <th>Candidate name</th>
                    <th>Candidate votes</th>
                </tr>
                </thead>
                <tbody>
                {props.candidates.map((candidate, index) => (
                    <tr key={index}>
                    <td>{candidate.name}</td>
                    <td>{candidate.voteCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Connected;