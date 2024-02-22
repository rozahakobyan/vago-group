import React from 'react';
import States from "./States";

function Main() {
    return (
        <>
            <section>
                <div className="banner-panel">
                    <div className="shade">
                        <div className="motto">
                            <h1 className="motto-title"> Lorem</h1>
                            <p className="motto-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis minima
                                ut atque </p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="welcome-area">
                    <div className="welcome-title">
                        <h1><strong>Welcome</strong></h1>
                    </div>
                    <div className="welcome-text">
                        <p style={{color:'#999999'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi deserunt
                            dolore beatae porro adipisci hic esse perferendis impedit incidunt exercitationem qui, similique
                            commodi quidem aperiam odio? Dolorum dicta corrupti rerum? Lorem ipsum dolor, sit amet consectetur
                            adipisicing elit. Dolorem hic cum facere obcaecati beatae fugiat iure magni. Deserunt voluptatem
                            quisquam similique nostrum! Vero nesciunt harum optio aliquid repudiandae esse blanditiis? Lorem
                            ipsum dolor sit amet consectetur, adipisicing elit. Molestiae quasi perferendis vel necessitatibus,
                            expedita quaerat, sit, debitis repudiandae dolor ea accusantium dolore! Ipsam, obcaecati
                            voluptatibus? Temporibus debitis aspernatur dolorem incidunt? Lorem ipsum dolor, sit amet
                            consectetur adipisicing elit. Harum atque delectus necessitatibus pariatur reprehenderit veniam
                            quibusdam voluptates, ducimus veritatis nisi id beatae, eveniet, consequatur ut reiciendis neque
                            earum similique consectetur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ex
                            commodi nisi ullam dignissimos consequatur odio, possimus autem distinctio voluptas atque quas
                            soluta aut facilis cumque doloribus sequi inventore a!</p>
                    </div>
                </div>
                <States/>
            </section>
        </>
    );
}

export default Main;