import {
  LOAD_COLLECTION, CLEAR_COLLECTION
} from '../actions/collection'

const collectionReducer = (state = { }, action) => {
  switch (action.type) {
    case LOAD_COLLECTION: {
      return {
        ...action.collection
      }
    }

    case CLEAR_COLLECTION: {
      return {}
    }

    default: return state;
  }
}

export default collectionReducer;
