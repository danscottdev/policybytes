import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Fetches 'Featured Topic' from the database, which then gets displayed on landing page
function* fetchFeaturedTopicLanding(action){
    try{
        // Send API call to backend
        // Return value is the topic that currently has 'featured' set to TRUE
        // Due to the way it's configured, only one topic will ever be returned
        const topicResponse = yield call(axios.get, '/api/topic/featuredlanding');

        // Send data to landingPageReducer.js
        yield put({
            type: 'SET_FEATURED_TOPIC_LANDING_PAGE',
            payload: topicResponse.data
        });
    } catch(error) {
        console.log('[landingPageSaga] Error in getting topic: ', error);
    }
}

// Fetches all archived topics from the database, which then gets displayed on the landing page
function* fetchArchivedTopics(action){
    try {

        // Send API call to backend
        // Returns all topics where 'published' is TRUE and 'featured' is FALSE
        const archivedResponse = yield call(axios.get, '/api/topic/archived');

        // Send data to landingPageReducer.js
        yield put({
            type: 'SET_ARCHIVED_TOPICS',
            payload: archivedResponse.data
        });
    } catch(error) {
        console.log('[landingPageSaga] Error in getting archived topics: ', error);
    }
}

function* landingSaga() {
    yield takeLatest('FETCH_NEW_TOPIC_LANDING_PAGE', fetchFeaturedTopicLanding)
    yield takeLatest('FETCH_ARCHIVED_TOPICS', fetchArchivedTopics)
}

export default landingSaga;