import React from "react";

function CurrentProjects() {
    return (
        <div className="currentProjects-area">
            <div className="currentProjects-title">
                <h2>Current Projects</h2>
            </div>
            <div className="currentProjects-blocks">
                <div className="currentProject">
                    <div className="currentProjectImg">
                        <img src="./img/gortsiq.jpg" />
                    </div>
                    <div className="currentProject-title">
                        <h2>Project</h2>
                    </div>
                    <div className="currentProject-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CurrentProjects