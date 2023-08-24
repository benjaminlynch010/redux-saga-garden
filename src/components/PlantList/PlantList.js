import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const reduxState = useSelector(store => store);

    useEffect(() => {
        console.log('component did mount');
        // dispatch an action to request the plantList from the API
        dispatch({ type: 'GET_PLANTS' })
    }, []); 
    console.log(reduxState)
    return (
        <div>
            <h3>This is the plant list</h3>
            <pre>{JSON.stringify(reduxState.plantData)}</pre>
        </div>
    );
}

export default PlantList;
