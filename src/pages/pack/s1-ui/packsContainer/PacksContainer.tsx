import React from 'react';
import {CardPacksType} from "../../s3-dal/PackApi";

type PacksContainerType = {
    packCards: CardPacksType[]
}

export const PacksContainer:React.FC<PacksContainerType> = React.memo(({packCards}) => {
    return (
        <div className="content loading-page">
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Cards Count</th>
                    <th>Created</th>
                    <th>Update</th>
                </tr>
                </thead>
                <tbody>
                {packCards.map(c =>
                    <tr key={c._id}>
                        <td>{c.name}</td>
                        <td>{c.cardsCount}</td>
                        <td>{JSON.stringify(c.created)}</td>
                        <td>{JSON.stringify(c.updated)}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
});
