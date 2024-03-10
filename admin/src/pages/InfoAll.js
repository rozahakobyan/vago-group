import React from 'react';
import Wrapper from "../component/Wrapper";

function InfoAll() {
    return (
        <Wrapper helmetTitle={"All Info"}>
            <h2>Responsive Table</h2>
            <div className="table-wrapper">
                <table className="fl-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>Content 1</td>
                        <td>Content 1</td>
                        <td>Content 1</td>
                    </tr>
                    <tr>
                        <td>Content 2</td>
                        <td>Content 2</td>
                        <td>Content 2</td>
                    </tr>
                    <tr>
                        <td>Content 3</td>
                        <td>Content 3</td>
                        <td>Content 3</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </Wrapper>
);
}

export default InfoAll;

